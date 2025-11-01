import { ShortenedUrlDocument } from "../schemas/shortened-url.schema";

export class ShortenedUrlEntity {
    userId?: string;
    hash: string;
    originalUrl: string;
    expiresAt: Date | null;
    createdAt?: Date;
    
    constructor(props: {
        userId?: string,
        hash: string,
        originalUrl: string,
        expiresAt: Date | null,
        createdAt?: Date,
    }) {
        Object.assign(this, props);
    };

    static fromModel(model: ShortenedUrlDocument): ShortenedUrlEntity {
        return new ShortenedUrlEntity(
            {
                userId: model.userId?.toString(),
                hash: model.hash,
                originalUrl: model.originalUrl,
                expiresAt: model.expiresAt,
                createdAt: model.createdAt,
            }
        )
    }
    
    public isPermanent(): boolean {
        return this.expiresAt === null;
    }
}