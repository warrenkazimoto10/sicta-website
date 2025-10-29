import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  CheckCircle,
  FileText,
  Award,
  Users,
  ArrowRight,
  Shield
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CIVIO = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const features = [
    {
      icon: Shield,
      title: "Identification Véhicule",
      description: "Vérification de l'identité du véhicule et de ses caractéristiques techniques."
    },
    {
      icon: CheckCircle,
      title: "Contrôle Organes",
      description: "Inspection des organes principaux du véhicule pour détecter toute modification."
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Vérification et mise à jour de tous les documents administratifs."
    },
    {
      icon: Award,
      title: "Certification",
      description: "Délivrance du certificat CIVIO conforme aux réglementations en vigueur."
    }
  ];

  const documents = [
    "Carte grise du véhicule",
    "Certificat de conformité",
    "Facture d'achat",
    "Justificatif d'identité du propriétaire",
    "Attestation d'assurance"
  ];

  const pricing = [
    {
      category: "Véhicules légers < 3,5 tonnes",
      price: "23 200 FCFA",
      code: "CIVIO1",
      description: "Véhicules de P.T.A.C. inférieur à 3,5 tonnes"
    },
    {
      category: "Véhicules lourds > 3,5 tonnes (9+ places)",
      price: "43 900 FCFA",
      code: "CIVIO2",
      description: "Véhicules de transport de marchandises ou de personnes"
    },
    {
      category: "Identification complémentaire",
      price: "20 800 FCFA",
      code: "CIVIO3",
      description: "PL déclarés VL"
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
                <Calendar className="h-4 w-4" />
                <span>CIVIO</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">CIVIO</span>{" "}
                <span className="text-gradient">Certification</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Contrôle d'identification des Véhicules Importés d'Occasion. 
                Service fournissant un numéro d'identification du véhicule avec toutes ses caractéristiques.
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
                  Ce service fournit un numéro au véhicule neuf sortant. Ce numéro d'identification permet 
                  de connaitre les antécédents, le passé de la voiture (sa date de fabrication, des caractéristiques 
                  de son moteur, de son système de transmission et de ses divers équipements).
                </p>
                
                <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                    Services disponibles pour les Concessionnaires
                  </h3>
                  <p className="mb-4">
                    Concessionnaires, plus besoin de vous déplacer, nos équipes viennent dans vos locaux pour assurer :
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>La production du récépissé d'immatriculation provisoire sur place</li>
                    <li>La sécurisation du récépissé d'immatriculation provisoire sur place</li>
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
                Processus CIVIO
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Un contrôle rigoureux pour garantir l'authenticité de votre véhicule
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Tarifs CIVIO
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Tarifs officiels selon le type de véhicule
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pricing.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {item.code}
                    </div>
                    <h3 className="text-lg font-semibold text-sicta-grey-dark mb-2">
                      {item.category}
                    </h3>
                    <div className="text-3xl font-bold text-primary mb-3">
                      {item.price}
                    </div>
                    <p className="text-sicta-grey-light text-sm">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-sicta-grey-dark mb-6">
                  Documents Requis
                </h2>
                <p className="text-xl text-sicta-grey-light mb-8">
                  Assurez-vous d'avoir tous les documents nécessaires pour votre contrôle CIVIO
                </p>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sicta-grey">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Card className="p-8 bg-white/80 backdrop-blur">
                  <div className="text-center">
                    <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                      Service Rapide
                    </h3>
                    <p className="text-sicta-grey-light mb-6">
                      Traitement en 24-48h pour les véhicules conformes
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">24h</div>
                        <div className="text-sm text-sicta-grey">Véhicules neufs</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">48h</div>
                        <div className="text-sm text-sicta-grey">Véhicules d'occasion</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sicta-grey text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'un contrôle CIVIO ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Nos experts vous accompagnent dans toutes vos démarches d'immatriculation
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

export default CIVIO;


