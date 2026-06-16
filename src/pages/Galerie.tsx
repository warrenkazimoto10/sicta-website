import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Image as ImageIcon,
  Calendar,
  Play,
  Camera,
  Building2,
  Car,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Loader2,
  FolderOpen,
  ArrowLeft,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchGalerie, type DossierAPI } from "@/services/galerieService";

type FilterCat = "tous" | "agences" | "equipements" | "evenements" | "vehicules" | "autre";

const CATEGORY_LABELS: Record<FilterCat, string> = {
  tous: "Tout",
  agences: "Nos agences",
  equipements: "Équipements",
  evenements: "Événements",
  vehicules: "Véhicules",
  autre: "Autre",
};

const CATEGORY_ICONS: Record<FilterCat, typeof Building2> = {
  tous: Grid3X3,
  agences: Building2,
  equipements: Camera,
  evenements: Calendar,
  vehicules: Car,
  autre: FolderOpen,
};

const CATEGORY_COLORS: Record<FilterCat, string> = {
  tous: "bg-gray-100 text-gray-600",
  agences: "bg-blue-100 text-blue-700",
  equipements: "bg-purple-100 text-purple-700",
  evenements: "bg-orange-100 text-orange-700",
  vehicules: "bg-green-100 text-green-700",
  autre: "bg-gray-100 text-gray-600",
};

