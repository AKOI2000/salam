import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";

export async function proxy(request) {
  const token = request.cookies.get("admin_session")?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};