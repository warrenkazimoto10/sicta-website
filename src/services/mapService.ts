import { apiClient } from "@/lib/apiClient";

export interface MapStation {
  id: number;
  nom: string;
  ville: string | null;
  zone: string;
  type: string;
  telephone: string | null;
  horaires: string | null;
  services: string[];
  maps_url: string | null;
}

export interface MapPointAPI {
  id: number;
  type: "ville" | "station";
  label: string;
  ville: string | null;
  icone: string;
  taille: "grand" | "moyen" | "petit";
  x: number;
  y: number;
  count?: number;               // type=ville : nombre de stations
  stations?: MapStation[];      // type=ville
  station?: MapStation | null;  // type=station
}

export interface ReseauMap {
  image: string | null;
  points: MapPointAPI[];
}

export const fetchReseauMap = (): Promise<ReseauMap> =>
  apiClient.get<{ data: ReseauMap }>("/reseau-map").then((r) => r.data);
