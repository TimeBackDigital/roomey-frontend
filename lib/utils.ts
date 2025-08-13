import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ROLE_SLUG } from "./enum";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ExtractFirstLetterRole = (role: string) => {
  return role.charAt(0);
};

export const MaskPhoneNumberMiddle = (phoneNumber: string) => {
  return phoneNumber.replace(/\d/g, "*");
};

export const getRoleSegment = (role: unknown): string | undefined => {
  if (typeof role === "string") return role;
  if (role) return ROLE_SLUG[role as keyof typeof ROLE_SLUG];
  return undefined;
};
