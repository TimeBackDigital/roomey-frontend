export const Role = {
  admin: "s",
  agency: "a",
  seeker: "m",
  lister: "l",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
