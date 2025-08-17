import { NextResponse } from "next/server";
import { auth } from "./utils/authOptions";

export async function middleware(request) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const isPublic =
    nextUrl.pathname === "/" || nextUrl.pathname.endsWith("/register");

  if (isAuthenticated === false && !isPublic) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(new URL("/message", nextUrl));
  }
}

export const config = { matcher: ["/", "/message", "/message/:path*"] };
