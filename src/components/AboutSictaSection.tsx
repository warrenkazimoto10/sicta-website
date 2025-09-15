import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Award, 
  Users, 
  MapPin, 
  Calendar,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import sictaInspectionImage from "@/assets/sicta-inspection-modern.jpg";
import { motion } from "framer-motion";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";

const AboutSictaSection = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const { count: expCount, ref: expRef } = useCountUp(50, 2000);
  const { count: agenciesCount, ref: agenciesRef } = useCountUp(28, 2000);
  const { count: vehiclesCount, ref: vehiclesRef } = useCountUp(1500, 2500);
  const { count: pointsCount, ref: pointsRef } = useCountUp(123, 2000);
  const achievements = [
    {
      icon: Calendar,
      value: "50+",
      label: "Années d'expérience",
      description: "Leader depuis 1974"
    },
    {
      icon: Shield,
      value: "28",
      label: "Agences permanentes",
      description: "Couverture nationale"
    },
    {
      icon: Users,
      value: "1500+",
      label: "Véhicules/jour",
      description: "Service de masse"
    },
    {
      icon: Award,
      value: "123",
      label: "Points de contrôle",
      description: "Expertise technique"
    }
  ];

  const highlights = [
    "Filiale de Mayelia Participations depuis 2024",
    "Certification ISO 9001:2015 par ABS Quality Evaluations",
    "Leader du contrôle technique en Afrique de l'Ouest",
    "Innovation technologique et digitalisation"
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>À Propos de SICTA</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark">
                Excellence et{" "}
                <span className="text-gradient">Innovation</span>
              </h2>
              
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Société Ivoirienne de Contrôles Techniques Automobiles et Industriels, 
                SICTA est le leader incontesté du contrôle technique en Côte d'Ivoire 
                et en Afrique de l'Ouest.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-sicta-grey-dark">Points Clés</h3>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sicta-grey-light">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card className="p-4 text-center bg-white/50 backdrop-blur border-primary/10 hover:scale-105 transition-transform duration-300" ref={expRef}>
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-sicta-grey-dark">{expCount}+</div>
                  <div className="text-sm font-medium text-sicta-grey">Années d'expérience</div>
                  <div className="text-xs text-sicta-grey-light mt-1">Leader depuis 1974</div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Card className="p-4 text-center bg-white/50 backdrop-blur border-primary/10 hover:scale-105 transition-transform duration-300" ref={agenciesRef}>
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-sicta-grey-dark">{agenciesCount}</div>
                  <div className="text-sm font-medium text-sicta-grey">Agences permanentes</div>
                  <div className="text-xs text-sicta-grey-light mt-1">Couverture nationale</div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Card className="p-4 text-center bg-white/50 backdrop-blur border-primary/10 hover:scale-105 transition-transform duration-300" ref={vehiclesRef}>
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-sicta-grey-dark">{vehiclesCount}+</div>
                  <div className="text-sm font-medium text-sicta-grey">Véhicules/jour</div>
                  <div className="text-xs text-sicta-grey-light mt-1">Service de masse</div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Card className="p-4 text-center bg-white/50 backdrop-blur border-primary/10 hover:scale-105 transition-transform duration-300" ref={pointsRef}>
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-sicta-grey-dark">{pointsCount}</div>
                  <div className="text-sm font-medium text-sicta-grey">Points de contrôle</div>
                  <div className="text-xs text-sicta-grey-light mt-1">Expertise technique</div>
                </Card>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero">
                <MapPin className="h-4 w-4 mr-2" />
                Trouver une agence
              </Button>
              <Button className="btn-outline">
                En savoir plus
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
              <img
                src={sictaInspectionImage}
                alt="Centre d'inspection SICTA moderne"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="absolute -bottom-6 -left-6 p-6 bg-white shadow-xl border-l-4 border-l-primary hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sicta-grey-dark">ISO 9001:2015</div>
                    <div className="text-sm text-sicta-grey-light">Certification Qualité</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSictaSection;