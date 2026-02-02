import immatHero from "@/assets/services/immat.png";

export interface BeneficeClient {
  benefice: string;
}

export interface Condition {
  condition: string;
}

export interface Tarif {
  service: string;
  prix: string;
  description?: string;
}

/** Tranches d’âge pour les tarifs vignette */
export const VIGNETTE_AGE_LABELS = ["1 à 4 ans", "5 à 10 ans", "11 ans et +"] as const;

/** Tarifs Vignettes Auto - Moto 2025 (TARIF SICTA 2025) pour affichage sur la page Immatriculation */
export const tarifsVignette2025 = {
  titre: "Tarifs Vignettes Auto - Moto ",
  annees: VIGNETTE_AGE_LABELS,
  moto: [
    { libelle: "Moins de 125 cm³", prix: [5000, 3750, 3500] },
    { libelle: "125 cm³ et plus", prix: [12000, 9000, 6000] },
  ],
  auto: [
    { libelle: "2 - 3 - 4 (CV)", prix: [19000, 14250, 13500] },
    { libelle: "5 - 6 - 7 (CV)", prix: [35000, 26250, 25000] },
    { libelle: "8 - 9 - 10 - 11 (CV)", prix: [49000, 36750, 30000] },
    { libelle: "12 - 13 - 14 - 15 (CV)", prix: [96000, 72000, 40000] },
    { libelle: "16 CV et plus (camions)", prix: [190000, 142500, 80000] },
    { libelle: "16 CV et plus (voitures de tourisme)", prix: [250000, 142500, 80000] },
  ],
} as const;

export const immatriculationData = {
  // Métadonnées
  id: "immatriculation",
  slug: "immatriculation",
  titre: "Service d'Immatriculation",
  titreCourt: "Immatriculation",
  descriptionCourte: "Une plaque sécurisée, une identité légale. Service d'immatriculation officielle des véhicules avec pose de plaques sécurisées garantissant l'identification légale sur le territoire ivoirien.",
  imageHero: immatHero,

  // Description complète du produit
  descriptionProduit: "Le service d'immatriculation permet l'immatriculation officielle des véhicules auprès des autorités compétentes et la pose de plaques sécurisées. Il garantit l'identification légale du véhicule sur le territoire ivoirien pour assurer une circulation conforme à la réglementation en vigueur.",

  // Objectifs
  objectifs: [
    "Assurer la conformité du véhicule à la législation",
    "Sécuriser l'identification du véhicule (lutte contre la fraude)",
    "Faciliter le suivi et la traçabilité des véhicules tout au long de leur cycle de vie"
  ],

  // Public/Véhicules concernés
  publicConcernes: [
    "Particuliers (véhicules importés ou neufs)",
    "Entreprises et institutions",
    "Concessionnaires / Importateurs",
    "Gestionnaires de flotte"
  ],

  // Lieux de prestation — structure pour l’affichage
  lieuxPrestation: {
    titre: "Où bénéficier du service d'immatriculation ?",
    sousTitre: "Les Centres SICTA autorisés pour la sécurisation et la pose",
    secuResecu: {
      titre: "Pour la sécurisation ou la resécurisation des plaques",
      centres: ["Guichet Unique Abidjan", "SICTA Vridi", "Guichet Unique Bouaké", "Guichet Unique Korhogo"],
    },
    pose: {
      titre: "Pour la pose des plaques",
      texte: "Toutes les stations de SICTA ou autre site à la demande du client.",
    },
    vignettes: {
      titre: "Pour les impressions des vignettes Auto VN",
      texte: "Abidjan : GUA, Marcory, Treichville.",
    },
    transfertPose: {
      titre: "Transfert et pose de plaques d'immatriculation",
      texte: "Possibilité de transfert des plaques et d'intervention de pose sur site (pour parcs d'entreprises / flottes), sur demande.",
    },
    notePlaquesBleues:
      "Ce ne sont que les anciennes plaques d'immatriculation bleues. Nous ne posons pas les nouvelles plaques (blanches).",
  },

  // Bénéfices pour le client
  beneficesClient: [
    { benefice: "Rapidité et simplicité des démarches" },
    { benefice: "Sécurité des plaques" },
    { benefice: "Traçabilité immédiate" },
    { benefice: "Conformité du véhicule" }
  ] as BeneficeClient[],

  // Conditions / Prérequis
  conditions: [
    { condition: "Fournir tous les documents requis (originaux + copies)" },
    { condition: "Paiement des frais réglementaires et administratifs" },
    { condition: "Présentation physique du véhicule pour la pose de plaque" },
    { condition: "IMPORTANT : Concerne uniquement les anciennes plaques d'immatriculation bleues (non valable pour les nouvelles plaques blanches NY)" }
  ] as Condition[],

  // Tarifs (sécurisation plaques, identification, pesée, autres)
  tarifs: [
    {
      service: "Sécurisation et pose plaques (VL/PL)",
      prix: "5 700 FCFA",
      description: "Inclut le timbre de 100 F"
    },
    {
      service: "Identification V.N. (Véhicules neufs – Concessionnaires)",
      prix: "24 700 FCFA"
    },
    {
      service: "Identification V.O. – Véhicules légers (P.T.A.C. < 3,5 t)",
      prix: "31 050 FCFA"
    },
    {
      service: "Identification V.O. – Transport marchandises/personnes (P.T.A.C. > 3,5 t et places > 9)",
      prix: "52 425 FCFA"
    },
    {
      service: "Identification complémentaire (PL déclarés VL)",
      prix: "33 300 FCFA"
    },
    {
      service: "Duplicata fiche d'identification",
      prix: "5 000 FCFA"
    },
    {
      service: "Pesée de véhicule (en instance d'immat.)",
      prix: "8 200 FCFA"
    },
    {
      service: "Extrait de carte grise",
      prix: "2 000 FCFA"
    }
  ] as Tarif[],

  /** Tarifs identification détaillés (sections 2 et 3 du document officiel) */
  tarifsIdentificationDetail: [
    {
      titre: "Identification des véhicules neufs importés par les concessionnaires",
      items: [
        { libelle: "Identification V.N. (Véhicules neufs)", prix: "24 700 F" },
      ],
    },
    {
      titre: "Identification des véhicules importés d'occasion",
      items: [
        { libelle: "Véhicules légers – P.T.A.C. inférieur à 3,5 tonnes", prix: "31 050 F" },
        { libelle: "Véhicules de transport de marchandises ou de personnes (P.T.A.C. > 3,5 t et nombre de places > 9)", prix: "52 425 F" },
        { libelle: "Identification complémentaire (PL déclarés VL)", prix: "33 300 F" },
        { libelle: "Duplicata fiche d'identification", prix: "5 000 F" },
      ],
    },
  ],
};

export type ImmatriculationData = typeof immatriculationData;



