import { HttpStatus, Injectable, NotFoundException, } from "@nestjs/common";
import { UrlRepository } from "../../url.repository";
import { CounterRepository } from "src/url-counter/counter.repository";
import { HashingService } from "../hashing-service/hashing.service";
import { ShortenedUrlEntity } from "src/url/entities/shortened-url.entity";
import { Response } from "express";

@Injectable()
export class UrlService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly urlRepository: UrlRepository,
    private readonly counterRepository: CounterRepository
  ) {}

  async shortenUrl(originalUrl: string, userId?: string): Promise<ShortenedUrlEntity> {
    const counter = await this.counterRepository.incrementUrlCounter();

    const hash = this.hashingService.encode(counter.count);

    const shortenedUrl = await this.urlRepository.createShortenedUrl(new ShortenedUrlEntity({
      originalUrl,
      hash,
      userId,
    }));

    const response = ShortenedUrlEntity.fromModel(shortenedUrl);

    return response;
  }

  async redirectToOriginalUrl(hash: string, response: Response): Promise<void> {
    const shortenedUrlModel = await this.urlRepository.findByHash(hash);

    if (!shortenedUrlModel) {
      throw new NotFoundException("URL not found");
    }

    const shortenedUrlEntity = ShortenedUrlEntity.fromModel(shortenedUrlModel);

    if (shortenedUrlEntity.isPermanent()) {
      response.redirect(HttpStatus.MOVED_PERMANENTLY, shortenedUrlEntity.originalUrl);
      return;
    }

    response.redirect(HttpStatus.FOUND, shortenedUrlEntity.originalUrl);
  }
}
