'use client';

import { TextButton } from "@/components/buttons/text-button/text-button";
import { AppRoutes } from "@/constants/app-routes";
import { useRouter } from "next/navigation";

export function LoginButton() {
    const router = useRouter();

    return (
        <TextButton text="Sign In" onClick={() => router.push(AppRoutes.AUTH)} />
    )
}