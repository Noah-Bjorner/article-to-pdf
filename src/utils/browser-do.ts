import { Env } from '../../worker-configuration';
import * as puppeteer from '@cloudflare/puppeteer';
import { DurableObjectState } from '@cloudflare/workers-types';

export class BrowserSession {
    private state: DurableObjectState;
    private env: Env;
    private browser: puppeteer.Browser | null = null;
    // Storing the endpoint is less critical if we always launch via the binding,
    // but could be useful for advanced reconnect logic if needed.
    // private browserWSEndpoint: string | null = null;
    private initializing: boolean = false; // Simple lock to prevent concurrent initializations
    private keepAliveInterval?: ReturnType<typeof setInterval>; // Keep the browser alive


    constructor(state: DurableObjectState, env: Env) {
        this.state = state;
        this.env = env;

        // Attempt to ensure the browser is ready shortly after activation.
        // Use waitUntil to allow other operations while this runs in the background.
        this.state.waitUntil(this.ensureBrowser());
    }

    // Handles launching the browser instance, ensuring only one launch attempt runs at a time.
    async ensureBrowser(): Promise<puppeteer.Browser> {
        // Prevent multiple initializations concurrently
        while (this.initializing) {
            console.log("DO: Waiting for existing browser initialization to complete...");
            await new Promise(resolve => setTimeout(resolve, 150)); // Wait and re-check
        }

        // Check if browser exists and is connected
        if (this.browser && this.browser.isConnected()) {
            // console.log("DO: Browser already initialized and connected.");
            return this.browser;
        }

        // Set initializing lock
        this.initializing = true;
        console.log("DO: Initializing browser instance...");

        try {
            // Attempt to gracefully close any potentially lingering disconnected instance
            if (this.browser) {
                console.warn("DO: Browser found but disconnected, attempting to close.");
                try {
                    await this.browser.close();
                } catch (e) {
                    console.error("DO: Error closing disconnected browser:", e);
                }
                this.browser = null;
                // this.browserWSEndpoint = null;
                 if (this.keepAliveInterval) clearInterval(this.keepAliveInterval);
                 this.keepAliveInterval = undefined;
            }

            console.log("DO: Launching new browser instance via binding...");
            this.browser = await puppeteer.launch(this.env.PDF_BROWSER);
            // this.browserWSEndpoint = this.browser.wsEndpoint(); // Store endpoint if needed
            console.log("DO: Browser launched successfully."); // Endpoint: ${this.browserWSEndpoint}`);

            // Setup keep-alive mechanism
            this.ensureKeepAlive();

            // Setup disconnect handler
            this.browser.on('disconnected', () => {
                console.error('DO: Browser disconnected event received!');
                this.browser = null;
                // this.browserWSEndpoint = null;
                if (this.keepAliveInterval) clearInterval(this.keepAliveInterval);
                this.keepAliveInterval = undefined;
                // Optional: Could trigger a background relaunch attempt here using waitUntil
                // this.state.waitUntil(this.ensureBrowser().catch(e => console.error("Background relaunch failed:", e)));
            });

             return this.browser;

        } catch (err) {
            console.error("DO: Failed to launch browser:", err);
            // Cleanup potentially partially launched browser
            if (this.browser) {
                try { await this.browser.close(); } catch {}
            }
            this.browser = null;
            // this.browserWSEndpoint = null;
            throw err; // Re-throw the error to the caller
        } finally {
            // Release initializing lock
            this.initializing = false;
            console.log("DO: Browser initialization routine finished.");
        }
    }

   // Simple keep-alive: Periodically fetch browser version to prevent idle timeouts.
   ensureKeepAlive() {
    // Clear any existing interval
    if (this.keepAliveInterval) clearInterval(this.keepAliveInterval);
    this.keepAliveInterval = undefined;

    this.keepAliveInterval = setInterval(async () => {
        if (this.browser && this.browser.isConnected()) {
            try {
                await this.browser.version();
                // console.log("DO: Browser keep-alive check successful.");
            } catch (err: any) {
                console.error("DO: Keep-alive failed, browser might be disconnected:", err.message);
                // The 'disconnected' event handler should manage the cleanup.
                // We stop the interval here to prevent spamming logs.
                if (this.keepAliveInterval) clearInterval(this.keepAliveInterval);
                this.keepAliveInterval = undefined;
             }
        } else {
             // No browser or not connected, clear interval.
             console.log("DO: Keep-alive stopping, browser unavailable.");
             if (this.keepAliveInterval) clearInterval(this.keepAliveInterval);
             this.keepAliveInterval = undefined;
        }
    }, 30 * 1000); // Check every 30 seconds
   }


