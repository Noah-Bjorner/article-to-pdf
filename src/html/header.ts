import ArticleData from "../types/ArticleData";
import { formatDate } from "../utils/date";
import { domainName } from "../utils/url";


export default function header(article: ArticleData) {

    const bylineFirst = article.by ? `By ${article.by}` : article.site ? `From ${article.site}` : `From ${domainName(article.url)}`;
    const bylineSecond = article.date ? ` • ${formatDate(article.date, article.language || 'en')}` : '';
    const byline = `${bylineFirst}${bylineSecond}`;

    return `
        <div class="header">
          <h1 id="title">${article.title}</h1>
          ${article.excerpt ? `<p id="description">${article.excerpt}</p>` : ''}
          <p id="byline">${byline}</p>
        </div>
    `
}


