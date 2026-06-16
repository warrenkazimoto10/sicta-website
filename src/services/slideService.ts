import { apiClient } from "@/lib/apiClient";

export interface SlideAPI {
  id: number;
  titre: string;
  sous_titre: string | null;
  description: string | null;
  badge_texte: string | null;
  image: string | null;
  bouton_texte: string | null;
  bouton_lien: string | null;
  stats: { icon?: string; value: string; label: string }[];
  ordre: number;
}

interface SlidesResponse {
  data: SlideAPI[];
}

export const fetchSlides = (): Promise<SlideAPI[]> =>
  apiClient.get<SlidesResponse>("/slides").then((r) => r.data);
