import HeroSlider from "@/components/HeroSlider";
import AboutSictaSection from "@/components/AboutSictaSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialSection from "@/components/TestimonialSection";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="w-full">
        <HeroSlider />
        <AboutSictaSection />
        <ServicesSection />
        <TestimonialSection />
      </div>
    </PageTransition>
  );
};

export default Index;
