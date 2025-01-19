import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/auth")) {
        if (COOKIE_NAME && request.cookies.get(COOKIE_NAME)) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else if (request.nextUrl.pathname.match("/")) {
        if (COOKIE_NAME && request.cookies.get(COOKIE_NAME) == null) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }
}

// Stop Middleware running on static files
export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}; 