import { Shield, Car, FileCheck, Scale, Truck, Phone, CheckCircle, Clock, MapPin, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";

const services = [
  {
    icon: Shield,
    title: "Contrôle Technique Automobile",
    description: "Vérification complète de l'état mécanique de votre véhicule selon la réglementation ivoirienne.",
    features: [
      "123 points de contrôle rigoureux",
      "Certificat valide 6 mois",
      "Rapport détaillé inclus",
      "Conformité Code de la Route"
    ],
    process: "Le contrôle technique permet de vérifier que votre véhicule est en bon état et répond aux conditions imposées par la réglementation."
  },
  {
    icon: FileCheck,
    title: "CIVIO",
    description: "Certificat d'Immatriculation des Véhicules en Côte d'Ivoire - Service d'immatriculation officiel.",
    features: [
      "Immatriculation véhicules neufs",
      "Changement de propriétaire", 
      "Duplicata carte grise",
      "Mise à jour informations"
    ],
    process: "Service complet d'immatriculation et de gestion administrative des véhicules en Côte d'Ivoire."
  },
  {
    icon: Car,
    title: "Pré-visite",
    description: "Service volontaire pour préparer votre véhicule au contrôle technique et identifier les défaillances.",
    features: [
      "Inspection préparatoire",
      "Identification des défauts",
      "Conseils de réparation",
      "Réduction des frais futurs"
    ],
    process: "Contrôle identique à la visite officielle permettant de se préparer et réduire les coûts de réparation."
  },
  {
    icon: Scale,
    title: "Pesée de Véhicules",
    description: "Service de pesage officiel pour véhicules lourds et transport de marchandises.",
    features: [
      "Pesage essieux et total",
      "Certificat de pesée",
      "Contrôle surcharge",
      "Service 24h/24"
    ],
    process: "Pesage réglementaire pour le transport routier de marchandises et le respect des charges autorisées."
  },
  {
    icon: Truck,
    title: "Jaugeage & Barémage",
    description: "Étalonnage et certification des réservoirs de carburant pour stations-service et industries.",
    features: [
      "Jaugeage réservoirs",
      "Certification officielle",
      "Contrôle conformité",
      "Expertise technique"
    ],
    process: "Service spécialisé de métrologie pour l'étalonnage des cuves de stockage de carburants."
  },
  {
    icon: Phone,
    title: "Assistance & Conseils",
    description: "Support technique et accompagnement personnalisé pour tous vos besoins automobiles.",
    features: [
      "Support téléphonique",
      "Conseils techniques",
      "Assistance administrative",
      "Service client dédié"
    ],
    process: "Accompagnement complet pour toutes vos démarches liées au contrôle technique et à l'automobile."
  }
];

const Services = () => {
  return (
    <PageTransition>
      <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              <span>Services SICTA</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-sicta-grey-dark">Nos</span>{" "}
              <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-sicta-grey-light leading-relaxed">
              SICTA propose une gamme complète de services automobiles et industriels 
              pour répondre à tous vos besoins de contrôle et de certification.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="card-elevated hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-sicta-grey-dark mb-3">{service.title}</h3>
                      <p className="text-sicta-grey-light leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold text-sicta-grey-dark">Caractéristiques :</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sicta-grey-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-secondary/30 rounded-lg p-4 mb-6">
                    <p className="text-sm text-sicta-grey-light italic">{service.process}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="btn-hero flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Réserver
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Info
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
              Processus de Contrôle Technique
            </h2>
            <p className="text-xl text-sicta-grey-light">
              Un processus simple et efficace en 3 étapes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Réservation</h3>
              <p className="text-sicta-grey-light">
                Réservez votre créneau en ligne ou par téléphone dans l'une de nos 28 agences permanentes.
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Contrôle</h3>
              <p className="text-sicta-grey-light">
                Nos techniciens qualifiés effectuent un contrôle rigoureux de 123 points selon les normes en vigueur.
              </p>
            </div>

            <div className="text-center">
              <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Certification</h3>
              <p className="text-sicta-grey-light">
                Récupérez votre certificat de contrôle technique valide 6 mois avec rapport détaillé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-orange-400 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Prêt à réserver votre contrôle ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Choisissez l'agence la plus proche et réservez dès maintenant votre créneau
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg">
                <MapPin className="h-5 w-5 mr-3" />
                Trouver une agence
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                <Clock className="h-5 w-5 mr-3" />
                Réserver en ligne
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default Services;