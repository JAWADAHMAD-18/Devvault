import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
//jis route par chalna hy
export const config = {
  matcher: ["/notes/:path*"],
};