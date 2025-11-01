'use server';

import { ApiClient } from "../api/api-client";
import { ShortenedUrlEntity } from "../entities/shortened-url.entity";
import { ShortenUrlRequestDto } from "./dtos/shorten-url.request.dto";

export async function shortenUrlAction(data: ShortenUrlRequestDto): Promise<ShortenedUrlEntity> {
    const response = await ApiClient.fetch<ShortenedUrlEntity>({
        method: "POST",
        path: "/url/shorten",
        body: data,
    });

    return response;
}