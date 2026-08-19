// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request) {
  // TODO: replace with real auth before launch
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};