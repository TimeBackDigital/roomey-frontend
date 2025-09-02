"use client";

import { useUser } from "@/components/Providers/AuthProvider";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  authenticationAction.authenticated(user as BetterUser);

  return <div className="relative">{children}</div>;
};

export default AuthLayout;
