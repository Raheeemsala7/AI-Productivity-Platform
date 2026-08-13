import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedPaths = ["/admin", "/dashboard", "/profile", "/account"];
const authRoutes = ["/auth/login", "/auth/register"];

function getLocaleFromPathname(pathname: string) {
  const segment = pathname.split("/")[1];
  if (routing.locales.includes(segment as (typeof routing.locales)[number])) {
    return segment;
  }
  return routing.defaultLocale;
}

function getPathnameWithoutLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (
    segments.length > 0 &&
    routing.locales.includes(segments[0] as (typeof routing.locales)[number])
  ) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

export default async function proxy(req: NextRequest) {
  const response = handleI18nRouting(req);

  if (response.status >= 300 && response.status < 400) {
    return response;
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
  const locale = getLocaleFromPathname(pathname);
  const url = req.nextUrl.clone();

  const isAuthRoute = authRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );
  if (token && isAuthRoute) {
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  const isProtectedPath = protectedPaths.some((path) =>
    pathnameWithoutLocale.startsWith(path),
  );
  if (isProtectedPath && !token) {
    url.pathname = `/${locale}/auth/login`;
    url.searchParams.set("redirect", pathnameWithoutLocale);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
