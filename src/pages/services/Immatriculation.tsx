import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  Calendar, 
  MapPin, 
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Users,
  ArrowRight
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Link } from "react-router-dom";

const Immatriculation = () => {
  const features = [
    {
      icon: Shield,
      title: "Sécurité",
      description: "Authentification des plaques avec code barre sécurisé"
    },
    {
      icon: FileCheck,
      title: "Traçabilité",
      description: "Lutte contre les falsifications et fraudes"
    },
    {
      icon: Users,
      title: "Service Complet",
      description: "Pose des plaques directement sur vos véhicules"
    },
    {
      icon: CheckCircle,
      title: "Conformité",
      description: "Garantie de conformité avec la réglementation"
    }
  ];

  const pricing = [
    {
      category: "Primo immatriculation - GUA",
      price: "6 600 FCFA",
      description: "Sécurisation et pose plaque GUA + timbre 100 F"
    },
    {
      category: "Primo immatriculation - GUK/GUB",
      price: "3 300 FCFA",
      description: "Sécurisation et pose plaque GUK/GUB + timbre 100 F"
    },
    {
      category: "Post immatriculation",
      price: "5 700 FCFA",
      description: "Remplacement plaque + timbre 100 F"
    }
  ];

  const requirements = [
    "Carte grise du véhicule",
    "Justificatif d'identité",
    "Certificat d'immatriculation",
    "Véhicule présent pour la pose"
  ];

  const benefits = [
    "Protection contre les falsifications",
    "Système de code-barres sécurisé",
    "Conformité réglementaire garantie",
    "Service professionnel et rapide"
  ];

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FileCheck className="h-4 w-4" />
                <span>Immatriculation</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Sécurisation</span>{" "}
                <span className="text-gradient">des Plaques</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Cette activité vise à garantir l'authenticité des plaques et à lutter contre 
                les falsifications par sécurisation des plaques avec un code barre puis la pose sur les véhicules.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Pourquoi Sécuriser vos Plaques ?
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Un service de confiance pour protéger votre véhicule
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
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
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Tarifs Immatriculation
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Tarifs transparents selon le type de véhicule
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {pricing.map((item, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
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
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-sicta-grey-dark mb-6">
                  Documents Requis
                </h2>
                <p className="text-xl text-sicta-grey-light mb-8">
                  Assurez-vous d'avoir tous les documents nécessaires
                </p>
                <div className="space-y-4">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sicta-grey">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                    Avantages
                  </h3>
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sicta-grey-light">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sicta-grey text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt pour l'immatriculation de votre véhicule ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Contactez-nous pour obtenir un devis personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Calendar className="h-5 w-5 mr-2" />
                Nous contacter
              </Button>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                  Voir nos services
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Immatriculation;

