import { useState } from "react";
import {
  Shield,
  Truck,
  Eye,
  Car,
  Crown,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  Wrench,
  Search,
  Scale,
  FileCheck,
  Loader2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import NearestAgencyModal from "@/components/NearestAgencyModal";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/services/serviceService";
import { visiteTechniqueData } from "@/data/services/visiteTechnique";
import { civioData } from "@/data/services/civio";
import { jaugeageBaremageData } from "@/data/services/jaugeageBaremage";
import { immatriculationData } from "@/data/services/immatriculation";
import { stationMobileData } from "@/data/services/stationMobile";
import { diagnosticData } from "@/data/services/diagnostic";
import { ivnData } from "@/data/services/ivn";
import { ppadData } from "@/data/services/ppad";
import { vipData } from "@/data/services/vip";

const ICONS_MAP: Record<string, any> = {
  Shield, Search, Scale, FileCheck, Truck, Eye, Car, Wrench, Crown
};

// Données locales pour les fallbacks (icônes, images et points clés par défaut)
const localFallbackDetails: Record<string, any> = {
  "controle-technique": { ...visiteTechniqueData, icon: Shield },
  "civio": { ...civioData, icon: Search },
  "jaugeage-baremage": { ...jaugeageBaremageData, icon: Scale },
  "immatriculation": { ...immatriculationData, icon: FileCheck },
  "station-mobile": { ...stationMobileData, icon: Truck },
  "diagnostic": { ...diagnosticData, icon: Eye },
  "ivn": { ...ivnData, icon: Car },
  "ppad": { ...ppadData, icon: Wrench },
  "vip": { ...vipData, icon: Crown }
};

const Services = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [nearestOpen, setNearestOpen] = useState(false);

  // Récupérer les services de la base de données
  const { data: dbServices = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 60_000,
  });

  // Fusionner les données de la base de données avec nos détails de repli locaux
  const tousLesServices = dbServices.map((apiService) => {
    const fallback = localFallbackDetails[apiService.slug] ?? {
      titreCourt: apiService.nom,
      descriptionCourte: apiService.resume,
      imageHero: apiService.image || "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
      icon: Shield
    };

    // Déterminer l'icône à utiliser
    let IconComponent = Shield;
    if (apiService.icone && ICONS_MAP[apiService.icone]) {
      IconComponent = ICONS_MAP[apiService.icone];
    } else if (fallback.icon) {
      IconComponent = fallback.icon;
    }

    return {
      id: apiService.slug,
      slug: apiService.slug,
      titre: apiService.nom,
      titreCourt: apiService.nom,
      descriptionCourte: apiService.resume || fallback.descriptionCourte,
      imageHero: apiService.image || fallback.imageHero,
      icon: IconComponent,
      objectifs: fallback.objectifs,
      avantages: fallback.avantages,
      avantagesClient: fallback.avantagesClient,
      fonctionnalites: fallback.fonctionnalites,
      pointsControle: fallback.pointsControle,
      beneficesClient: fallback.beneficesClient,
    };
  });

  // Fonction pour rendre une carte de service
  const renderServiceCard = (service: any, index: number) => {
    const IconComponent = service.icon;
    return (
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
      >
        <Link to={`/services/${service.slug}`}>
          <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full group cursor-pointer relative min-h-[450px] bg-white">
            {/* Image hero du flyer en arrière-plan */}
            <div className="absolute inset-0 z-0">
              <img
                src={service.imageHero}
                alt={service.titre}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85 group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/75 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Badge en haut */}


            {/* Contenu */}
            <div className="relative z-10 h-full flex flex-col p-8 text-white">
              {/* Icône */}
              <div className="mb-6">
                <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl border-2 border-white/30">
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
              </div>

              {/* Titre */}
              <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                {service.titreCourt}
              </h3>

              {/* Description courte */}
              <p className="text-white/95 mb-8 leading-relaxed flex-1 text-lg">
                {service.descriptionCourte}
              </p>

              {/* Points clés */}
              <div className="mb-6 space-y-2">
                {'objectifs' in service && service.objectifs && service.objectifs.slice(0, 2).map((point: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{typeof point === 'string' ? point.split('(')[0].trim() : point}</span>
                  </div>
                ))}
                {'avantages' in service && service.avantages && service.avantages.slice(0, 2).map((avantage: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{typeof avantage === 'object' ? avantage.avantage : avantage}</span>
                  </div>
                ))}
                {'avantagesClient' in service && service.avantagesClient && service.avantagesClient.slice(0, 2).map((avantage: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{typeof avantage === 'object' ? avantage.avantage : avantage}</span>
                  </div>
                ))}
                {'fonctionnalites' in service && service.fonctionnalites && service.fonctionnalites.slice(0, 2).map((fonc: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{typeof fonc === 'object' ? fonc.fonctionnalite : fonc}</span>
                  </div>
                ))}
                {'pointsControle' in service && service.pointsControle && service.pointsControle.slice(0, 2).map((point: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{typeof point === 'string' ? point.split('(')[0].trim() : point}</span>
                  </div>
                ))}
                {'beneficesClient' in service && service.beneficesClient && service.beneficesClient.slice(0, 2).map((benefice: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{typeof benefice === 'object' ? benefice.benefice : benefice}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                className="w-full bg-white text-primary hover:bg-white/95 font-bold py-4 rounded-xl group-hover:shadow-2xl transition-all duration-300 text-lg border-2 border-transparent hover:border-primary/20"
              >
                Découvrir le service
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            {/* Effet de bordure */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-all duration-500 pointer-events-none" />
          </Card>
        </Link>
      </motion.div>
    );
  };

  return (
    <>
      <PageTransition>
        <SEO
          title="Nos services - Contrôle Technique et Solutions Automobiles"
          description="Découvrez tous les services SICTA : Contrôle technique, CIVIO, IVN, Jaugeage-Barémage, Immatriculation, Station Mobile, PPAD, Service VIP. Solutions complètes pour particuliers et professionnels."
          keywords="contrôle technique, CIVIO, IVN, jaugeage barémage, immatriculation, station mobile, PPAD, service VIP, inspection automobile, pesée véhicule"
          url="/services"
        />
        <div className="w-full">
          {/* Hero Section */}
          <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-sicta-orange-light/10">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >

                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="text-sicta-grey-dark">Nos</span>{" "}
                    <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-sicta-orange-light">
                      services
                    </span>
                  </h1>
                  <p className="text-xl lg:text-2xl text-sicta-grey-light leading-relaxed max-w-3xl mx-auto">
                    SICTA propose une gamme complète de services automobiles
                    pour répondre à tous vos besoins de contrôle et de certification.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Tous les Services */}
          <section ref={sectionRef} className="py-24 bg-sicta-bg-light">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sicta-grey-light font-medium text-sm">Chargement des services SICTA...</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tousLesServices.map((service, index) => renderServiceCard(service, index))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-sicta-grey via-sicta-grey-dark to-sicta-grey text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Prêt à passer votre visite technique ?
                </h2>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button size="lg" className="btn-hero text-lg px-10 py-7" onClick={() => setNearestOpen(true)}>
                    <MapPin className="h-6 w-6 mr-3" />
                    Trouvez une station SICTA à proximité
                  </Button>
                  {/* Bouton RDV temporairement désactivé */}
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </PageTransition>

      <NearestAgencyModal open={nearestOpen} onClose={() => setNearestOpen(false)} />
    </>
  );
};

export default Services;
