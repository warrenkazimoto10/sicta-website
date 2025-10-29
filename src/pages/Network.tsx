import { useState } from "react";
import { MapPin, Clock, Phone, Car, Navigation, Users, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";
import networkMapModern from "@/assets/network-map-modern.jpg";

// 29 Stations Permanentes
const permanentAgencies = [
  { name: "Abatta", city: "Abidjan", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Angré", city: "Abidjan", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Guichet Unique", city: "Abidjan", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"] },
  { name: "Marcory", city: "Abidjan", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Plateau", city: "Abidjan", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"] },
  { name: "Vridi", city: "Abidjan", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Yopougon Zone Industrielle", city: "Abidjan", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Yopougon Niangon", city: "Abidjan", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Abengourou", city: "Abengourou", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Aboisso", city: "Aboisso", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Adzopé", city: "Adzopé", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Agnibilékro", city: "Agnibilékro", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"] },
  { name: "Agboville", city: "Agboville", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Bondoukou", city: "Bondoukou", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Bouaké", city: "Bouaké", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"] },
  { name: "Bouaflé", city: "Bouaflé", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"] },
  { name: "Dabou", city: "Dabou", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Daloa", city: "Daloa", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"] },
  { name: "Daoukro", city: "Daoukro", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"] },
  { name: "Divo", city: "Divo", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Gagnoa", city: "Gagnoa", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Guiglo", city: "Guiglo", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"] },
  { name: "Korhogo", city: "Korhogo", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Man", city: "Man", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"] },
  { name: "Odienné", city: "Odienné", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"] },
  { name: "San Pédro", city: "San Pédro", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"] },
  { name: "Soubré", city: "Soubré", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"] },
  { name: "Yamoussoukro", city: "Yamoussoukro", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"] },
  { name: "Yaou", city: "Yaou", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"] }
];

// 22 Stations Temporaires
const temporaryStations = [
  { name: "Bongouanou", city: "Bongouanou", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Boundiali", city: "Boundiali", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Bouna", city: "Bouna", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Danané", city: "Danané", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Dimbokro", city: "Dimbokro", schedule: "Hebdomadaire", services: ["Contrôle technique", "CIVIO"] },
  { name: "Duékoué", city: "Duékoué", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Fresco", city: "Fresco", schedule: "Hebdomadaire", services: ["Contrôle technique", "CIVIO"] },
  { name: "Ferkessédougou", city: "Ferkessédougou", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Grand Lahou", city: "Grand Lahou", schedule: "Hebdomadaire", services: ["Contrôle technique", "CIVIO"] },
  { name: "Issia", city: "Issia", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Katiola", city: "Katiola", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "M'bahiakro", city: "M'bahiakro", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Méagui", city: "Méagui", schedule: "Hebdomadaire", services: ["Contrôle technique", "CIVIO"] },
  { name: "Oumé", city: "Oumé", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Sassandra", city: "Sassandra", schedule: "Hebdomadaire", services: ["Contrôle technique", "CIVIO"] },
  { name: "Séguéla", city: "Séguéla", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Tabou", city: "Tabou", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Tiassalé", city: "Tiassalé", schedule: "Hebdomadaire", services: ["Contrôle technique", "CIVIO"] },
  { name: "Tengrela", city: "Tengrela", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Toumodi", city: "Toumodi", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Touba", city: "Touba", schedule: "Hebdomadaire", services: ["Contrôle technique"] },
  { name: "Zuénoula", city: "Zuénoula", schedule: "Hebdomadaire", services: ["Contrôle technique"] }
];

// 4 Équipes de Mission
const missionTeams = [
  { team: "Équipe 1", base: "Abidjan", zones: ["Abidjan et environs"] },
  { team: "Équipe 2", base: "Yamoussoukro", zones: ["Centre du pays"] },
  { team: "Équipe 3", base: "Soubré", zones: ["Ouest du pays"] },
  { team: "Équipe 4", base: "Korhogo", zones: ["Nord du pays"] }
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
              29 stations permanentes et 22 stations temporaires réparties sur l'ensemble 
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
              <div className="text-4xl font-bold text-primary">29</div>
              <div className="text-sicta-grey-light">Stations permanentes</div>
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

      {/* Stations List */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Mission Teams */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
              4 Équipes de Mission
            </h2>
            <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
              Nos équipes parcourent les zones retirées avec des bancs mobiles pour une couverture optimale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionTeams.map((team, index) => (
              <Card key={index} className="card-elevated text-center">
                <div className="p-6">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{team.team}</h3>
                  <div className="text-primary font-medium mb-3">{team.base}</div>
                  <p className="text-sm text-sicta-grey-light">{team.zones.join(", ")}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Infrastructure */}
      <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
              Infrastructure Mobile
            </h2>
            <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
              Unités mobiles et bancs mobiles pour desservir tout le territoire ivoirien
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* 4 Stations Mobiles */}
            <Card className="card-elevated">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Navigation className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-sicta-grey-dark">4 Stations Mobiles</h3>
                    <p className="text-sicta-grey-light">Unités de contrôle itinérantes</p>
                  </div>
                </div>
                <p className="text-sicta-grey-light mb-6">
                  Nos stations mobiles équipées parcourent les zones moins accessibles pour apporter 
                  nos services de contrôle technique partout en Côte d'Ivoire.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-primary">100%</div>
                  <div className="text-sicta-grey-light">Zone de couverture accessible</div>
                </div>
              </div>
            </Card>

            {/* 4 Bancs Mobiles */}
            <Card className="card-elevated">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-sicta-grey-dark">4 Bancs Mobiles</h3>
                    <p className="text-sicta-grey-light">Équipement technique itinérant</p>
                  </div>
                </div>
                <p className="text-sicta-grey-light mb-6">
                  Nos bancs mobiles assurent la même qualité de contrôle technique que nos stations permanentes, 
                  avec des équipements certifiés et des techniciens qualifiés.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-primary">ISO</div>
                  <div className="text-sicta-grey-light">Certifié 9001:2015</div>
                </div>
              </div>
            </Card>
          </div>
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