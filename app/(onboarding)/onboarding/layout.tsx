"use client";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import { useUser } from "@/components/Providers/AuthProvider";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  authenticationAction.onBoarding(user as BetterUser);

  return (
    <>
      <OnboardingNavigation />
      <section>
        <ErrorBoundary>{children}</ErrorBoundary>
      </section>
    </>
  );
};

export default OnboardingLayout;
