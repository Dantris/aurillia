import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Only protect /aur/admin/*
    if (!pathname.startsWith("/aur/admin")) {
        return NextResponse.next();
    }

    const isLoginRoute = pathname.startsWith("/aur/admin/login");

    const cookieToken = req.cookies.get("aur_admin")?.value;
    const expectedToken = process.env.AUR_ADMIN_TOKEN;

    // If token matches -> allow; if they go to /login while already authed, send to planner list
    if (cookieToken && expectedToken && cookieToken === expectedToken) {
        if (isLoginRoute) {
            return NextResponse.redirect(new URL("/aur/admin/planner", req.url));
        }
        return NextResponse.next();
    }

    // Not authenticated
    if (isLoginRoute) {
        // Let them see login page
        return NextResponse.next();
    }

    // Redirect to login and remember where they wanted to go
    const loginUrl = new URL("/aur/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
}

// Limit middleware to admin paths
export const config = {
    matcher: ["/aur/admin/:path*"],
};
