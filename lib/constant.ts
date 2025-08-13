export const providers = (
  handleSignInSocial: (type: "google" | "apple") => void
) => [
  {
    name: "Google",
    icon: null,
    onClick: () => handleSignInSocial("google"),
  },
  {
    name: "Apple",
    icon: null,
    onClick: () => handleSignInSocial("apple"),
  },
];

export const PUBLIC_ROUTES = new Set(["/auth"]);
export const ONBOARDING_ROUTE = "/onboarding";
export const OTP_ROUTE = ["/otp-verification", "/email-verification"];
export const ROLE_PREFIX = /^\/(a|s|m|l)(\/|$)/;
