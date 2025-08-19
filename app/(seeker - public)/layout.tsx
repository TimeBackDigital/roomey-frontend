"use client";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import { useUser } from "@/components/Providers/AuthProvider";
import { getRoleSlug } from "@/lib/helper";
import { redirect } from "next/navigation";

const SeekerPublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (user?.role !== "seeker") {
    return redirect(getRoleSlug(user?.role) + "/dashboard");
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
