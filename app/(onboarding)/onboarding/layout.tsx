"use client";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import { useUser } from "@/components/Providers/AuthProvider";
import { ExtractFirstLetterRole } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();

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
