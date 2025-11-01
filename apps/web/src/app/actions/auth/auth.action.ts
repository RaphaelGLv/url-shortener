'use server'

import { ApiClient } from "../api/api-client"
import { saveSessionAction } from "../session/session.action";
import { AuthRequestDto } from "./dtos/auth.request.dto"
import { AuthResponseDto } from "./dtos/auth.response.dto"

export async function loginAction(data: AuthRequestDto): Promise<void> {
    const response = await ApiClient.fetch<AuthResponseDto>({
        method: "POST",
        path: "/auth/login",
        body: data,
    });

    if (response.token) {
        await saveSessionAction(response.token)
    }
}

export async function registerAction(data: AuthRequestDto): Promise<void> {
    const response = await ApiClient.fetch<AuthResponseDto>({
        method: "POST",
        path: "/auth/register",
        body: data,
    });

    if (response.token) {
        await saveSessionAction(response.token)
    }
}