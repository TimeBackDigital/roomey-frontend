import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getServerSession from "./lib/auth/server-session";
import { ONBOARDING_ROUTE, OTP_ROUTE } from "./lib/constant";
import { getRoleSlug, isPublicPath, isRolePath, urlOf } from "./lib/helper";
import { Rule } from "./lib/type";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const session = await getServerSession();

  const ctx = {
    pathname,
    origin,
    isAuthed: Boolean(session),
    roleSlug: getRoleSlug(session?.user?.role as string | undefined) || "",
    isOnboarded: Boolean(session?.user?.user_is_onboarded),
    isPhoneVerified: Boolean(session?.user?.phoneNumberVerified),
    firstSeg: pathname.split("/")[1] ?? "",
    atRoot: pathname === "/",
    atOtp: OTP_ROUTE.includes(pathname),
    atOnboarding: pathname.startsWith(ONBOARDING_ROUTE),
    publicPath: isPublicPath(pathname),
    roleScoped: isRolePath(pathname),
  };

  const redirectTo = (path: string) =>
    NextResponse.redirect(urlOf(origin, path));

  const rules: Rule[] = [
    {
      when: ctx.atRoot,
      to: () =>
        ctx.isAuthed && ctx.roleSlug ? `/${ctx.roleSlug}/dashboard` : "/auth",
    },
    {
      when: ctx.isAuthed && !ctx.isPhoneVerified && !ctx.atOtp,
      to: () => OTP_ROUTE[0],
    },
    {
      when:
        ctx.isAuthed &&
        ctx.isPhoneVerified &&
        !ctx.isOnboarded &&
        !ctx.atOnboarding,
      to: () => ONBOARDING_ROUTE,
    },
    {
      when:
        ctx.isAuthed && ctx.isOnboarded && ctx.atOnboarding && !!ctx.roleSlug,
      to: () => `/${ctx.roleSlug}/dashboard`,
    },
    {
      when: ctx.publicPath && ctx.isAuthed && !!ctx.roleSlug,
      to: () => `/${ctx.roleSlug}/dashboard`,
    },
    { when: ctx.roleScoped && !ctx.isAuthed, to: () => "/auth" },
    {
      when:
        ctx.isAuthed &&
        !!ctx.roleSlug &&
        ctx.roleScoped &&
        ctx.firstSeg !== ctx.roleSlug,
      to: () => `/${ctx.roleSlug}/dashboard`,
    },
  ];

  const match = rules.find((r) => r.when);
  if (match) {
    const target = match.to();
    if (pathname !== target) return redirectTo(target);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
