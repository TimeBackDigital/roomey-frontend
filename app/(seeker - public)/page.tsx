import Faqs from "@/components/LandingPage/Faqs/Faqs";
import FeaturedListings from "@/components/LandingPage/FetauredListings/FeaturedListings";
import HeroSection from "@/components/LandingPage/HeroSection/HeroSection";
import HowItWorks from "@/components/LandingPage/HowItWorks/HowItWorks";

const page = () => {
  return (
    <section className="space-y-10">
      <HeroSection />
      <FeaturedListings />
      <HowItWorks />
      <Faqs />
    </section>
  );
};

export default page;
