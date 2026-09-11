import stationMobileHero from "@/assets/services/station-mobile-hero.png";

export interface Avantage {
  avantage: string;
  description: string;
}

export interface EtapeSouscription {
  etape: string;
  description: string;
}

export interface Equipement {
  nom: string;
  description?: string;
}

export const stationMobileData = {
  // Métadonnées
  id: "station-mobile",
  slug: "station-mobile",
  titre: "Station Mobile SICTA",
  titreCourt: "Station Mobile",
  descriptionCourte: "La station mobile SICTA se déplace chez vous ! Un service de contrôle technique rapide, flexible et de proximité pour entreprises, chantiers et flottes de véhicules.",
  imageHero: stationMobileHero,
  
  // Description complète du produit
  descriptionProduit: "La station mobile est un camion entièrement équipé des technologies modernes de contrôle technique. Elle a été conçue pour permettre à la SICTA de réaliser les opérations de contrôle directement sur les sites de ses partenaires et clients, sans déplacement de véhicules vers les stations.",
  
  // Objectifs
  objectifs: [
    "Offrir un service de contrôle technique rapide, flexible et de proximité aux entreprises, chantiers, administrations et flottes de véhicules, en garantissant le même niveau de fiabilité que dans une station fixe."
  ],
  
  // Public/Véhicules concernés
  publicConcernes: [
    "Entreprises et groupes disposant d'une flotte de véhicules",
    "Sociétés de BTP (chantier en cours)",
    "Administrations publiques",
    "Organisations disposant de véhicules lourds ou spécialisés",
    "Transporteurs privés et publics (camions, VTC, etc.)"
  ],
  
  // Avantages (résultats possibles)
  avantages: [
    {
      avantage: "Proximité",
      description: "Réalisation du contrôle sur site, sans déplacement du client"
    },
    {
      avantage: "Gain de temps",
      description: "Évite les files d'attente en station"
    },
    {
      avantage: "Performance",
      description: "Équipements de dernière génération identiques aux Stations SICTA"
    },
    {
      avantage: "Flexibilité",
      description: "Créneaux adaptés aux contraintes des clients (week-end / soirée)"
    },
    {
      avantage: "Professionnalisme",
      description: "Equipe qualifiée, formée aux spécificités du contrôle mobile"
    }
  ] as Avantage[],
  
  // Processus de souscription
  processusSouscription: [
    {
      etape: "1. Prérequis",
      description: "Disposer d'un site d'environ 600 m²"
    },
    {
      etape: "2. Demande",
      description: "Demande de mise à disposition (email / téléphone / site web)"
    },
    {
      etape: "3. Validation",
      description: "Validation du devis et planification de l'intervention"
    },
    {
      etape: "4. Déploiement",
      description: "Déploiement de la station mobile sur site"
    },
    {
      etape: "5. Exécution",
      description: "Exécution du contrôle technique"
    },
    {
      etape: "6. Remise",
      description: "Remise immédiate du procès-verbal et de la vignette"
    }
  ] as EtapeSouscription[],
  
  // Composantes / Équipements
  equipements: [
    {
      nom: "Bancs de freinage et de suspension intégrés",
      description: "Équipements de test complets pour freinage et suspension"
    },
    {
      nom: "Reglophare",
      description: "Appareil de réglage des phares pour conformité"
    },
    {
      nom: "Caméras intégrées pour contrôle sous plancher",
      description: "Inspection visuelle complète de la partie inférieure du véhicule"
    },
    {
      nom: "Machine de travail et imprimantes",
      description: "Équipement informatique pour traitement et impression des documents"
    },
    {
      nom: "Groupe électrogène autonome",
      description: "Alimentation électrique indépendante pour fonctionnement autonome"
    }
  ] as Equipement[],
  
  // Contact / Localisation
  contact: {
    adresse: "Rue Abli Mathieu, 1145 Zone 4C, Abidjan, Côte d'Ivoire",
    email: "infos@sicta.ci",
    telephone: "27 21 21 29 90"
  }
};

export type StationMobileData = typeof stationMobileData;



