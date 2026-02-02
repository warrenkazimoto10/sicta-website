import diagnosticHero from "@/assets/services/diagnostique.png";

export interface Modalite {
  element: string;
  description: string;
}

export interface AvantageClient {
  avantage: string;
}

export interface ResultatDiagnostic {
  resultat: string;
  signification: string;
  documentDelivre: string;
}

export const diagnosticData = {
  // Métadonnées
  id: "diagnostic",
  slug: "pre-visite",
  titre: "Diagnostic ou Pré-visite",
  titreCourt: "Diagnostic / Pré-visite",
  descriptionCourte: "Anticipez les défauts, sécurisez votre véhicule. Service préventif pour identifier les anomalies avant le contrôle technique réglementaire.",
  imageHero: diagnosticHero,

  // Description complète du produit
  descriptionProduit: "Le diagnostic (ou prévisite) est un service proposé en amont de la visite technique, permettant d'identifier les anomalies potentielles d'un véhicule avant le passage au contrôle technique réglementaire. Il s'agit d'un examen préventif visant à sécuriser le véhicule et à réduire le risque d'échec lors de la visite. Le Diagnostic est volontaire et peut se faire à tout moment selon le besoin du client.",

  // Objectifs
  objectifs: [
    "Préparer le véhicule à la visite technique",
    "Identifier les défauts ou non-conformités à corriger",
    "Orienter le propriétaire vers des actions correctives appropriées",
    "Renforcer la sécurité routière et la fiabilité du parc roulant"
  ],

  // Public/Véhicules concernés
  publicConcernes: [
    "Particuliers propriétaires de véhicules légers",
    "Flottes d'entreprises et gestionnaires de parc",
    "Transporteurs privés et publics (VTC, Taxi, interurbains et urbains)"
  ],

  // Contenu de la prestation
  contenuPrestation: [
    "Inspection visuelle et sur équipements moderne des principaux éléments (freins, éclairage, direction, suspension pneumatiques, émissions, sécurité, etc.)",
    "Analyse des éléments susceptibles d'être rejetés au contrôle technique"
  ],

  // Modalités (tableau structuré)
  modalites: [
    {
      element: "Durée de la prestation",
      description: "30 min"
    },
    {
      element: "Lieu",
      description: "Toutes les Stations SICTA"
    },
    {
      element: "Rendez-vous",
      description: "En ligne ou sur place"
    },
    {
      element: "Tarif TTC",
      description: "12 000 F (Toute catégorie)"
    }
  ] as Modalite[],

  // Avantages pour le client
  avantagesClient: [
    { avantage: "Gain de temps en évitant un retour pour contre-visite" },
    { avantage: "Un outil nécessaire pour toute personne lors de l'achat d'un véhicule usager" },
    { avantage: "Réduction des coûts liés aux défauts non détectés" },
    { avantage: "Accompagnement personnalisé par des experts du contrôle technique" },
    { avantage: "Anticipation des réparations nécessaires" }
  ] as AvantageClient[],

  // Résultats possibles (tableau structuré)
  resultatsPossibles: [
    {
      resultat: "Diagnostic favorable",
      signification: "Véhicule conforme et en bon état",
      documentDelivre: "Rapport de diagnostic. Possibilité de transformer en visite technique"
    },
    {
      resultat: "Diagnostic non favorable",
      signification: "Véhicule non conforme ou défaillances constatées",
      documentDelivre: "Rapport de diagnostic pour correction"
    }
  ] as ResultatDiagnostic[],

  // Documents requis
  documentsRequis: [
    "Carte grise ou extrait de carte grise",
    "Le diagnostic n'a pas de valeur réglementaire et ne remplace pas la visite technique"
  ]
};

export type DiagnosticData = typeof diagnosticData;



