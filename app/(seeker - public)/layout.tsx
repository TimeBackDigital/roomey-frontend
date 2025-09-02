"use client";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";

const SeekerPublicLayout = ({ children }: { children: React.ReactNode }) => {
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
