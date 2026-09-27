import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function addSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'",
  );
  return response;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token || token.role !== "admin") {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("callbackUrl", `${path}${request.nextUrl.search}`);
      return addSecurityHeaders(NextResponse.redirect(login));
    }
  }

  const response = addSecurityHeaders(NextResponse.next());
  if (path.startsWith("/_next/static/") || /\.(?:jpg|jpeg|png|gif|webp|svg|woff2)$/.test(path)) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (!path.startsWith("/api/") && (path === "/" || /^\/(features|pricing|blog)(\/|$)/.test(path))) {
    response.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  } else if (path.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-store");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
