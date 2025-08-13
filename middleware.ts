import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getServerSession from "./lib/auth/server-session";
import { ONBOARDING_ROUTE, OTP_ROUTE } from "./lib/constant";
import { getRoleSlug, isPublicPath, isRolePath, urlOf } from "./lib/helper";
import { Rule } from "./lib/type";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const session = await getServerSession();
  const roleSlug = getRoleSlug(session?.user?.role as string | undefined) || "";
  const isAuthed = Boolean(session);
  const isOnboarded = Boolean(session?.user?.user_is_onboarded);
  const isPhoneVerified = Boolean(session?.user?.phoneNumberVerified);

  const redirectTo = (path: string) =>
    NextResponse.redirect(urlOf(origin, path));
  const firstSeg = pathname.split("/")[1] ?? "";
  const atRoot = pathname === "/";
  const atOtp = OTP_ROUTE.includes(pathname);
  const atOnboarding = pathname.startsWith(ONBOARDING_ROUTE);
  const publicPath = isPublicPath(pathname);
  const roleScoped = isRolePath(pathname);

  const rules: Rule[] = [
    {
      when: atRoot,
      to: () => (isAuthed && roleSlug ? `/${roleSlug}/dashboard` : "/login"),
    },
    { when: isAuthed && !isPhoneVerified && !atOtp, to: () => OTP_ROUTE[0] },
    {
      when: isAuthed && isPhoneVerified && !isOnboarded && !atOnboarding,
      to: () => ONBOARDING_ROUTE,
    },
    {
      when: isAuthed && isOnboarded && atOnboarding && !!roleSlug,
      to: () => `/${roleSlug}/dashboard`,
    },
    {
      when: publicPath && isAuthed && !!roleSlug,
      to: () => `/${roleSlug}/dashboard`,
    },
    { when: roleScoped && !isAuthed, to: () => "/login" },
    {
      when: isAuthed && !!roleSlug && roleScoped && firstSeg !== roleSlug,
      to: () => `/${roleSlug}/dashboard`,
    },
  ];

  const match = rules.find((r) => r.when);
  if (match) return redirectTo(match.to());
  return NextResponse.next();
}

export const config = {
  matcher: [
    // everything except next static assets, image optimizer, common static files, and API routes
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
