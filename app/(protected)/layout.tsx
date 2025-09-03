import getServerSession from "@/lib/auth/server-session";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";
import React from "react";

const AuthenticatedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getServerSession();

  authenticationAction.authenticated(user?.user as BetterUser);

  return <>{children}</>;
};

export default AuthenticatedLayout;
