"use client";
import Footer from "@/components/LandingPage/Footer/Footer";
import BottomNav from "@/components/LandingPage/Navigation/Navigation";
import { LoginRequiredModal } from "@/components/Modal/AuthModal";
import OnboardingNavigation from "@/components/Navigation/OnboardingNavigation/OnboardingNavigation";
import SplashScreen from "@/components/ui/splash-screen";

const SeekerPublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SplashScreen />
      <OnboardingNavigation />
      <section className="container z-50">{children}</section>
      <Footer />
      <BottomNav />
      <LoginRequiredModal />
    </>
  );
};

export default SeekerPublicLayout;
