import HeroSlider from "@/components/HeroSlider";
import AboutSictaSection from "@/components/AboutSictaSection";
import NewEraSection from "@/components/NewEraSection";
import ServicesSection from "@/components/ServicesSection";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";

const SimulateurCTASection = () => {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-primary/10 via-background to-sicta-orange-light/10 relative overflow-hidden">
      {/* Effet de fond décoratif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sicta-orange-light rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-sicta-grey-dark leading-tight">
              Calculez votre{" "}
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-sicta-orange-light">
                Prochain Contrôle Technique
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-sicta-grey-light max-w-3xl mx-auto leading-relaxed">
              En quelques secondes, découvrez la date de votre prochain contrôle technique selon le type de votre véhicule
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Link to="/simulateur-visite">
                <Button className="btn-hero text-lg px-10 py-7">
                  <Calculator className="h-5 w-5 mr-2" />
                  Accéder au Simulateur
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <PageTransition>
      <SEO
        title="SICTA - Contrôle Technique Automobile en Côte d'Ivoire"
        description="Leader du contrôle technique automobile en Côte d'Ivoire depuis 1974. 28 stations permanentes, 22 stations temporaires. Réservez votre contrôle technique en ligne. Certifié ISO 9001:2015."
        keywords="contrôle technique, automobile, Côte d'Ivoire, SICTA, inspection véhicule, sécurité routière, réservation en ligne, Abidjan, Yamoussoukro, Bouaké, San Pedro, Daloa"
        url="/"
      />
      <div className="w-full">
        <HeroSlider />
        <AboutSictaSection />
        <NewEraSection />
        <ServicesSection />
        <SimulateurCTASection />
      </div>
    </PageTransition>
  );
};

export default Index;
