import { ShortenedUrlDocument } from "../schemas/shortened-url.schema";

export class ShortenedUrlEntity {
    userId?: string;
    hash: string;
    originalUrl: string;
    createdAt?: Date;
    
    constructor(props: {
        userId?: string,
        hash: string,
        originalUrl: string,
        createdAt?: Date,
    }) {
        Object.assign(this, props);
    };

    static fromModel(model: ShortenedUrlDocument): ShortenedUrlEntity {
        return new ShortenedUrlEntity(
            {
                userId: model.userId?.get?.toString(),
                hash: model.hash,
                originalUrl: model.originalUrl,
                createdAt: model.createdAt,
            }
        )
    }
    
    public isPermanent(): boolean {
        return this.userId !== undefined;
    }
}