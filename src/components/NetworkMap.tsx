import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Navigation, Calendar, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ── Types ────────────────────────────────────────────────────────────────────

type AgencyType = "permanent" | "periodique" | "mobile";
type Region = "Toutes" | "Nord" | "Centre" | "Sud" | "Est" | "Ouest" | "Abidjan";

interface StationAPI {
  id: number;
  nom: string;
  zone: "abidjan" | "interieur";
  ville: string;
  telephone: string;
  horaires: string;
  region: string | null;
  type: AgencyType;
  latitude: number | null;
  longitude: number | null;
  services: string[];
  maps_url: string | null;
}

// ── Projection géographique → SVG ─────────────────────────────────────────
// viewBox "0 0 1000 900", emprise CI : lon [-8.6, -2.5], lat [4.3, 10.7]
function geoToSVG(
  lon: number,
  lat: number,
  w = 1000,
  h = 900
): { x: number; y: number } {
  const lonMin = -8.6, lonMax = -2.5;
  const latMin = 4.3,  latMax = 10.7;
  return {
    x: ((lon - lonMin) / (lonMax - lonMin)) * w,
    y: ((latMax - lat) / (latMax - latMin)) * h,
  };
}

// ── Contour SVG de la Côte d'Ivoire ──────────────────────────────────────
// Vertices tracés depuis des coordonnées WGS84 réelles, convertis via geoToSVG
const CI_PATH = [
  // Départ SE (frontière Ghana / côte)
  "M 898,841",
  // Frontière Ghana (vers le nord)
  "L 902,731 L 910,633 L 951,520 L 975,380 L 967,309 L 957,239 L 951,169 L 934,28",
  // Frontière nord (Burkina Faso / Mali, vers l'ouest)
  "L 836,5 L 672,0 L 508,5 L 377,28 L 279,98",
  // Frontière ouest (Guinée / Libéria, vers le sud)
  "L 180,169 L 115,309 L 66,464 L 82,591 L 148,731 L 164,830",
  // Côte sud (vers l'est jusqu'au point de départ)
  "L 203,883 L 295,894 L 393,841 L 508,830 L 623,802 L 705,788",
  "L 754,752 L 803,802 L 853,830 L 898,841 Z",
].join(" ");

const REGIONS: Region[] = ["Toutes", "Abidjan", "Nord", "Centre", "Est", "Ouest", "Sud"];

const REGION_COLORS: Record<Region, string> = {
  Toutes:  "#6b7280",
  Nord:    "#3b82f6",
  Centre:  "#8b5cf6",
  Est:     "#10b981",
  Ouest:   "#f59e0b",
  Sud:     "#06b6d4",
  Abidjan: "#E87722",
};

function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    const steps = 60;
    const interval = durationMs / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setValue(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(t);
    }, interval);
    return () => clearInterval(t);
  }, [target, durationMs]);
  return value;
}

const TYPE_COLORS: Record<AgencyType, string> = {
  permanent:  "#E87722",
  periodique: "#F5A867",
  mobile:     "#94a3b8",
};
const TYPE_R: Record<AgencyType, number> = {
  permanent:  7,
  periodique: 4,
  mobile:     5,
};
const TYPE_RING_R: Record<AgencyType, number> = {
  permanent:  16,
  periodique: 8,
  mobile:     10,
};

// ── Composant principal ───────────────────────────────────────────────────

