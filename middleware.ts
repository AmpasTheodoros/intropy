import { clerkMiddleware, createRouteMatcher, auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define the routes that need protection
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
]);

// Define the routes that are public and should not be protected
const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)', 
    '/sign-up(.*)', 
]);

export default clerkMiddleware((auth, req) => {
    const url = req.nextUrl;

    // If the request matches a protected route and does not match a public route, protect it
    if (isProtectedRoute(req) && !isPublicRoute(req)) {
        const isAuthenticated = auth();

        if (!isAuthenticated) {
            // Redirect unauthenticated users to the sign-in page
            return NextResponse.redirect(new URL('/sign-in', url));
        }
    }

    // Continue the middleware chain
    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
