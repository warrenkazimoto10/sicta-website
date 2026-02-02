import visiteTechniqueHero from "@/assets/services/visite-technique-hero.png";

export interface PeriodiciteItem {
  typeVehicule: string;
  periodicite: string;
}

export interface ResultatPossible {
  resultat: string;
  signification: string;
  documentDelivre: string;
}

export interface Tarif {
  type: string;
  prix: string;
  description?: string;
}

/** Section de tarifs pour l’affichage en grille (document officiel « Contrôle technique automobile ») */
export interface TarifsSection {
  titre: string;
  periodicite?: string;
  items: { libelle: string; code?: string; prix: string }[];
}

export const visiteTechniqueData = {
  // Métadonnées
  id: "visite-technique",
  slug: "controle-technique",
  titre: "Visite Technique Automobile",
  titreCourt: "Visite Technique",
  descriptionCourte: "Examen réglementaire et obligatoire pour vérifier l'état mécanique des véhicules selon les normes de sécurité routière et de protection de l'environnement.",
  imageHero: visiteTechniqueHero,

  // Description complète du produit
  descriptionProduit: "La Visite Technique Automobile est un examen réglementaire et obligatoire qui vise à vérifier l'état mécanique des véhicules afin de garantir leur conformité aux normes en matière de sécurité routière et de protection de l'environnement. Il s'applique à tous les véhicules automobiles en circulation, particuliers comme professionnels, selon une périodicité définie par la réglementation ivoirienne.",

  // Objectifs
  objectifs: [
    "Garantir la fiabilité technique des véhicules et prévenir les risques liés à des défaillances mécaniques.",
    "Veillez au respect de la réglementation des véhicules en assurant la conformité vis-à-vis des normes définies par la législation ivoirienne en matière de véhicules.",
    "Contrôler et réduire les émissions polluantes des véhicules en circulation."
  ],

  // Véhicules concernés
  vehiculesConcernes: [
    "Véhicules particuliers",
    "Véhicules utilitaires",
    "Véhicules de transport (Taxis, VTC, Transport public et privé)",
    "Véhicules industriels, engins spéciaux / poids lourds"
  ],

  // Périodicité (tableau structuré)
  periodicite: [
    {
      typeVehicule: "Véhicules particuliers",
      periodicite: "1 an"
    },
    {
      typeVehicule: "Véhicules de transport privé",
      periodicite: "1 an"
    },
    {
      typeVehicule: "Véhicules de transport public, y compris auto-école",
      periodicite: "6 mois"
    }
  ] as PeriodiciteItem[],

  // Points de contrôle essentiels
  pointsControle: [
    "Identification du véhicule",
    "Pneumatiques et contrôle visuel équipements de sécurité (ceintures, rétroviseur, sièges, vitrage, triangles etc.)",
    "Emission des gaz et niveau sonore",
    "Alignement et dérive",
    "Freinage",
    "Direction et suspension",
    "Eclairage et signalisation",
    "Contrôle sous véhicule (fixation, jeu articulation et roulement, état silentbloc...)"
  ],

  // Documents requis
  documentsRequis: [
    "Carte grise du véhicule",
    "Assurance",
    "Ancien certificat de contrôle (facultatif)",
    "Carte de transport (si applicable)"
  ],

  // Résultats possibles (tableau structuré)
  resultatsPossibles: [
    {
      resultat: "Visite valide",
      signification: "Véhicule conforme et en bon état selon les points soumis au contrôle",
      documentDelivre: "Certificat de visite technique accompagné d'un rapport de visite"
    },
    {
      resultat: "Visite sans validité",
      signification: "Véhicule non conforme ou défaillances constatées",
      documentDelivre: "Uniquement rapport de visite comportant les non-conformités ou défaillances à corriger"
    }
  ] as ResultatPossible[],

  // Réseau SICTA (liste simple)
  reseauSicta: [
    "Stations fixes dans les principales villes",
    "Abidjan: Vridi, GUA, Marcory, Plateau, Abatta, Angré, Yopougon zone industrielle, Niangon",
    "Intérieur: Yamoussoukro, Bouaké, Korhogo, Odienné, Man, Guiglo, Daloa, Bouaflé, Gagnoa, Divo, Soubré, San-Pedro, Adzopé, Yaou, Aboisso, Dabou, Agboville, Abengourou, Daoukro, Agnibilekrou, Bondoukou"
  ],

  // Tarifs (résumé pour cartes)
  tarifs: [
    { type: "Véhicule léger (<= 7 CV) VL1", prix: "13 100 FCFA", description: "P.T.A.C. < 3,5 t" },
    { type: "Véhicule léger (> 7 CV) VL2", prix: "15 500 FCFA", description: "P.T.A.C. < 3,5 t" },
    { type: "Poids lourd P.T.A.C. < 10 t (PL1)", prix: "18 000 FCFA", description: "Remorques, semi-remorques inclus" },
    { type: "Poids lourd P.T.A.C. ≥ 10 t (PL2)", prix: "20 450 FCFA", description: "Tracteurs, engins spéciaux" },
    { type: "Revisite VL / TP1-TP2 (RE1)", prix: "12 350 FCFA", description: "Re-contrôle" },
    { type: "Revisite PL / TP3-TP4 (RE2)", prix: "14 700 FCFA", description: "Re-contrôle" },
    { type: "Visite VIP", prix: "7 000 FCFA", description: "Service premium" },
    { type: "Pre-Visite", prix: "12 000 FCFA", description: "Optionnel" }
  ] as Tarif[],

  /** Tarifs détaillés par section (document officiel 1- CONTRÔLE TECHNIQUE AUTOMOBILE) */
  tarifsDetail: [
    {
      titre: "Véhicules de P.T.A.C. inférieur à 3,5 t (autres que transports de personnes)",
      periodicite: "1 fois l'an",
      items: [
        { libelle: "Véhicules puissance fiscale ≤ 7 CV", code: "VL1", prix: "13 100 F" },
        { libelle: "Véhicules puissance fiscale > 7 CV", code: "VL2", prix: "15 500 F" },
        { libelle: "Revisite", code: "RE1", prix: "12 350 F" },
      ],
    },
    {
      titre: "Véhicules de P.T.A.C. supérieur ou égal à 3,5 t (autres que transports de personnes)",
      periodicite: "1 fois l'an",
      items: [
        { libelle: "Véhicules P.T.A.C. < 10 t (dont remorques et semi-remorques)", code: "PL1", prix: "18 000 F" },
        { libelle: "Véhicules P.T.A.C. ≥ 10 t (tracteurs routiers, engins spéciaux)", code: "PL2", prix: "20 450 F" },
        { libelle: "Revisite", code: "RE2", prix: "14 700 F" },
      ],
    },
    {
      titre: "Véhicules de transport public ou privé de personnes",
      periodicite: "2 fois l'an (sauf transport privé : 1 fois l'an)",
      items: [
        { libelle: "PF ≤ 7 CV, nombre de places ≤ 9", code: "TP1", prix: "13 100 F" },
        { libelle: "PF > 7 CV, nombre de places ≤ 9", code: "TP2", prix: "15 500 F" },
        { libelle: "Revisite TP1 / TP2", code: "RE1", prix: "12 350 F" },
        { libelle: "Nombre de places > 9 et ≤ 25", code: "TP3", prix: "18 000 F" },
        { libelle: "Nombre de places > 25", code: "TP4", prix: "20 450 F" },
        { libelle: "Revisite TP3 / TP4", code: "RE2", prix: "14 700 F" },
      ],
    },
    {
      titre: "Compteur horokilométrique",
      items: [
        { libelle: "Contrôle de compteur horokilométrique", code: "TP5", prix: "3 250 F" },
        { libelle: "Redevance compteur horokilométrique", prix: "2 500 F" },
      ],
    },
    {
      titre: "Timbre et sécurisation",
      items: [
        { libelle: "Timbre", prix: "100 F" },
        { libelle: "Sécurisation carte visite technique", prix: "500 F" },
      ],
    },
    {
      titre: "Autres services",
      items: [
        { libelle: "Pre-Visite", prix: "12 000 F" },
        { libelle: "Visite VIP", prix: "7 000 F" },
        { libelle: "Pesée de véhicule (instance d'immatriculation)", prix: "8 200 F" },
        { libelle: "Extrait de carte grise", prix: "2 000 F" },
        { libelle: "Duplicata de visite technique", prix: "12 950 F" },
      ],
    },
  ] as TarifsSection[],
};

export type VisiteTechniqueData = typeof visiteTechniqueData;



