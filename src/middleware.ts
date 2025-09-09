import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("token: ",  req.nextUrl.pathname);
  if ((!token && req.nextUrl.pathname !== '/login') || (req.nextUrl.pathname === '/')) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (token && req.nextUrl.pathname === '/login') {
    const absoluteURL = new URL("/products", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: [
    "/login/mfa",
    "/account",
    "/products",
    "/products/:path*",
    "/products/favorites",
    "/products/checkout",
    "/orders",
    "/help",
    "/login",
    "/"
  ],
};
