export class UrlUtils {
    static getDefaultExpirationInSeconds(): number {
        const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;
        return SEVEN_DAYS_IN_SECONDS;
    }
}