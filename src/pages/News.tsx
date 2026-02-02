import { useState, useMemo } from "react";
import { Calendar, User, ArrowRight, Clock, Newspaper, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ACTUALITES,
  NEWS_CATEGORIES,
  getCategoryLabel,
  type NewsCategoryId,
} from "@/data/actualites";

const categories = NEWS_CATEGORIES;

const News = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategoryId>("tous");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "tous") return ACTUALITES;
    return ACTUALITES.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const featuredArticle = ACTUALITES.find((a) => a.featured);
  const recentArticles = filteredArticles.filter((a) => !a.featured);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <PageTransition>
      <SEO
        title="Actualités & Communiqués - SICTA"
        description="Les dernières actualités SICTA : entreprise, sécurité routière, innovation et réglementation du contrôle technique en Côte d'Ivoire."
        url="/actualites"
      />
      <div className="w-full min-h-screen bg-white">
        {/* Hero éditorial */}
        <section className="border-b border-gray-100 bg-[#fafafa]">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-primary mb-4">
                <Newspaper className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-widest">Actualités SICTA</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sicta-grey-dark tracking-tight leading-[1.1] mb-6">
                Actualités & Communiqués
              </h1>
              <p className="text-lg md:text-xl text-sicta-grey-light leading-relaxed">
                Innovations, partenariats, réglementation et engagement pour la sécurité routière. 
                Retrouvez toute l'actualité du groupe SICTA en Côte d'Ivoire.
              </p>
            </div>
          </div>
        </section>

        {/* Filtres par catégorie */}
        <section className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 py-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                    activeCategory === cat.id
                      ? "bg-sicta-grey-dark text-white"
                      : "text-sicta-grey-light hover:bg-gray-100 hover:text-sicta-grey-dark"
                  )}
                >
                  {cat.id !== "tous" && <Tag className="h-3.5 w-3.5" />}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Article à la une */}
        {featuredArticle && filteredArticles.some((a) => a.id === featuredArticle.id) && (
          <section className="py-12 md:py-16 border-b border-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <p className="text-xs font-medium text-primary uppercase tracking-widest mb-4">
                  À la une
                </p>
                <article className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                      {getCategoryLabel(featuredArticle.category)}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-sicta-grey-dark leading-tight mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-sicta-grey-light leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-sicta-grey-light mb-6">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredArticle.date)}
                      </span>
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {featuredArticle.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {featuredArticle.readTime} de lecture
                      </span>
                    </div>
                    <Link to={`/actualites/${featuredArticle.slug}`}>
                      <Button className="btn-hero w-fit group">
                        Lire l'article
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}

        {/* Grille d'articles */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl font-semibold text-sicta-grey-dark mb-8">
                {activeCategory === "tous" ? "Toutes les actualités" : getCategoryLabel(activeCategory)}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {recentArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/actualites/${article.slug}`}
                    className="group flex flex-col rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-white">
                        {getCategoryLabel(article.category)}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="font-semibold text-sicta-grey-dark group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-sicta-grey-light leading-relaxed line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <span className="text-xs text-sicta-grey-light">
                          {formatDate(article.date)} · {article.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          Lire
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {filteredArticles.length === 0 && (
                <p className="text-center text-sicta-grey-light py-16">Aucun article dans cette catégorie.</p>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="border-t border-gray-100 bg-[#fafafa] py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-sicta-grey-dark mb-3">
                Restez informé
              </h2>
              <p className="text-sicta-grey-light mb-8">
                Recevez les actualités SICTA et les rappels utiles (contrôle technique, réglementation) directement par e-mail.
              </p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="flex-1 min-w-0 px-4 py-3 rounded-lg border border-gray-200 bg-white text-sicta-grey-dark placeholder:text-sicta-grey-light focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
                <Button type="submit" className="btn-hero px-6 py-3 whitespace-nowrap">
                  S'abonner
                </Button>
              </form>
              <p className="text-xs text-sicta-grey-light mt-4">
                Désinscription possible à tout moment. Nous ne partageons pas vos données.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default News;
