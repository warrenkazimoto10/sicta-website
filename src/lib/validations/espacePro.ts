import { z } from "zod";

// Schéma de validation pour le formulaire véhicule
export const vehicleFormSchema = z.object({
  immatriculation: z
    .string()
    .min(1, "L'immatriculation est requise")
    .regex(/^[A-Z0-9-]+$/, "Format d'immatriculation invalide"),
  marque: z.string().min(1, "La marque est requise"),
  modele: z.string().min(1, "Le modèle est requis"),
  type: z.enum(["particulier", "transport", "utilitaire", "poids-lourd"], {
    errorMap: () => ({ message: "Type de véhicule invalide" }),
  }),
  numeroSerie: z.string().optional(),
  anneeFabrication: z
    .number()
    .min(1900, "Année invalide")
    .max(new Date().getFullYear() + 1, "Année invalide")
    .optional(),
  couleur: z.string().optional(),
  dernierControle: z.string().min(1, "La date du dernier contrôle est requise"),
  agence: z.string().min(1, "La station est requise"),
  kilometrage: z.number().min(0, "Kilométrage invalide").optional(),
  notes: z.string().max(1000, "Les notes sont trop longues").optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

// Schéma de validation pour le formulaire demande
export const requestFormSchema = z.object({
  vehicleId: z.string().min(1, "Le véhicule est requis"),
  type: z.enum(
    ["transfert-plaque", "civio", "ivn", "jaugeage", "immatriculation", "ppad", "autre"],
    {
      errorMap: () => ({ message: "Type de demande invalide" }),
    }
  ),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(1000, "La description est trop longue"),
  priorite: z.enum(["haute", "moyenne", "basse"]).optional(),
});

export type RequestFormValues = z.infer<typeof requestFormSchema>;

// Schéma de validation pour les paramètres entreprise
export const companySettingsSchema = z.object({
  nom: z.string().min(1, "Le nom de l'entreprise est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(1, "Le téléphone est requis"),
  adresse: z.string().optional(),
  ville: z.string().optional(),
  codePostal: z.string().optional(),
  siret: z.string().optional(),
});

export type CompanySettingsValues = z.infer<typeof companySettingsSchema>;

// Schéma de validation pour la configuration des alertes
export const alertSettingsSchema = z.object({
  seuilJours: z.number().min(1, "Le seuil doit être d'au moins 1 jour").max(365),
  emailActif: z.boolean(),
  smsActif: z.boolean(),
  pushActif: z.boolean(),
  emailDestinataires: z.array(z.string().email("Email invalide")),
  smsDestinataires: z.array(z.string()),
  alertesAutomatiques: z.boolean(),
  heuresEnvoi: z.array(z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)).optional(),
});

export type AlertSettingsValues = z.infer<typeof alertSettingsSchema>;

// Schéma de validation pour la connexion
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  rememberMe: z.boolean().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;



