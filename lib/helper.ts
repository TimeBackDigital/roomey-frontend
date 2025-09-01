import { redirect } from "next/navigation";
import { PUBLIC_ROUTES, ROLE_PREFIX } from "./constant";
import { BetterUser } from "./type";

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
  authenticated: (user: BetterUser) => {
    if (!user) return "/auth";

    if (!user.phoneNumberVerified) {
      throw redirect("/otp-verification");
    }

    if (!user.user_is_onboarded) {
      throw redirect("/onboarding");
    }

    const path =
      user.role === "seeker"
        ? "/dashboard"
        : `/${getRoleSlug(user.role)}/dashboard`;

    throw redirect(path);
  },
  onBoarding: (user: BetterUser) => {
    if (!user || !user.role) {
      redirect("/");
    }

    if (user.user_is_onboarded) {
      const path =
        user.role === "seeker"
          ? "/dashboard"
          : `/${getRoleSlug(user.role)}/dashboard`;

      throw redirect(path);
    }
  },
};

export const formatErrorMessage = (error: string) => {
  return error.replaceAll("_", " ");
};

export const capitalizeFirstLetters = (text: string) => {
  return text
    .replaceAll("_", " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
