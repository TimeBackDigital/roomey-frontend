"use client";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import { useUser } from "@/components/Providers/AuthProvider";
import { ExtractFirstLetterRole } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (!user) {
    return redirect("/auth");
  }

  if (user?.user_is_onboarded) {
    return redirect(
      `${ExtractFirstLetterRole(user?.role as string)}/dashboard`
    );
  }

  return (
    <>
      <OnboardingNavigation />
      <section className="container bg-background-secondary">
        <ErrorBoundary>{children}</ErrorBoundary>
      </section>
    </>
  );
};

export default OnboardingLayout;
