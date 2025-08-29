"use client";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import { useUser } from "@/components/Providers/AuthProvider";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();

  authenticationAction.authenticated(user as BetterUser);

  return (
    <>
      <OnboardingNavigation />
      <div className=" bg-primary h-14 flex items-center justify-center relative">
        <div className="flex items-center gap-2">
          <div onClick={() => router.back()} className="absolute left-4">
            <ArrowLeft className="size-4 text-white" />
          </div>
          <div className="text-white text-lg font-medium">Create Profile</div>
        </div>
      </div>
      <section className="container bg-background-secondary">
        <ErrorBoundary>{children}</ErrorBoundary>
      </section>
    </>
  );
};

export default OnboardingLayout;
