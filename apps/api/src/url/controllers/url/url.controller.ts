import { Body, Controller, Post, Req } from "@nestjs/common";
import { UrlService } from "../../services/url-service/url.service";
import { ShortenUrlRequestDto } from "../../dtos/shorten-url/shorten-url.request.dto";
import { ShortenUrlResponseDto } from "../../dtos/shorten-url/shorten-url.response.dto";
import { ConfigService } from "@nestjs/config";
import { OptionalAuth } from "src/decorators/optional-auth.decorator";
import type { AppRequest } from "src/types/app-request.types";
import { Throttle } from "@nestjs/throttler";

@Controller("url")
export class UrlController {
  constructor(
    private readonly configService: ConfigService,
    private readonly urlService: UrlService
  ) {}

  @Throttle({ default: { ttl: 60_000, limit: 20, blockDuration: 60_000 } })
  @OptionalAuth()
  @Post("shorten")
  async shortenUrl(
    @Body() shortenUrlRequestDto: ShortenUrlRequestDto,
    @Req() request: AppRequest
  ): Promise<ShortenUrlResponseDto> {
    const userId = request.user?.userId;

    const shortenedUrlEntity = await this.urlService.shortenUrl(
      shortenUrlRequestDto.url,
      userId
    );

    const apiBaseUrl = this.configService.get<string>("API_BASE_URL");

    return { 
      hash: shortenedUrlEntity.hash,
      originalUrl: shortenedUrlEntity.originalUrl,
      shortenedUrl: `${apiBaseUrl}/${shortenedUrlEntity.hash}`,
      createdAt: shortenedUrlEntity?.createdAt?.toISOString(),
     };
  }
}
