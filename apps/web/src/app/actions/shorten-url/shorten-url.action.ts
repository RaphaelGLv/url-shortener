"use server";

import { ApiError } from "next/dist/server/api-utils";
import { ApiClient } from "../api/api-client";
import { ShortenedUrlEntity } from "../entities/shortened-url.entity";
import { ShortenUrlRequestDto } from "./dtos/shorten-url.request.dto";

export async function shortenUrlAction(
  data: ShortenUrlRequestDto
): Promise<ShortenedUrlEntity | ApiError> {
  try {
    const response = await ApiClient.fetch<ShortenedUrlEntity>({
      method: "POST",
      path: "/url/shorten",
      body: data,
    });

    return response;
  } catch (error) {
    return {
        name: "ShortenUrlError",
        message:
          error instanceof Error
            ? error.message
            : "An unknown error occurred during URL shortening.",
        statusCode: error instanceof ApiError ? error.statusCode : 500,
    } as ApiError;
  }
}
