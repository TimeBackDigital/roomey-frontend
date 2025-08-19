import { PUBLIC_ROUTES, ROLE_PREFIX } from "./constant";

export function isPublicPath(pathname: string): boolean {
  return Array.from(PUBLIC_ROUTES).some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
}

export const isRolePath = (pathname: string) => {
  return ROLE_PREFIX.test(pathname);
};

export const urlOf = (origin: string, path: string) => {
  return new URL(path, origin);
};

export const getRoleSlug = (role: string | undefined): string => {
  if (!role) return "";

  const roleMap: Record<string, string> = {
    agency: "a",
    lister: "l",
    admin: "g",
    seeker: "", // No slug for seekers
  };

  return roleMap[role] || "";
};

export const authenticationAction = {
  authenticated: (role: string) => {
    if (role === "admin") {
      return "/admin";
    }
    return `/${getRoleSlug(role)}/dashboard`;
  },

  isPhoneNotVerified: (isPhoneNotVerified: boolean) => {
    if (isPhoneNotVerified) {
      return "/otp-verification";
    }
    return "/onboarding";
  },

  isOnboarded: (isOnboarded: boolean, role: string | undefined) => {
    if (isOnboarded) {
      return `/${getRoleSlug(role)}/dashboard`;
    }
    return "/onboarding";
  },
};
