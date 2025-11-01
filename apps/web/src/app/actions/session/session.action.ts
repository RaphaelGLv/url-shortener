'use server'

import { cookies } from 'next/headers'

const COOKIE_NAME = 'token'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

export async function saveSessionAction(token: string) {
  if (!token) {
    throw new Error('Cannot save empty token in session')
  }

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
    sameSite: 'lax',
  })
}

export async function clearSessionAction() {
  (await cookies()).delete(COOKIE_NAME)
}

export async function getSessionAction(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE_NAME)?.value
}