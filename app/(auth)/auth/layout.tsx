import getServerSession from "@/lib/auth/server-session";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerSession();

  authenticationAction.unauthenticated(user?.user as BetterUser);

  return <div className="relative">{children}</div>;
};

export default AuthLayout;
