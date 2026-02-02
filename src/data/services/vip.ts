import vipHero from "@/assets/services/vip.png";

export interface FonctionnaliteVIP {
  fonctionnalite: string;
  description: string;
}

export interface EngagementSicta {
  engagement: string;
}

export const vipData = {
  // Métadonnées
  id: "vip",
  slug: "vip",
  titre: "Rendez-Vous / VIP Service",
  titreCourt: "Service VIP",
  descriptionCourte: "Service premium pour faciliter l'accès au contrôle technique automobile. Planifiez votre visite à une date et heure précises et bénéficiez d'un accueil privilégié sur site.",
  imageHero: vipHero,

  // Description complète du produit
  descriptionProduit: "Le service \"Rendez-Vous / VIP\" est une offre premium conçue pour faciliter l'accès au contrôle technique automobile pour les clients souhaitant gagner du temps, bénéficier d'une prise en charge personnalisée et d'un accompagnement dédié. Il permet aux clients de planifier une date et une heure précises pour leur visite et de bénéficier d'un accueil privilégié sur site.",

  // Objectifs
  objectifs: [
    "Réduire le temps d'attente du client lors du contrôle technique",
    "Offrir un service adapté aux emplois du temps chargés",
    "Améliorer la satisfaction client grâce à une expérience fluide et personnalisée",
    "Fidéliser la clientèle avec une offre différenciante"
  ],

  // Public/Véhicules concernés
  publicConcernes: [
    "Entreprises disposant d'un parc automobile",
    "Professionnels (médecins, cadres, diplomates, VTC, transporteurs)",
    "Particuliers recherchant un service rapide et personnalisé"
  ],

  // Modalités de souscription
  modalitesSouscription: [
    "Réservation possible via le site web SICTA, l'application mobile ou par appel téléphonique",
    "Confirmation du rendez-vous envoyée par SMS ou email",
    "Présence du client requise 10 à 15 minutes avant le créneau horaire indiqué"
  ],

  // Principales fonctionnalités / Avantages (tableau structuré)
  fonctionnalites: [
    {
      fonctionnalite: "Prise de rendez-vous en ligne ou par téléphone",
      description: "Choix de la date, du créneau horaire et du centre"
    },
    {
      fonctionnalite: "Accueil dédié à l'arrivée",
      description: "Priorité de traitement sans file d'attente"
    },
    {
      fonctionnalite: "Accompagnement personnalisé",
      description: "Un agent SICTA dédié guide le client pendant tout le processus"
    },
    {
      fonctionnalite: "Gain de temps",
      description: "Passage rapide et optimisé"
    },
    {
      fonctionnalite: "Service confortable",
      description: "Accès à un espace d'attente VIP"
    },
    {
      fonctionnalite: "Suivi client",
      description: "Rappel automatique de renouvellement de visite technique"
    }
  ] as FonctionnaliteVIP[],

  // Engagements de la SICTA
  engagementsSicta: [
    { engagement: "Respect des créneaux horaires confirmés" },
    { engagement: "Confidentialité et respect du client" },
    { engagement: "Service réalisé dans les mêmes conditions de sécurité et de conformité que les contrôles standards" }
  ] as EngagementSicta[]
};

export type VipData = typeof vipData;



