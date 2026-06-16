import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleBySlug, type ArticleMedia } from "@/services/articleService";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ChevronLeft, ChevronRight, X, Play, Image as ImageIcon, Loader2,
} from "lucide-react";
import NotFound from "@/pages/NotFound";

const GalerieArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticleBySlug(slug!),
    enabled: !!slug,
    retry: false,
  });

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageTransition>
    );
  }

  if (isError || !data?.data) return <NotFound />;

  const article = data.data;
  const medias: ArticleMedia[] = article.medias ?? [];

  const navigate = (delta: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + delta + medias.length) % medias.length);
  };

  const current = lightboxIndex !== null ? medias[lightboxIndex] : null;

  return (
    <PageTransition>
      <SEO
        title={`Galerie — ${article.titre} | SICTA`}
        description={`Galerie photos de l'article : ${article.titre}`}
        url={`/galerie/article/${slug}`}
      />
      <div className="w-full min-h-screen bg-white">

        {/* Hero / Breadcrumb */}
        <section className="border-b border-gray-100 bg-[#fafafa]">
          <div className="container mx-auto px-4 py-12">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link to="/galerie" className="hover:text-primary transition-colors">Galerie</Link>
              <span>/</span>
              <Link to={`/actualites/${article.slug}`} className="hover:text-primary transition-colors">
                {article.titre}
              </Link>
              <span>/</span>
              <span className="text-gray-600">Photos</span>
            </nav>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">Album</p>
                <h1 className="text-3xl md:text-4xl font-bold text-sicta-grey-dark">{article.titre}</h1>
                <p className="text-sicta-grey-light mt-2">{medias.length} média{medias.length > 1 ? "s" : ""}</p>
              </div>
              <Link to={`/actualites/${article.slug}`}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Lire l'article
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Grille */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {medias.length === 0 ? (
              <div className="text-center py-24">
                <ImageIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400">Aucun média disponible pour cet article.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {medias.map((media, index) => (
                  <button
                    key={media.id}
                    type="button"
                    className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick={() => setLightboxIndex(index)}
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.url}
                        alt={media.filename}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                        <Play className="h-8 w-8 text-white/80" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {media.type === "video"
                        ? <Play className="h-8 w-8 text-white" />
                        : <ImageIcon className="h-6 w-6 text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
        <DialogContent className="max-w-[100vw] w-full h-[100dvh] p-0 border-0 rounded-none overflow-hidden bg-black/95">
          {current && (
            <div className="relative flex flex-col h-full">
              <div className="absolute top-4 right-4 z-10">
                <Button variant="ghost" size="icon"
                  className="rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setLightboxIndex(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {medias.length > 1 && (
                <>
                  <Button variant="ghost" size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 text-white hover:bg-white/20 h-12 w-12"
                    onClick={() => navigate(-1)}>
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 text-white hover:bg-white/20 h-12 w-12"
                    onClick={() => navigate(1)}>
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
              <div className="flex-1 flex items-center justify-center p-6">
                {current.type === "image" ? (
                  <img src={current.url} alt={current.filename}
                    className="max-h-full max-w-full object-contain rounded-lg" />
                ) : (
                  <video src={current.url} controls autoPlay
                    className="max-h-full max-w-full rounded-lg" />
                )}
              </div>
              <div className="border-t border-white/10 py-3 px-6 text-center">
                <p className="text-white/50 text-xs">
                  {(lightboxIndex ?? 0) + 1} / {medias.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default GalerieArticle;
