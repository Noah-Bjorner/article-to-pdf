import { Env } from '../../worker-configuration';
import { DurableObjectNamespace, DurableObjectStub, ExecutionContext } from '@cloudflare/workers-types';


export function getInstanceIDString(): string {
	const NUM_INSTANCES = 5; 
    const instanceIndex = Math.floor(Math.random() * NUM_INSTANCES);
    const idString = `browser-instance-${instanceIndex}`;
    return idString;
}

export async function warmupBrowserInstance(env: Env, idString: string, ctx?: ExecutionContext): Promise<void> {
    try {
        const doId = env.BROWSER_DO.idFromName(idString);
        const stub = env.BROWSER_DO.get(doId);
        console.log(`warmupBrowserInstance: Sending warmup request to DO ID: ${idString}`);

        // Send the request to the /warmup endpoint
        const warmupFetchPromise = stub.fetch("http://do-internal/warmup", { method: 'POST' }); // Method depends on DO fetch handler

        if (ctx?.waitUntil) {
            // Allow Cloudflare to track this promise even if the main function returns
            ctx.waitUntil(
                warmupFetchPromise
                    .then(response => {
                        if (!response.ok) {
                             console.warn(`Warmup request for ${idString} failed with status ${response.status}`);
                        } else {
                            // console.log(`Warmup request for ${idString} completed successfully.`);
                        }
                    })
                    .catch(err => console.error(`Warmup fetch itself failed for ${idString}:`, err))
            );
             console.log(`warmupBrowserInstance: Warmup promise handed to waitUntil for ${idString}.`);
             // Resolve immediately as waitUntil is handling completion
             return Promise.resolve();
        } else {
            // No context - await the fetch directly (less ideal as it might delay main thread)
            // Or truly fire-and-forget (no await, less reliable)
             console.warn(`warmupBrowserInstance: No ExecutionContext, awaiting warmup fetch directly for ${idString}.`);
             await warmupFetchPromise; // Wait for the fetch call itself to resolve/reject
        }
    } catch (error) {
         console.error(`warmupBrowserInstance: Error initiating warmup for ${idString}:`, error);
         // Optional: Re-throw or handle as needed, depends if caller needs to know
         throw error; // Re-throw to signal failure in articleToPDF's Promise.all if used that way
    }
}


export async function generatePDF(env: Env, htmlContent: string, idString: string): Promise<Response> {
    console.log(`generatePDF: Requesting PDF from DO ID: ${idString}`);

    if (!htmlContent) {
        console.error("generatePDF: Received empty htmlContent.");
        return new Response("Cannot generate PDF from empty HTML content.", { status: 400 });
    }

    try {
        // Get the specific DO instance stub
        const doId = env.BROWSER_DO.idFromName(idString);
        const stub = env.BROWSER_DO.get(doId);

        console.log(`generatePDF: Sending HTML to DO /generate endpoint for ID: ${idString}`);

        // Call the DO's /generate endpoint
        const doResponse = await stub.fetch("http://do-internal/generate", {
            method: 'POST',
            body: htmlContent,
            headers: {
                'Content-Type': 'text/html',
            },
            // Consider adding connect/read timeouts for the DO fetch
            // cf: { connectTimeout: 10, readTimeout: 60 } // Example timeouts in seconds
        });

        console.log(`generatePDF: Received response from DO /generate (ID: ${idString}) with status: ${doResponse.status}`);

        // --- Reconstruct Response (important for Hono compatibility) ---
        const body = await doResponse.arrayBuffer(); // Read body first

        if (!doResponse.ok) {
            // Handle error response from DO
            const errorText = new TextDecoder().decode(body); // Decode body as error text
            console.error(`generatePDF: Error response from DO ${idString} (Status: ${doResponse.status}): ${errorText}`);
             return new Response(errorText || `PDF generation failed in DO ${idString}`, {
                status: doResponse.status, // Use DO's error status
                headers: { 'Content-Type': 'text/plain' } // Indicate plain text error
             });
        }

        // Success - reconstruct PDF response
        const headers = new Headers();
        if (doResponse.headers.has('Content-Type')) {
            headers.set('Content-Type', doResponse.headers.get('Content-Type')!);
        } else {
             headers.set('Content-Type', 'application/pdf'); // Default if missing
        }
        if (doResponse.headers.has('Content-Disposition')) {
            headers.set('Content-Disposition', doResponse.headers.get('Content-Disposition')!);
        } else {
            headers.set('Content-Disposition', 'inline; filename="generated.pdf"'); // Default if missing
        }

        return new Response(body, {
            status: doResponse.status, // Should be 200 OK
            headers: headers
        });
        // --- End Reconstruct Response ---

    } catch (error: any) {
        console.error(`generatePDF: Error calling DO /generate endpoint for ID ${idString}:`, error);
        return new Response(`Failed to communicate with PDF generation service (DO ID ${idString}): ${error.message}`, { status: 502 }); // 502 Bad Gateway might be appropriate
    }
}