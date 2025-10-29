import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Calendar, 
  MapPin, 
  CheckCircle,
  Clock,
  FileText,
  Award,
  Users,
  ArrowRight,
  DollarSign,
  AlertTriangle,
  Wrench,
  Zap
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ControleTechnique = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const features = [
    {
      icon: Shield,
      title: "Contrôle Visuel",
      description: "Inspection complète de l'état général du véhicule, carrosserie, éclairage et signalisation."
    },
    {
      icon: CheckCircle,
      title: "Contrôle Technique",
      description: "Vérification des systèmes de freinage, direction, suspension et transmission."
    },
    {
      icon: Award,
      title: "Émission Polluants",
      description: "Mesure des émissions de gaz d'échappement selon les normes environnementales."
    },
    {
      icon: Clock,
      title: "Freinage",
      description: "Test des performances de freinage et vérification des systèmes de sécurité."
    }
  ];

  const pricing = [
    {
      category: "Véhicules légers ≤7 CV",
      price: "13 100 FCFA",
      code: "VL1",
      revisite: "12 350 FCFA",
      description: "P.T.A.C. < 3,5T, puissance fiscale ≤ 7 CV"
    },
    {
      category: "Véhicules légers >7 CV",
      price: "15 500 FCFA",
      code: "VL2",
      revisite: "12 350 FCFA",
      description: "P.T.A.C. < 3,5T, puissance fiscale > 7 CV"
    },
    {
      category: "Poids lourd <10 tonnes",
      price: "18 000 FCFA",
      code: "PL1",
      revisite: "14 700 FCFA",
      description: "Remorques et semi-remorques"
    },
    {
      category: "Poids lourd ≥10 tonnes",
      price: "20 450 FCFA",
      code: "PL2",
      revisite: "14 700 FCFA",
      description: "Tracteurs routiers et engins spéciaux"
    },
    {
      category: "Transport ≤9 places, ≤7 CV",
      price: "13 100 FCFA",
      code: "TP1",
      revisite: "12 350 FCFA",
      description: "Transport public, ≤ 7 CV"
    },
    {
      category: "Transport ≤9 places, >7 CV",
      price: "15 500 FCFA",
      code: "TP2",
      revisite: "12 350 FCFA",
      description: "Transport public, > 7 CV"
    },
    {
      category: "Transport 10-25 places",
      price: "18 000 FCFA",
      code: "TP3",
      revisite: "14 700 FCFA",
      description: "Transport public, 10 à 25 places"
    },
    {
      category: "Transport >25 places",
      price: "20 450 FCFA",
      code: "TP4",
      revisite: "14 700 FCFA",
      description: "Transport public, > 25 places"
    }
  ];

  const requirements = [
    "Carte grise du véhicule",
    "Certificat d'assurance en cours",
    "Justificatif d'identité du propriétaire",
    "Véhicule en bon état de fonctionnement"
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Contrôle de 123 points selon les normes internationales"
    },
    {
      icon: Award,
      title: "Certificat Officiel",
      description: "Document valide 6 mois, reconnu par les autorités"
    },
    {
      icon: Clock,
      title: "Service Rapide",
      description: "Contrôle effectué en 30-45 minutes"
    },
    {
      icon: Users,
      title: "Techniciens Certifiés",
      description: "Personnel qualifié et expérimenté"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Réservation",
      description: "Réservez votre créneau en ligne ou par téléphone"
    },
    {
      step: "2",
      title: "Contrôle",
      description: "Inspection complète par nos techniciens certifiés"
    },
    {
      step: "3",
      title: "Diagnostic",
      description: "Rapport détaillé des résultats du contrôle"
    },
    {
      step: "4",
      title: "Certification",
      description: "Réception de votre certificat valide 6 mois"
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
                <Shield className="h-4 w-4" />
                <span>Contrôle Technique</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Contrôle</span>{" "}
                <span className="text-gradient">Technique</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Contrôle des véhicules Légers & Poids Lourds sanctionné par un certificat de visite technique, 
                conformément au cahier des charges du Ministère des Transports.
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
                  Le contrôle technique est un excellent moyen de prévenir les dysfonctionnements techniques 
                  et mécaniques d'une voiture. Nous assurons un service simple et rapide offrant la meilleure 
                  expérience de contrôle technique et une transparence des résultats. Il est sanctionné par la 
                  délivrance d'un certificat de visite technique conforme à la réglementation en vigueur.
                </p>
                
                <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                    Pourquoi faire contrôler votre véhicule ?
                  </h3>
                  <p>
                    Si certains éléments techniques sont aisément vérifiables par le propriétaire, comme l'état 
                    des pneus ou une ampoule grillée, d'autres nécessitent les compétences d'un professionnel. 
                    Certains points de contrôle sont en effet primordiaux pour votre sécurité et celle des autres 
                    usagers de la route. C'est le cas par exemple pour les feux et clignotants, qui assurent votre 
                    visibilité par les autres automobilistes.
                  </p>
                  <p className="mt-4 font-medium text-primary">
                    Le contrôle technique permet donc à tous les automobilistes de bénéficier d'une révision 
                    complète et de conduire en toute sérénité un véhicule sécurisé.
                  </p>
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
                Points de Contrôle
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Nos techniciens certifiés effectuent une inspection complète selon 123 points de contrôle
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

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Un processus simple et transparent en 4 étapes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="h-20 w-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                      {step.step}
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-primary/20 -translate-x-1/2"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-sicta-grey-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sicta-grey-light">
                    {step.description}
                  </p>
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
                Tarifs Contrôle Technique
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Tarifs transparents selon le type de véhicule
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricing.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                    <div className="text-center mb-4">
                      <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        {item.code}
                      </div>
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-sicta-grey-dark mb-2 leading-tight">
                        {item.category}
                      </h3>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {item.price}
                      </div>
                      {item.revisite && (
                        <div className="text-sm text-sicta-grey-light mb-2">
                          Revisite: {item.revisite}
                        </div>
                      )}
                      <p className="text-sicta-grey-light text-xs leading-tight">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-sicta-grey-dark mb-6">
                  Documents Requis
                </h2>
                <p className="text-xl text-sicta-grey-light mb-8">
                  Assurez-vous d'avoir tous les documents nécessaires pour votre contrôle technique
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
              <div className="relative">
                <Card className="p-8 bg-white/80 backdrop-blur">
                  <div className="text-center">
                    <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertTriangle className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                      Important à Savoir
                    </h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sicta-grey-dark">Durée</div>
                          <div className="text-sm text-sicta-grey-light">30-45 minutes</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sicta-grey-dark">Validité</div>
                          <div className="text-sm text-sicta-grey-light">6 mois</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Wrench className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sicta-grey-dark">Contre-visite</div>
                          <div className="text-sm text-sicta-grey-light">Gratuite sous 30 jours</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Pourquoi Choisir SICTA ?
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Les avantages de notre service de contrôle technique
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-sicta-grey-dark mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sicta-grey-light text-sm">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-sicta-grey text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt pour votre contrôle technique ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Réservez votre créneau en ligne et bénéficiez de nos services professionnels
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

export default ControleTechnique;
