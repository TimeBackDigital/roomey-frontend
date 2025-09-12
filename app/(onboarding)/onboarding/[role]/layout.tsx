import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import getServerSession from "@/lib/auth/server-session";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";
import React from "react";

const OnboardingLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getServerSession();

  authenticationAction.checkOnboardingAccess(user?.user as BetterUser);

  return (
    <>
      <OnboardingNavigation />

      <section className="bg-background-secondary">
        <ErrorBoundary>{children}</ErrorBoundary>
      </section>
    </>
  );
};

export default OnboardingLayout;
