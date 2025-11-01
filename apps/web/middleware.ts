import { AppRoutes } from '@/constants/app-routes';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect pages and redirect based on presence of the session cookie.
 *
 * Rules implemented:
 * - GET /            -> if token cookie exists, redirect to /dashboard
 * - GET /dashboard/** -> if token cookie missing, redirect to /auth
 *
 * Notes:
 * - This middleware runs on the Edge runtime. It should remain lightweight and avoid
 *   using Node-specific APIs. We only check the presence of the httpOnly cookie named
 *   `token` (the same cookie used by the server action saveSessionAction).
 * - If you need to validate token contents (expiry, signature), consider doing a
 *   lightweight JWT decode here (edge-safe) or keep a server-side check in the
 *   protected page itself.
 */

export function middleware(req: NextRequest) {
  const { nextUrl: url, cookies } = req;
  const token = cookies.get('token')?.value;

  // If user hits the home page while logged in, send to dashboard
  if (url.pathname === AppRoutes.HOME) {
    if (token) {
      const dest = url.clone();
      dest.pathname = AppRoutes.DASHBOARD;
      return NextResponse.redirect(dest);
    }
    return NextResponse.next();
  }

  // Protect /dashboard and its subpaths
  if (url.pathname === AppRoutes.DASHBOARD || url.pathname.startsWith(AppRoutes.DASHBOARD + '/')) {
    if (!token) {
      const dest = url.clone();
      dest.pathname = AppRoutes.AUTH;
      return NextResponse.redirect(dest);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
