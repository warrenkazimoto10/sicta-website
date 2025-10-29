import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Calendar, 
  MapPin, 
  Award,
  Scale,
  Eye,
  ArrowRight,
  CheckCircle,
  FileCheck,
  Car
} from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const { ref, isInView } = useScrollAnimation(0.1);
  const services = [
    {
      icon: Shield,
      title: "Contrôle Technique",
      description: "Contrôle complet de votre véhicule selon les normes en vigueur",
      features: ["Contrôle visuel", "Contrôle technique", "Émission polluants", "Freinage"],
      color: "from-primary to-sicta-orange-light",
      slug: "controle-technique"
    },
    {
      icon: Calendar,
      title: "CIVIO",
      description: "Contrôle d'Identité Véhicule et d'Identification des Organes",
      features: ["Identification véhicule", "Contrôle organes", "Documentation", "Certification"],
      color: "from-sicta-grey to-sicta-grey-light",
      slug: "civio"
    },
    {
      icon: Scale,
      title: "Jaugeage & Barémage",
      description: "Étalonnage et certification des réservoirs de carburant pour stations-service et industries",
      features: ["Jaugeage réservoirs", "Certification officielle", "Contrôle conformité", "Expertise technique"],
      color: "from-accent to-secondary",
      slug: "jaugeage-baremage"
    },
    {
      icon: Eye,
      title: "Pré-visite",
      description: "Service volontaire pour préparer votre véhicule au contrôle technique et identifier les défaillances",
      features: ["Inspection préparatoire", "Identification des défauts", "Conseils de réparation", "Réduction des frais futurs"],
      color: "from-muted to-secondary",
      slug: "pre-visite"
    },
    {
      icon: FileCheck,
      title: "Immatriculation",
      description: "Sécurisation des plaques avec code-barres pour garantir l'authenticité et lutter contre les falsifications",
      features: ["Sécurisation des plaques", "Code-barres unique", "Lutte contre la falsification", "Service complet de pose"],
      color: "from-sicta-orange-light to-primary",
      slug: "immatriculation"
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="h-4 w-4" />
            <span>Nos Services Automobiles</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark">
            Solutions complètes pour votre{" "}
            <span className="text-gradient">véhicule</span>
          </h2>
          
          <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
            Des solutions complètes pour tous vos besoins de contrôle technique. 
            Services modernisés et digitalisés sous la nouvelle ère SICTA 2025.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full group bg-white"
              >
                {/* Gradient Header */}
                <div className={`h-32 bg-gradient-to-br ${service.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/5"></div>
                  <div className="absolute top-4 right-4">
                    <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6 pb-8">
                  <h3 className="text-2xl font-bold text-sicta-grey-dark mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sicta-grey-light mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        </div>
                        <span className="text-sm text-sicta-grey leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={`/services/${service.slug}`}>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-sicta-orange-light hover:from-primary/90 hover:to-sicta-orange-light/90 text-white font-semibold py-6 rounded-lg group-hover:shadow-lg transition-all duration-300"
                    >
                      En savoir plus
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-sicta-orange-light rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Besoin d'un service personnalisé ?
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Nos experts sont à votre disposition pour vous conseiller et vous accompagner 
            dans toutes vos démarches automobiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservation">
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3">
                Prendre rendez-vous
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 font-semibold px-8 py-3">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;