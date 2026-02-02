import { useParams, Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowLeft, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import {
  getArticleBySlug,
  getCategoryLabel,
  getRelatedArticles,
} from "@/data/actualites";

const ActualiteDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <NotFound />;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const related = getRelatedArticles(article.slug, article.category, 3);

  return (
    <PageTransition>
      <SEO
        title={`${article.title} - Actualités SICTA`}
        description={article.excerpt}
        url={`/actualites/${article.slug}`}
      />
      <div className="w-full min-h-screen bg-white">
        {/* Fil d'Ariane + Retour */}
        <section className="border-b border-gray-100 bg-[#fafafa] py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Link
                to="/actualites"
                className="inline-flex items-center gap-2 text-sicta-grey-light hover:text-primary transition-colors text-sm font-medium mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour aux actualités
              </Link>
              <div className="flex items-center gap-2 text-sm text-sicta-grey-light">
                <Newspaper className="h-4 w-4" />
                <Link to="/actualites" className="hover:text-primary transition-colors">
                  Actualités
                </Link>
                <span>/</span>
                <span className="text-sicta-grey-dark">{article.title}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article */}
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <span className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium mb-6">
                {getCategoryLabel(article.category)}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark leading-tight mb-6">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sicta-grey-light text-sm mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {article.readTime} de lecture
                </span>
              </div>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-10">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none text-sicta-grey-dark">
                <p className="text-xl text-sicta-grey-light leading-relaxed mb-8 font-medium">
                  {article.excerpt}
                </p>
                <div className="space-y-6">
                  {article.content.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <Link to="/actualites">
                  <Button variant="outline" className="group">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Retour aux actualités
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Articles liés */}
        {related.length > 0 && (
          <section className="border-t border-gray-100 bg-[#fafafa] py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-sicta-grey-dark mb-8">
                  Autres actualités {getCategoryLabel(article.category).toLowerCase()}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((a) => (
                    <Link
                      key={a.id}
                      to={`/actualites/${a.slug}`}
                      className="group flex flex-col rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                        <img
                          src={a.image}
                          alt={a.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-white">
                          {getCategoryLabel(a.category)}
                        </span>
                      </div>
                      <div className="flex flex-col flex-1 p-5">
                        <h3 className="font-semibold text-sicta-grey-dark group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {a.title}
                        </h3>
                        <p className="text-sm text-sicta-grey-light leading-relaxed line-clamp-2 flex-1">
                          {a.excerpt}
                        </p>
                        <span className="text-xs text-sicta-grey-light mt-4">
                          {formatDate(a.date)} · {a.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
};

export default ActualiteDetail;
