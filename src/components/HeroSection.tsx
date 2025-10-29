import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Clock, MapPin, CheckCircle, Calendar, Phone } from "lucide-react";
import heroImage from "@/assets/hero-automotive-service.jpg";

const HeroSection = () => {
  return (
    <section className="section-hero min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Centre de contrôle technique SICTA - Inspection automobile professionnelle"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Contrôle technique agréé</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-sicta-grey-dark">Sécurité</span>{" "}
                <span className="text-gradient">routière</span>{" "}
                <span className="text-sicta-grey-dark">garantie</span>
              </h1>
              
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                SICTA, filiale de Mayelia Participations, assure le contrôle technique 
                automobile en Côte d'Ivoire avec 29 stations permanentes et des solutions 
                innovantes pour votre sécurité.
              </p>
            </div>

            {/* Key Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-sicta-grey-dark">29</div>
                  <div className="text-sm text-sicta-grey-light">Stations permanentes</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-sicta-grey-dark">30min</div>
                  <div className="text-sm text-sicta-grey-light">Contrôle moyen</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero text-lg px-8 py-4">
                <Calendar className="h-5 w-5 mr-3" />
                Réserver mon contrôle
              </Button>
              <Button className="btn-outline text-lg px-8 py-4">
                <MapPin className="h-5 w-5 mr-3" />
                Trouver une agence
              </Button>
            </div>
          </div>

          {/* Right Content - Service Cards */}
          <div className="space-y-6 animate-slide-up">
            <div className="grid gap-4">
              {/* Main Service Card */}
              <Card className="card-service bg-gradient-to-br from-primary to-sicta-orange-light text-white p-8 shadow-hero">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Contrôle Technique</h3>
                    <p className="opacity-90">Inspection complète de votre véhicule</p>
                  </div>
                  <Shield className="h-8 w-8 opacity-80" />
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Vérification de 123 points de contrôle</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Certificat valide 6 mois</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>Rapport détaillé inclus</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm opacity-80">À partir de</div>
                    <div className="text-3xl font-bold">15,000 FCFA</div>
                  </div>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    Réserver
                  </Button>
                </div>
              </Card>

              {/* Additional Services */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="card-elevated p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sicta-grey-dark">CIVIO</h4>
                      <p className="text-sm text-sicta-grey-light">Certificat d'immatriculation</p>
                    </div>
                  </div>
                </Card>

                <Card className="card-elevated p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sicta-grey-dark">Support 24/7</h4>
                      <p className="text-sm text-sicta-grey-light">Assistance technique</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;