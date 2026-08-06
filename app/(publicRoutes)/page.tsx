import CategoriesSection from "./_components/categoriesSection";
import CTASection from "./_components/cta";
import FeaturedGearSection from "./_components/featuredGear";
import HeroSection from "./_components/heroSection";
import HowItWorksSection from "./_components/howItWorks";
import WhyChooseUsSection from "./_components/whyChooseUs";


const Homepage = () => {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedGearSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <CTASection />
    </main>
  );
};

export default Homepage;
