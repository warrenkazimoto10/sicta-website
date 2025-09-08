import HeroSlider from "@/components/HeroSlider";
import AboutSictaSection from "@/components/AboutSictaSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialSection from "@/components/TestimonialSection";

const Index = () => {
  return (
    <div className="w-full">
      <HeroSlider />
      <AboutSictaSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialSection />
    </div>
  );
};

export default Index;
