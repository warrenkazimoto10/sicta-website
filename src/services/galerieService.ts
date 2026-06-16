import { apiClient } from "@/lib/apiClient";

export interface MediaAPI {
  id: number;
  type: "image" | "video";
  fichier: string;
  legende: string | null;
  ordre: number;
}

export interface DossierAPI {
  id: number;
  nom: string;
  categorie: "agences" | "equipements" | "evenements" | "vehicules" | "autre";
  image_couverture: string | null;
  date: string | null;
  medias: MediaAPI[];
}

interface GalerieResponse {
  data: DossierAPI[];
}

export const fetchGalerie = (): Promise<DossierAPI[]> =>
  apiClient.get<GalerieResponse>("/galerie").then((r) => r.data);
