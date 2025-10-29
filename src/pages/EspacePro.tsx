import { Building2, Users, Shield, TrendingUp, Calendar, FileText, BarChart3, History, Calculator, Settings, ArrowRight, CheckCircle, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

const EspacePro = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [vehicleCount, setVehicleCount] = useState(10);

  // Calculer le taux de remise selon le nombre de véhicules
  const calculateDiscount = (count: number) => {
    if (count >= 100) return 25;
    if (count >= 50) return 20;
    if (count >= 25) return 15;
    if (count >= 10) return 10;
    return 0;
  };

  const services = [
    {
      icon: BarChart3,
      title: "Tableau de Bord Flotte",
      description: "Suivi centralisé de tous vos véhicules avec historique complet des contrôles",
      features: ["Vue d'ensemble de la flotte", "Alertes de contrôle", "Statistiques détaillées", "Rapports personnalisés"]
    },
    {
      icon: History,
      title: "Historique des Contrôles",
      description: "Accès complet à l'historique des contrôles par véhicule",
      features: ["Historique complet", "Téléchargement documents", "Notifications automatiques", "Archivage sécurisé"]
    },
    {
      icon: Calculator,
      title: "Calculateur Tarifs",
      description: "Tarifs préférentiels selon le volume de véhicules",
      features: ["Remises progressives", "Devis instantané", "Simulation coûts", "Contrats personnalisés"]
    },
    {
      icon: Settings,
      title: "Services sur Mesure",
      description: "Solutions adaptées aux besoins spécifiques de votre entreprise",
      features: ["Intervention sur site", "Horaires flexibles", "Support dédié", "Formation équipes"]
    }
  ];

  const benefits = [
    "Remises jusqu'à 25% selon le volume",
    "Gestion centralisée de votre flotte",
    "Support commercial dédié",
    "Interventions sur site possibles",
    "Formation de vos équipes",
    "Rapports personnalisés"
  ];

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                <span>Espace Professionnel</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Solutions</span>{" "}
                <span className="text-gradient">Entreprises</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Services dédiés aux gestionnaires de flottes et entreprises. 
                Tableau de bord, historique des contrôles, tarifs préférentiels et services sur mesure.
              </p>
            </div>
          </div>
        </section>

        {/* Services Pro */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Fonctionnalités Clés
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Des outils professionnels pour optimiser la gestion de votre flotte
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-sicta-grey-light mb-4 text-sm">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-xs text-sicta-grey">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      En savoir plus
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculateur Tarifs */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-sicta-grey-dark mb-6">
                  Calculateur de Tarifs
                </h2>
                <p className="text-xl text-sicta-grey-light mb-8">
                  Calculez vos remises selon le nombre de véhicules dans votre flotte
                </p>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="vehicles" className="text-lg font-medium text-sicta-grey-dark">
                      Nombre de véhicules
                    </Label>
                    <Input
                      id="vehicles"
                      type="number"
                      value={vehicleCount}
                      onChange={(e) => setVehicleCount(Number(e.target.value))}
                      className="mt-2 text-lg"
                      min="1"
                    />
                  </div>
                  
                  <Card className="p-6 bg-white/80 backdrop-blur">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {calculateDiscount(vehicleCount)}%
                      </div>
                      <div className="text-sicta-grey-dark font-medium">Remise appliquée</div>
                      <div className="text-sm text-sicta-grey-light mt-2">
                        {vehicleCount >= 100 && "Remise maximale pour flottes importantes"}
                        {vehicleCount >= 50 && vehicleCount < 100 && "Remise importante pour grandes flottes"}
                        {vehicleCount >= 25 && vehicleCount < 50 && "Remise attractive pour flottes moyennes"}
                        {vehicleCount >= 10 && vehicleCount < 25 && "Remise pour flottes petites"}
                        {vehicleCount < 10 && "Contactez-nous pour des tarifs personnalisés"}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="relative">
                <Card className="p-8 bg-white/80 backdrop-blur">
                  <div className="text-center">
                    <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <TrendingUp className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                      Tarifs Progressifs
                    </h3>
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-sicta-grey">1-9 véhicules</span>
                        <span className="font-semibold text-sicta-grey-dark">Tarif standard</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sicta-grey">10-24 véhicules</span>
                        <span className="font-semibold text-primary">-10%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sicta-grey">25-49 véhicules</span>
                        <span className="font-semibold text-primary">-15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sicta-grey">50-99 véhicules</span>
                        <span className="font-semibold text-primary">-20%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sicta-grey">100+ véhicules</span>
                        <span className="font-semibold text-primary">-25%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Avantages Entreprises
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Pourquoi choisir SICTA pour la gestion de votre flotte ?
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sicta-grey-dark font-medium">{benefit}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-sicta-grey text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à optimiser votre flotte ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contactez notre équipe commerciale pour une solution sur mesure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <FileText className="h-5 w-5 mr-2" />
                Demander un devis
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                <Building2 className="h-5 w-5 mr-2" />
                Nous contacter
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default EspacePro;