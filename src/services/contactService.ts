import { apiClient } from "@/lib/apiClient";

export interface ContactPayload {
  nom_complet: string;
  telephone: string;
  email: string;
  sujet: string;
  message: string;
}

export function sendContactMessage(payload: ContactPayload) {
  return apiClient.post<{ success: boolean; message: string }>("/contact", payload);
}
