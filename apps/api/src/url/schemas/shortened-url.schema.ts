import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { UrlUtils } from "../url.utils";

@Schema({timestamps: true})
export class ShortenedUrl extends Document {
    @Prop({ required: true, unique: true })
    hash: string;

    @Prop({ required: true })
    originalUrl: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', default: null, index: true })
    userId: User

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export const ShortenedUrlSchema = SchemaFactory.createForClass(ShortenedUrl);

ShortenedUrlSchema.index({ createdAt: 1 }, { expireAfterSeconds: UrlUtils.getDefaultExpirationInSeconds(), partialFilterExpression: { userId: null} });

export type ShortenedUrlDocument = HydratedDocument<ShortenedUrl>;