import { Calendar, User, Tag, ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";

const featuredNews = {
  title: "SICTA rejoint le groupe Mayelia Participations : Une nouvelle ère d'innovation",
  excerpt: "Le rachat de SICTA par Mayelia Participations marque un tournant stratégique pour le leader du contrôle technique automobile en Côte d'Ivoire.",
  date: "2024-12-15",
  author: "Direction SICTA",
  category: "Entreprise",
  readTime: "5 min",
  image: "/api/placeholder/800/400"
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
    title: "Nouvelle réglementation sur le contrôle technique des véhicules électriques",
    excerpt: "Les véhicules électriques font désormais l'objet de contrôles spécifiques adaptés à leur technologie.",
    date: "2024-12-10",
    author: "Service Technique",
    category: "Réglementation",
    readTime: "3 min"
  },
  {
    title: "Ouverture de 3 nouvelles agences SICTA en 2025",
    excerpt: "Dans le cadre de son expansion, SICTA annonce l'ouverture de nouvelles agences à Gagnoa, Divo et Agboville.",
    date: "2024-12-08",
    author: "Direction Commerciale",
    category: "Entreprise", 
    readTime: "4 min"
  },
  {
    title: "Campagne de sensibilisation : 'Ma sécurité, ma responsabilité'",
    excerpt: "SICTA lance une grande campagne de sensibilisation sur l'importance du contrôle technique pour la sécurité routière.",
    date: "2024-12-05",
    author: "Service Communication",
    category: "Sécurité routière",
    readTime: "2 min"
  },
  {
    title: "Innovation : Nouveau système de prise de rendez-vous par QR Code",
    excerpt: "SICTA digitalise ses services avec un système innovant de réservation via QR Code dans toutes ses agences.",
    date: "2024-12-01",
    author: "Direction Innovation",
    category: "Innovation",
    readTime: "3 min"
  },
  {
    title: "Partenariat avec les auto-écoles de Côte d'Ivoire",
    excerpt: "SICTA signe un partenariat stratégique avec la Fédération des auto-écoles pour renforcer la formation à la sécurité routière.",
    date: "2024-11-28",
    author: "Direction Partenariats",
    category: "Sécurité routière",
    readTime: "4 min"
  },
  {
    title: "Certification ISO 9001:2015 renouvelée avec excellence",
    excerpt: "SICTA maintient son niveau d'excellence avec le renouvellement de sa certification ISO 9001:2015.",
    date: "2024-11-25",
    author: "Direction Qualité",
    category: "Entreprise",
    readTime: "3 min"
  }
];

const News = () => {
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="card-elevated overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary/10 to-orange-100 p-12 flex items-center">
                  <div className="w-full">
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                        {featuredNews.category}
                      </span>
                      <span className="text-sicta-grey-light text-sm">Article principal</span>
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-sicta-grey-dark mb-4 leading-tight">
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
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{featuredNews.readTime}</span>
                      </div>
                    </div>
                    
                    <Button className="btn-hero">
                      Lire l'article complet
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center p-12">
                  <div className="text-center text-white">
                    <div className="text-6xl font-bold mb-4">2024</div>
                    <div className="text-xl">Nouvelle ère</div>
                    <div className="text-lg opacity-90">Mayelia Participations</div>
                  </div>
                </div>
              </div>
            </Card>
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
                <Card key={index} className="card-elevated hover:shadow-xl transition-all duration-300 group">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-sicta-grey-light">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-sicta-grey-dark mb-3 leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-sicta-grey-light text-sm mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-sicta-grey-light">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{article.author}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                        Lire plus
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button className="btn-hero px-8 py-3">
                Voir tous les articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-primary to-orange-400">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Restez informé</h2>
          <p className="text-xl mb-8 opacity-90">
            Abonnez-vous à notre newsletter pour recevoir les dernières actualités SICTA
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-sicta-grey-dark"
            />
            <Button className="bg-white text-primary hover:bg-gray-100 px-6 py-3">
              S'abonner
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            Nous respectons votre vie privée. Pas de spam, désinscription facile.
          </p>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default News;