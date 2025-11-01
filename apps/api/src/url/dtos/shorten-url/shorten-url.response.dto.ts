export class ShortenUrlResponseDto {
    hash: string;
    originalUrl: string;
    shortenedUrl: string;
    expiresAt: string | null;
    createdAt?: string;
}