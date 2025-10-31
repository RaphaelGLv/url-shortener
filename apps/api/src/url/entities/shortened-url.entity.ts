import { ShortenedUrlDocument } from "../schemas/shortened-url.schema";

export class ShortenedUrlEntity {
    userId?: string;
    hash: string;
    originalUrl: string;
    
    constructor(props: {
        userId?: string,
        hash: string,
        originalUrl: string,
    }) {
        Object.assign(this, props);
    };

    static fromModel(model: ShortenedUrlDocument): ShortenedUrlEntity {
        return new ShortenedUrlEntity(
            {
                userId: model.userId?.get?.toString(),
                hash: model.hash,
                originalUrl: model.originalUrl,
            }
        )
    }
    
    public isPermanent(): boolean {
        return this.userId !== undefined;
    }
}