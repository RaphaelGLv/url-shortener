import { Module } from "@nestjs/common";
import { UrlController } from "./url.controller";
import { UrlService } from "./services/url-service/url.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ShortenedUrl,
  ShortenedUrlSchema,
} from "./schemas/shortened-url.schema";
import { Counter, CounterSchema } from "src/url-counter/schemas/counter.schema";
import { HashingService } from "./services/hashing-service/hashing.service";
import { UrlRepository } from "./url.repository";
import { CounterRepository } from "src/url-counter/counter.repository";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: ShortenedUrl.name, schema: ShortenedUrlSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [UrlController],
  providers: [UrlService, HashingService, UrlRepository, CounterRepository],
})
export class UrlModule {}
