import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "puntocero.dev";

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const url = request.nextUrl.clone();

  // Extract subdomain: maps.puntocero.dev → "maps"
  // For localhost: maps.localhost:3000 → "maps"
  let subdomain: string | null = null;

  if (hostname.includes(ROOT_DOMAIN)) {
    const parts = hostname.replace(`.${ROOT_DOMAIN}`, "").split(".");
    if (parts.length > 0 && parts[0] !== ROOT_DOMAIN && parts[0] !== "www") {
      subdomain = parts[0];
    }
  } else if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    if (parts.length > 1 && parts[0] !== "localhost") {
      subdomain = parts[0];
    }
  }

  // If a subdomain is detected, rewrite to /showcase/[subdomain]
  if (subdomain) {
    url.pathname = `/showcase/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("x-subdomain", subdomain);
    return response;
  }

  // For main domain, handle Supabase session refresh
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
