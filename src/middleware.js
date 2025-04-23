import { NextResponse } from 'next/server';

// Define routes that require authentication
const protectedRoutes = [
  '/finance-tracker',
  '/dashboard',
  '/profile',
  '/settings',
];

// Define public routes where we redirect logged-in users away from
const authRoutes = [
  '/auth/login',
  '/auth/signup',
];

// Token keys to check for
const AUTH_TOKEN_KEYS = ['ysepbb_token', 'next-auth.session-token'];

/**
 * Middleware to prevent 500 errors from useLayoutEffect issues
 * This checks if the request is from a server and contains useLayoutEffect errors
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the user has an authentication token in cookies (either custom or NextAuth)
  const hasAuthToken = AUTH_TOKEN_KEYS.some(key => request.cookies.has(key));
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the route is an auth route (login/signup)
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // If accessing a protected route without being logged in, redirect to login
  if (isProtectedRoute && !hasAuthToken) {
    const loginUrl = new URL('/auth/login', request.url);
    
    // Store the intended destination for after login (to redirect back after login)
    loginUrl.searchParams.set('callbackUrl', pathname);
    
    return NextResponse.redirect(loginUrl);
  }
  
  // If accessing an auth route while logged in, redirect to dashboard
  if (isAuthRoute && hasAuthToken) {
    return NextResponse.redirect(new URL('/finance-tracker/dashboard', request.url));
  }
  
  // Add cache control headers to prevent stale responses
  const response = NextResponse.next();
  
  // Add headers to control SSR behavior
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  
  return response;
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)',
  ],
}; 