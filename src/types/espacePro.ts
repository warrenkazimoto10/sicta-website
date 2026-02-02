// Types pour l'Espace PRO SICTA

export type VehicleType = "particulier" | "transport" | "utilitaire" | "poids-lourd";
export type VehicleStatus = "valide" | "expire" | "bientot-du";
export type AlertType = "controle" | "document" | "rappel" | "maintenance";
export type AlertPriority = "haute" | "moyenne" | "basse";
export type NotificationType = "alerte" | "document" | "demande" | "systeme" | "rappel";
export type RequestType = "transfert-plaque" | "civio" | "ivn" | "jaugeage" | "immatriculation" | "ppad" | "autre";
export type RequestStatus = "en-attente" | "en-cours" | "traite" | "refuse" | "annule";
export type UserRole = "admin" | "gestionnaire" | "viewer";
export type DocumentType = "certificat" | "rapport" | "facture" | "autre";
export type DocumentStatus = "valide" | "expire" | "disponible" | "archive";

export interface Company {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  siret?: string;
  nombreVehicules: number;
  dateCreation: string;
  actif: boolean;
}

export interface User {
  id: string;
  companyId: string;
  email: string;
  nom: string;
  prenom: string;
  telephone?: string;
  role: UserRole;
  actif: boolean;
  dateCreation: string;
  derniereConnexion?: string;
}

export interface FleetVehicle {
  id: string;
  companyId: string;
  immatriculation: string;
  marque: string;
  modele: string;
  type: VehicleType;
  numeroSerie?: string;
  anneeFabrication?: number;
  couleur?: string;
  dernierControle: string;
  prochainControle: string;
  statut: VehicleStatus;
  joursRestants: number;
  agence: string;
  agenceId?: string;
  kilometrage?: number;
  dateAjout: string;
  dateModification?: string;
  notes?: string;
}

export interface ControlHistory {
  id: string;
  vehicleId: string;
  dateControle: string;
  agence: string;
  agenceId?: string;
  resultat: "favorable" | "defavorable" | "contre-visite";
  observations?: string;
  documents?: string[]; // IDs des documents
  kilometrage?: number;
  technicien?: string;
}

export interface Alert {
  id: string;
  companyId: string;
  vehicleId: string;
  type: AlertType;
  message: string;
  date: string;
  priorite: AlertPriority;
  lu: boolean;
  actionRequise: boolean;
  dateEcheance?: string;
  configurable: boolean;
}

export interface Notification {
  id: string;
  companyId: string;
  userId?: string;
  type: NotificationType;
  titre: string;
  message: string;
  date: string;
  lu: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface Request {
  id: string;
  companyId: string;
  vehicleId: string;
  type: RequestType;
  dateCreation: string;
  dateModification?: string;
  statut: RequestStatus;
  description: string;
  documents?: string[]; // IDs des documents
  commentaires?: RequestComment[];
  assigneA?: string; // User ID
  priorite?: AlertPriority;
  metadata?: Record<string, any>;
}

export interface RequestComment {
  id: string;
  requestId: string;
  userId: string;
  userName: string;
  commentaire: string;
  date: string;
  interne: boolean; // Commentaire interne ou visible au client
}

export interface Document {
  id: string;
  companyId: string;
  vehicleId?: string;
  requestId?: string;
  nom: string;
  type: DocumentType;
  statut: DocumentStatus;
  taille: number; // en bytes
  mimeType: string;
  url: string;
  dateUpload: string;
  dateExpiration?: string;
  uploadedBy?: string; // User ID
}

export interface AlertSettings {
  companyId: string;
  seuilJours: number; // Jours avant expiration pour alerter
  emailActif: boolean;
  smsActif: boolean;
  pushActif: boolean;
  emailDestinataires: string[];
  smsDestinataires: string[];
  alertesAutomatiques: boolean;
  heuresEnvoi?: string[]; // Ex: ["09:00", "17:00"]
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  company: Company;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface VehicleFormData {
  immatriculation: string;
  marque: string;
  modele: string;
  type: VehicleType;
  numeroSerie?: string;
  anneeFabrication?: number;
  couleur?: string;
  dernierControle: string;
  agence: string;
  kilometrage?: number;
  notes?: string;
}

export interface RequestFormData {
  vehicleId: string;
  type: RequestType;
  description: string;
  documents?: File[];
  priorite?: AlertPriority;
}

export interface CompanySettingsFormData {
  nom: string;
  email: string;
  telephone: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  siret?: string;
}

export interface AlertSettingsFormData {
  seuilJours: number;
  emailActif: boolean;
  smsActif: boolean;
  pushActif: boolean;
  emailDestinataires: string[];
  smsDestinataires: string[];
  alertesAutomatiques: boolean;
  heuresEnvoi?: string[];
}

export interface ExportOptions {
  format: "excel" | "pdf" | "csv";
  filters?: Record<string, any>;
  columns?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface DashboardStats {
  totalVehicles: number;
  vehiclesValid: number;
  vehiclesExpired: number;
  vehiclesDueSoon: number;
  totalAlerts: number;
  unreadNotifications: number;
  pendingRequests: number;
  monthlyControls: number;
  totalCost: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }[];
}



