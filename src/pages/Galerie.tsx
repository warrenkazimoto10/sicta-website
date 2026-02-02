import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import {
  Image as ImageIcon,
  MapPin,
  Calendar,
  ArrowRight,
  Play,
  Camera,
  Building2,
  Car,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { cn } from "@/lib/utils";

type GalleryCategory = "tous" | "agences" | "equipements" | "evenements" | "vehicules";

interface GalleryImage {
  src: string;
  alt: string;
  location?: string;
  description?: string;
  category: GalleryCategory;
}

const categories: { id: GalleryCategory; label: string; icon: typeof Building2 }[] = [
  { id: "tous", label: "Tout", icon: Grid3X3 },
  { id: "agences", label: "Nos agences", icon: Building2 },
  { id: "equipements", label: "Équipements", icon: Camera },
  { id: "evenements", label: "Événements", icon: Calendar },
  { id: "vehicules", label: "Véhicules", icon: Car },
];

const allImages: GalleryImage[] = [
  // Agences
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop", alt: "Agence SICTA Abidjan Plateau", location: "Abidjan Plateau", category: "agences" },
  { src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop", alt: "Agence SICTA Bouaké", location: "Bouaké", category: "agences" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", alt: "Agence SICTA San-Pédro", location: "San-Pédro", category: "agences" },
  { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop", alt: "Agence SICTA Yamoussoukro", location: "Yamoussoukro", category: "agences" },
  { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop", alt: "Centre de contrôle SICTA", location: "Abidjan", category: "agences" },
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop", alt: "Hall d'accueil client", location: "Plateau", category: "agences" },
  // Équipements
  { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop", alt: "Station de contrôle technique", description: "Technologies de pointe", category: "equipements" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", alt: "Équipement de mesure", description: "Instruments certifiés", category: "equipements" },
  { src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop", alt: "Laboratoire d'analyse des émissions", description: "Contrôle des polluants", category: "equipements" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop", alt: "Système informatique de gestion", description: "Interface numérique", category: "equipements" },
  // Événements
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop", alt: "Cérémonie d'excellence", description: "Prix Excellence Service Client", category: "evenements" },
  { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop", alt: "Formation des techniciens", description: "Session de formation continue", category: "evenements" },
  { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop", alt: "Événement client VIP", description: "Rencontre clients professionnels", category: "evenements" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop", alt: "Inauguration nouvelle agence", description: "Ouverture agence SICTA", category: "evenements" },
  // Véhicules
  { src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop", alt: "Contrôle technique véhicule léger", description: "Véhicule particulier", category: "vehicules" },
  { src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop", alt: "Pesage véhicule lourd", description: "Contrôle poids lourds", category: "vehicules" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", alt: "Contrôle technique motocycle", description: "Inspection deux-roues", category: "vehicules" },
  { src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop", alt: "Véhicule utilitaire en contrôle", description: "Véhicule commercial", category: "vehicules" },
];

const Galerie = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("tous");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = useMemo(() => {
    if (activeCategory === "tous") return allImages;
    return allImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (image: GalleryImage, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const navigateLightbox = (delta: number) => {
    const next = (lightboxIndex + delta + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[next]);
    setLightboxIndex(next);
  };

  return (
    <PageTransition>
      <SEO
        title="Galerie - Portfolio SICTA"
        description="Découvrez le portfolio visuel de SICTA : nos agences, équipements, événements et contrôles techniques à travers la Côte d'Ivoire."
        url="/galerie"
      />
      <div className="w-full min-h-screen bg-white">
        {/* Hero portfolio — sobre et corporate */}
        <section className="border-b border-gray-100 bg-[#fafafa]">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                Portfolio
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sicta-grey-dark tracking-tight leading-[1.1] mb-6">
                Galerie SICTA
              </h1>
              <p className="text-lg md:text-xl text-sicta-grey-light leading-relaxed">
                Nos implantations, nos équipements et les temps forts de l’entreprise. 
                Une vision du contrôle technique en Côte d’Ivoire.
              </p>
            </div>
          </div>
        </section>

        {/* Filtres — style portfolio */}
        <section className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 py-4 md:gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
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
                    <Icon className="h-4 w-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Grille portfolio — 3 colonnes desktop, 2 mobile */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {filteredImages.map((image, index) => (
                <button
                  key={`${image.alt}-${index}`}
                  type="button"
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => openLightbox(image, index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-medium text-sm drop-shadow-md line-clamp-2">
                      {image.location || image.description || image.alt}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3 rounded-full bg-white/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                    <ImageIcon className="h-4 w-4 text-sicta-grey-dark" />
                  </div>
                </button>
              ))}
            </div>
            {filteredImages.length === 0 && (
              <p className="text-center text-sicta-grey-light py-16">Aucune image dans cette catégorie.</p>
            )}
          </div>
        </section>

        {/* Vidéos — bloc sobre */}
        <section className="border-t border-gray-100 bg-[#fafafa] py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-12">
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                Médiathèque
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-sicta-grey-dark tracking-tight">
                Vidéos SICTA
              </h2>
              <p className="text-sicta-grey-light mt-3">
                Présentation, processus de contrôle et témoignages.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Présentation SICTA", desc: "Notre histoire et notre mission depuis 1974", thumb: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop", duration: "3:45", tag: "Institutionnel" },
                { title: "Processus de contrôle", desc: "Un contrôle technique en 123 points", thumb: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop", duration: "5:20", tag: "Technique" },
                { title: "Témoignages clients", desc: "Ce que disent nos clients de nos services", thumb: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop", duration: "4:15", tag: "Témoignages" },
              ].map((v, i) => (
                <article
                  key={i}
                  className="group rounded-lg overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video bg-gray-100">
                    <img src={v.thumb} alt={v.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <span className="rounded-full bg-white/95 p-4 shadow-lg">
                        <Play className="h-8 w-8 text-primary" />
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-white">{v.tag}</span>
                    <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">{v.duration}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sicta-grey-dark group-hover:text-primary transition-colors">{v.title}</h3>
                    <p className="text-sm text-sicta-grey-light mt-1 line-clamp-2">{v.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-sicta-grey-dark text-white py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Visitez nos agences
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Découvrez nos installations et réservez votre contrôle technique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reseau">
                <Button size="lg" className="bg-white text-sicta-grey-dark hover:bg-gray-100">
                  <MapPin className="h-4 w-4 mr-2" />
                  Trouver une agence
                </Button>
              </Link>
              <Link to="/reservation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey-dark">
                  <Calendar className="h-4 w-4 mr-2" />
                  Prendre rendez-vous
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox type portfolio — plein écran, nav prev/next */}
      <Dialog open={lightboxImage !== null} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-[100vw] w-full h-[100dvh] p-0 border-0 rounded-none overflow-hidden bg-black/95">
          {lightboxImage && (
            <div className="relative flex flex-col h-full">
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setLightboxImage(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {filteredImages.length > 1 && (
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
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
              <div className="border-t border-white/10 py-4 px-6 text-center">
                <p className="text-white font-medium">{lightboxImage.alt}</p>
                <p className="text-white/70 text-sm mt-1">
                  {lightboxImage.location || lightboxImage.description}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  {lightboxIndex + 1} / {filteredImages.length}
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
