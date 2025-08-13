import { ROLE_SLUG } from "./enum";

export type RoleKey = keyof typeof ROLE_SLUG;

export type Rule = { when: boolean; to: () => string };

export type SignInError = {
  error: {
    code: string;
    message: string;
  };
};

export type CaptchaApi = {
  getFreshToken: () => Promise<string>;
  reset: () => void;
  clear: () => void;
};

export type AuthFormType = "login" | "register";
