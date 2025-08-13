import { PUBLIC_ROUTES, ROLE_PREFIX } from "./constant";
import { ROLE_SLUG } from "./enum";
import { RoleKey } from "./type";

export const isPublicPath = (pathname: string) => {
  for (const base of PUBLIC_ROUTES) if (pathname.startsWith(base)) return true;
  return false;
};
export const isRolePath = (pathname: string) => {
  return ROLE_PREFIX.test(pathname);
};
export const urlOf = (origin: string, path: string) => {
  return new URL(path, origin);
};
export const getRoleSlug = (role?: string) => {
  return role ? ROLE_SLUG[role as RoleKey] : undefined;
};
