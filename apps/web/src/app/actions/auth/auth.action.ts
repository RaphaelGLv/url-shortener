"use server";

import { ApiError } from "next/dist/server/api-utils";
import { ApiClient } from "../api/api-client";
import { saveSessionAction } from "../session/session.action";
import { AuthRequestDto } from "./dtos/auth.request.dto";
import { AuthResponseDto } from "./dtos/auth.response.dto";
import { ApiResponse } from "../api/types/api-response.types";

export async function loginAction(
  data: AuthRequestDto
): Promise<ApiResponse<void | ApiError>> {
  try {
    const response = await ApiClient.fetch<AuthResponseDto>({
      method: "POST",
      path: "/auth/login",
      body: data,
    });

    if (response.token) {
      await saveSessionAction(response.token);
    }

    return {
      success: true,
      data: undefined,
    } as ApiResponse<void>;
  } catch (error) {
    return {
      success: false,
      data: {
        name: "LoginError",
        message:
          error instanceof Error
            ? error.message
            : "An unknown error occurred during login.",
        statusCode: error instanceof ApiError ? error.statusCode : 500,
      },
    } as ApiResponse<ApiError>;
  }
}

export async function registerAction(
  data: AuthRequestDto
): Promise<ApiResponse<void | ApiError>> {
  try {
    const response = await ApiClient.fetch<AuthResponseDto>({
      method: "POST",
      path: "/auth/register",
      body: data,
    });

    if (response.token) {
      await saveSessionAction(response.token);
    }

    return {
      success: true,
      data: undefined,
    } as ApiResponse<void>;
  } catch (error) {
    return {
      success: false,
      data: {
        name: "RegisterError",
        message:
          error instanceof Error
            ? error.message
            : "An unknown error occurred during registration.",
        statusCode: error instanceof ApiError ? error.statusCode : 500,
      },
    };
  }
}
