import { Hono } from 'hono'
import { articleToPDF } from './logic';
import { Env } from '../worker-configuration';
import { BrowserSession } from './utils/browser-do';
import { ExecutionContext } from "@cloudflare/workers-types";
import { parseURLArticle } from './lib/readability';

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => c.text('ARTICLE-TO-PDF', 200))

app.post('/html', async (c) => {
	try {
		const { html } = await c.req.json();
		return c.json({ message: 'html_response_success' })
	} catch {
		return c.json({ error: 'html_response_unexpect_error' }, 500);
	}
});

app.post('/url', async (c) => {
	try {
		const { url } = await c.req.json();
		const articleData = await parseURLArticle(url);
		const pdfResponse = await articleToPDF(c.env, c.executionCtx as ExecutionContext, articleData);
		return pdfResponse;
	} catch {
		return c.json({ error: 'url_response_unexpect_error' }, 500);
	}
});





app.post('/pdf_test', async (c) => {
	console.log("Worker: Received request for /pdf_test, calling generatePDF...");
	try {
    	//const pdfResponse = await articleToPDF(c.env, c.executionCtx as ExecutionContext);
		return c.text("PDF generated successfully", 200);
	} catch (error: any) {
    // This catch might be redundant if generatePDF handles its errors,
    // but kept for safety.
    console.error("Worker: Error during generatePDF call:", error);
		return c.text(`Internal Worker Error: ${error.message}`, 500);
	}
});





export { BrowserSession };
export default app
