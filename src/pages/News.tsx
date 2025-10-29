import { Calendar, User, Tag, ArrowRight, Clock, Eye, TrendingUp, Award, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const featuredNews = {
  title: "SICTA rejoint le groupe Mayelia Participations : Une nouvelle ère d'innovation",
  excerpt: "Le rachat de SICTA par Mayelia Participations marque un tournant stratégique pour le leader du contrôle technique automobile en Côte d'Ivoire. Cette acquisition ouvre de nouvelles perspectives d'innovation et de développement.",
  date: "2024-12-15",
  author: "Direction SICTA",
  category: "Entreprise",
  readTime: "5 min",
  image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop&crop=center",
  views: "2,456",
  featured: true
};

const newsCategories = [
  { name: "Tous", count: 24, active: true },
  { name: "Entreprise", count: 8, active: false },
  { name: "Sécurité routière", count: 12, active: false },
  { name: "Innovation", count: 6, active: false },
  { name: "Réglementation", count: 4, active: false }
];

const recentNews = [
  {
    title: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    date: "2024-12-10",
    author: "Équipe SICTA",
    category: "Réglementation",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400&h=250&fit=crop&crop=center",
    views: "1,234",
    trending: false
  },
  {
    title: "Sed ut perspiciatis unde omnis iste natus error voluptatem",
    excerpt: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas.",
    date: "2024-12-08",
    author: "Rédaction SICTA",
    category: "Entreprise", 
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop&crop=center",
    views: "987",
    featured: false
  },
  {
    title: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    excerpt: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
    date: "2024-12-05",
    author: "Service Communication",
    category: "Sécurité routière",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop&crop=center",
    views: "1,567",
    trending: false
  },
  {
    title: "Temporibus autem quibusdam et aut officiis debitis aut",
    excerpt: "Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed.",
    date: "2024-12-01",
    author: "Direction Innovation",
    category: "Innovation",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&crop=center",
    views: "756",
    featured: false
  },
  {
    title: "Ut enim ad minima veniam quis nostrum exercitationem ullam",
    excerpt: "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer.",
    date: "2024-11-28",
    author: "Équipe Technique",
    category: "Sécurité routière",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop&crop=center",
    views: "1,089",
    trending: false
  },
  {
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
    excerpt: "Vitae suscipit tellus mauris a diam maecenas sed enim ut sem viverra aliquet eget sit amet tellus cras adipiscing enim eu turpis egestas.",
    date: "2024-11-25",
    author: "Direction Qualité",
    category: "Entreprise",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center",
    views: "892",
    featured: false
  }
];

const News = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  return (
    <PageTransition>
      <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="h-4 w-4" />
              <span>Actualités SICTA</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-sicta-grey-dark">Actualités &</span>{" "}
              <span className="text-gradient">Communiqués</span>
            </h1>
            <p className="text-xl text-sicta-grey-light leading-relaxed">
              Découvrez les dernières nouvelles de SICTA, nos innovations, 
              et notre engagement pour la sécurité routière en Côte d'Ivoire.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section ref={sectionRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-96 lg:h-auto overflow-hidden">
                    <img
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-sm rounded-full font-medium">
                        {featuredNews.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 text-sicta-grey-dark text-sm rounded-full font-medium">
                        Article principal
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-4 text-white text-sm">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>{featuredNews.views} vues</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{featuredNews.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex items-center">
                    <div className="w-full">
                      <h2 className="text-3xl lg:text-4xl font-bold text-sicta-grey-dark mb-6 leading-tight">
                        {featuredNews.title}
                      </h2>
                      
                      <p className="text-sicta-grey-light text-lg mb-8 leading-relaxed">
                        {featuredNews.excerpt}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-sicta-grey-light mb-8">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>15 Décembre 2024</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{featuredNews.author}</span>
                        </div>
                      </div>
                      
                      <Button className="btn-hero group">
                        Lire l'article complet
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {newsCategories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category.active 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary text-sicta-grey-light hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent News Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentNews.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-primary text-white text-xs rounded-full font-medium">
                          {article.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        {article.trending && (
                          <div className="flex items-center space-x-1 px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                            <TrendingUp className="h-3 w-3" />
                            <span>Trending</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between text-white text-xs">
                          <div className="flex items-center space-x-2">
                            <Eye className="h-3 w-3" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col h-full">
                      <h3 className="text-lg font-bold text-sicta-grey-dark mb-3 leading-tight group-hover:text-primary transition-colors flex-1">
                        {article.title}
                      </h3>
                      
                      <p className="text-sicta-grey-light text-sm mb-4 leading-relaxed flex-1">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-sicta-grey-light pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-sicta-orange-light group">
                          Lire plus
                          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button className="btn-hero px-8 py-3 group">
                Voir tous les articles
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-primary to-orange-400">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Restez informé</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Abonnez-vous à notre newsletter pour recevoir les dernières actualités SICTA directement dans votre boîte mail
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg text-sicta-grey-dark focus:ring-2 focus:ring-white/50 focus:outline-none transition-all"
              />
              <Button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 group">
                S'abonner
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              Nous respectons votre vie privée. Pas de spam, désinscription facile.
            </p>
          </motion.div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default News;