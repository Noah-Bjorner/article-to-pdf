export const domainName = (url: string): string => {
    try {
        const parsedURL = new URL(url);
        const domain = parsedURL.hostname;
        return domain.startsWith('www.') ? domain.slice(4) : domain;
    } catch (error) {
        return ""
    }
}