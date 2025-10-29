import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  MapPin, 
  CheckCircle,
  FileText,
  Award,
  Users,
  ArrowRight,
  Shield,
  Calendar,
  DollarSign
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PreVisite = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const features = [
    {
      icon: Eye,
      title: "Inspection Préparatoire",
      description: "Examen approfondi de votre véhicule avant le contrôle technique officiel."
    },
    {
      icon: CheckCircle,
      title: "Identification des Défauts",
      description: "Détection précoce des problèmes pour éviter les contre-visites."
    },
    {
      icon: FileText,
      title: "Conseils de Réparation",
      description: "Recommandations précises pour la mise en conformité de votre véhicule."
    },
    {
      icon: DollarSign,
      title: "Réduction des Frais",
      description: "Économisez sur les frais de contre-visite et les réparations urgentes."
    }
  ];

  const benefits = [
    "Éviter les contre-visites coûteuses",
    "Préparer votre véhicule efficacement",
    "Gagner du temps et de l'argent",
    "Obtenir des conseils d'experts",
    "Service volontaire et sans engagement"
  ];

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Eye className="h-4 w-4" />
                <span>Pré-visite</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Pré-visite</span>{" "}
                <span className="text-gradient">Volontaire</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Service volontaire pour préparer votre véhicule au contrôle technique et identifier les défaillances. 
                Évitez les contre-visites et économisez sur les réparations.
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 text-sicta-grey-light leading-relaxed">
                <p>
                  La pré-visite est un contrôle identique à la visite officielle permettant de se préparer 
                  et réduire les coûts de réparation. C'est un examen approfondi effectué par nos techniciens 
                  certifiés avant le contrôle technique officiel.
                </p>
                
                <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                    Pourquoi effectuer une pré-visite ?
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Avantages de la Pré-visite
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Un service intelligent pour optimiser votre contrôle technique
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-sicta-grey-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sicta-grey-light text-sm">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-sicta-grey-dark mb-6">
                  Pourquoi Choisir la Pré-visite ?
                </h2>
                <p className="text-xl text-sicta-grey-light mb-8">
                  Un investissement intelligent qui vous fait économiser temps et argent
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sicta-grey">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Card className="p-8 bg-white/80 backdrop-blur">
                  <div className="text-center">
                    <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <DollarSign className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                      Économies Garanties
                    </h3>
                    <p className="text-sicta-grey-light mb-6">
                      Évitez les frais de contre-visite et les réparations d'urgence
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">-50%</div>
                        <div className="text-sm text-sicta-grey">Frais contre-visite</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">-30%</div>
                        <div className="text-sm text-sicta-grey">Coût réparations</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Un processus simple en 4 étapes pour préparer votre contrôle technique
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Prise de rendez-vous", desc: "Réservez votre créneau de pré-visite" },
                { step: "02", title: "Inspection", desc: "Examen approfondi de votre véhicule" },
                { step: "03", title: "Rapport détaillé", desc: "Liste des points à corriger" },
                { step: "04", title: "Conseils", desc: "Recommandations pour les réparations" }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="h-20 w-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-sicta-grey-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sicta-grey-light">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sicta-grey text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt pour votre pré-visite ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Réservez votre pré-visite et préparez votre véhicule efficacement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Calendar className="h-5 w-5 mr-2" />
                Prendre rendez-vous
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                <MapPin className="h-5 w-5 mr-2" />
                Trouver une agence
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default PreVisite;


