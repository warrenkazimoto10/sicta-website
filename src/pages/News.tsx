import { useState, useMemo } from "react";
import { Calendar, User, ArrowRight, Clock, Newspaper, Tag, TrendingUp, Share2, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
      <div className="w-full min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
        {/* Hero éditorial amélioré */}
        <section className="relative overflow-hidden border-b border-gray-100/50 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
          {/* Pattern de fond */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
          </div>
          
          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold uppercase tracking-widest">Actualités SICTA</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-sicta-grey-dark tracking-tight leading-[1.1] mb-6">
                <span className="bg-gradient-to-r from-sicta-grey-dark to-primary bg-clip-text text-transparent">
                  Actualités & Communiqués
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-sicta-grey-light leading-relaxed max-w-2xl mx-auto mb-8">
                Innovations, partenariats, réglementation et engagement pour la sécurité routière. 
                Retrouvez toute l'actualité du groupe SICTA en Côte d'Ivoire.
              </p>

              {/* Statistiques rapides */}
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-12">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Newspaper className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-sicta-grey-dark">{ACTUALITES.length}</div>
                    <div className="text-xs text-sicta-grey-light">Articles publiés</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-sicta-grey-dark">100%</div>
                    <div className="text-xs text-sicta-grey-light">Actualité locale</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-sicta-grey-dark">5</div>
                    <div className="text-xs text-sicta-grey-light">Catégories</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filtres par catégorie améliorés */}
        <section className="sticky top-0 z-40 border-b border-gray-100/50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3 py-5">
              {categories.map((cat) => {
                const count = cat.id === "tous" 
                  ? ACTUALITES.length 
                  : ACTUALITES.filter(a => a.category === cat.id).length;
                
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden",
                      activeCategory === cat.id
                        ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/30"
                        : "text-sicta-grey-light bg-gray-50 hover:bg-gray-100 hover:text-sicta-grey-dark border border-gray-200"
                    )}
                  >
                    {cat.id !== "tous" && <Tag className={cn("h-3.5 w-3.5", activeCategory === cat.id ? "text-white" : "text-primary")} />}
                    <span>{cat.label}</span>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "ml-1 px-2 py-0.5 text-xs",
                        activeCategory === cat.id 
                          ? "bg-white/20 text-white border-white/30" 
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {count}
                    </Badge>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Article à la une amélioré */}
        {featuredArticle && filteredArticles.some((a) => a.id === featuredArticle.id) && (
          <section className="py-16 md:py-20 border-b border-gray-100/50 bg-gradient-to-b from-background to-secondary/10">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-12 bg-gradient-to-r from-primary to-orange-500 rounded-full" />
                    <p className="text-sm font-bold text-primary uppercase tracking-widest">
                      À la une
                    </p>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Article vedette
                    </Badge>
                  </div>
                  
                  <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                    <article className="grid lg:grid-cols-2 gap-0">
                      <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[450px] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                        <img
                          src={featuredArticle.image}
                          alt={featuredArticle.title}
                          className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                        <Badge className="absolute top-6 left-6 bg-primary text-white border-0 shadow-lg">
                          {getCategoryLabel(featuredArticle.category)}
                        </Badge>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <div className="flex items-center gap-4 text-sm opacity-90">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              {formatDate(featuredArticle.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              {featuredArticle.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center p-8 lg:p-12 bg-white">
                        <div className="mb-4">
                          <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Tendance
                          </Badge>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl font-bold text-sicta-grey-dark leading-tight mb-5 group-hover:text-primary transition-colors">
                          {featuredArticle.title}
                        </h2>
                        
                        <p className="text-sicta-grey-light leading-relaxed mb-6 text-lg">
                          {featuredArticle.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-sicta-grey-light mb-8 pb-6 border-b border-gray-100">
                          <span className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{featuredArticle.author}</span>
                          </span>
                        </div>
                        
                        <Link to={`/actualites/${featuredArticle.slug}`}>
                          <Button className="btn-hero w-fit group/btn text-base px-8 py-6">
                            Lire l'article complet
                            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </article>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Grille d'articles améliorée */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between mb-10"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-sicta-grey-dark mb-2">
                    {activeCategory === "tous" ? "Toutes les actualités" : getCategoryLabel(activeCategory)}
                  </h2>
                  <p className="text-sicta-grey-light">
                    {recentArticles.length} article{recentArticles.length > 1 ? "s" : ""} disponible{recentArticles.length > 1 ? "s" : ""}
                  </p>
                </div>
              </motion.div>
              
              {recentArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {recentArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="group h-full overflow-hidden border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-500">
                        <Link
                          to={`/actualites/${article.slug}`}
                          className="flex flex-col h-full"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Badge className="absolute top-4 left-4 bg-primary text-white border-0 shadow-lg">
                              {getCategoryLabel(article.category)}
                            </Badge>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                <Share2 className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col flex-1 p-6 bg-white">
                            <h3 className="font-bold text-lg text-sicta-grey-dark group-hover:text-primary transition-colors line-clamp-2 mb-3">
                              {article.title}
                            </h3>
                            
                            <p className="text-sm text-sicta-grey-light leading-relaxed line-clamp-3 flex-1 mb-4">
                              {article.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
                              <div className="flex items-center gap-3 text-xs text-sicta-grey-light">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {formatDate(article.date)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Clock className="h-3.5 w-3.5" />
                                  {article.readTime}
                                </span>
                              </div>
                              
                              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                                Lire
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-6">
                    <Newspaper className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-lg text-sicta-grey-light mb-2">Aucun article dans cette catégorie</p>
                  <p className="text-sm text-sicta-grey-light">Essayez une autre catégorie pour voir plus d'articles</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter améliorée */}
        <section className="border-t border-gray-100/50 bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-20 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                <Newspaper className="h-8 w-8 text-primary" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-sicta-grey-dark mb-4">
                Restez informé
              </h2>
              
              <p className="text-lg text-sicta-grey-light mb-10 leading-relaxed">
                Recevez les actualités SICTA et les rappels utiles (contrôle technique, réglementation) directement par e-mail.
              </p>
              
              <Card className="p-2 bg-white shadow-lg border-primary/20">
                <form 
                  className="flex flex-col sm:flex-row gap-3" 
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Votre adresse e-mail"
                    className="flex-1 min-w-0 px-5 py-4 rounded-lg border-2 border-gray-200 bg-white text-sicta-grey-dark placeholder:text-sicta-grey-light focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none text-base"
                  />
                  <Button 
                    type="submit" 
                    className="btn-hero px-8 py-4 whitespace-nowrap text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    S'abonner
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </Card>
              
              <p className="text-xs text-sicta-grey-light mt-6 flex items-center justify-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                Désinscription possible à tout moment. Nous ne partageons pas vos données.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default News;
