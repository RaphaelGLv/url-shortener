import { Body, Controller, Post, Req } from "@nestjs/common";
import { UrlService } from "../../services/url-service/url.service";
import { ShortenUrlRequestDto } from "../../dtos/shorten-url/shorten-url.request.dto";
import { ShortenUrlResponseDto } from "../../dtos/shorten-url/shorten-url.response.dto";
import { ConfigService } from "@nestjs/config";
import { OptionalAuth } from "src/decorators/optional-auth.decorator";
import type { AppRequest } from "src/types/app-request.types";

@Controller("url")
export class UrlController {
  constructor(
    private readonly configService: ConfigService,
    private readonly urlService: UrlService
  ) {}

  @OptionalAuth()
  @Post("shorten")
  async shortenUrl(
    @Body() shortenUrlRequestDto: ShortenUrlRequestDto,
    @Req() request: AppRequest
  ): Promise<ShortenUrlResponseDto> {
    const userId = request.user?.userId;

    const hash = await this.urlService.shortenUrl(
      shortenUrlRequestDto.url,
      userId
    );

    const apiBaseUrl = this.configService.get<string>("API_BASE_URL");
    const shortenedUrl = `${apiBaseUrl}/${hash}`;

    return { shortenedUrl };
  }
}
