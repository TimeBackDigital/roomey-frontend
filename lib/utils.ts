import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
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

export const CheckEmail = (s: string) => /\S+@\S+\.\S+/.test(s);

// Very permissive: digits with optional +, spaces, dashes, parentheses
export const CheckPhone = (s: string) => /^[+]?[\d\s\-().]{7,20}$/.test(s);

export const NormalizePhone = (raw: string) => {
  let d = raw.replace(/[^\d]/g, "");
  if (d.startsWith("0")) d = `63${d.slice(1)}`;
  else if (!d.startsWith("63")) d = `63${d}`;
  return `+${d}`;
};

export const getRoleDashboard = (role: string) => {
  return role === "admin" ? "/admin/dashboard" : `/${role}/dashboard`;
};

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const isValidDate = (date: Date | undefined) => {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
};

export const FormatDateTable = (date: Date | undefined) => {
  return date ? format(date, "dd/MM/yyyy") : "";
};

export const CapitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
