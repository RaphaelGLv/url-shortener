export class UrlUtils {
    static getExpirationDate(): Date {
        const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
        return new Date(Date.now() + SEVEN_DAYS_IN_MS);
    }

    static normalizeUrl(url: string): string {
        if (!/^https?:\/\//i.test(url)) {
            return `http://${url}`;
        }
        return url;
    }
}