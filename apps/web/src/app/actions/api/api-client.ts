import { cookies } from "next/headers";
import { ApiRequestOptions } from "./types/api-options.types";
import { ApiError } from "next/dist/server/api-utils";

export class ApiClient {
  private static readonly baseUrl: string = process.env.API_URL || "";

  static async fetch<T>(options: ApiRequestOptions): Promise<T> {
    const { method = "GET", path, body, tags, cache = "no-store" } = options;

    const url = `${this.baseUrl}${path}`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const tokenCookie = (await cookies()).get("token");
    if (tokenCookie) {
      headers.append("Authorization", `Bearer ${tokenCookie.value}`);
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
      cache: cache,
      next: {
        tags: tags,
      },
    };

    try {
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        console.error(`API Error: ${response.status} ${path}`, errorBody);

        throw new ApiError(response.status, errorBody.message || 'API request failed');
      }

      if (response.status === 204) {
        return null as T;
      }

      return response.json() as T;
    } catch (error) {
      console.error(`ApiClient Error: ${method} ${path}`, error);
      throw error;
    }
  }
}
