import { Controller, Get, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { Public } from "src/decorators/public.decorator";
import { UrlService } from "src/url/services/url-service/url.service";

@Controller()
export class RedirectController {
  constructor(private readonly urlService: UrlService) {}

  @Public()
  @Get(":hash")
  async getUrl(@Req() request: Request, @Res() response: Response): Promise<void> {
    const hash = request.params.hash;

    await this.urlService.redirectToOriginalUrl(hash, response);
  }
}
