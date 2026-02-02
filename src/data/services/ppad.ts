import ppadHero from "@/assets/services/ppad.png";

export interface AvantageClient {
  avantage: string;
  description: string;
}

export interface EtapeFonctionnement {
  etape: string;
  description: string;
}

export interface ZoneCouverture {
  zone: string;
  description?: string;
}

export const ppadData = {
  // Métadonnées
  id: "ppad",
  slug: "ppad",
  titre: "Pose de Plaque à Domicile (PPAD)",
  titreCourt: "PPAD",
  descriptionCourte: "Service de sécurisation et pose de plaques directement à votre domicile, lieu de travail ou parking. Une équipe mobile se déplace pour installer vos plaques en toute conformité.",
  imageHero: ppadHero,

  // Description complète du produit
  descriptionProduit: "Le service \"Plaques à Domicile (PPAD)\" permet aux propriétaires de véhicules de faire sécuriser et poser leurs plaques sans avoir à se déplacer. Une équipe mobile se rend directement à l'adresse indiquée par le client (domicile, lieu de travail, parking, etc.) pour procéder à la pose en toute conformité.",

  // Objectifs
  objectifs: [
    "Simplifier le processus de pose de plaque pour les clients",
    "Réduire les files d'attente et la congestion dans les centres de pose",
    "Offrir un service de proximité, rapide et fiable",
    "Améliorer l'expérience client et renforcer la satisfaction"
  ],

  // Avantages pour le client
  avantagesClient: [
    {
      avantage: "Gain de temps",
      description: "Aucun déplacement nécessaire"
    },
    {
      avantage: "Confort",
      description: "Pose effectuée à l'endroit choisi par le client"
    },
    {
      avantage: "Traçabilité et Sécurité",
      description: "Service officiel et sécurisé"
    },
    {
      avantage: "Flexibilité",
      description: "Planification de rendez-vous selon la disponibilité du client"
    }
  ] as AvantageClient[],

  // Fonctionnement
  fonctionnement: [
    {
      etape: "Inscription",
      description: "Le client s'inscrit via le site web, l'application ou le numéro de contact"
    },
    {
      etape: "Informations",
      description: "Le client renseigne ses informations (véhicule, localisation, créneau souhaité)"
    },
    {
      etape: "Paiement",
      description: "Paiement du service en ligne ou au moment de la pose"
    },
    {
      etape: "Intervention",
      description: "Une équipe mobile se rend sur les lieux à la date/heure convenue pour procéder à la pose"
    }
  ] as EtapeFonctionnement[],

  // Public/Véhicules concernés
  publicConcernes: [
    "Tous types de véhicules ou motos"
  ],

  // Zones couvertes
  zonesCouvertes: [
    {
      zone: "Pour l'instant",
      description: "Abidjan (toutes les communes)"
    },
    {
      zone: "Extension prévue",
      description: "Bouaké, Yamoussoukro, San Pedro, Korhogo"
    }
  ] as ZoneCouverture[],

  // Tarif (mentionné dans immatriculation)
  tarif: {
    service: "Pose de plaque à domicile (PPAD)",
    prix: "10 000 FCFA",
    description: "Incluant la sécurisation"
  }
};

export type PpadData = typeof ppadData;



