import { Hono } from 'hono'
import { generatePDF } from './pdf';
import { Env } from '../worker-configuration';

const app = new Hono<{ Bindings: Env }>()


app.get('/health', (c) => c.text('healthy', 200))


app.post('/html', async (c) => {
	try {
		const { html } = await c.req.json();
		return c.json({ message: 'html_response_success' })
	} catch {
		return c.json({ error: 'html_response_unexpect_error' }, 500);
	}
});

// make POST
app.get('/pdf_test', async (c) => {
	const pdf = await generatePDF(c.env);
	return pdf;
});


export default app
