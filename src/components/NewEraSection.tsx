import { Card } from "@/components/ui/card";
import { 
  Building2, 
  Shield, 
  Users, 
  Award,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

const NewEraSection = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [currentAchievement, setCurrentAchievement] = useState(0);

  const achievements = [
    {
      icon: Building2,
      title: "Filiale Mayelia Participations",
      description: "Acquisition stratégique en avril 2025"
    },
    {
      icon: Users,
      title: "29 Stations Permanentes",
      description: "Couverture nationale complète"
    },
    {
      icon: Award,
      title: "Certification ISO 9001:2015",
      description: "Qualité reconnue internationalement"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          
          
          <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-6">
            <span className="text-gradient">Mayelia Participations</span><br />
            Transforme SICTA
          </h2>
          
          <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto leading-relaxed">
            Une nouvelle phase de développement commence avec l'acquisition par Mayelia Participations. 
            Innovation, digitalisation et excellence au service de la sécurité routière ivoirienne.
          </p>
        </motion.div>

        {/* Achievements Carousel */}
        <motion.div 
          className="relative mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 text-center bg-white/80 backdrop-blur border-primary/10 hover:shadow-lg transition-all duration-300">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-sicta-grey-dark mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-sicta-grey-light">
                    {achievement.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet Carousel */}
          <div className="lg:hidden relative">
            <div className="overflow-hidden">
              <motion.div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentAchievement * 100}%)` }}
              >
                {achievements.map((achievement, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="p-6 text-center bg-white/80 backdrop-blur border-primary/10 hover:shadow-lg transition-all duration-300">
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <achievement.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-sicta-grey-dark mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-sicta-grey-light">
                        {achievement.description}
                      </p>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentAchievement((prev) => (prev - 1 + achievements.length) % achievements.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-sicta-grey" />
            </button>
            
            <button
              onClick={() => setCurrentAchievement((prev) => (prev + 1) % achievements.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-sicta-grey" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAchievement(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentAchievement ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default NewEraSection;
