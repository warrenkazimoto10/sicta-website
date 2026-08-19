import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Newspaper, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchArticles } from "@/services/articleService";
import newsHero from "@/assets/news-hero.jpg";

const formatDate = (date: string | null) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const HomeNewsSection = () => {
  const { ref, isInView } = useScrollAnimation(0.15);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 300_000,
  });

  const latest = articles.slice(0, 3);

  // Ne pas afficher la section s'il n'y a aucune actualité (hors chargement)
  if (!isLoading && latest.length === 0) return null;

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Newspaper className="h-4 w-4" />
              Actualités
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark leading-tight">
              Les dernières{" "}
              <span className="text-gradient">nouvelles de SICTA</span>
            </h2>
            <p className="text-lg text-sicta-grey-light mt-4">
              Innovations, réglementation et vie de l'entreprise : restez informé de toute l'actualité du contrôle technique.
            </p>
          </div>
          <Link to="/actualites" className="flex-shrink-0">
            <Button className="btn-hero">
              Toutes les actualités
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link to={`/actualites/${article.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden border-primary/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={article.image_principale || newsHero}
                      alt={article.titre}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      {article.categorie && (
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                          {article.categorie}
                        </Badge>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs text-sicta-grey-light">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(article.date_publication)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-sicta-grey-dark leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {article.titre}
                    </h3>
                    {article.extrait && (
                      <p className="text-sicta-grey-light text-sm line-clamp-3">
                        {article.extrait}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      {article.temps_lecture && (
                        <span className="inline-flex items-center gap-1 text-xs text-sicta-grey-light">
                          <Clock className="h-3.5 w-3.5" />
                          {article.temps_lecture}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Lire l'article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeNewsSection;
