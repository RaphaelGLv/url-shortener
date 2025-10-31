import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ShortenedUrlEntity } from "./entities/shortened-url.entity";
import { ShortenedUrl, ShortenedUrlDocument } from "./schemas/shortened-url.schema";

@Injectable()
export class UrlRepository {
    constructor(
        @InjectModel(ShortenedUrl.name) private urlModel: Model<ShortenedUrl>
    ) {}

    async createShortenedUrl(shortenedUrl: ShortenedUrlEntity): Promise<ShortenedUrlDocument> {
        const createdUrl = new this.urlModel(shortenedUrl);
        return await createdUrl.save();
    }
}