import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getServerSession from "./lib/auth/server-session";
import { ONBOARDING_ROUTE, OTP_ROUTE } from "./lib/constant";
import { getRoleSlug, isPublicPath, urlOf } from "./lib/helper";
import { Rule } from "./lib/type";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const session = await getServerSession();

  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSeg = pathSegments[0] ?? "";

  const ctx = {
    pathname,
    origin,
    isAuthed: Boolean(session),
    userRole: session?.user?.role as string | undefined,
    roleSlug: getRoleSlug(session?.user?.role as string | undefined) || "",
    isOnboarded: Boolean(session?.user?.user_is_onboarded),
    isPhoneVerified: Boolean(session?.user?.phoneNumberVerified),
    firstSeg,
    atRoot: pathname === "/",
    atOtp: OTP_ROUTE.includes(pathname),
    atOnboarding: pathname.startsWith(ONBOARDING_ROUTE),
    publicPath: isPublicPath(pathname),
    atAgencyPath: pathname.startsWith("/a"),
    atListerPath: pathname.startsWith("/l"),
    atAdminPath: pathname.startsWith("/g"),
    isRoleProtectedPath:
      pathname.startsWith("/a") ||
      pathname.startsWith("/l") ||
      pathname.startsWith("/g"),
  };

  const redirectTo = (path: string) =>
    NextResponse.redirect(urlOf(origin, path));

  const rules: Rule[] = [
    {
      name: "root-redirect",
      when: ctx.atRoot && ctx.isAuthed && ctx.userRole !== "seeker",
      to: () => `/${ctx.roleSlug}/dashboard`,
    },

    {
      name: "phone-verification",
      when:
        ctx.isAuthed && !ctx.isPhoneVerified && !ctx.atOtp && !ctx.publicPath,
      to: () => OTP_ROUTE[0],
    },

    {
      name: "onboarding-required",
      when:
        ctx.isAuthed &&
        ctx.isPhoneVerified &&
        !ctx.isOnboarded &&
        !ctx.atOnboarding,
      to: () => ONBOARDING_ROUTE,
    },

    {
      name: "onboarding-complete",
      when: ctx.isAuthed && ctx.isOnboarded && ctx.atOnboarding,
      to: () => `/${ctx.roleSlug}/dashboard`,
    },

    {
      name: "role-routes-auth-required",
      when: ctx.isRoleProtectedPath && !ctx.isAuthed,
      to: () => "/auth",
    },
    {
      name: "agency-path-protection",
      when: ctx.atAgencyPath && ctx.isAuthed && ctx.userRole !== "agency",
      to: () =>
        ctx.userRole === "seeker" ? "/" : `/${ctx.roleSlug}/dashboard`,
    },

    {
      name: "lister-path-protection",
      when: ctx.atListerPath && ctx.isAuthed && ctx.userRole !== "lister",
      to: () =>
        ctx.userRole === "seeker" ? "/" : `/${ctx.roleSlug}/dashboard`,
    },

    {
      name: "admin-path-protection",
      when: ctx.atAdminPath && ctx.isAuthed && ctx.userRole !== "admin",
      to: () =>
        ctx.userRole === "seeker" ? "/" : `/${ctx.roleSlug}/dashboard`,
    },

    {
      name: "public-to-dashboard",
      when:
        ctx.publicPath &&
        ctx.isAuthed &&
        ctx.userRole !== "seeker" &&
        !ctx.atOtp &&
        !ctx.atOnboarding &&
        !pathname.startsWith("/auth"),
      to: () => `/${ctx.roleSlug}/dashboard`,
    },
  ];

  const match = rules.find((r) => r.when);
  if (match) {
    const target = match.to();
    if (pathname !== target) {
      if (process.env.NODE_ENV === "development") {
        console.log(`Applying rule: ${match.name}`, {
          from: pathname,
          to: target,
        });
      }
      return redirectTo(target);
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
