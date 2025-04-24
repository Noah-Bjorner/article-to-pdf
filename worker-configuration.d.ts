import type { R2Bucket, BrowserWorker, DurableObjectNamespace } from '@cloudflare/workers-types';

interface Env {
	'article-to-pdf-r2': R2Bucket;
	PDF_BROWSER: BrowserWorker;
	BROWSER_DO: DurableObjectNamespace;
}