const Galerie = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCat>("tous");
  const [selectedDossier, setSelectedDossier] = useState<DossierAPI | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: dossiers = [], isLoading } = useQuery({
    queryKey: ["galerie"],
    queryFn: fetchGalerie,
    staleTime: 60_000,
  });

  // Catégories présentes dans les données
  const availableCategories = useMemo<FilterCat[]>(() => {
    const cats = new Set(dossiers.map((d) => d.categorie as FilterCat));
    return (["tous", "agences", "equipements", "evenements", "vehicules", "autre"] as FilterCat[])
      .filter((c) => c === "tous" || cats.has(c));
  }, [dossiers]);

  const filteredDossiers = useMemo(() =>
    activeCategory === "tous" ? dossiers : dossiers.filter((d) => d.categorie === activeCategory),
    [dossiers, activeCategory]
  );

  // Médias du dossier sélectionné (pour lightbox)
  const dossierMedias = selectedDossier?.medias ?? [];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const navigateLightbox = (delta: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + delta + dossierMedias.length) % dossierMedias.length);
  };
  const currentMedia = lightboxIndex !== null ? dossierMedias[lightboxIndex] : null;

  const openDossier = (dossier: DossierAPI) => {
    setSelectedDossier(dossier);
    setLightboxIndex(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeDossier = () => {
    setSelectedDossier(null);
    setLightboxIndex(null);
  };

  return (
    <PageTransition>
      <SEO
        title="Médiathèque - Galerie SICTA"
        description="Découvrez la médiathèque SICTA : nos agences, équipements, événements et contrôles techniques à travers la Côte d'Ivoire."
        url="/galerie"
      />
      <div className="w-full min-h-screen bg-white">

        {/* Hero */}
        <section className="border-b border-gray-100 bg-[#fafafa]">
          <div className="container mx-auto px-4 py-16 md:py-20">
            {selectedDossier ? (
              /* Breadcrumb dossier ouvert */
              <div>
                <button
                  onClick={closeDossier}
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à la galerie
                </button>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={cn(
                      "inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3",
                      CATEGORY_COLORS[selectedDossier.categorie as FilterCat] ?? "bg-gray-100 text-gray-600"
                    )}>
                      {CATEGORY_LABELS[selectedDossier.categorie as FilterCat] ?? selectedDossier.categorie}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark tracking-tight leading-tight">
                      {selectedDossier.nom}
                    </h1>
                    {selectedDossier.date && (
                      <p className="text-sm text-gray-400 mt-2">
                        <Calendar className="h-4 w-4 inline mr-1 -mt-0.5" />
                        {new Date(selectedDossier.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    )}
                    <p className="text-gray-400 text-sm mt-1">
                      {dossierMedias.length} média{dossierMedias.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Hero normal */
              <div className="max-w-3xl">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">Médiathèque</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sicta-grey-dark tracking-tight leading-[1.1] mb-6">
                  Galerie SICTA
                </h1>
                <p className="text-lg md:text-xl text-sicta-grey-light leading-relaxed">
                  Nos implantations, nos équipements et les temps forts de l'entreprise.
                  Une vision du contrôle technique en Côte d'Ivoire.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Filtres (masqués quand un dossier est ouvert) */}
        {!selectedDossier && availableCategories.length > 1 && (
          <section className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center gap-2 py-4 md:gap-4">
                {availableCategories.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                        activeCategory === cat
                          ? "bg-sicta-grey-dark text-white"
                          : "text-sicta-grey-light hover:bg-gray-100 hover:text-sicta-grey-dark"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {CATEGORY_LABELS[cat]}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Contenu principal */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>

            ) : selectedDossier ? (
              /* Vue dossier — grille de médias */
              dossierMedias.length === 0 ? (
                <div className="text-center py-24">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sicta-grey-light">Aucun média dans ce dossier.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {dossierMedias.map((media, index) => (
                    <button
                      key={media.id}
                      type="button"
                      className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      onClick={() => openLightbox(index)}
                    >
                      {media.type === "image" ? (
                        <img
                          src={media.fichier}
                          alt={media.legende ?? selectedDossier.nom}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                          <Play className="h-10 w-10 text-white/80" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {media.legende && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-xs drop-shadow-md line-clamp-2">{media.legende}</p>
                        </div>
                      )}
                      <div className="absolute top-2.5 right-2.5 rounded-full bg-white/90 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                        {media.type === "video"
                          ? <Play className="h-3.5 w-3.5 text-sicta-grey-dark" />
                          : <ImageIcon className="h-3.5 w-3.5 text-sicta-grey-dark" />
                        }
                      </div>
                    </button>
                  ))}
                </div>
              )

            ) : (
              /* Vue index — grille de dossiers */
              filteredDossiers.length === 0 ? (
                <div className="text-center py-24">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                    <FolderOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sicta-grey-light">Aucun dossier disponible pour le moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredDossiers.map((dossier) => {
                    const cat = dossier.categorie as FilterCat;
                    const Icon = CATEGORY_ICONS[cat] ?? FolderOpen;
                    return (
                      <button
                        key={dossier.id}
                        type="button"
                        onClick={() => openDossier(dossier)}
                        className="group text-left rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {/* Couverture */}
                        <div className="aspect-video bg-gray-100 overflow-hidden relative">
                          {dossier.image_couverture ? (
                            <img
                              src={dossier.image_couverture}
                              alt={dossier.nom}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                              <Icon className="h-10 w-10 text-gray-300" />
                            </div>
                          )}
                          {/* Overlay au survol */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-white/95 text-sicta-grey-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                              Voir les photos
                            </span>
                          </div>
                        </div>

                        {/* Infos */}
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 flex-1">
                              {dossier.nom}
                            </h3>
                            <span className={cn(
                              "flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full",
                              CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-600"
                            )}>
                              {CATEGORY_LABELS[cat] ?? cat}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                            <span className="flex items-center gap-1">
                              <ImageIcon className="h-3.5 w-3.5" />
                              {dossier.medias.length} média{dossier.medias.length > 1 ? "s" : ""}
                            </span>
                            {dossier.date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(dossier.date).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </section>

        {/* Compteur */}
        {!isLoading && !selectedDossier && filteredDossiers.length > 0 && (
          <div className="text-center pb-8 text-sm text-gray-400">
            {filteredDossiers.length} dossier{filteredDossiers.length > 1 ? "s" : ""}
            {activeCategory !== "tous" ? ` · ${CATEGORY_LABELS[activeCategory]}` : ""}
          </div>
        )}
        {!isLoading && selectedDossier && dossierMedias.length > 0 && (
          <div className="text-center pb-8 text-sm text-gray-400">
            {dossierMedias.length} média{dossierMedias.length > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[100vw] w-full h-[100dvh] p-0 border-0 rounded-none overflow-hidden bg-black/95">
          {currentMedia && (
            <div className="relative flex flex-col h-full">
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={closeLightbox}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {dossierMedias.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 text-white hover:bg-white/20 h-12 w-12"
                    onClick={() => navigateLightbox(-1)}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 text-white hover:bg-white/20 h-12 w-12"
                    onClick={() => navigateLightbox(1)}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                {currentMedia.type === "image" ? (
                  <img
                    src={currentMedia.fichier}
                    alt={currentMedia.legende ?? selectedDossier?.nom ?? ""}
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                ) : (
                  <video
                    src={currentMedia.fichier}
                    controls
                    autoPlay
                    className="max-h-full max-w-full rounded-lg"
                  />
                )}
              </div>

              <div className="border-t border-white/10 py-4 px-6 text-center">
                {currentMedia.legende && (
                  <p className="text-white font-medium text-sm mb-1">{currentMedia.legende}</p>
                )}
                <p className="text-white/40 text-xs">
                  {(lightboxIndex ?? 0) + 1} / {dossierMedias.length}
                  {selectedDossier && ` · ${selectedDossier.nom}`}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
};

export default Galerie;
