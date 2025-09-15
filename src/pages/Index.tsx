import { useState, useEffect } from "react";
import HeroSlider from "@/components/HeroSlider";
import AboutSictaSection from "@/components/AboutSictaSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialSection from "@/components/TestimonialSection";
import PageTransition from "@/components/PageTransition";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Vérifier si c'est la première visite
    const hasVisited = localStorage.getItem('sicta-visited');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('sicta-visited', 'true');
    } else {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash && isFirstVisit) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

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
