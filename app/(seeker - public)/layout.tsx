"use client";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import { useUser } from "@/components/Providers/AuthProvider";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";
import { redirect } from "next/navigation";

const SeekerPublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (user?.role !== "seeker") {
    return redirect(authenticationAction.authenticated(user as BetterUser));
  }

  return (
    <>
      <OnboardingNavigation />

      <section className="container bg-background-secondary">
        {children}
      </section>
    </>
  );
};

export default SeekerPublicLayout;
