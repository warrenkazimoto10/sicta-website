import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  FileText, 
  Calendar,
  ArrowRight,
  File,
  BookOpen,
  Info,
  Search,
  Filter,
  X,
  Scale,
  Receipt,
  FileCheck,
  ScrollText,
  Building2,
  Gavel,
  FileQuestion,
  Sparkles,
  CheckCircle2,
  Clock,
  TrendingUp
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DocumentCategory = "tous" | "tarifs" | "brochures" | "formulaires" | "guides" | "reglements" | "decrets" | "notes-ministerielles";

interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  type: "PDF" | "DOC" | "DOCX" | "XLS" | "XLSX" | "ZIP";
  size: string;
  description: string;
  downloadUrl: string;
  downloads: number;
  dateAdded: string;
  updated?: string;
}

const Telechargements = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>("tous");
  const [searchQuery, setSearchQuery] = useState("");

  // Documents organisés par catégorie
  const documents: Document[] = [
    // TARIFS
    {
      id: "tarif-1",
      name: "Grille Tarifaire Contrôle Technique 2025",
      category: "tarifs",
      type: "PDF",
      size: "2.3 MB",
      description: "Tarifs complets pour tous les types de véhicules (léger, poids lourd, moto, etc.)",
      downloadUrl: "#",
      downloads: 5234,
      dateAdded: "2025-01-15"
    },
    {
      id: "tarif-2",
      name: "Tarifs Services Additionnels",
      category: "tarifs",
      type: "PDF",
      size: "1.8 MB",
      description: "Tarifs des services CIVIO, IVN, Jaugeage, PPAD, VIP, etc.",
      downloadUrl: "#",
      downloads: 3124,
      dateAdded: "2025-01-15"
    },
    {
      id: "tarif-3",
      name: "Tarifs Station Mobile",
      category: "tarifs",
      type: "PDF",
      size: "1.5 MB",
      description: "Grille tarifaire pour les contrôles à domicile et en entreprise",
      downloadUrl: "#",
      downloads: 1890,
      dateAdded: "2025-01-10"
    },

    // BROCHURES PRODUITS
    {
      id: "brochure-1",
      name: "Brochure Visite Technique",
      category: "brochures",
      type: "PDF",
      size: "5.2 MB",
      description: "Présentation complète du service de visite technique automobile",
      downloadUrl: "#",
      downloads: 4567,
      dateAdded: "2025-01-20"
    },
    {
      id: "brochure-2",
      name: "Brochure Station Mobile",
      category: "brochures",
      type: "PDF",
      size: "4.8 MB",
      description: "Découvrez notre service de contrôle technique à domicile",
      downloadUrl: "#",
      downloads: 2341,
      dateAdded: "2025-01-18"
    },
    {
      id: "brochure-3",
      name: "Brochure CIVIO",
      category: "brochures",
      type: "PDF",
      size: "3.9 MB",
      description: "Tout savoir sur le Contrôle d'Identification des Véhicules",
      downloadUrl: "#",
      downloads: 1987,
      dateAdded: "2025-01-18"
    },
    {
      id: "brochure-4",
      name: "Brochure Services SICTA 2025",
      category: "brochures",
      type: "PDF",
      size: "8.5 MB",
      description: "Catalogue complet de tous nos services automobiles",
      downloadUrl: "#",
      downloads: 6789,
      dateAdded: "2025-01-25"
    },

    // FORMULAIRES ADMINISTRATIFS
    {
      id: "form-1",
      name: "Formulaire de Demande de Contrôle Technique",
      category: "formulaires",
      type: "PDF",
      size: "1.2 MB",
      description: "Formulaire officiel pour demander un contrôle technique",
      downloadUrl: "#",
      downloads: 12345,
      dateAdded: "2024-12-01"
    },
    {
      id: "form-2",
      name: "Formulaire CIVIO",
      category: "formulaires",
      type: "PDF",
      size: "1.5 MB",
      description: "Formulaire de demande de contrôle d'identification",
      downloadUrl: "#",
      downloads: 8765,
      dateAdded: "2024-12-01"
    },
    {
      id: "form-3",
      name: "Formulaire IVN (Identification Véhicule Neuf)",
      category: "formulaires",
      type: "PDF",
      size: "1.3 MB",
      description: "Formulaire pour l'identification des véhicules neufs",
      downloadUrl: "#",
      downloads: 5432,
      dateAdded: "2024-12-05"
    },
    {
      id: "form-4",
      name: "Formulaire Jaugeage et Barémage",
      category: "formulaires",
      type: "PDF",
      size: "1.1 MB",
      description: "Demande de jaugeage et barémage de véhicule",
      downloadUrl: "#",
      downloads: 3210,
      dateAdded: "2024-12-05"
    },
    {
      id: "form-5",
      name: "Formulaire PPAD (Pose Plaque à Domicile)",
      category: "formulaires",
      type: "PDF",
      size: "0.9 MB",
      description: "Formulaire pour la pose de plaque à domicile",
      downloadUrl: "#",
      downloads: 2876,
      dateAdded: "2024-12-10"
    },
    {
      id: "form-6",
      name: "Formulaire Candidature Spontanée",
      category: "formulaires",
      type: "PDF",
      size: "0.8 MB",
      description: "Formulaire de candidature pour un emploi ou stage",
      downloadUrl: "#",
      downloads: 1543,
      dateAdded: "2025-01-01"
    },

    // GUIDES
    {
      id: "guide-1",
      name: "Guide Complet du Contrôle Technique",
      category: "guides",
      type: "PDF",
      size: "6.8 MB",
      description: "Guide détaillé expliquant tout sur le contrôle technique automobile",
      downloadUrl: "#",
      downloads: 9876,
      dateAdded: "2024-11-15"
    },
    {
      id: "guide-2",
      name: "Guide de Préparation au Contrôle Technique",
      category: "guides",
      type: "PDF",
      size: "4.2 MB",
      description: "Comment préparer votre véhicule avant le contrôle",
      downloadUrl: "#",
      downloads: 7654,
      dateAdded: "2024-11-20"
    },
    {
      id: "guide-3",
      name: "Guide des Points de Contrôle",
      category: "guides",
      type: "PDF",
      size: "5.5 MB",
      description: "Liste complète des 123 points de contrôle vérifiés",
      downloadUrl: "#",
      downloads: 6543,
      dateAdded: "2024-11-25"
    },
    {
      id: "guide-4",
      name: "Guide Client SICTA 2025",
      category: "guides",
      type: "PDF",
      size: "7.2 MB",
      description: "Guide complet pour les clients SICTA",
      downloadUrl: "#",
      downloads: 5432,
      dateAdded: "2025-01-10"
    },

    // RÈGLEMENTS
    {
      id: "reglement-1",
      name: "Règlement Général du Contrôle Technique",
      category: "reglements",
      type: "PDF",
      size: "3.5 MB",
      description: "Règlement général régissant le contrôle technique en Côte d'Ivoire",
      downloadUrl: "#",
      downloads: 4321,
      dateAdded: "2024-10-01"
    },
    {
      id: "reglement-2",
      name: "Règlement Technique des Stations",
      category: "reglements",
      type: "PDF",
      size: "2.8 MB",
      description: "Normes et règlements pour les stations de contrôle",
      downloadUrl: "#",
      downloads: 3210,
      dateAdded: "2024-10-05"
    },
    {
      id: "reglement-3",
      name: "Règlement sur les Émissions Polluantes",
      category: "reglements",
      type: "PDF",
      size: "2.1 MB",
      description: "Règlementation concernant le contrôle des émissions",
      downloadUrl: "#",
      downloads: 2987,
      dateAdded: "2024-10-10"
    },

    // DÉCRETS
    {
      id: "decret-1",
      name: "Décret N°2024-XXX sur le Contrôle Technique",
      category: "decrets",
      type: "PDF",
      size: "4.2 MB",
      description: "Décret fixant les modalités du contrôle technique automobile",
      downloadUrl: "#",
      downloads: 3456,
      dateAdded: "2024-09-15"
    },
    {
      id: "decret-2",
      name: "Décret sur l'Agrément des Stations",
      category: "decrets",
      type: "PDF",
      size: "3.7 MB",
      description: "Décret relatif à l'agrément et au fonctionnement des stations",
      downloadUrl: "#",
      downloads: 2345,
      dateAdded: "2024-09-20"
    },
    {
      id: "decret-3",
      name: "Décret sur les Sanctions et Amendes",
      category: "decrets",
      type: "PDF",
      size: "2.9 MB",
      description: "Décret fixant les sanctions en cas de non-conformité",
      downloadUrl: "#",
      downloads: 1987,
      dateAdded: "2024-09-25"
    },

    // NOTES MINISTÉRIELLES
    {
      id: "note-1",
      name: "Note Ministérielle N°2024-001",
      category: "notes-ministerielles",
      type: "PDF",
      size: "1.8 MB",
      description: "Note du Ministère des Transports sur les nouvelles normes",
      downloadUrl: "#",
      downloads: 4567,
      dateAdded: "2024-12-01"
    },
    {
      id: "note-2",
      name: "Note Ministérielle N°2024-002",
      category: "notes-ministerielles",
      type: "PDF",
      size: "2.1 MB",
      description: "Instructions sur la mise en œuvre du contrôle technique",
      downloadUrl: "#",
      downloads: 3456,
      dateAdded: "2024-12-05"
    },
    {
      id: "note-3",
      name: "Note Ministérielle N°2024-003",
      category: "notes-ministerielles",
      type: "PDF",
      size: "1.5 MB",
      description: "Note sur les procédures de contrôle pour véhicules importés",
      downloadUrl: "#",
      downloads: 2876,
      dateAdded: "2024-12-10"
    },
    {
      id: "note-4",
      name: "Note Ministérielle N°2025-001",
      category: "notes-ministerielles",
      type: "PDF",
      size: "1.9 MB",
      description: "Mise à jour des procédures de contrôle technique 2025",
      downloadUrl: "#",
      downloads: 4321,
      dateAdded: "2025-01-15"
    }
  ];

  // Catégories avec icônes
  const categories = [
    { id: "tous", label: "Tous les documents", icon: FileText, color: "from-sicta-grey to-sicta-grey-dark" },
    { id: "tarifs", label: "Tarifs", icon: Receipt, color: "from-green-500 to-green-600" },
    { id: "brochures", label: "Brochures Produits", icon: FileText, color: "from-blue-500 to-blue-600" },
    { id: "formulaires", label: "Formulaires", icon: FileCheck, color: "from-purple-500 to-purple-600" },
    { id: "guides", label: "Guides", icon: BookOpen, color: "from-orange-500 to-orange-600" },
    { id: "reglements", label: "Règlements", icon: Scale, color: "from-red-500 to-red-600" },
    { id: "decrets", label: "Décrets", icon: Gavel, color: "from-indigo-500 to-indigo-600" },
    { id: "notes-ministerielles", label: "Notes Ministérielles", icon: ScrollText, color: "from-teal-500 to-teal-600" }
  ] as const;

  // Filtrer les documents
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === "tous" || doc.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Grouper par catégorie pour l'affichage
  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<DocumentCategory, Document[]>);

  const getCategoryIcon = (category: DocumentCategory) => {
    return categories.find(c => c.id === category)?.icon || FileText;
  };

  const getCategoryColor = (category: DocumentCategory) => {
    return categories.find(c => c.id === category)?.color || "from-gray-500 to-gray-600";
  };

  const handleDownload = (doc: Document) => {
    // Ici, vous implémenteriez le téléchargement réel
    window.open(doc.downloadUrl, '_blank');
    // Vous pourriez aussi tracker les téléchargements ici
  };

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-sicta-orange-light/10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="bg-primary/10 text-primary px-6 py-2 text-sm font-medium border border-primary/20 mb-6">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Centre de Téléchargement
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-sicta-grey-dark">Documents</span>{" "}
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-sicta-orange-light">
                    & Ressources
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-sicta-grey-light leading-relaxed max-w-3xl mx-auto mb-8">
                  Téléchargez gratuitement nos tarifs, brochures, formulaires administratifs, 
                  guides, règlements, décrets et notes ministérielles.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filtres et Recherche */}
        <section className="py-8 bg-white border-b border-sicta-grey/10 sticky top-0 z-40 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Recherche */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sicta-grey-light" />
                    <Input
                      type="text"
                      placeholder="Rechercher un document..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                </div>

                {/* Filtre Catégorie */}
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as DocumentCategory)}>
                  <SelectTrigger className="w-full lg:w-[250px] h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => {
                      const IconComponent = cat.icon;
                      return (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {cat.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Résultats */}
              <div className="mt-4 text-sm text-sicta-grey-light flex items-center gap-4">
                <span>{filteredDocuments.length} document{filteredDocuments.length > 1 ? "s" : ""} trouvé{filteredDocuments.length > 1 ? "s" : ""}</span>
                {(selectedCategory !== "tous" || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("tous");
                      setSearchQuery("");
                    }}
                    className="h-7"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Réinitialiser
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Documents par Catégorie */}
        <section ref={sectionRef} className="py-24 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {selectedCategory === "tous" ? (
                // Affichage groupé par catégorie
                Object.entries(groupedDocuments).map(([category, docs]) => {
                  const categoryData = categories.find(c => c.id === category);
                  if (!categoryData || docs.length === 0) return null;
                  
                  const IconComponent = categoryData.icon;
                  
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="mb-16"
                    >
                      {/* En-tête de catégorie */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`h-16 w-16 bg-gradient-to-br ${categoryData.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-sicta-grey-dark">
                            {categoryData.label}
                          </h2>
                          <p className="text-sicta-grey-light">
                            {docs.length} document{docs.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      {/* Liste de documents */}
                      <div className="space-y-3">
                        {docs.map((doc, index) => (
                          <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.03, duration: 0.5 }}
                          >
                            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 group">
                              <div className="flex items-center gap-6">
                                {/* Icône */}
                                <div className={`h-14 w-14 bg-gradient-to-br ${getCategoryColor(doc.category)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                                  {(() => {
                                    const Icon = getCategoryIcon(doc.category);
                                    return <Icon className="h-7 w-7 text-white" />;
                                  })()}
                                </div>

                                {/* Contenu principal */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex-1 min-w-0">
                                      <h3 className="text-lg font-bold text-sicta-grey-dark group-hover:text-primary transition-colors">
                                        {doc.name}
                                      </h3>
                                      <p className="text-sicta-grey-light text-sm mt-1 leading-relaxed">
                                        {doc.description}
                                      </p>
                                    </div>
                                    <Badge className="bg-primary/10 text-primary border-primary/20 flex-shrink-0">
                                      {doc.type}
                                    </Badge>
                                  </div>

                                  {/* Métadonnées */}
                                  <div className="flex items-center gap-6 text-xs text-sicta-grey-light mt-3">
                                    <div className="flex items-center gap-1">
                                      <Download className="h-3 w-3" />
                                      <span>{doc.downloads.toLocaleString()} téléchargements</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <FileText className="h-3 w-3" />
                                      <span>{doc.size}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      <span>{new Date(doc.dateAdded).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Bouton télécharger */}
                                <div className="flex-shrink-0">
                                  <Button 
                                    className="btn-hero group-hover:scale-105 transition-transform"
                                    onClick={() => handleDownload(doc)}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Télécharger
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                // Affichage filtré en liste
                <div className="space-y-3">
                  {filteredDocuments.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03, duration: 0.5 }}
                    >
                      <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 group">
                        <div className="flex items-center gap-6">
                          {/* Icône */}
                          <div className={`h-14 w-14 bg-gradient-to-br ${getCategoryColor(doc.category)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                            {(() => {
                              const Icon = getCategoryIcon(doc.category);
                              return <Icon className="h-7 w-7 text-white" />;
                            })()}
                          </div>

                          {/* Contenu principal */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-sicta-grey-dark group-hover:text-primary transition-colors">
                                  {doc.name}
                                </h3>
                                <p className="text-sicta-grey-light text-sm mt-1 leading-relaxed">
                                  {doc.description}
                                </p>
                              </div>
                              <Badge className="bg-primary/10 text-primary border-primary/20 flex-shrink-0">
                                {doc.type}
                              </Badge>
                            </div>

                            {/* Métadonnées */}
                            <div className="flex items-center gap-6 text-xs text-sicta-grey-light mt-3">
                              <div className="flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                <span>{doc.downloads.toLocaleString()} téléchargements</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                <span>{doc.size}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(doc.dateAdded).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</span>
                              </div>
                            </div>
                          </div>

                          {/* Bouton télécharger */}
                          <div className="flex-shrink-0">
                            <Button 
                              className="btn-hero group-hover:scale-105 transition-transform"
                              onClick={() => handleDownload(doc)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {filteredDocuments.length === 0 && (
                <Card className="p-12 text-center">
                  <FileQuestion className="h-16 w-16 text-sicta-grey-light mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-sicta-grey-dark mb-2">Aucun document trouvé</h3>
                  <p className="text-sicta-grey-light">Essayez de modifier vos critères de recherche</p>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Documents Populaires */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Les Plus Téléchargés
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Documents Populaires
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Les documents les plus consultés cette semaine
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {documents
                  .sort((a, b) => b.downloads - a.downloads)
                  .slice(0, 4)
                  .map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <Card className="p-6 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group h-full">
                        <div className={`h-14 w-14 bg-gradient-to-br ${getCategoryColor(doc.category)} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          {(() => {
                            const Icon = getCategoryIcon(doc.category);
                            return <Icon className="h-7 w-7 text-white" />;
                          })()}
                        </div>
                        <h3 className="text-lg font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {doc.name}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-sicta-grey-light mb-4">
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {doc.downloads.toLocaleString()} téléchargements
                          </span>
                        </div>
                        <Button 
                          className="w-full btn-hero text-sm"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-sicta-grey via-sicta-grey-dark to-sicta-grey text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Besoin d'aide pour trouver un document ?
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                Notre équipe est là pour vous accompagner dans vos démarches et répondre à toutes vos questions
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="btn-hero text-lg px-10 py-7">
                  <Info className="h-6 w-6 mr-3" />
                  Nous contacter
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sicta-grey text-lg px-10 py-7">
                  <Calendar className="h-6 w-6 mr-3" />
                  Prendre rendez-vous
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Telechargements;
