import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Shield, Users } from "lucide-react";
import slider1 from "@/assets/slider-1-inspection-center.jpg";
import slider2 from "@/assets/slider-2-mobile-unit.jpg";
import slider3 from "@/assets/slider-3-road-safety.jpg";

const slides = [
  {
    image: slider1,
    title: "SICTA, Filiale de Mayelia Participations",
    subtitle: "Excellence en contrôle technique automobile",
    description: "28 agences permanentes et 22 stations temporaires à votre service pour garantir votre sécurité routière en Côte d'Ivoire.",
    cta: "Réserver un contrôle",
    stats: [
      { icon: Shield, value: "28", label: "Agences permanentes" },
      { icon: Users, value: "1500+", label: "Véhicules contrôlés/jour" }
    ]
  },
  {
    image: slider2,
    title: "Innovation & Mobilité",
    subtitle: "Solutions techniques avancées",
    description: "Nos unités mobiles et stations permanentes offrent un service de contrôle technique moderne et conforme aux standards internationaux.",
    cta: "Trouver une agence",
    stats: [
      { icon: MapPin, value: "22", label: "Stations temporaires" },
      { icon: Shield, value: "123", label: "Points de contrôle" }
    ]
  },
  {
    image: slider3,
    title: "Sécurité Routière Garantie",
    subtitle: "Votre partenaire de confiance depuis 1974",
    description: "Leader du contrôle technique en Afrique de l'Ouest, certifié ISO 9001:2015, au service de la sécurité routière ivoirienne.",
    cta: "En savoir plus",
    stats: [
      { icon: Calendar, value: "50+", label: "Années d'expérience" },
      { icon: Shield, value: "100%", label: "Conformité réglementaire" }
    ]
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-2xl text-white">
                <div className="animate-fade-in-up">
                  <div className="inline-flex items-center space-x-2 bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 lg:mb-6">
                    <Shield className="h-4 w-4" />
                    <span>Contrôle technique agréé</span>
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-7xl font-bold leading-tight mb-4 lg:mb-6">
                    {slide.title}
                  </h1>
                  
                  <h2 className="text-lg sm:text-xl lg:text-3xl font-light text-orange-300 mb-6 lg:mb-8">
                    {slide.subtitle}
                  </h2>
                  
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 lg:mb-10 text-gray-100">
                    {slide.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex lg:flex-wrap lg:gap-8 mb-8 lg:mb-10">
                    {slide.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center space-x-3">
                        <div className="h-10 w-10 lg:h-12 lg:w-12 bg-primary/20 backdrop-blur rounded-full flex items-center justify-center">
                          <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-orange-300" />
                        </div>
                        <div>
                          <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                          <div className="text-xs lg:text-sm text-gray-300">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button className="btn-hero text-base lg:text-lg px-6 lg:px-10 py-3 lg:py-6 text-white bg-primary hover:bg-primary/90">
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-primary" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;