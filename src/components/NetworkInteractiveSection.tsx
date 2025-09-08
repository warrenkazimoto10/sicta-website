import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  Star,
  Users,
  Calendar,
  Truck
} from "lucide-react";
import mobileUnitImage from "@/assets/mobile-inspection-unit.jpg";

const NetworkInteractiveSection = () => {
  const regions = [
    {
      name: "Abidjan",
      agenciesCount: 8,
      color: "from-primary to-sicta-orange-light",
      description: "Zone économique principale",
      coverage: "95%",
      services: ["Contrôle complet", "CIVIO", "Pesée", "Jaugeage"]
    },
    {
      name: "Centre-Nord",
      agenciesCount: 6,
      color: "from-sicta-grey to-sicta-orange-light",
      description: "Bouaké, Korhogo, Yamoussoukro",
      coverage: "88%",
      services: ["Contrôle", "CIVIO", "Mobile"]
    },
    {
      name: "Ouest",
      agenciesCount: 7,
      color: "from-secondary to-primary",
      description: "San Pedro, Man, Daloa",
      coverage: "82%",
      services: ["Contrôle", "Pesée lourds", "Mobile"]
    },
    {
      name: "Est",
      agenciesCount: 7,
      color: "from-sicta-orange-light to-accent",
      description: "Abengourou, Bondoukou",
      coverage: "78%",
      services: ["Contrôle", "CIVIO", "Mobile"]
    }
  ];

  const features = [
    {
      icon: Navigation,
      title: "Géolocalisation",
      description: "Trouvez l'agence la plus proche automatiquement"
    },
    {
      icon: Calendar,
      title: "Réservation en ligne",
      description: "Réservez votre créneau directement sur la carte"
    },
    {
      icon: Clock,
      title: "Temps d'attente",
      description: "Consultez les temps d'attente en temps réel"
    },
    {
      icon: Star,
      title: "Évaluations",
      description: "Notes et avis clients pour chaque agence"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MapPin className="h-4 w-4" />
            <span>Couverture Intelligente</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-6">
            Réseau {" "}
            <span className="text-gradient">Connecté</span>
          </h2>
          
          <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
            Notre système intelligent vous connecte à l'agence optimale selon votre localisation, 
            vos besoins et disponibilités en temps réel.
          </p>
        </div>

        {/* Interactive Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="card-elevated text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="p-6">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-sicta-grey-light">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Regional Coverage */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-sicta-grey-dark mb-4">
                Couverture Régionale
              </h3>
              <p className="text-sicta-grey-light text-lg">
                28 agences stratégiquement positionnées pour une couverture optimale 
                du territoire national avec des services adaptés à chaque région.
              </p>
            </div>

            <div className="space-y-4">
              {regions.map((region, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`h-12 w-12 bg-gradient-to-br ${region.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                        {region.agenciesCount}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{region.name}</h4>
                        <p className="text-sm text-sicta-grey-light">{region.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{region.coverage}</div>
                      <div className="text-xs text-sicta-grey-light">Couverture</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {region.services.map((service, serviceIndex) => (
                      <Badge key={serviceIndex} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Mobile Unit Showcase */}
          <div className="relative">
            <Card className="card-elevated overflow-hidden">
              <div className="relative">
                <img
                  src={mobileUnitImage}
                  alt="Unité mobile SICTA"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-xl font-bold mb-2">Unités Mobiles</h4>
                  <p className="text-sm opacity-90">Service technique itinérant</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">22</div>
                    <div className="text-xs text-sicta-grey-light">Stations mobiles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <div className="text-xs text-sicta-grey-light">Zones rurales</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Truck className="h-4 w-4 text-primary" />
                  <span className="text-sm text-sicta-grey-light">Équipement mobile certifié</span>
                </div>
                
                <Button className="btn-hero w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Planning mobile
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="card-elevated bg-gradient-to-r from-primary/10 to-sicta-orange-light/10 border-primary/20">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                Découvrez notre réseau intelligent
              </h3>
              <p className="text-sicta-grey-light mb-6 max-w-2xl mx-auto">
                Explorez notre carte interactive pour trouver l'agence parfaite, 
                comparer les services et réserver votre contrôle en quelques clics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero">
                  <Navigation className="h-4 w-4 mr-2" />
                  Carte interactive
                </Button>
                <Button variant="outline" className="btn-outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Assistance réseau
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NetworkInteractiveSection;