import { apiClient } from "@/lib/apiClient";

export interface ReservationPayload {
  station_nom?: string | null;
  categorie_vehicule: "moto" | "auto" | "pl";
  puissance_cv?: string;
  immatriculation: string;
  prenom: string;
  nom: string;
  telephone: string;
  date_rdv: string;
  heure_rdv: string;
}

export interface ReservationResponse {
  success: boolean;
  numero_reservation: string;
  message: string;
}

export function createReservation(payload: ReservationPayload) {
  return apiClient.post<ReservationResponse>("/reservations", payload);
}
