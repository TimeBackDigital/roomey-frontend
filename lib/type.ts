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
  /** Get an existing token, or wait for a fresh one */
  getFreshToken: () => Promise<string>;
  /** Force a reset & clear the current token */
  reset: () => void;
  /** Just clear the token (without remounting) */
  clear: () => void;
};
