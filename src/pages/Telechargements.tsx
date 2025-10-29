import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  FileText, 
  CheckCircle,
  Calendar,
  Users,
  ArrowRight,
  File,
  Image,
  BookOpen,
  Info
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Telechargements = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const documentCategories = [
    {
      title: "Tarifs & Brochures",
      description: "Consultez nos tarifs et brochures de services",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
      documents: [
        {
          name: "Tarifs Contrôle Technique 2025",
          type: "PDF",
          size: "2.3 MB",
          description: "Grille tarifaire complète pour tous nos services",
          downloadUrl: "#",
          downloads: "1,234"
        },
        {
          name: "Brochure Services SICTA",
          type: "PDF",
          size: "5.1 MB",
          description: "Présentation complète de nos services",
          downloadUrl: "#",
          downloads: "856"
        },
        {
          name: "Guide du Contrôle Technique",
          type: "PDF",
          size: "3.7 MB",
          description: "Tout savoir sur le contrôle technique",
          downloadUrl: "#",
          downloads: "642"
        }
      ]
    },
    {
      title: "Formulaires",
      description: "Téléchargez les formulaires nécessaires",
      icon: File,
      color: "from-green-500 to-green-600",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
      documents: [
        {
          name: "Demande de Contrôle Technique",
          type: "PDF",
          size: "1.2 MB",
          description: "Formulaire de demande de contrôle",
          downloadUrl: "#",
          downloads: "2,156"
        },
        {
          name: "Demande CIVIO",
          type: "PDF",
          size: "1.5 MB",
          description: "Formulaire d'immatriculation",
          downloadUrl: "#",
          downloads: "1,789"
        },
        {
          name: "Demande de Pesage",
          type: "PDF",
          size: "0.8 MB",
          description: "Formulaire de demande de pesage",
          downloadUrl: "#",
          downloads: "934"
        }
      ]
    },
    {
      title: "Documents Légaux",
      description: "Réglementation et documents officiels",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
      documents: [
        {
          name: "Code de la Route - Contrôle Technique",
          type: "PDF",
          size: "4.2 MB",
          description: "Extrait du code de la route concernant le contrôle technique",
          downloadUrl: "#",
          downloads: "567"
        },
        {
          name: "Arrêté Ministériel 2024",
          type: "PDF",
          size: "2.8 MB",
          description: "Arrêté fixant les conditions du contrôle technique",
          downloadUrl: "#",
          downloads: "423"
        },
        {
          name: "Normes Techniques",
          type: "PDF",
          size: "6.1 MB",
          description: "Normes techniques applicables au contrôle",
          downloadUrl: "#",
          downloads: "298"
        }
      ]
    },
    {
      title: "Ressources Médias",
      description: "Logos, images et ressources visuelles",
      icon: Image,
      color: "from-orange-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
      documents: [
        {
          name: "Logo SICTA (Vectoriel)",
          type: "SVG",
          size: "0.5 MB",
          description: "Logo officiel SICTA en format vectoriel",
          downloadUrl: "#",
          downloads: "1,456"
        },
        {
          name: "Charte Graphique SICTA",
          type: "PDF",
          size: "8.3 MB",
          description: "Guide d'utilisation de l'identité visuelle",
          downloadUrl: "#",
          downloads: "234"
        },
        {
          name: "Photos Agences",
          type: "ZIP",
          size: "25.4 MB",
          description: "Photos haute résolution de nos agences",
          downloadUrl: "#",
          downloads: "189"
        }
      ]
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
                <Download className="h-4 w-4" />
                <span>À Télécharger</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Documents</span>{" "}
                <span className="text-gradient">& Ressources</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Téléchargez gratuitement nos documents, formulaires, brochures 
                et ressources pour faciliter vos démarches avec SICTA.
              </p>
            </div>
          </div>
        </section>

        {/* Document Categories */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            {documentCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
                className="mb-20"
              >
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  {/* Category Header */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-8">
                      <div className="relative overflow-hidden rounded-2xl mb-6">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <div className={`h-12 w-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                            <category.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-sicta-grey-dark mb-3">
                        {category.title}
                      </h2>
                      <p className="text-sicta-grey-light leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Documents Grid */}
                  <div className="lg:col-span-2">
                    <div className="grid gap-6">
                      {category.documents.map((document, documentIndex) => (
                        <motion.div
                          key={documentIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          transition={{ 
                            delay: categoryIndex * 0.2 + documentIndex * 0.1, 
                            duration: 0.6 
                          }}
                        >
                          <Card className="p-6 hover:shadow-xl transition-all duration-300 group border-0 bg-white">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-lg font-bold text-sicta-grey-dark group-hover:text-primary transition-colors">
                                    {document.name}
                                  </h3>
                                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                                    {document.type}
                                  </span>
                                </div>
                                <p className="text-sicta-grey-light text-sm mb-3 leading-relaxed">
                                  {document.description}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-sicta-grey-light">
                                  <span className="flex items-center space-x-1">
                                    <Download className="h-3 w-3" />
                                    <span>{document.downloads} téléchargements</span>
                                  </span>
                                  <span>{document.size}</span>
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              className="w-full btn-hero group-hover:scale-105 transition-transform duration-200"
                              onClick={() => window.open(document.downloadUrl, '_blank')}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger maintenant
                            </Button>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Accès Rapide
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Les documents les plus téléchargés
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Tarifs 2025",
                  description: "Grille tarifaire complète",
                  downloads: "1,234 téléchargements",
                  icon: FileText,
                  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop&crop=center",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "Formulaire Contrôle",
                  description: "Demande de contrôle technique",
                  downloads: "856 téléchargements",
                  icon: File,
                  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop&crop=center",
                  color: "from-green-500 to-green-600"
                },
                {
                  title: "Guide Client",
                  description: "Guide complet du contrôle technique",
                  downloads: "642 téléchargements",
                  icon: BookOpen,
                  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop&crop=center",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  title: "Logo SICTA",
                  description: "Logo officiel vectoriel",
                  downloads: "423 téléchargements",
                  icon: Image,
                  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop&crop=center",
                  color: "from-orange-500 to-orange-600"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 bg-white">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <div className={`h-10 w-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sicta-grey-light text-sm mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        {item.downloads}
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
              Besoin d'aide ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner dans vos démarches
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Info className="h-5 w-5 mr-2" />
                Nous contacter
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                <Calendar className="h-5 w-5 mr-2" />
                Prendre rendez-vous
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Telechargements;
