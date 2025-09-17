import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // If accessing a protected route without token, redirect to auth
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // If accessing auth page with valid token, redirect to appropriate dashboard
  if (pathname === '/auth' && token) {
    try {
      const user = verifyToken(token);
      if (user) {
        const redirectUrl = user.role === 'admin' ? '/admin' : '/client';
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
    } catch (error) {
      // Invalid token, allow access to auth page
    }
  }

  // If accessing admin routes without admin role, redirect to client dashboard
  if (pathname.startsWith('/admin') && token) {
    try {
      const user = verifyToken(token);
      if (user && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/client', request.url));
      }
  } catch {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  }

  // If accessing client routes without client role, redirect to admin dashboard
  if (pathname.startsWith('/client') && token) {
    try {
      const user = verifyToken(token);
      if (user && user.role !== 'client') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
  } catch {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
