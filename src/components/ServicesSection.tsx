import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Search,
  Scale,
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { visiteTechniqueData } from "@/data/services/visiteTechnique";
import { civioData } from "@/data/services/civio";
import { jaugeageBaremageData } from "@/data/services/jaugeageBaremage";
import { immatriculationData } from "@/data/services/immatriculation";

const ServicesSection = () => {
  const { ref, isInView } = useScrollAnimation(0.1);
  
  // Services phares pour la page d'accueil (4 services seulement)
  const servicesPhares = [
    {
      ...visiteTechniqueData,
      icon: Shield,
      pointsClés: visiteTechniqueData.pointsControle.slice(0, 2)
    },
    {
      ...civioData,
      icon: Search,
      pointsClés: civioData.objectifs.slice(0, 2)
    },
    {
      ...jaugeageBaremageData,
      icon: Scale,
      pointsClés: jaugeageBaremageData.objectifs.slice(0, 2)
    },
    {
      ...immatriculationData,
      icon: FileCheck,
      pointsClés: immatriculationData.beneficesClient.slice(0, 2).map(b => b.benefice)
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-background via-sicta-grey/5 to-primary/5 relative overflow-hidden">
      {/* Effet de fond décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sicta-orange-light rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-6"
        >
          
          
          <h2 className="text-4xl lg:text-6xl font-bold text-sicta-grey-dark leading-tight">
            Nos services
          </h2>
          
        </motion.div>

        {/* Services Grid - Format Teaser amélioré avec images flyers */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {servicesPhares.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3 }
                }}
              >
                <Link to={`/services/${service.slug}`}>
                  <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full group cursor-pointer relative min-h-[450px] bg-white">
                    {/* Image hero du flyer en arrière-plan avec effet parallax */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={service.imageHero} 
                        alt={service.titre}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Overlay avec gradient dynamique */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85 group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/75 transition-all duration-500" />
                      {/* Effet de lumière */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    

                    {/* Contenu */}
                    <div className="relative z-10 h-full flex flex-col p-8 text-white">
                      {/* Icône avec effet */}
                      <div className="mb-6">
                        <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl border-2 border-white/30">
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                      </div>

                      {/* Titre */}
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {service.titreCourt}
                      </h3>
                      
                      {/* Description courte */}
                      <p className="text-white/95 mb-8 leading-relaxed flex-1 text-lg">
                        {service.descriptionCourte}
                      </p>

                      {/* Points clés */}
                      <div className="mb-6 space-y-2">
                        {service.pointsClés && service.pointsClés.slice(0, 2).map((point, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-white/90">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{typeof point === 'string' ? point.split('(')[0].trim() : point}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA avec effet */}
                      <Button 
                        className="w-full bg-white text-primary hover:bg-white/95 font-bold py-4 rounded-xl group-hover:shadow-2xl transition-all duration-300 text-lg border-2 border-transparent hover:border-primary/20"
                      >
                        Découvrir le service
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </div>

                    {/* Effet de bordure au hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-all duration-500 pointer-events-none" />
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section - Lien vers page services complète - Amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-primary to-sicta-orange-light rounded-2xl p-1 shadow-xl">
            <Link to="/services">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/95 font-bold px-10 py-7 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Découvrir tous nos services
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
