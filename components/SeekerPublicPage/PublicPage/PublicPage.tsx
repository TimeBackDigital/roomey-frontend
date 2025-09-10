import CreateMyProfile from "@/components/LandingPage/CreateMyProfile/CreateMyProfile";
import Faqs from "@/components/LandingPage/Faqs/Faqs";
import FeaturedListings from "@/components/LandingPage/FetauredListings/FeaturedListings";
import HeroSection from "@/components/LandingPage/HeroSection/HeroSection";
import HowItWorks from "@/components/LandingPage/HowItWorks/HowItWorks";

const PublicPage = () => {
  return (
    <section className="space-y-10">
      <HeroSection />
      <HowItWorks />
      <CreateMyProfile />
      <FeaturedListings />
      <Faqs />
    </section>
  );
};

export default PublicPage;