const NetworkMap = () => {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState<Region>("Toutes");
  const [hoveredId, setHoveredId]       = useState<number | null>(null);
  const [selectedStation, setSelectedStation] = useState<StationAPI | null>(null);

  const { data: stations = [], isLoading } = useQuery<StationAPI[]>({
    queryKey: ["stations-map"],
    queryFn: () =>
      apiClient.get<{ data: StationAPI[] }>("/stations").then((r) => r.data),
    staleTime: 300_000,
  });

  const { data: stats } = useQuery<{ permanent: number; periodique: number; total: number }>({
    queryKey: ["station-stats"],
    queryFn: () =>
      apiClient.get<{ data: { permanent: number; periodique: number; total: number } }>("/stats")
        .then((r) => r.data),
    staleTime: 300_000,
  });

  const permanentCount  = useCountUp(stats?.permanent  ?? 0);
  const periodiqueCount = useCountUp(stats?.periodique ?? 0);

  const stationsWithCoords = stations.filter(
    (s) => s.latitude !== null && s.longitude !== null
  );

  const filtered = activeRegion === "Toutes"
    ? stationsWithCoords
    : stationsWithCoords.filter((s) => s.region === activeRegion);

  const isActive = (s: StationAPI) =>
    activeRegion === "Toutes" || s.region === activeRegion;

  return (
    <section className="py-16 bg-sicta-bg-peach">
      <div className="container mx-auto px-4">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-sicta-grey-dark mb-3">
            Carte de couverture nationale
          </h2>
          <p className="text-sicta-grey-light mb-8">
            Toutes les agences SICTA positionnées géographiquement sur le territoire ivoirien.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="text-center">
              <span className="text-4xl font-bold text-primary">{permanentCount}</span>
              <p className="text-sm text-sicta-grey-light mt-1">agences permanentes</p>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-primary">{periodiqueCount}</span>
              <p className="text-sm text-sicta-grey-light mt-1">stations périodiques</p>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-primary">
                {stats ? permanentCount + periodiqueCount : "—"}
              </span>
              <p className="text-sm text-sicta-grey-light mt-1">points de contrôle</p>
            </div>
          </div>
        </div>

        {/* ── Filtres région ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeRegion === r
                  ? "border-transparent text-white shadow-md"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
              }`}
              style={activeRegion === r ? { background: REGION_COLORS[r] } : {}}
            >
              {r}
            </button>
          ))}
        </div>

        {/* ── Carte SVG ── */}
        <div className="relative max-w-2xl mx-auto select-none">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <svg
            viewBox="0 0 1000 900"
            className="w-full h-auto drop-shadow-md"
            aria-label="Carte des agences SICTA en Côte d'Ivoire"
          >
            <defs>
              <filter id="map-shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#E87722" floodOpacity="0.10" />
              </filter>
            </defs>

            {/* Contour CI avec animation de tracé */}
            <motion.path
              d={CI_PATH}
              fill="#FEF3EC"
              stroke="#E87722"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#map-shadow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ pathLength: { duration: 2.2, ease: "easeInOut" }, opacity: { duration: 0.4 } }}
            />

            {/* Points des stations */}
            {stationsWithCoords.map((station, i) => {
              const { x, y } = geoToSVG(station.longitude!, station.latitude!);
              const color     = TYPE_COLORS[station.type] ?? "#E87722";
              const dotR      = TYPE_R[station.type] ?? 5;
              const ringR     = TYPE_RING_R[station.type] ?? 12;
              const active    = isActive(station);
              const hovered   = hoveredId === station.id;
              const pulseBegin = `${(i % 8) * 0.3}s`;

              return (
                <motion.g
                  key={station.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: active ? 1 : 0.15 }}
                  transition={{ delay: 2.3 + i * 0.04, duration: 0.3 }}
                  onMouseEnter={() => setHoveredId(station.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => active && setSelectedStation(station)}
                  style={{ cursor: active ? "pointer" : "default" }}
                >
                  {/* Anneau pulsant (SVG animate natif) */}
                  {active && (
                    <circle cx={x} cy={y} r={dotR} fill={color} opacity={0}>
                      <animate attributeName="r" values={`${dotR};${ringR}`} dur="2.5s" begin={pulseBegin} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0" dur="2.5s" begin={pulseBegin} repeatCount="indefinite" />
                    </circle>
                  )}

                  {/* Point principal */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={dotR}
                    fill={color}
                    stroke="white"
                    strokeWidth={1.5}
                    animate={{ r: hovered && active ? dotR * 1.7 : dotR }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  />
                </motion.g>
              );
            })}
          </svg>

          {/* Tooltip hover */}
          {hoveredId !== null && (() => {
            const s = stationsWithCoords.find((st) => st.id === hoveredId);
            if (!s || !s.latitude || !s.longitude) return null;
            const { x, y } = geoToSVG(s.longitude, s.latitude);
            return (
              <div
                className="absolute z-20 pointer-events-none bg-white rounded-xl shadow-xl border border-orange-100 px-3 py-2"
                style={{
                  left: `${(x / 1000) * 100}%`,
                  top:  `${(y / 900)  * 100}%`,
                  transform: "translate(-50%, calc(-100% - 12px))",
                }}
              >
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{s.nom}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {s.region ?? s.zone} · {s.type === "permanent" ? "Permanente" : s.type === "periodique" ? "Périodique" : "Mobile"}
                </p>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── Panel slide-in au clic ── */}
      <Sheet open={selectedStation !== null} onOpenChange={() => setSelectedStation(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          {selectedStation && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center"
                       style={{ background: "#FEF3EC" }}>
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <SheetTitle className="text-lg leading-tight">{selectedStation.nom}</SheetTitle>
                    <p className="text-sm text-gray-400 mt-0.5">{selectedStation.ville}</p>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Région</p>
                    <p className="text-sm font-medium text-gray-800">{selectedStation.region ?? "—"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Navigation className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Type</p>
                    <p className="text-sm font-medium text-gray-800 capitalize">{selectedStation.type}</p>
                  </div>
                </div>

                {selectedStation.telephone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Téléphone</p>
                      <a href={`tel:${selectedStation.telephone}`}
                         className="text-sm font-medium text-primary hover:underline">
                        {selectedStation.telephone}
                      </a>
                    </div>
                  </div>
                )}

                {selectedStation.horaires && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Horaires</p>
                      <p className="text-sm font-medium text-gray-800 whitespace-pre-line">{selectedStation.horaires}</p>
                    </div>
                  </div>
                )}

                {selectedStation.services.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Services</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedStation.services.map((srv) => (
                        <span key={srv}
                              className="px-2 py-0.5 text-xs rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-8">
                {/* Bouton RDV temporairement désactivé */}

                {selectedStation.maps_url && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={selectedStation.maps_url} target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-4 w-4 mr-2" />
                      Itinéraire Google Maps
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default NetworkMap;
