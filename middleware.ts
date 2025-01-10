import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "@/auth.config";

const { auth: middleware } = NextAuth(authConfig);

const privateRoutes = ["/dashboard/profile", "/api/auth/[...nextauth]"];

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/api|trpc)(.*)"],
};

export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoged = !!auth?.user;

  if (privateRoutes.includes(nextUrl.pathname) && !isLoged) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  }

  return NextResponse.next();
});
