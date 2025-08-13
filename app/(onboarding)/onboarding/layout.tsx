"use client";

import { useCurrentUser } from "@/hooks/getUserHook";
import { ExtractFirstLetterRole } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useCurrentUser();

  if (!user) {
    return redirect("/login");
  }

  redirect(`/${ExtractFirstLetterRole(user.role as string)}/dashboard`);

  return <div>{children}</div>;
};

export default OnboardingLayout;
