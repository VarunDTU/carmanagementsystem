import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
export async function middleware(request) {
  const token = await getToken({ req: request });

  if (
    !token &&
    !(
      request.nextUrl.pathname.startsWith("/api/auth/signin") ||
      request.nextUrl.pathname.startsWith("/signup")
    )
  ) {
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }
}

export const config = {
  matcher: ["/products", "/product/:path"],
};
