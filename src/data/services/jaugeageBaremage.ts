import jaugeageHero from "@/assets/services/Jaugeage.png";

export interface EtapeJaugeage {
  etape: string;
  description: string;
}

export interface BeneficeClient {
  benefice: string;
}

export interface LieuExecution {
  type: string;
  site: string;
  description?: string;
  /** Lien Google Maps pour « Itinéraire » */
  mapsUrl?: string;
}

export const jaugeageBaremageData = {
  // Métadonnées
  id: "jaugeage-baremage",
  slug: "jaugeage-baremage",
  titre: "Jaugeage et Barémage",
  titreCourt: "Jaugeage & Barémage",
  descriptionCourte: "Service technique certifié pour mesurer précisément la capacité volumétrique des citernes selon les normes internationales. Établissement de tables de jaugeage pour garantir la transparence des transactions commerciales.",
  imageHero: jaugeageHero,

  // Description complète du produit
  descriptionProduit:
    "Le jaugeage et le barémage constituent un service technique certifié permettant de mesurer précisément la capacité volumétrique de différents types de réservoirs (camions citernes, cuves fixes, réservoirs de stockage, etc.) selon les normes internationales. L'objectif est d'établir une table de jaugeage qui indique la capacité volumétrique d'un contenant à un ou plusieurs niveaux, matérialisés ou non : soit une table donnant le volume en fonction de la hauteur du produit, soit une table donnant le volume en fonction de la hauteur du creux. Ce processus contribue à la sécurité et à la fiabilité des transactions commerciales impliquant des produits pétroliers, à la prévention de la fraude et à la conformité réglementaire.",

  // Objectifs
  objectifs: [
    "Déterminer avec précision la capacité réelle d'une citerne mobile ou d'une cuve fixe",
    "Établir une table de jaugeage volume = f(hauteur du produit) pour la lecture depuis le fond",
    "Établir une table de jaugeage volume = f(hauteur du creux) pour la lecture depuis le sommet",
    "Permettre un meilleur arbitrage lors des transactions commerciales",
    "Garantir la transparence et la traçabilité dans les transactions",
    "Assurer la conformité réglementaire exigée par les autorités de contrôle"
  ],

  // Public/Véhicules concernés
  publicConcernes: [
    "Entreprises pétrolières",
    "Transporteurs de produits liquides (carburant, huile, eau, produits chimiques)",
    "Stations-service",
    "Entreprises industrielles disposant de cuves de stockage",
    "Administrations de contrôle"
  ],

  // Livrables
  livrables: [
    "Certificat de jaugeage et certificat de barémage",
    "Table de jaugeage (papier ou numérique)"
  ],

  // Documents requis
  documentsRequis: [
    "Carte grise du véhicule",
    "Document constructeur pour les cuves neuves",
    "Numéros de série pour les cuves appartenant à la Présidence, l'Armée et les cuves de l'intérieur"
  ],

  // Bénéfices pour le client
  beneficesClient: [
    { benefice: "Fiabilité dans les transactions commerciales" },
    { benefice: "Préservation de l'environnement" },
    { benefice: "Sécurité du personnel lors des opérations" },
    { benefice: "Sécurisation de la chaîne d'approvisionnement" },
    { benefice: "Crédibilité accrue auprès des clients et partenaires" },
    { benefice: "Réduction des litiges et contestations" },
    { benefice: "Conformité aux exigences nationales" }
  ] as BeneficeClient[],

  // Résultats possibles / Étapes du processus (tableau structuré)
  etapesProcessus: [
    {
      etape: "Prise de RDV pour les opérations extérieures des cuves fixes",
      description: "Planification de l'opération sur un site extérieur"
    },
    {
      etape: "Inspection préalable",
      description: "Identification de la citerne ; Vérification de l'état et de la conformité de la citerne"
    },
    {
      etape: "Prise de mesure",
      description: "Remplissage étapes par étapes et mesure des volumes"
    },
    {
      etape: "Établissement du certificat",
      description: "Élaboration du certificat ou de la table de jaugeage certifiée"
    },
    {
      etape: "Remise du certificat",
      description: "Remise officielle du certificat de jaugeage et de la table de barémage"
    }
  ] as EtapeJaugeage[],

  // Lieux d'exécution
  lieuxExecution: [
    {
      type: "Camions citernes GASOIL et SUPER",
      site: "SICTA Yopougon zone industrielle",
      description: "Site certifié et équipé d'instruments étalonnés. Opérations réalisées conformément aux normes internationales.",
      mapsUrl: "https://www.google.com/maps/place/Sicta+YOPOUGON/@5.3291625,-4.0768352,12z/data=!4m10!1m2!2m1!1ssicta!3m6!1s0xfc1c0057ec56f9b:0x1d4e3ad341a9c9fe!8m2!3d5.3727557!4d-4.0800007!15sCgVzaWN0YZIBFmNhcl9pbnNwZWN0aW9uX3N0YXRpb27gAQA!16s%2Fg%2F11f55yygd7?entry=ttu"
    },
    {
      type: "Camions citernes JET",
      site: "Pool HRS Aéroport Port-Bouët",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pool+HRS+A%C3%A9roport+Port-Bouet+Abidjan"
    }
  ] as LieuExecution[],

  // Contact
  contact: {
    entreprise: "SICTA - Siège",
    adresse: "Abidjan, Côte d'Ivoire, Zone 4C",
    email: "info@sicta.ci"
  }
};

export type JaugeageBaremageData = typeof jaugeageBaremageData;

// --- Types et données pour les tables de jaugeage (Volume = f(hauteur produit) ou f(hauteur creux)) ---

export type ModeTableJaugeage = "produit" | "creux";

export interface LigneTableJaugeage {
  /** Hauteur en mm (produit: depuis le fond ; creux: depuis le sommet) */
  hauteurMm: number;
  /** Volume correspondant en litres */
  volumeL: number;
  /** Niveau matérialisé sur la cuve (traits de jauge, repères) */
  niveauMaterialise?: boolean;
}

/** Données d'exemple pour une table de jaugeage (volume = f(hauteur)). À remplacer par les valeurs réelles par contenant. */
export const exempleTableJaugeageProduit: LigneTableJaugeage[] = [
  { hauteurMm: 0, volumeL: 0, niveauMaterialise: true },
  { hauteurMm: 100, volumeL: 245, niveauMaterialise: false },
  { hauteurMm: 200, volumeL: 512, niveauMaterialise: false },
  { hauteurMm: 300, volumeL: 798, niveauMaterialise: true },
  { hauteurMm: 400, volumeL: 1095, niveauMaterialise: false },
  { hauteurMm: 500, volumeL: 1402, niveauMaterialise: false },
  { hauteurMm: 600, volumeL: 1718, niveauMaterialise: true },
  { hauteurMm: 700, volumeL: 2042, niveauMaterialise: false },
  { hauteurMm: 800, volumeL: 2374, niveauMaterialise: false },
  { hauteurMm: 900, volumeL: 2712, niveauMaterialise: true },
  { hauteurMm: 1000, volumeL: 3056, niveauMaterialise: false },
];

/** Même cuve, lecture par hauteur du creux (ullage). Hauteur creux = hauteur totale - hauteur produit. */
export const exempleTableJaugeageCreux: LigneTableJaugeage[] = (() => {
  const hauteurTotaleMm = 1000;
  const volumeTotalL = 3056;
  return exempleTableJaugeageProduit.map((l) => ({
    hauteurMm: hauteurTotaleMm - l.hauteurMm,
    volumeL: volumeTotalL - l.volumeL,
    niveauMaterialise: l.niveauMaterialise,
  })).reverse();
})();



