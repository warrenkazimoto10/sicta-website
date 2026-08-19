import { apiClient } from "@/lib/apiClient";

export interface ServiceSectionAPI {
  id: number;
  type: "intro" | "texte" | "avantages" | "etapes" | "tarifs" | "documents" | "faq" | "cta" | "custom";
  titre: string | null;
  sous_titre: string | null;
  contenu: any;
}

export interface ServiceDetailAPI {
  slug: string;
  nom: string;
  icone: string | null;
  resume: string | null;
  source: "code" | "cms";
  hero_titre: string | null;
  hero_sous_titre: string | null;
  hero_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  sections: ServiceSectionAPI[];
}

export interface ServiceListItemAPI {
  slug: string;
  nom: string;
  icone: string | null;
  resume: string | null;
  image: string | null;
  source: "code" | "cms";
}

export const fetchServices = (): Promise<ServiceListItemAPI[]> =>
  apiClient.get<{ data: ServiceListItemAPI[] }>("/services").then((r) => r.data);

export const fetchService = (slug: string): Promise<ServiceDetailAPI> =>
  apiClient.get<{ data: ServiceDetailAPI }>(`/services/${slug}`).then((r) => r.data);
