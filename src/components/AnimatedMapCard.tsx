import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Building2, Navigation, MapPin, Layers } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchStationStats } from "@/services/stationService";

function useCountUp(target: number, run: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (!target) { setValue(0); return; }
    const steps = 40;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setValue(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(t);
    }, durationMs / steps);
    return () => clearInterval(t);
  }, [target, run, durationMs]);
  return value;
}

const AnimatedMapCard = () => {
  const { ref, isInView } = useScrollAnimation(0.2);

  const { data: stats } = useQuery({
    queryKey: ["station-stats"],
    queryFn: fetchStationStats,
    staleTime: 300_000,
  });

  const permanent = useCountUp(stats?.permanent ?? 29, isInView);
  const abidjan = useCountUp(7, isInView);
  const interieur = useCountUp(22, isInView);

  const tiles = [
    { icon: Building2, value: permanent, label: "Stations fixes", accent: "from-primary/15 to-primary/5" },
    { icon: Building2, value: abidjan, label: "Stations Abidjan", accent: "from-primary/15 to-primary/5" },
    { icon: Navigation, value: interieur, label: "Stations Intérieur", accent: "from-primary/15 to-primary/5" },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-sicta-bg-peach to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <MapPin className="h-4 w-4" /> Couverture nationale
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-sicta-grey-dark mb-3">
            La SICTA est <span className="text-gradient">partout en Côte d'Ivoire</span>
          </h2>
          <p className="text-lg text-sicta-grey-light max-w-2xl mx-auto">
            Un maillage du territoire pensé pour rapprocher le contrôle technique de chaque usager.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-center max-w-6xl mx-auto">
          {/* Carte encadrée */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-[2rem] blur-2xl" />
            <div className="relative bg-white rounded-3xl border border-primary/10 shadow-xl p-4 sm:p-6">
              <img
                src="/CARTE_SICTA.png"
                alt="Carte du réseau SICTA en Côte d'Ivoire"
                className="w-full h-auto"
                loading="lazy"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* Stats */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {tiles.map((tile, i) => (
                <motion.div
                  key={tile.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className={`rounded-2xl border border-primary/10 bg-gradient-to-br ${tile.accent} p-5`}
                >
                  <div className="h-11 w-11 rounded-xl bg-white/70 flex items-center justify-center mb-3 shadow-sm">
                    <tile.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary tabular-nums">{tile.value}</div>
                  <div className="text-xs text-sicta-grey-light mt-1 leading-tight">{tile.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedMapCard;
