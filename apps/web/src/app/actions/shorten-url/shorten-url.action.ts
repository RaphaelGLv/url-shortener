"use server";

import { ApiError } from "next/dist/server/api-utils";
import { ApiClient } from "../api/api-client";
import { ShortenedUrlEntity } from "../entities/shortened-url.entity";
import { ShortenUrlRequestDto } from "./dtos/shorten-url.request.dto";
import { ApiResponse } from "../api/types/api-response.types";

export async function shortenUrlAction(
  data: ShortenUrlRequestDto
): Promise<ApiResponse<ShortenedUrlEntity | ApiError>> {
  try {
    const response = await ApiClient.fetch<ShortenedUrlEntity>({
      method: "POST",
      path: "/url/shorten",
      body: data,
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      data: {
        name: "ShortenUrlError",
        message:
          error instanceof Error
            ? error.message
            : "An unknown error occurred during URL shortening.",
        statusCode: error instanceof ApiError ? error.statusCode : 500,
      },
    };
  }
}
