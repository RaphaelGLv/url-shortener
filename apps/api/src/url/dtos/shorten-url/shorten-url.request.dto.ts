import { Transform } from "class-transformer";
import { IsNotEmpty, IsUrl } from "class-validator";
import { UrlUtils } from "src/url/url.utils";

export class ShortenUrlRequestDto {
    @IsNotEmpty({ message: "URL must not be empty" })
    @IsUrl({ require_protocol: false }, { message: "Invalid URL format" })
    @Transform(({ value }) => {
        const normalizedUrl = UrlUtils.normalizeUrl(value);
        return normalizedUrl;
    })
    url: string;
}