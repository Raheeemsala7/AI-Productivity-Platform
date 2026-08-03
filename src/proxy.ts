import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/admin", "/dashboard", "/profile", "/account"];
const authRoutes = ["/auth/login", "/auth/register"];
const adminRoutes = ["/admin"];

export async function proxy(req: NextRequest) {
    const token = await getToken({ 
        req, 
        secret: process.env.NEXTAUTH_SECRET 
    });
    
    const { pathname } = req.nextUrl;
    const url = req.nextUrl.clone();

    // 1️⃣ لو مسجل دخول ومحاولة دخول صفحات auth → ارجع للهوم
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
    if (token && isAuthRoute) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    // 2️⃣ لو مش مسجل دخول ومحاولة دخول صفحات محمية → روح للـ login
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
    if (isProtectedPath && !token) {
        url.pathname = "/auth/login";
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
    }



    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
}