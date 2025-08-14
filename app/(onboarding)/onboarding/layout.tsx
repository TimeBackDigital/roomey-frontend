"use client";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import { useSessionQuery } from "@/hooks/getUserHook";
import { ExtractFirstLetterRole } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useSessionQuery();

  if (!user) {
    return redirect("/auth");
  }

  if (user?.user?.user_is_onboarded) {
    return redirect(
      `${ExtractFirstLetterRole(user?.user?.role as string)}/auth`
    );
  }

  return (
    <>
      <OnboardingNavigation />
      <section className="container bg-background-secondary">
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <h2 className="text-logo">roomey.</h2>
        </div>
        <ErrorBoundary>{children}</ErrorBoundary>
      </section>
    </>
  );
};

export default OnboardingLayout;
