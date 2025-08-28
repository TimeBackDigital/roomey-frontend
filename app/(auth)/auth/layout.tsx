"use client";

import { useUser } from "@/components/Providers/AuthProvider";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (user) {
    return redirect("/");
  }

  return <div className="relative">{children}</div>;
};

export default AuthLayout;
