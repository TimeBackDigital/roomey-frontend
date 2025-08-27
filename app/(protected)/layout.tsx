"use client";

import { useUser } from "@/components/Providers/AuthProvider";
import { getRoleSlug } from "@/lib/helper";
import { redirect } from "next/navigation";
import React from "react";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (!user) {
    return redirect("/auth");
  }

  if (user.role !== "admin") {
    return redirect(getRoleSlug(user.role) + "/dashboard");
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
