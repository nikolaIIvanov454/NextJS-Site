import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.match("^\/admin\/?(.*)$") &&
      req.nextauth.token.role !== "admin"
    ) {
      return NextResponse.json({ message: "Не сте ауторизиран!" });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {  
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/home/:path*", "/admin/:path*"] };
