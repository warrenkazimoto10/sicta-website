import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Navigation, Calendar, Building2 } from "lucide-react";
import { fetchReseauMap } from "@/services/mapService";
import type { MapPointAPI, MapStation } from "@/services/mapService";
import AnimatedMapCard from "@/components/AnimatedMapCard";

const TAILLE_PX: Record<string, number> = { grand: 46, moyen: 34, petit: 22 };
const TYPE_LABEL: Record<string, string> = { permanent: "Permanente", periodique: "Périodique", mobile: "Banc mobile" };

const NetworkImageMap = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [openPoint, setOpenPoint] = useState<MapPointAPI | null>(null);

  const { data } = useQuery({
    queryKey: ["reseau-map"],
    queryFn: fetchReseauMap,
    staleTime: 300_000,
  });

  const image = data?.image ?? null;
  const points = data?.points ?? [];

  // Repli : tant que la carte n'est pas configurée
  if (!image || points.length === 0) {
    return <AnimatedMapCard />;
  }

  const StationCard = ({ s }: { s: MapStation }) => (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: s.type === "mobile" ? "#eef2f7" : "#FEF3EC" }}>
          {s.type === "mobile" ? <Navigation className="h-5 w-5 text-slate-500" /> : <Building2 className="h-5 w-5 text-primary" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-800 leading-tight">{s.nom}</p>
          <p className="text-xs text-gray-400 mt-0.5">{s.ville} · {TYPE_LABEL[s.type] ?? s.type}</p>
        </div>
      </div>
      <div className="mt-3 space-y-1.5 text-sm text-gray-600">
        {s.telephone && (
          <a href={`tel:${s.telephone}`} className="flex items-center gap-2 hover:text-primary">
            <Phone className="h-3.5 w-3.5 text-gray-400" />{s.telephone}
          </a>
        )}
        {s.horaires && (
          <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-gray-400" />{s.horaires}</p>
        )}
      </div>
      {s.services.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {s.services.slice(0, 5).map((srv) => (
            <span key={srv} className="px-2 py-0.5 text-[11px] rounded-full bg-orange-50 text-orange-700 border border-orange-100">{srv}</span>
          ))}
        </div>
      )}
      <div className="mt-3 flex gap-2">
        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-white" onClick={() => { setOpenPoint(null); navigate("/reservation"); }}>
          <Calendar className="h-3.5 w-3.5 mr-1" /> Réserver
        </Button>
        {s.maps_url && (
          <Button size="sm" variant="outline" asChild>
            <a href={s.maps_url} target="_blank" rel="noopener noreferrer"><Navigation className="h-3.5 w-3.5" /></a>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-sicta-bg-peach to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <MapPin className="h-4 w-4" /> Couverture nationale
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-sicta-grey-dark mb-3">
            La SICTA est <span className="text-gradient">partout en Côte d'Ivoire</span>
          </h2>
          <p className="text-lg text-sicta-grey-light max-w-2xl mx-auto">
            Survolez un point pour le repérer, cliquez pour voir les détails.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-primary/10 shadow-xl bg-white">
            <img src={image} alt="Carte du réseau SICTA" className="w-full h-auto block" draggable={false} />

            {points.map((p, i) => {
              const size = TAILLE_PX[p.taille] ?? 34;
              const hovered = hoveredId === p.id;
              return (
                <div
                  key={p.id}
                  className="absolute"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Halo pulsant orange */}
                  <motion.span
                    className="absolute rounded-full"
                    style={{ background: "#E87722", width: size * 0.55, height: size * 0.55, left: "50%", top: "50%", x: "-50%", y: "-50%" }}
                    initial={{ opacity: 0.35, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.8 }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: (i % 8) * 0.25, ease: "easeOut" }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setOpenPoint(p)}
                    className="relative block cursor-pointer drop-shadow-md"
                    style={{ lineHeight: 0 }}
                    animate={{ scale: hovered ? 1.3 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    aria-label={p.label}
                  >
                    <img src="/iconeMap.png" alt="" width={size} height={size} className="object-contain select-none" draggable={false} />
                  </motion.button>
                </div>
              );
            })}

            {hoveredId !== null && (() => {
              const p = points.find((pt) => pt.id === hoveredId);
              if (!p) return null;
              return (
                <div
                  className="absolute z-20 pointer-events-none bg-white rounded-xl shadow-xl border border-orange-100 px-3 py-2"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, calc(-100% - 16px))" }}
                >
                  <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{p.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {p.type === "ville" ? `${p.count} station${(p.count ?? 0) > 1 ? "s" : ""}` : (TYPE_LABEL[p.station?.type ?? ""] ?? "Station")}
                  </p>
                </div>
              );
            })()}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" style={{ color: "#E87722" }} /><span className="text-sm text-sicta-grey-light">Ville (toutes ses stations)</span></div>
            <div className="flex items-center gap-2"><Building2 className="h-4 w-4" style={{ color: "#F5A867" }} /><span className="text-sm text-sicta-grey-light">Station fixe</span></div>
            <div className="flex items-center gap-2"><Navigation className="h-4 w-4" style={{ color: "#64748b" }} /><span className="text-sm text-sicta-grey-light">Banc mobile</span></div>
          </div>
        </div>
      </div>

      {/* Panneau : ville (liste) ou station (détail) */}
      <Sheet open={openPoint !== null} onOpenChange={() => setOpenPoint(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          {openPoint && openPoint.type === "ville" && (
            <>
              <SheetHeader className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ background: "#FEF3EC" }}>
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <SheetTitle className="text-lg leading-tight">{openPoint.label}</SheetTitle>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {openPoint.count} station{(openPoint.count ?? 0) > 1 ? "s" : ""} dans cette ville
                    </p>
                  </div>
                </div>
              </SheetHeader>
              <div className="space-y-3">
                {(openPoint.stations ?? []).map((s) => <StationCard key={s.id} s={s} />)}
                {(openPoint.stations ?? []).length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-8">Aucune station active dans cette ville.</p>
                )}
              </div>
            </>
          )}

          {openPoint && openPoint.type === "station" && openPoint.station && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center"
                    style={{ background: openPoint.station.type === "mobile" ? "#eef2f7" : "#FEF3EC" }}>
                    {openPoint.station.type === "mobile"
                      ? <Navigation className="h-6 w-6 text-slate-500" />
                      : <Building2 className="h-6 w-6 text-primary" />}
                  </div>
                  <div>
                    <SheetTitle className="text-lg leading-tight">{openPoint.label}</SheetTitle>
                    <p className="text-sm text-gray-400 mt-0.5">{openPoint.station.ville}</p>
                  </div>
                </div>
              </SheetHeader>
              <StationCard s={openPoint.station} />
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default NetworkImageMap;
