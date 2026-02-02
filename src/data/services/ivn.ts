import ivnHero from "@/assets/services/ivn.png";

export interface EtapeIVN {
  etape: string;
  description: string;
}

export interface AvantageClient {
  avantage: string;
}

export interface Tarif {
  service: string;
  prix: string;
  description?: string;
}

export const ivnData = {
  // Métadonnées
  id: "ivn",
  slug: "ivn",
  titre: "Identification de Véhicule Neuf (IVN)",
  titreCourt: "IVN",
  descriptionCourte: "SICTA effectue directement l'identification des véhicules neufs et la sécurisation des récépissés WW chez le concessionnaire. Solution de proximité pour les concessionnaires.",
  imageHero: ivnHero,

  // Description complète du produit
  descriptionProduit: "SICTA effectue directement l'identification des véhicules neufs et la sécurisation des récépissés WW chez le concessionnaire. Cette solution de proximité évite aux concessionnaires de se déplacer vers les centres SICTA. Elle garantit une prise en charge rapide et sécurisée des démarches administratives, permettant une disponibilité quasi immédiate des documents.",

  // Objectifs
  objectifs: [
    "Faciliter les opérations d'identification et de sécurisation pour les concessionnaires",
    "Réduire les délais de mise à disposition des récépissés WW",
    "Améliorer la satisfaction client et l'efficacité logistique"
  ],

  // Avantages pour le client
  avantagesClient: [
    { avantage: "Aucun déplacement nécessaire" },
    { avantage: "Gain de temps et simplification des démarches" },
    { avantage: "Sécurisation fiable et certifiée des récépissés WW" },
    { avantage: "Livraison rapide sur site" },
    { avantage: "Accompagnement par des agents SICTA qualifiés" }
  ] as AvantageClient[],

  // Public/Véhicules concernés
  publicConcernes: [
    "Concessionnaires automobiles",
    "Importateurs de véhicules neufs"
  ],

  // Livrables
  livrables: [
    "Récépissés WW sécurisés",
    "Rapport d'identification"
  ],

  // Résultats possibles / Étapes du processus (tableau structuré)
  etapesProcessus: [
    {
      etape: "Enregistrement de la demande",
      description: "Le concessionnaire sollicite la SICTA via le canal dédié (mail, portail ou téléphone)"
    },
    {
      etape: "Déploiement de l'équipe SICTA",
      description: "Une équipe mobile se rend sur le site du concessionnaire"
    },
    {
      etape: "Identification des véhicules",
      description: "Relevé des numéros d'identification et contrôle de conformité"
    },
    {
      etape: "Sécurisation des récépissés WW",
      description: "Traitement et sécurisation immédiate des documents"
    },
    {
      etape: "Livraison",
      description: "Remise directe des récépissés WW sécurisés au concessionnaire"
    }
  ] as EtapeIVN[],

  // Documents requis
  documentsRequis: [
    "Mise à disposition d'un espace pour l'opération",
    "Documents administratifs requis (facture, certificat de conformité, etc.)"
  ],

  // Tarifs
  tarifs: [
    {
      service: "Identification V.N.",
      prix: "24 700 FCFA",
      description: "Véhicules neufs importés par les concessionnaires"
    }
  ] as Tarif[]
};

export type IvnData = typeof ivnData;



