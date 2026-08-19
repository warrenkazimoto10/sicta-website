import { Suspense, lazy, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const NetworkCanvas = lazy(() => import("./NetworkCanvas"));

/**
 * Fond 3D « réseau de particules » — lazy-load, avec repli léger
 * sur mobile, faible puissance ou prefers-reduced-motion.
 */
const ParticleBackground = ({ className = "" }: { className?: string }) => {
  const reduce = useReducedMotion();
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const smallScreen = window.matchMedia("(max-width: 768px)").matches;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (!smallScreen && !lowCores) {
      // On active après le premier paint pour ne pas peser sur le TTI
      const t = setTimeout(() => setEnable(true), 200);
      return () => clearTimeout(t);
    }
  }, [reduce]);

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      {/* Repli visuel (toujours présent, masqué par le canvas quand actif) */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />
      </div>
      {enable && (
        <Suspense fallback={null}>
          <NetworkCanvas />
        </Suspense>
      )}
    </div>
  );
};

export default ParticleBackground;
