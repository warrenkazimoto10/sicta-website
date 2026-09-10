import { Calendar, User, ArrowRight, Clock, Newspaper, TrendingUp, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/services/articleService";

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const News = () => {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 60_000,
  });

  const featuredArticle = articles.find((a) => a.a_la_une);
  const allArticles = articles.filter((a) => !a.a_la_une);

  return (
    <PageTransition>
      <SEO
        title="Actualités - SICTA"
        description="Les dernières actualités SICTA : entreprise, sécurité routière, innovation et réglementation du contrôle technique en Côte d'Ivoire."
        url="/actualites"
      />
      <div className="w-full min-h-screen bg-white">

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1117] via-[#1a1c23] to-[#251810] text-white border-b border-white/5 py-16 md:py-20">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Média & Presse</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]">
                Actualités <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-orange-400">SICTA</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {isLoading ? (
          <div className="container mx-auto px-4 py-16 space-y-20">
            <div className="max-w-6xl mx-auto">
              <Skeleton className="h-[440px] w-full rounded-xl" />
            </div>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[350px] rounded-xl" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* À LA UNE */}
            {featuredArticle && (
              <section className="py-14 md:py-18 bg-gray-50/50 border-b border-gray-100">
                <div className="container mx-auto px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-0.5 w-8 bg-primary rounded-full" />
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">À la une</span>
                    </div>

                    <Card className="overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 group">
                      <article className="grid lg:grid-cols-2 gap-0">
                        {/* Image gauche */}
                        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[440px] overflow-hidden bg-gray-100">
                          {featuredArticle.image_principale ? (
                            <img
                              src={featuredArticle.image_principale}
                              alt={featuredArticle.titre}
                              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                              <Newspaper className="h-16 w-16 text-orange-300" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                        </div>

                        {/* Contenu droite */}
                        <div className="flex flex-col justify-center p-8 lg:p-12 bg-white">
                          <div className="flex items-center gap-2.5 mb-5">
                            {featuredArticle.categorie && (
                              <Badge className="bg-primary hover:bg-primary/95 text-white border-0 px-3 py-1 text-xs">
                                {featuredArticle.categorie}
                              </Badge>
                            )}
                            {featuredArticle.tendance && (
                              <Badge variant="outline" className="border-orange-200 text-orange-600 gap-1 px-2.5 py-0.5 text-xs bg-orange-50/50">
                                <TrendingUp className="h-3.5 w-3.5" />
                                Tendance
                              </Badge>
                            )}
                          </div>

                          <Link to={`/actualites/${featuredArticle.slug}`}>
                            <h2 className="text-2xl md:text-3xl font-black text-sicta-grey-dark leading-tight mb-4 hover:text-primary transition-colors">
                              {featuredArticle.titre}
                            </h2>
                          </Link>

                          {featuredArticle.extrait && (
                            <p className="text-sicta-grey-light leading-relaxed mb-6 text-base line-clamp-3">
                              {featuredArticle.extrait}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-sicta-grey-light pb-5 mb-5 border-b border-gray-100">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-primary" />
                              {formatDate(featuredArticle.date_publication)}
                            </span>
                            {featuredArticle.temps_lecture && (
                              <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-primary" />
                                {featuredArticle.temps_lecture}
                              </span>
                            )}
                            <span className="flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5 text-primary" />
                              {featuredArticle.auteur}
                            </span>
                          </div>

                          <Link
                            to={`/actualites/${featuredArticle.slug}`}
                            className="inline-flex items-center gap-1.5 text-primary font-bold hover:gap-2.5 transition-all text-sm"
                          >
                            Lire l'article
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </article>
                    </Card>
                  </div>
                </div>
              </section>
            )}

            {/* Toutes les actualités */}
            <section className="py-16 md:py-20">
              <div className="container mx-auto px-4">
                  {allArticles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {allArticles.map((article, index) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: index * 0.07 }}
                        >
                          <Card className="group h-full overflow-hidden border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-400">
                            <Link to={`/actualites/${article.slug}`} className="flex flex-col h-full">
                              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                {article.image_principale ? (
                                  <img
                                    src={article.image_principale}
                                    alt={article.titre}
                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-600"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                                    <Newspaper className="h-10 w-10 text-orange-300" />
                                  </div>
                                )}
                                {article.categorie && (
                                  <Badge className="absolute top-4 left-4 bg-primary text-white border-0 shadow-sm">
                                    {article.categorie}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex flex-col flex-1 p-5 bg-white">
                                <h3 className="font-bold text-base text-sicta-grey-dark group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                  {article.titre}
                                </h3>
                                {article.extrait && (
                                  <p className="text-sm text-sicta-grey-light leading-relaxed line-clamp-3 flex-1 mb-4">
                                    {article.extrait}
                                  </p>
                                )}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                  <div className="flex items-center gap-3 text-xs text-sicta-grey-light">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {formatDate(article.date_publication)}
                                    </span>
                                    {article.temps_lecture && (
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {article.temps_lecture}
                                      </span>
                                    )}
                                  </div>
                                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                                    Lire <ArrowRight className="h-3.5 w-3.5" />
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                        <Newspaper className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sicta-grey-light">Aucun article disponible pour le moment.</p>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
      </div>
    </PageTransition>
  );
};

export default News;
