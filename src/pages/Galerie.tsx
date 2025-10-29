import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { 
  Image as ImageIcon, 
  MapPin, 
  Calendar,
  ArrowRight,
  Play,
  Camera,
  Building,
  Car,
  X,
  Download
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

const Galerie = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("tous");

  const galleries = [
    {
      title: "Nos Agences",
      description: "Découvrez nos 29 stations permanentes à travers la Côte d'Ivoire",
      images: [
        { 
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center", 
          alt: "Agence SICTA Abidjan Plateau",
          location: "Abidjan Plateau"
        },
        { 
          src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center", 
          alt: "Agence SICTA Bouaké",
          location: "Bouaké"
        },
        { 
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center", 
          alt: "Agence SICTA San-Pédro",
          location: "San-Pédro"
        },
        { 
          src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center", 
          alt: "Agence SICTA Yamoussoukro",
          location: "Yamoussoukro"
        }
      ],
      icon: Building
    },
    {
      title: "Équipements & Technologies",
      description: "Nos équipements de pointe pour le contrôle technique",
      images: [
        { 
          src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center", 
          alt: "Station de contrôle technique moderne",
          description: "Station équipée de technologies avancées"
        },
        { 
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center", 
          alt: "Équipement de mesure de précision",
          description: "Instruments de mesure certifiés"
        },
        { 
          src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center", 
          alt: "Laboratoire d'analyse des émissions",
          description: "Laboratoire d'analyse des polluants"
        },
        { 
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center", 
          alt: "Système informatique de gestion",
          description: "Interface numérique de contrôle"
        }
      ],
      icon: Camera
    },
    {
      title: "Événements & Cérémonies",
      description: "Nos moments forts et événements marquants",
      images: [
        { 
          src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&crop=center", 
          alt: "Cérémonie de remise de prix d'excellence",
          description: "Remise du prix Excellence Service Client 2023"
        },
        { 
          src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop&crop=center", 
          alt: "Formation des techniciens",
          description: "Session de formation continue"
        },
        { 
          src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&crop=center", 
          alt: "Événement client VIP",
          description: "Rencontre avec nos clients professionnels"
        },
        { 
          src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop&crop=center", 
          alt: "Inauguration nouvelle agence",
          description: "Ouverture de l'agence SICTA Cocody"
        }
      ],
      icon: Calendar
    },
    {
      title: "Véhicules en Contrôle",
      description: "Quelques exemples de véhicules contrôlés",
      images: [
        { 
          src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center", 
          alt: "Voiture en contrôle technique",
          description: "Contrôle technique véhicule léger"
        },
        { 
          src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop&crop=center", 
          alt: "Camion en pesage",
          description: "Pesage véhicule lourd"
        },
        { 
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center", 
          alt: "Moto en inspection",
          description: "Contrôle technique motocycle"
        },
        { 
          src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center", 
          alt: "Véhicule utilitaire en contrôle",
          description: "Inspection véhicule commercial"
        }
      ],
      icon: Car
    }
  ];

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <ImageIcon className="h-4 w-4" />
                <span>Médiathèque SICTA</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Galerie</span>{" "}
                <span className="text-gradient">Photos & Vidéos</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed max-w-3xl mx-auto">
                Explorez notre univers visuel : agences, équipements, événements et moments clés. 
                Découvrez SICTA sous tous ses angles.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Tabs Section */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="bg-white shadow-md p-1">
                  <TabsTrigger value="tous" className="px-6 py-3">
                    Tous
                  </TabsTrigger>
                  <TabsTrigger value="agences">
                    <Building className="h-4 w-4 mr-2" />
                    Agences
                  </TabsTrigger>
                  <TabsTrigger value="equipements">
                    <Camera className="h-4 w-4 mr-2" />
                    Équipements
                  </TabsTrigger>
                  <TabsTrigger value="evenements">
                    <Calendar className="h-4 w-4 mr-2" />
                    Événements
                  </TabsTrigger>
                  <TabsTrigger value="vehicules">
                    <Car className="h-4 w-4 mr-2" />
                    Véhicules
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="tous" className="space-y-20">
                {galleries.map((gallery, galleryIndex) => (
                  <div key={galleryIndex}>
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <gallery.icon className="h-4 w-4" />
                        <span>{gallery.title}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-sicta-grey-dark mb-4">
                        {gallery.title}
                      </h2>
                      <p className="text-lg text-sicta-grey-light max-w-2xl mx-auto">
                        {gallery.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                      {gallery.images.map((image, imageIndex) => (
                        <motion.div
                          key={imageIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ 
                            delay: galleryIndex * 0.2 + imageIndex * 0.05, 
                            duration: 0.5 
                          }}
                          onClick={() => setSelectedImage({ ...image, galleryTitle: gallery.title })}
                        >
                          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 bg-white h-full">
                            <div className="relative aspect-square overflow-hidden bg-sicta-grey/20">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-primary rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                                  <ImageIcon className="h-6 w-6 text-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-xs text-white font-medium line-clamp-2">
                                  {image.location || image.description}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              {galleries.map((gallery, galleryIndex) => {
                const tabValue = 
                  galleryIndex === 0 ? "agences" :
                  galleryIndex === 1 ? "equipements" :
                  galleryIndex === 2 ? "evenements" :
                  "vehicules";
                return (
                  <TabsContent key={galleryIndex} value={tabValue}>
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <gallery.icon className="h-4 w-4" />
                        <span>{gallery.title}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-sicta-grey-dark mb-4">
                        {gallery.title}
                      </h2>
                      <p className="text-lg text-sicta-grey-light max-w-2xl mx-auto">
                        {gallery.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                      {gallery.images.map((image, imageIndex) => (
                        <motion.div
                          key={imageIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: imageIndex * 0.05, 
                            duration: 0.5 
                          }}
                          onClick={() => setSelectedImage({ ...image, galleryTitle: gallery.title })}
                        >
                          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 bg-white h-full">
                            <div className="relative aspect-square overflow-hidden bg-sicta-grey/20">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-primary rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                                  <ImageIcon className="h-6 w-6 text-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-xs text-white font-medium line-clamp-2">
                                  {image.location || image.description}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>

        {/* Image Modal */}
        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden">
            {selectedImage && (
              <>
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle className="text-2xl">{selectedImage.alt}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedImage.galleryTitle}
                  </DialogDescription>
                </DialogHeader>
                <div className="relative aspect-video bg-sicta-grey/20">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-white/90 hover:bg-white"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-white/90 hover:bg-white text-sicta-grey-dark">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </div>
                <div className="px-6 py-4 bg-sicta-grey/5">
                  <p className="text-sicta-grey-dark">{selectedImage.location || selectedImage.description}</p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Video Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Play className="h-4 w-4" />
                <span>Médiathèque</span>
              </div>
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Vidéos SICTA
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Découvrez SICTA en mouvement : témoignages, processus, événements
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "Présentation SICTA",
                  description: "Découvrez notre histoire et notre mission depuis 1974",
                  thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop&crop=center",
                  duration: "3:45",
                  category: "Institutionnel"
                },
                {
                  title: "Processus de Contrôle",
                  description: "Comment se déroule un contrôle technique en 123 points",
                  thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&crop=center",
                  duration: "5:20",
                  category: "Technique"
                },
                {
                  title: "Témoignages Clients",
                  description: "Ce que disent nos clients de nos services",
                  thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop&crop=center",
                  duration: "4:15",
                  category: "Témoignages"
                }
              ].map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer border-0 bg-white h-full">
                    <div className="relative aspect-video overflow-hidden bg-sicta-grey/20">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {video.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {video.duration}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary rounded-full p-5 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                          <Play className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sicta-grey-light text-sm leading-relaxed line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sicta-grey text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Visitez nos Agences
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Découvrez nos installations et rencontrez notre équipe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reseau">
                <Button size="lg" className="btn-hero">
                  <MapPin className="h-5 w-5 mr-2" />
                  Trouver une agence
                </Button>
              </Link>
              <Link to="/reservation">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                  <Calendar className="h-5 w-5 mr-2" />
                  Prendre rendez-vous
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Galerie;
