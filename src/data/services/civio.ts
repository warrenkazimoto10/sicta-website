import civioHero from "@/assets/services/civio.png";

export interface EtapeControle {
  etape: string;
  description: string;
}

export interface ResultatAttendu {
  resultat: string;
}

export interface Tarif {
  service: string;
  prix: string;
  description?: string;
}

export const civioData = {
  // Métadonnées
  id: "civio",
  slug: "civio",
  titre: "CIVIO - Contrôle d'Identification des Véhicules Importés d'Occasion",
  titreCourt: "CIVIO",
  descriptionCourte: "Un contrôle certifié pour une traçabilité complète. Contrôle d'identification des véhicules importés d'occasion avant immatriculation.",
  imageHero: civioHero,

  // Description complète du produit
  descriptionProduit: "Le Contrôle d'Identification des Véhicules Importés d'Occasion (CIVIO) vise à vérifier l'authenticité des véhicules importés d'occasion en Côte d'Ivoire avant leur immatriculation. C'est une exigence réglementaire pour lutter contre la fraude, le trafic de véhicules et garantir la traçabilité.",

  // Objectifs
  objectifs: [
    "Vérifier la conformité des éléments d'identification (numéro de châssis, plaques constructeur, certificat d'origine...)",
    "Détecter d'éventuelles falsifications ou anomalies",
    "Attester de l'origine légale du véhicule",
    "Autoriser l'immatriculation du véhicule auprès des services compétents"
  ],

  // Public/Véhicules concernés
  publicConcernes: [
    "Importateurs de véhicules",
    "Transporteurs",
    "Particuliers",
    "Concessionnaires"
  ],

  // Stations équipées
  stationsEquipees: [
    "Abidjan (Guichet unique Abidjan)",
    "Bouaké (Guichet unique Bouaké)",
    "Korhogo (Guichet unique Korhogo)"
  ],

  // Documents requis
  documentsRequis: [
    "Certificat de conformité / carte grise originale",
    "Certificat de dédouanement",
    "Justificatif de propriété ou facture",
    "Pièce d'identité du propriétaire"
  ],

  // Principales étapes du contrôle
  etapesControle: [
    {
      etape: "Enregistrement",
      description: "Présentation des documents import (titre de propriété, certificat de dédouanement...)"
    },
    {
      etape: "Inspection physique",
      description: "Vérification des numéros de série, plaques constructeur, marquages et empreintes de châssis"
    },
    {
      etape: "Analyse documentaire",
      description: "Contrôle de concordance entre les éléments documentaires et le véhicule"
    },
    {
      etape: "Rapport & Attestation CIVIO",
      description: "Livraison d'un rapport donnant droit à l'immatriculation si le résultat est favorable"
    }
  ] as EtapeControle[],

  // Résultats attendus
  resultatsAttendus: [
    { resultat: "Sécurisation du parc automobile national" },
    { resultat: "Réduction de la fraude et des importations illégales" },
    { resultat: "Renforcement de la confiance des usagers et des autorités" }
  ] as ResultatAttendu[],

  // Tarifs
  tarifs: [
    {
      service: "Identification V.O. (VL)",
      prix: "31 050 FCFA",
      description: "PTAC inférieur à 3,5 tonnes"
    },
    {
      service: "Identification V.O. (PL)",
      prix: "52 425 FCFA",
      description: "PTAC supérieur à 3,5 tonnes ou > 9 places"
    }
  ] as Tarif[]
};

export type CivioData = typeof civioData;



