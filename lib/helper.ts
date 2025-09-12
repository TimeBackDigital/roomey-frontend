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
    if (!user) redirect("/auth");

    if (!user.phoneNumberVerified) {
      return redirect("/otp-verification");
    }

    if (!user.user_is_onboarded) {
      return redirect("/onboarding");
    }

    if (user.role === "seeker") {
      return redirect("/");
    }

    return redirect(`/${getRoleSlug(user.role)}/dashboard`);
  },
  unauthenticated: (user: BetterUser) => {
    if (!user) {
      return null;
    }

    if (!user.phoneNumberVerified) {
      redirect("/otp-verification");
    }

    if (!user.user_is_onboarded) {
      redirect("/onboarding");
    }

    if (user.role === "seeker") {
      redirect("/");
    }

    redirect(`/${getRoleSlug(user.role)}/dashboard`);
  },
  checkOnboardingAccess: (user: BetterUser | null) => {
    if (!user) {
      redirect("/auth");
    }

    if (!user.phoneNumberVerified) {
      redirect("/otp-verification");
    }

    if (user.user_is_onboarded && user.role !== "seeker") {
      redirect(`/${getRoleSlug(user.role)}/dashboard`);
    }

    if (user.user_is_onboarded && user.role === "seeker") {
      redirect("/");
    }

    return true; // User can access onboarding
  },
  completedOnboarding: (user: BetterUser) => {
    if (!user) {
      redirect("/auth");
    }

    if (!user.user_is_onboarded) {
      redirect("/onboarding");
    }

    return true;
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
