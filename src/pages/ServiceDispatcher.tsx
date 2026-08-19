import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { fetchService } from "@/services/serviceService";
import ServiceDynamic from "./ServiceDynamic";
import NotFound from "./NotFound";

// Pages codées existantes (design d'origine, riche)
import ControleTechnique from "./services/ControleTechnique";
import StationMobile from "./services/StationMobile";
import CIVIO from "./services/CIVIO";
import IVN from "./services/IVN";
import JaugeageBaremage from "./services/JaugeageBaremage";
import PreVisite from "./services/PreVisite";
import PPAD from "./services/PPAD";
import Pesee from "./services/Pesee";
import Assistance from "./services/Assistance";
import Immatriculation from "./services/Immatriculation";
import VIP from "./services/VIP";

const CODED: Record<string, React.ComponentType> = {
  "controle-technique": ControleTechnique,
  "station-mobile": StationMobile,
  "civio": CIVIO,
  "ivn": IVN,
  "jaugeage-baremage": JaugeageBaremage,
  "pre-visite": PreVisite,
  "ppad": PPAD,
  "pesee": Pesee,
  "assistance": Assistance,
  "immatriculation": Immatriculation,
  "vip": VIP,
};

/**
 * Aiguilleur : décide, pour un service donné, d'afficher la page codée
 * ou les blocs gérés depuis le backoffice (selon le réglage « Source d'affichage »).
 */
const ServiceDispatcher = () => {
  const { slug } = useParams<{ slug: string }>();
  const Coded = slug ? CODED[slug] : undefined;

  const { data: service, isLoading, isError } = useQuery({
    queryKey: ["service", slug],
    queryFn: () => fetchService(slug!),
    enabled: !!slug,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Service trouvé en base
  if (service && !isError) {
    if (service.source === "cms") return <ServiceDynamic />;
    if (Coded) return <Coded />;
    return <ServiceDynamic />; // service sans page codée → rendu CMS par défaut
  }

  // Pas en base : on garde la page codée si elle existe
  if (Coded) return <Coded />;
  return <NotFound />;
};

export default ServiceDispatcher;