    // This method handles the actual PDF generation logic
    async generatePdfFromHtml(htmlContent: string): Promise<ArrayBuffer> {
        let page: puppeteer.Page | null = null;
        console.log("DO: Received request to generate PDF.");
        try {
            const browserInstance = await this.ensureBrowser(); // Ensures browser is ready
            console.log("DO: Browser ensured, creating new page.");
            page = await browserInstance.newPage();

             // Optional: Add request interception to block unnecessary resources
            // await page.setRequestInterception(true);
            // page.on('request', (interceptedRequest) => {
            //   if (interceptedRequest.isInterceptResolutionHandled()) return;
            //   const resourceType = interceptedRequest.resourceType();
            //   // Example: Allow only document, script, stylesheet, font
            //   if (resourceType === 'document' || resourceType === 'script' || resourceType === 'stylesheet' || resourceType === 'font') {
            //     interceptedRequest.continue();
            //   } else {
            //     interceptedRequest.abort();
            //   }
            // });


            console.log("DO: Setting page content.");
            await page.setContent(htmlContent, {
                waitUntil: 'load', // Ensure external resources like fonts are loaded
                 timeout: 60000 // Add a timeout for setContent (e.g., 60 seconds)
            });

            console.log("DO: Generating PDF buffer.");
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '0.75in', right: '0.75in', bottom: '0.75in', left: '0.75in',
                },
                 timeout: 60000 // Add a timeout for pdf generation (e.g., 60 seconds)
            });
            console.log("DO: PDF generated successfully.");
            return pdfBuffer;

        } catch (error: any) {
            console.error('DO: Error during PDF generation process:', error);
            // Log specific Puppeteer errors if possible
            if (error.message.includes('timeout')) {
                 console.error('DO: PDF generation timed out.');
            }
             // Rethrow a generic error or handle specific cases
            throw new Error(`Failed to generate PDF inside Durable Object: ${error.message}`);
        } finally {
            if (page) {
                console.log("DO: Closing page.");
                try {
                    await page.close();
                } catch (closeError) {
                     console.error("DO: Error closing page: ", closeError);
                }
            }
             console.log("DO: PDF generation process finished for this request.");
        }
    }

    // Main entry point for HTTP requests routed to this DO instance.
    async fetch(request: Request): Promise<Response> {
        // Simple routing: Assume POST contains HTML to render.
        if (request.method !== 'POST') {
            return new Response('Method Not Allowed. Only POST is accepted.', { status: 405 });
        }

        try {
            const htmlContent = await request.text();
            if (!htmlContent) {
                return new Response('Request body cannot be empty. HTML content expected.', { status: 400 });
            }
            const pdfBuffer = await this.generatePdfFromHtml(htmlContent);

            // Return the generated PDF
            return new Response(pdfBuffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'inline; filename="generated-article.pdf"', // Adjust filename as needed
                },
            });
        } catch (error: any) {
             console.error('DO Fetch Handler Error:', error);
             // Return a meaningful error response
             return new Response(error.message || 'Internal Server Error occurred within Durable Object.', { status: 500 });
        }
    }

    // Optional: Implement alarm handler for scheduled cleanup if needed,
    // e.g., if keep-alive isn't sufficient or for explicit resource release.
    // async alarm() {
    //     console.log("DO: Alarm triggered.");
    //     if (this.browser) {
    //         console.log("DO Alarm: Closing browser.");
    //         await this.browser.close();
    //         this.browser = null;
    //     }
    //     if (this.keepAliveInterval) clearInterval(this.keepAliveInterval);
    //     this.keepAliveInterval = undefined;
    // }
} 