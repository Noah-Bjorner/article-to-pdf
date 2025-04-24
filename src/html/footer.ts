import { domainName } from "../utils/url";

export default function footer(url: string) {
    return `
        <div class="footer">
            <span>Made with <span class="footer-emphasized">Article-to-PDF</span></span>
            <span>From <span class="footer-emphasized">${domainName(url)}</span></span>
        </div>
    `
}