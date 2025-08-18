import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getServerSession from "./lib/auth/server-session";

// Constants
const OTP_ROUTE = ["/otp-verification"];
const ONBOARDING_ROUTE = "/onboarding";
const AUTH_ROUTE = "/auth";
const PUBLIC_PATHS = ["/", "/auth", "/login", "/register", "/forgot-password"];

const getRoleSlug = (role: string | undefined): string => {
  const roleMap: Record<string, string> = {
    admin: "g",
    agency: "a",
    lister: "l",
    seeker: "",
  };
  return roleMap[role || ""] || "";
};

const isPublicPath = (pathname: string): boolean => {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
};

const urlOf = (origin: string, path: string): URL => {
  return new URL(path, origin);
};

interface Rule {
  name: string;
  when: boolean;
  to: () => string;
}

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const session = await getServerSession();

  if (process.env.NODE_ENV === "development") {
    console.log("Middleware:", { pathname, isAuthed: !!session });
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0] ?? "";

  const ctx = {
    pathname,
    origin,
    isAuthed: Boolean(session),
    userRole: session?.user?.role as string | undefined,
    roleSlug: getRoleSlug(session?.user?.role as string | undefined),
    isOnboarded: Boolean(session?.user?.user_is_onboarded),
    isPhoneVerified: Boolean(session?.user?.phoneNumberVerified),
    firstSegment,
    atRoot: pathname === "/",
    atOtp: OTP_ROUTE.includes(pathname),
    atOnboarding: pathname.startsWith(ONBOARDING_ROUTE),
    atAuth: pathname.startsWith(AUTH_ROUTE),
    publicPath: isPublicPath(pathname),
    atAgencyPath: firstSegment === "a",
    atListerPath: firstSegment === "l",
    atAdminPath: firstSegment === "g",
    isRoleProtectedPath: ["a", "l", "g"].includes(firstSegment),
    isSeeker: session?.user?.role === "seeker",
  };

  const redirectTo = (path: string) => {
    NextResponse.redirect(urlOf(origin, path));
  };

  const rules: Rule[] = [
    {
      name: "auth-required-for-protected-routes",
      when: ctx.isRoleProtectedPath && !ctx.isAuthed,
      to: () => AUTH_ROUTE,
    },
    {
      name: "already-authenticated",
      when:
        ctx.isAuthed && ctx.atAuth && ctx.isPhoneVerified && ctx.isOnboarded,
      to: () => {
        // Seekers stay on public pages, others go to dashboard
        if (ctx.isSeeker) {
          return "/";
        }
        return `/${ctx.roleSlug}/dashboard`;
      },
    },
    {
      name: "phone-verification-required",
      when:
        ctx.isAuthed &&
        !ctx.isPhoneVerified &&
        !ctx.atOtp &&
        !ctx.atAuth &&
        !ctx.publicPath,
      to: () => OTP_ROUTE[0],
    },
    {
      name: "onboarding-required",
      when:
        ctx.isAuthed &&
        !ctx.isSeeker &&
        ctx.isPhoneVerified &&
        !ctx.isOnboarded &&
        !ctx.atOnboarding &&
        !ctx.atAuth,
      to: () => ONBOARDING_ROUTE,
    },
    {
      name: "onboarding-already-complete",
      when:
        ctx.isAuthed && ctx.isOnboarded && ctx.atOnboarding && !ctx.isSeeker, // Only redirect non-seekers
      to: () => `/${ctx.roleSlug}/dashboard`,
    },
    {
      name: "root-redirect-authenticated",
      when:
        ctx.atRoot &&
        ctx.isAuthed &&
        ctx.isPhoneVerified &&
        ctx.isOnboarded &&
        !ctx.isSeeker,
      to: () => `/${ctx.roleSlug}/dashboard`,
    },
    {
      name: "agency-role-protection",
      when: ctx.atAgencyPath && ctx.isAuthed && ctx.userRole !== "agency",
      to: () => {
        if (ctx.isSeeker) {
          return "/";
        }
        return `/${ctx.roleSlug}/dashboard`;
      },
    },
    {
      name: "lister-role-protection",
      when: ctx.atListerPath && ctx.isAuthed && ctx.userRole !== "lister",
      to: () => {
        if (ctx.isSeeker) {
          return "/";
        }
        return `/${ctx.roleSlug}/dashboard`;
      },
    },
    {
      name: "admin-role-protection",
      when: ctx.atAdminPath && ctx.isAuthed && ctx.userRole !== "admin",
      to: () => {
        if (ctx.isSeeker) {
          return "/";
        }
        return `/${ctx.roleSlug}/dashboard`;
      },
    },
  ];

  const matchingRule = rules.find((rule) => rule.when);

  if (matchingRule) {
    const targetPath = matchingRule.to();

    if (pathname !== targetPath) {
      return redirectTo(targetPath);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
