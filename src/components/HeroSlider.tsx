import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Shield, Users } from "lucide-react";
import slider1 from "@/assets/sicta-van-dealership-orange.png";
import slider2 from "@/assets/sicta-banc-mobile-african.png";
import slider3 from "@/assets/slider-new-3-human.png";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: slider1,
    title: "Le Contrôle à votre Porte",
    subtitle: "Innovation SICTA 2025",
    description: "Nos fourgons d'intervention se déplacent dans les parcs concessionnaires et chez les grands comptes pour un service de proximité sans égal.",
    cta: "Nos Solutions Mobiles",
    stats: [
      { icon: Shield, value: "100%", label: "Couverture Nationale" },
      { icon: Users, value: "Proximité", label: "Service à domicile" }
    ]
  },
  {
    image: slider2,
    title: "Banc Mobile Haute Technologie",
    subtitle: "L'expertise partout en Côte d'Ivoire",
    description: "Nos bancs mobiles de nouvelle génération permettent un contrôle technique complet et certifié ISO 9001:2015, même dans les zones les plus reculées.",
    cta: "Découvrir le Banc Mobile",
    stats: [
      { icon: MapPin, value: "22", label: "Stations temporaires" },
      { icon: Shield, value: "Certifié", label: "ISO 9001:2015" }
    ]
  },
  {
    image: slider3,
    title: "Sécurité Routière Garantie",
    subtitle: "Leader depuis 1974 • Nouvelle ère 2025",
    description: "Certifié ISO 9001:2015, SICTA est le partenaire de confiance pour la sécurité routière en Côte d'Ivoire et en Afrique de l'Ouest.",
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
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-10"
            >
              <div className="absolute inset-0">
                <motion.img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="max-w-2xl text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    >
                      <motion.div
                        className="inline-flex items-center space-x-2 bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 lg:mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Shield className="h-4 w-4 animate-pulse" />
                        <span>Leader sécurité routière • Nouvelle ère 2025</span>
                      </motion.div>

                      <motion.h1
                        className="text-3xl sm:text-4xl lg:text-7xl font-bold leading-tight mb-4 lg:mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      >
                        {slide.title}
                      </motion.h1>

                      <motion.h2
                        className="text-lg sm:text-xl lg:text-3xl font-light mb-6 lg:mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                      >
                        {slide.subtitle === "Filiale de Mayelia Participations" ? (
                          <>
                            <span className="text-cyan-400">Filiale de </span>
                            <span className="text-teal-400">Mayelia Participations</span>
                          </>
                        ) : (
                          <span className="text-orange-300">{slide.subtitle}</span>
                        )}
                      </motion.h2>

                      <motion.p
                        className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 lg:mb-10 text-gray-100"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                      >
                        {slide.description}
                      </motion.p>

                      {/* Stats */}
                      <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:flex lg:flex-wrap lg:gap-8 mb-8 lg:mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                      >
                        {slide.stats.map((stat, statIndex) => (
                          <motion.div
                            key={statIndex}
                            className="flex items-center space-x-3 group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.3 + statIndex * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="h-10 w-10 lg:h-12 lg:w-12 bg-primary/20 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-primary/40 transition-colors duration-300">
                              <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-orange-300" />
                            </div>
                            <div>
                              <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                              <div className="text-xs lg:text-sm text-gray-300">{stat.label}</div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7, duration: 0.6 }}
                      >
                        <Button className="btn-hero text-base lg:text-lg px-6 lg:px-10 py-3 lg:py-6 text-white bg-primary hover:bg-primary/90 cursor-hover">
                          {slide.cta}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-all cursor-hover"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-all cursor-hover"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-hover ${index === currentSlide ? "bg-primary" : "bg-white/40 hover:bg-white/60"
              }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: index === currentSlide ? 1.3 : 1,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;