import { NextRequest, NextResponse } from "next/server";
import getServerSession from "./lib/auth/server-session";
import { Role } from "./lib/enum"; // Your enum should be something like: enum Role { admin = "admin", seeker = "seeker", lister = "lister", agency = "agency" }

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await getServerSession();
  const roleKey = session?.user.role as keyof typeof Role;
  const rolePath = Role[roleKey];

  const publicRoutes = ["/login", "/register", "/forgot-password"];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  const checkRole = /^\/(s|a|m|l)(\/|$)/.test(pathname);

  if (checkRole && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublic && session) {
    return NextResponse.redirect(
      new URL(`/${rolePath}/dashboard`, request.url)
    );
  }

  if (session && checkRole) {
    const pathRole = pathname.split("/")[1];
    if (pathRole !== rolePath) {
      return NextResponse.redirect(
        new URL(`/${rolePath}/dashboard`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all relevant paths except static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
