import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AnimatedMapCard = () => {
  const { ref, isInView } = useScrollAnimation(0.2);

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

        {/* Carte encadrée */}
        <motion.div
          className="relative max-w-3xl mx-auto"
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
      </div>
    </section>
  );
};

export default AnimatedMapCard;
