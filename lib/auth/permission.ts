import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

export const statement = {
  ...defaultStatements,
  project: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  project: ["create", "update"],
  ...adminAc.statements,
});

export const agency = ac.newRole({
  project: ["create", "update", "delete"],
});

export const seeker = ac.newRole({
  project: ["create", "update", "delete"],
});

export const lister = ac.newRole({
  project: ["create", "update", "delete"],
});
