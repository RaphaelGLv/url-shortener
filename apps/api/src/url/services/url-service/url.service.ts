import { Injectable } from "@nestjs/common";
import { UrlRepository } from "../../url.repository";
import { CounterRepository } from "src/url-counter/counter.repository";
import { HashingService } from "../hashing-service/hashing.service";

@Injectable()
export class UrlService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly urlRepository: UrlRepository,
    private readonly counterRepository: CounterRepository
  ) {}

  async shortenUrl(originalUrl: string, userId?: string): Promise<string> {
    const counter = await this.counterRepository.incrementUrlCounter();

    const hash = this.hashingService.encode(counter.count);

    const shortenedUrl = await this.urlRepository.createShortenedUrl({
      originalUrl,
      hash,
      userId: userId
    });

    return shortenedUrl.hash;
  }
}
