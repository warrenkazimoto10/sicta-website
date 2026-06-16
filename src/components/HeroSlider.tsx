import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Shield, Users } from "lucide-react";
import slider1 from "@/assets/sicta-van-dealership-orange.png";
import slider2 from "@/assets/sicta-banc-mobile-african.png";
import slider3 from "@/assets/slider-new-3-human.png";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchSlides } from "@/services/slideService";

type StatIcon = "Shield" | "Users" | "MapPin" | "Calendar";
const ICON_MAP: Record<StatIcon, typeof Shield> = { Shield, Users, MapPin, Calendar };

interface SlideItem {
  image: string;
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  stats: { icon: typeof Shield; value: string; label: string }[];
}

const HeroSlider = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const staticSlides: SlideItem[] = [
    {
      image: slider1,
      title: t("heroSlider.slide1.title"),
      description: t("heroSlider.slide1.description"),
      cta: t("heroSlider.slide1.cta"),
      ctaLink: "/services/station-mobile",
      stats: [
        { icon: Shield, value: "100%", label: t("heroSlider.slide1.stats.coverage") },
        { icon: Users, value: t("heroSlider.slide1.stats.proximityValue"), label: t("heroSlider.slide1.stats.proximityLabel") },
      ],
    },
    {
      image: slider2,
      title: t("heroSlider.slide2.title"),
      description: t("heroSlider.slide2.description"),
      cta: t("heroSlider.slide2.cta"),
      ctaLink: "/services/station-mobile",
      stats: [
        { icon: MapPin, value: "22", label: t("heroSlider.slide2.stats.temporary") },
        { icon: Shield, value: t("heroSlider.slide2.stats.certified"), label: t("heroSlider.slide2.stats.certified") },
      ],
    },
    {
      image: slider3,
      title: t("heroSlider.slide3.title"),
      description: t("heroSlider.slide3.description"),
      cta: t("heroSlider.slide3.cta"),
      ctaLink: "/a-propos",
      stats: [
        { icon: Calendar, value: "50+", label: t("heroSlider.slide3.stats.experience") },
        { icon: Shield, value: "100%", label: t("heroSlider.slide3.stats.compliance") },
      ],
    },
  ];

  const { data: apiSlides = [] } = useQuery({
    queryKey: ["slides"],
    queryFn: fetchSlides,
    staleTime: 300_000,
  });

  // Si des slides actifs existent en DB, les utiliser ; sinon fallback statique
  const slides: SlideItem[] = apiSlides.length > 0
    ? apiSlides.map((s) => ({
        image: s.image ?? slider1,
        title: s.titre,
        description: s.description ?? "",
        cta: s.bouton_texte ?? "En savoir plus",
        ctaLink: s.bouton_lien ?? "/services",
        stats: (s.stats ?? []).map((st) => ({
          icon: ICON_MAP[(st.icon as StatIcon)] ?? Shield,
          value: st.value,
          label: st.label,
        })),
      }))
    : staticSlides;

  useEffect(() => {
    setCurrentSlide(0);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) =>
          index === currentSlide ? (
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

              <div className="relative z-20 h-full flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="max-w-2xl text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    >
                      <motion.h1
                        className="text-3xl sm:text-4xl lg:text-7xl font-bold leading-tight mb-4 lg:mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      >
                        {slide.title}
                      </motion.h1>

                      {slide.description && (
                        <motion.p
                          className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 lg:mb-10 text-gray-100"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1, duration: 0.8 }}
                        >
                          {slide.description}
                        </motion.p>
                      )}

                      {slide.stats.length > 0 && (
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
                      )}

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7, duration: 0.6 }}
                      >
                        <Button
                          className="btn-hero text-base lg:text-lg px-6 lg:px-10 py-3 lg:py-6 text-white bg-primary hover:bg-primary/90 cursor-hover"
                          onClick={() => slide.ctaLink && navigate(slide.ctaLink)}
                        >
                          {slide.cta}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-hover ${
              index === currentSlide ? "bg-primary" : "bg-white/40 hover:bg-white/60"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{ scale: index === currentSlide ? 1.3 : 1 }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
