import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  MapPin, 
  CheckCircle,
  FileText,
  Award,
  Users,
  ArrowRight,
  Clock,
  Truck,
  DollarSign
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Pesee = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const features = [
    {
      icon: Scale,
      title: "Pesage Essieux",
      description: "Mesure précise du poids de chaque essieu pour respecter les charges autorisées."
    },
    {
      icon: Truck,
      title: "Pesage Total",
      description: "Contrôle du poids total du véhicule et de sa cargaison."
    },
    {
      icon: Award,
      title: "Certificat de Pesée",
      description: "Document officiel attestant du poids mesuré."
    },
    {
      icon: Clock,
      title: "Service 24h/24",
      description: "Disponible en permanence pour les professionnels du transport."
    }
  ];

  const pricing = [
    {
      category: "Véhicule neuf",
      price: "8 200 FCFA",
      code: "PESEE1",
      description: "Service de pesage pour véhicule neuf"
    },
    {
      category: "Pesage essieux",
      price: "Sur devis",
      description: "Pesage de chaque essieu individuel"
    },
    {
      category: "Pesage total",
      price: "Sur devis",
      description: "Pesage du poids total véhicule + chargement"
    }
  ];

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Scale className="h-4 w-4" />
                <span>Pesée de Véhicules</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Pesée</span>{" "}
                <span className="text-gradient">Officielle</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Service de pesage officiel pour véhicules lourds et transport de marchandises. 
                Contrôle des charges et conformité réglementaire.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Services de Pesée
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Des solutions complètes pour le contrôle du poids de vos véhicules
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

        {/* Pricing Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Tarifs Pesée
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Tarifs transparents selon le type de véhicule
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricing.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    {item.code && (
                      <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        {item.code}
                      </div>
                    )}
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-sicta-grey-dark mb-2">
                      {item.category}
                    </h3>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {item.price}
                    </div>
                    <p className="text-sicta-grey-light text-sm">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sicta-grey text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'un pesage ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Service disponible 24h/24 pour les professionnels du transport
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Clock className="h-5 w-5 mr-2" />
                Réserver un pesage
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                <MapPin className="h-5 w-5 mr-2" />
                Trouver une station
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Pesee;


