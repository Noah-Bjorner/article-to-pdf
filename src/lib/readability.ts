import { Readability } from '@mozilla/readability';
import { DOMParser } from 'linkedom'; 
import ArticleData from '../types/ArticleData';

export const parseURLArticle = async (url: string): Promise<ArticleData> => {
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        const dom = new DOMParser().parseFromString(html, 'text/html');
        
        (dom as any).location = new URL(url);
        
        const reader = new Readability(dom);
        const parsedHTML = reader.parse();
        
        if (!parsedHTML || !parsedHTML.title || !parsedHTML.content) {
            throw new Error('No parsed HTML');
        }
        
        return {
            url: url,
            title: parsedHTML.title,
            content: parsedHTML.content,
            excerpt: parsedHTML.excerpt || undefined,
            by: parsedHTML.byline || undefined,
            site: parsedHTML.siteName || undefined,
            date: parsedHTML.publishedTime || undefined,
            language: parsedHTML.lang || undefined,
        };
    } catch (error) {
        throw new Error('Error with parseArticle()');
    }
}