import { Env } from "../worker-configuration";
import { llmHTMLContent } from "./utils/llm";
import { generatePDF, getInstanceIDString, warmupBrowserInstance } from "./utils/pdf";
import { ExecutionContext } from "@cloudflare/workers-types";

import ArticleData from "./types/ArticleData";

import style from "./html/style";
import header from "./html/header";
import { mockContent } from "./html/mock";
import footer from "./html/footer";

export async function articleToPDF(env: Env, ctx: ExecutionContext, article: ArticleData) {
    try {
        const instanceID = getInstanceIDString();

        warmupBrowserInstance(env, instanceID, ctx)
        const content = await llmHTMLContent(env)
    
        const htmlContent = `
        <!DOCTYPE html>
        <html>
            <head>
                ${style()} 
            </head>
            <body>
                ${header(article)} 
                ${mockContent} 
                ${footer(article.url)} 
            </body>
        </html>
        `;
    
        const pdf = await generatePDF(env, htmlContent, instanceID);
        return pdf;    
    } catch (error: any) {
        console.error("Error generating PDF:", error);
        return new Response("Error generating PDF", { status: 500 });
    }
}