import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

@Schema({ timestamps: true })
export class ShortenedUrl {
  @Prop({ required: true, unique: true })
  hash: string;

  @Prop({ required: true })
  originalUrl: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "User",
    default: null,
    index: true,
  })
  userId: MongooseSchema.Types.ObjectId | null;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null, expires: 0 })
  expiresAt: Date | null;

  createdAt: Date;
}

export const ShortenedUrlSchema = SchemaFactory.createForClass(ShortenedUrl);

export type ShortenedUrlDocument = HydratedDocument<ShortenedUrl>;

