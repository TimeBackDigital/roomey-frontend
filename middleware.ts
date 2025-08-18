import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getServerSession from "./lib/auth/server-session";

// Constants
const OTP_ROUTE = ["/otp-verification"];
const ONBOARDING_ROUTE = "/onboarding";
const AUTH_ROUTE = "/auth";
const PUBLIC_PATHS = ["/", "/auth", "/login", "/register", "/forgot-password"];

// Helper functions
const getRoleSlug = (role: string | undefined): string => {
  const roleMap: Record<string, string> = {
    admin: "g",
    agency: "a",
    lister: "l",
    seeker: "s",
  };
  return roleMap[role || ""] || "";
};

const isPublicPath = (pathname: string): boolean => {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
};

const urlOf = (origin: string, path: string): URL => {
  return new URL(path, origin);
};

// Rule type definition
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

  console.log(session);
  // Build context object with all necessary checks
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
  };

  const redirectTo = (path: string) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`Redirecting from ${pathname} to ${path}`);
    }
    return NextResponse.redirect(urlOf(origin, path));
  };

  // Define redirect rules in order of priority
  const rules: Rule[] = [
    // Rule 1: Unauthenticated users trying to access protected routes
    {
      name: "auth-required-for-protected-routes",
      when: ctx.isRoleProtectedPath && !ctx.isAuthed,
      to: () => AUTH_ROUTE,
    },

    // Rule 2: Authenticated users at auth pages should go to dashboard
    {
      name: "already-authenticated",
      when:
        ctx.isAuthed && ctx.atAuth && ctx.isPhoneVerified && ctx.isOnboarded,
      to: () =>
        ctx.userRole === "seeker" ? "/" : `/${ctx.roleSlug}/dashboard`,
    },

    // Rule 3: Phone verification required
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

    // Rule 4: Onboarding required for non-seekers
    {
      name: "onboarding-required",
      when:
        ctx.isAuthed &&
        ctx.userRole !== "seeker" &&
        ctx.isPhoneVerified &&
        !ctx.isOnboarded &&
        !ctx.atOnboarding &&
        !ctx.atAuth,
      to: () => ONBOARDING_ROUTE,
    },

    // Rule 5: Already onboarded users at onboarding page
    {
      name: "onboarding-already-complete",
      when:
        ctx.isAuthed &&
        ctx.isOnboarded &&
        ctx.atOnboarding &&
        ctx.userRole !== "seeker",
      to: () => `/${ctx.roleSlug}/dashboard`,
    },

    // Rule 6: Root redirect for authenticated users
    {
      name: "root-redirect-authenticated",
      when:
        ctx.atRoot &&
        ctx.isAuthed &&
        ctx.isPhoneVerified &&
        ctx.userRole !== "seeker",
      to: () => `/${ctx.roleSlug}/dashboard`,
    },

    // Rule 7: Wrong role accessing agency paths
    {
      name: "agency-role-protection",
      when: ctx.atAgencyPath && ctx.isAuthed && ctx.userRole !== "agency",
      to: () =>
        ctx.userRole === "seeker" ? "/" : `/${ctx.roleSlug}/dashboard`,
    },

    // Rule 8: Wrong role accessing lister paths
    {
      name: "lister-role-protection",
      when: ctx.atListerPath && ctx.isAuthed && ctx.userRole !== "lister",
      to: () =>
        ctx.userRole === "seeker" ? "/" : `/${ctx.roleSlug}/dashboard`,
    },

    // Rule 9: Wrong role accessing admin paths
    {
      name: "admin-role-protection",
      when: ctx.atAdminPath && ctx.isAuthed && ctx.userRole !== "admin",
      to: () =>
        ctx.userRole === "seeker" ? "/" : `/${ctx.roleSlug}/dashboard`,
    },
  ];

  // Find the first matching rule
  const matchingRule = rules.find((rule) => rule.when);

  if (matchingRule) {
    const targetPath = matchingRule.to();

    // Prevent redirect loops
    if (pathname !== targetPath) {
      if (process.env.NODE_ENV === "development") {
        console.log(`Applying rule: ${matchingRule.name}`, {
          from: pathname,
          to: targetPath,
          context: {
            isAuthed: ctx.isAuthed,
            userRole: ctx.userRole,
            isPhoneVerified: ctx.isPhoneVerified,
            isOnboarded: ctx.isOnboarded,
          },
        });
      }
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
