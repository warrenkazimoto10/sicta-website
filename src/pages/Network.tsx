import { useState } from "react";
import { MapPin, Clock, Phone, Car, Navigation, Users, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NetworkInteractiveSection from "@/components/NetworkInteractiveSection";
import PageTransition from "@/components/PageTransition";
import networkMapModern from "@/assets/network-map-modern.jpg";

const permanentAgencies = [
  {
    name: "SICTA Abidjan Centre",
    address: "Boulevard Lagunaire, Plateau",
    city: "Abidjan",
    phone: "+225 27 20 21 23 45",
    hours: "Lun-Ven: 7h-17h, Sam: 7h-12h",
    services: ["Contrôle technique", "CIVIO", "Pesée"],
    capacity: "200 véhicules/jour"
  },
  {
    name: "SICTA Yopougon",
    address: "Rue principale Yopougon",
    city: "Abidjan", 
    phone: "+225 27 20 21 23 46",
    hours: "Lun-Ven: 7h-17h, Sam: 7h-12h",
    services: ["Contrôle technique", "CIVIO", "Pré-visite"],
    capacity: "180 véhicules/jour"
  },
  {
    name: "SICTA Bouaké",
    address: "Zone industrielle Bouaké",
    city: "Bouaké",
    phone: "+225 31 63 45 12",
    hours: "Lun-Ven: 7h-17h, Sam: 7h-12h", 
    services: ["Contrôle technique", "Pesée", "Jaugeage"],
    capacity: "120 véhicules/jour"
  },
  {
    name: "SICTA San Pedro",
    address: "Zone portuaire San Pedro", 
    city: "San Pedro",
    phone: "+225 34 71 23 45",
    hours: "Lun-Ven: 7h-17h, Sam: 7h-12h",
    services: ["Contrôle technique", "Pesée lourds", "CIVIO"],
    capacity: "100 véhicules/jour"
  },
  {
    name: "SICTA Korhogo",
    address: "Route de Ferkessédougou",
    city: "Korhogo", 
    phone: "+225 36 86 12 34",
    hours: "Lun-Ven: 7h-17h, Sam: 7h-12h",
    services: ["Contrôle technique", "CIVIO"],
    capacity: "80 véhicules/jour"
  },
  {
    name: "SICTA Daloa",
    address: "Quartier Commerce Daloa",
    city: "Daloa",
    phone: "+225 32 78 45 67", 
    hours: "Lun-Ven: 7h-17h, Sam: 7h-12h",
    services: ["Contrôle technique", "Pesée", "CIVIO"],
    capacity: "90 véhicules/jour"
  }
];

const temporaryStations = [
  {
    name: "Station Mobile Yamoussoukro",
    city: "Yamoussoukro",
    schedule: "2e et 4e semaines du mois",
    services: ["Contrôle technique", "CIVIO"]
  },
  {
    name: "Station Mobile Man", 
    city: "Man",
    schedule: "1ère semaine du mois",
    services: ["Contrôle technique"]
  },
  {
    name: "Station Mobile Abengourou",
    city: "Abengourou", 
    schedule: "3e semaine du mois",
    services: ["Contrôle technique", "CIVIO"]
  },
  {
    name: "Station Mobile Bondoukou",
    city: "Bondoukou",
    schedule: "2e semaine du mois", 
    services: ["Contrôle technique"]
  }
];

const Network = () => {
  return (
    <PageTransition>
      <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              <span>Réseau National SICTA</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-sicta-grey-dark">Notre</span>{" "}
              <span className="text-gradient">Réseau</span>
            </h1>
            <p className="text-xl text-sicta-grey-light leading-relaxed">
              28 agences permanentes et 22 stations temporaires réparties sur l'ensemble 
              du territoire ivoirien pour vous servir au plus près.
            </p>
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">28</div>
              <div className="text-sicta-grey-light">Agences permanentes</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">22</div>
              <div className="text-sicta-grey-light">Stations temporaires</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">1500+</div>
              <div className="text-sicta-grey-light">Véhicules/jour</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sicta-grey-light">Couverture nationale</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Network Section */}
      <NetworkInteractiveSection />

      {/* Interactive Map & Network Sections */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
              Carte Interactive du Réseau
            </h2>
            <p className="text-xl text-sicta-grey-light">
              Localisez facilement l'agence SICTA la plus proche de vous et explorez notre réseau
            </p>
          </div>

          <Card className="card-elevated h-96 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/20 relative overflow-hidden mb-12">
            <img 
              src={networkMapModern} 
              alt="Carte du réseau SICTA" 
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 text-center space-y-4 bg-white/90 backdrop-blur-sm rounded-xl p-8">
              <MapPin className="h-16 w-16 text-primary mx-auto" />
              <h3 className="text-2xl font-semibold">Carte Interactive</h3>
              <p className="text-sicta-grey-light max-w-md">
                Localisez toutes nos agences avec géolocalisation et itinéraires optimisés
              </p>
              <Button className="btn-hero">
                <Navigation className="h-4 w-4 mr-2" />
                Voir la carte complète
              </Button>
            </div>
          </Card>

          <Tabs defaultValue="permanent" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="permanent" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Agences Permanentes
              </TabsTrigger>
              <TabsTrigger value="temporary" className="flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                Stations Temporaires
              </TabsTrigger>
            </TabsList>

            <TabsContent value="permanent">
              <div className="text-center mb-8">
                <p className="text-lg text-sicta-grey-light">
                  Nos principales agences pour tous vos besoins de contrôle technique
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {permanentAgencies.map((agency, index) => (
                  <Card key={index} className="card-elevated h-full">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Car className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{agency.name}</h3>
                      </div>

                      <div className="space-y-3 mb-6 flex-grow">
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-sicta-grey-light mt-1 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium">{agency.address}</div>
                            <div className="text-sicta-grey-light">{agency.city}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-sicta-grey-light" />
                          <span className="text-sm text-sicta-grey-light">{agency.phone}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-sicta-grey-light" />
                          <span className="text-sm text-sicta-grey-light">{agency.hours}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-sicta-grey-light" />
                          <span className="text-sm text-sicta-grey-light">{agency.capacity}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-medium mb-2">Services disponibles :</div>
                        <div className="flex flex-wrap gap-2">
                          {agency.services.map((service, serviceIndex) => (
                            <span
                              key={serviceIndex}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button className="btn-hero flex-1 text-sm py-2">
                          Réserver
                        </Button>
                        <Button variant="outline" className="flex-1 text-sm py-2">
                          Itinéraire
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="temporary">
              <div className="text-center mb-8">
                <p className="text-lg text-sicta-grey-light">
                  Nos unités mobiles pour desservir l'ensemble du territoire
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {temporaryStations.map((station, index) => (
                  <Card key={index} className="card-elevated">
                    <div className="p-6 text-center">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Car className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{station.name}</h3>
                      <div className="text-sicta-grey-light text-sm mb-3">{station.city}</div>
                      <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mb-4">
                        {station.schedule}
                      </div>
                      <div className="space-y-1">
                        {station.services.map((service, serviceIndex) => (
                          <div key={serviceIndex} className="text-xs text-sicta-grey-light">
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Card className="card-elevated inline-block p-6">
                  <h3 className="font-semibold mb-2">Planning des Stations Mobiles</h3>
                  <p className="text-sicta-grey-light text-sm mb-4">
                    Consultez le calendrier complet des passages de nos unités mobiles
                  </p>
                  <Button className="btn-hero">
                    <Calendar className="h-4 w-4 mr-2" />
                    Voir le planning complet
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-orange-400">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Une agence près de chez vous</h2>
          <p className="text-xl mb-8 opacity-90">
            Trouvez l'agence SICTA la plus proche et réservez votre contrôle technique
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg">
            <MapPin className="h-5 w-5 mr-3" />
            Localiser une agence
          </Button>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default Network;