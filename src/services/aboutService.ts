import { apiClient } from "@/lib/apiClient";

export interface TeamMemberAPI {
  id: number;
  nom: string;
  role: string | null;
  photo: string | null;
  email: string | null;
  linkedin: string | null;
}

export interface HistoryEventAPI {
  id: number;
  annee: string;
  titre: string;
  description: string | null;
  image: string | null;
  highlight: boolean;
}

export const fetchTeam = (): Promise<TeamMemberAPI[]> =>
  apiClient.get<{ data: TeamMemberAPI[] }>("/team").then((r) => r.data);

export const fetchHistory = (): Promise<HistoryEventAPI[]> =>
  apiClient.get<{ data: HistoryEventAPI[] }>("/history").then((r) => r.data);
