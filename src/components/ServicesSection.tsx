import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  FileText, 
  Settings, 
  Scale, 
  Truck, 
  HeadphonesIcon,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Contrôle Technique Automobile",
      description: "Inspection complète selon les normes internationales pour garantir la sécurité de votre véhicule.",
      features: ["123 points de contrôle", "Certificat valide 6 mois", "Rapport détaillé"],
      
      color: "from-primary to-sicta-orange-light",
    },
    {
      icon: FileText,
      title: "CIVIO",
      description: "Certificat d'immatriculation véhicule neuf et d'occasion avec procédures simplifiées.",
      features: ["Traitement rapide", "Documents officiels", "Support administratif"],
      
      color: "from-sicta-grey to-sicta-grey-light",
    },
    {
      icon: Settings,
      title: "Pose de Plaques",
      description: "Installation professionnelle de plaques d'immatriculation conformes aux normes.",
      features: ["Pose certifiée", "Plaques homologuées", "Service sur site"],
      
      color: "from-accent to-secondary",
    },
    {
      icon: Scale,
      title: "Jaugeage & Barémage", 
      description: "Mesures précises et certifications pour citernes et réservoirs industriels.",
      features: ["Étalonnage certifié", "Rapport officiel", "Suivi périodique"],
      
      color: "from-muted to-secondary",
    },
    {
      icon: Truck,
      title: "Pesée et Vignettes",
      description: "Contrôle du poids des véhicules lourds et délivrance des vignettes réglementaires.",
      features: ["Pesée certifiée", "Vignettes officielles", "Contrôle surcharge"],
      
      color: "from-primary/70 to-sicta-orange-light/70",
    },
    {
      icon: HeadphonesIcon,
      title: "Assistance & Conseils",
      description: "Support technique et conseils personnalisés pour l'entretien de votre véhicule.",
      features: ["Support 24/7", "Conseils d'experts", "Assistance téléphonique"],
      
      color: "from-secondary to-muted",
    },
  ];

  return (
    <section className="py-20 bg-background">
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
            De la simple inspection au contrôle technique complet, SICTA vous accompagne 
            avec des services certifiés et une expertise reconnue depuis plus de 20 ans.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.title}
                className="card-service group hover:shadow-card transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="mb-6">
                  <div className={`h-16 w-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-sicta-grey-dark mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-sicta-grey-light mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-sicta-grey">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <Button 
                    className="btn-outline group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 w-full justify-center"
                  >
                    En savoir plus
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
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
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3">
              Prendre rendez-vous
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 font-semibold px-8 py-3">
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;