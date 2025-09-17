import { User } from "better-auth";
import { ROLE_SLUG } from "./enum";

export type RoleKey = keyof typeof ROLE_SLUG;

export type Rule = { name: string; when: boolean; to: () => string };

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

export type AuthFormType = "login" | "register" | null;

export type OnboardingStep = {
  id: string;
  title: string;
  description?: string;
  fields?: {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "file" | "checkbox" | "select";
    required?: boolean;
    placeholder?: string;
    options?: string[];
  }[];
  actions?: {
    label: string;
    type: "next" | "submit" | "skip";
  }[];
};

export type OnboardingSchema = {
  role: RoleKey;
  steps: OnboardingStep[];
};

export type FieldOption = {
  label: string;
  value: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  title?: string;
  description?: string;
  isRow?: boolean;
  required?: boolean;
  hidden?: boolean;
  type?:
    | "text"
    | "email"
    | "password"
    | "checkbox"
    | "textarea"
    | "number"
    | "date"
    | "file"
    | "select"
    | "profile_photo"
    | "checkbox_agreement"
    | "radio group"
    | "multi file";
  options?: FieldOption[];
};

export type DefaultStrategy = "empty" | "firstOption";

export type UserListType = {
  id: string;
  user_name: string;
  user_email: string;
  user_role: string;
  user_status: string;
  user_is_active: string;
  user_created_at: Date;
  user_updated_at: Date;
  user_last_login_at: Date;
  user_ban_expires: Date;
};

export type BetterUser = User & {
  user_is_onboarded: boolean;
  role: string;
  phoneNumberVerified: boolean;
  phoneNumber: string;
};

export type PlanList = {
  plan_id: string;
  plan_name: string;
  plan_price_id: string;
  plan_created_at: Date;
  plan_updated_at: Date;
  plan_photo: string;
  plan_description: string;
  plan_role_available: string;
  plan_is_active: boolean;
  plan_type: string;
  plan_limit: JSON;
};

export type UploadedImage = { url: string; public_id: string } | null;
