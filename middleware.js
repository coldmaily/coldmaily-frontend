import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('app_refresh_token');

  const protectedPaths = ['/home', '/profile', '/settings']; // Add your protected routes here
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // Redirect to unauthorized page or login
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

// Specify which paths to run middleware on
export const config = {
  matcher: ['/home/:path*', '/profile/:path*', '/settings/:path*'], // Adjust routes accordingly
};

