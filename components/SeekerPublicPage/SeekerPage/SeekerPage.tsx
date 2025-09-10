import Faqs from "@/components/LandingPage/Faqs/Faqs";
import FavoriteListing from "@/components/LandingPage/FavoriteListing/FavoriteListing";
import FeaturedListings from "@/components/LandingPage/FetauredListings/FeaturedListings";
import HeroSection from "@/components/LandingPage/HeroSection/HeroSection";
import HowItWorks from "@/components/LandingPage/HowItWorks/HowItWorks";

const SeekerPage = () => {
  return (
    <section className="space-y-10">
      <HeroSection />
      <FavoriteListing />
      <FeaturedListings />
      <HowItWorks />
      <Faqs />
    </section>
  );
};

export default SeekerPage;
