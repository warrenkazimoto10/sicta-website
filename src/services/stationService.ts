import { apiClient } from "@/lib/apiClient";

export interface ApiStation {
  id: number;
  nom: string;
  zone: "abidjan" | "interieur";
  ville: string;
  telephone: string;
  horaires: string;
  region: string | null;
  type: "permanent" | "periodique" | "mobile";
  latitude: number | null;
  longitude: number | null;
  services: string[];
  maps_url: string | null;
  texte_disponibilite: string | null;
  distance_km?: number;
}

export interface StationStats {
  permanent: number;
  periodique: number;
  mobile: number;
  total: number;
}

export const fetchStations = (): Promise<ApiStation[]> =>
  apiClient.get<{ data: ApiStation[] }>("/stations").then((r) => r.data);

export const fetchStationStats = (): Promise<StationStats> =>
  apiClient.get<{ success: boolean; data: StationStats }>("/stats").then((r) => r.data);

export const fetchNearestStations = (lat: number, lon: number, limit = 3): Promise<ApiStation[]> =>
  apiClient
    .get<{ success: boolean; data: ApiStation[] }>(
      `/stations/nearest?lat=${lat}&lon=${lon}&limit=${limit}`
    )
    .then((r) => r.data);
