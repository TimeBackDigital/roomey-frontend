import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import SplashScreen from "@/components/ui/splash-screen";

const SeekerPublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SplashScreen />
      <OnboardingNavigation />

      <section className="container bg-background-secondary z-50">
        {children}
      </section>
    </>
  );
};

export default SeekerPublicLayout;
