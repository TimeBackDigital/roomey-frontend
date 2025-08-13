"use client";

import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import { useSessionQuery } from "@/hooks/getUserHook";
import { redirect } from "next/navigation";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useSessionQuery();

  if (!user?.user?.user_is_onboarded) {
    return redirect("/auth");
  }

  return (
    <>
      <OnboardingNavigation />
      <section className="container">{children}</section>
    </>
  );
};

export default OnboardingLayout;
