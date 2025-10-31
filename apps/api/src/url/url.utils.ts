export class UrlUtils {
    static getDefaultExpirationInSeconds(): number {
        const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;
        return SEVEN_DAYS_IN_SECONDS;
    }

    static normalizeUrl(url: string): string {
        if (!/^https?:\/\//i.test(url)) {
            return `http://${url}`;
        }
        return url;
    }
}