import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  MapPin, 
  CheckCircle,
  FileText,
  Award,
  ArrowRight,
  Clock,
  Briefcase,
  GraduationCap,
  Heart,
  Building2,
  TrendingUp,
  Shield,
  Zap,
  Search,
  Filter,
  X,
  Upload,
  Download,
  Calendar,
  Mail,
  Phone,
  Sparkles,
  Target,
  Star,
  BookOpen,
  UserPlus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Types
type JobType = "emploi" | "stage" | "tous";
type JobCategory = "technique" | "commercial" | "management" | "informatique" | "tous";

interface JobOffer {
  id: string;
  title: string;
  type: "CDI" | "CDD" | "Stage" | "Alternance";
  category: JobCategory;
  location: string;
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  datePosted: string;
  deadline?: string;
  image?: string;
}

const Carrieres = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [selectedType, setSelectedType] = useState<JobType>("tous");
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>("tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm();

  // Offres d'emploi
  const jobOffers: JobOffer[] = [
    {
      id: "1",
      title: "Technicien Contrôle Technique",
      type: "CDI",
      category: "technique",
      location: "Abidjan",
      experience: "2-5 ans",
      salary: "300 000 - 450 000 FCFA",
      description: "Effectuer les contrôles techniques automobiles selon les normes en vigueur. Formation technique fournie.",
      requirements: ["Bac+2 technique", "Expérience automobile", "Rigueur et précision", "Permis de conduire"],
      benefits: ["Formation continue", "Mutuelle santé", "Prime de performance", "Équipement fourni"],
      datePosted: "2024-01-15",
      deadline: "2024-02-15"
    },
    {
      id: "2",
      title: "Conseiller Client",
      type: "CDI",
      category: "commercial",
      location: "Bouaké",
      experience: "1-3 ans",
      salary: "250 000 - 350 000 FCFA",
      description: "Accueillir et conseiller les clients dans leurs démarches de contrôle technique.",
      requirements: ["Bac+2 commercial", "Relation client", "Maîtrise informatique", "Bonne communication"],
      benefits: ["Commission sur vente", "Formation produit", "Évolution rapide", "Horaires flexibles"],
      datePosted: "2024-01-20",
      deadline: "2024-02-20"
    },
    {
      id: "3",
      title: "Responsable Station",
      type: "CDI",
      category: "management",
      location: "San-Pédro",
      experience: "5+ ans",
      salary: "500 000 - 700 000 FCFA",
      description: "Gérer l'activité d'une station SICTA et son équipe de techniciens.",
      requirements: ["Bac+5 management", "Expérience équipe", "Leadership", "Gestion budgétaire"],
      benefits: ["Prime de direction", "Véhicule de fonction", "Participation aux bénéfices", "Assurance complète"],
      datePosted: "2024-01-10",
      deadline: "2024-02-10"
    },
    {
      id: "4",
      title: "Développeur Web Full Stack",
      type: "CDI",
      category: "informatique",
      location: "Abidjan",
      experience: "3-5 ans",
      salary: "400 000 - 600 000 FCFA",
      description: "Développer et maintenir les applications web et mobiles de SICTA.",
      requirements: ["Bac+3 informatique", "React/Node.js", "Base de données", "Git/GitHub"],
      benefits: ["Télétravail possible", "Formation tech", "Équipement fourni", "Budget formation"],
      datePosted: "2024-01-25"
    },
    {
      id: "5",
      title: "Stage Technicien Automobile",
      type: "Stage",
      category: "technique",
      location: "Abidjan",
      experience: "Étudiant",
      description: "Stage de 3 à 6 mois pour découvrir le métier de technicien contrôle technique.",
      requirements: ["Étudiant en mécanique", "Curiosité", "Rigueur"],
      benefits: ["Gratification", "Formation pratique", "Encadrement professionnel", "Certificat de stage"],
      datePosted: "2024-01-18"
    },
    {
      id: "6",
      title: "Stage Marketing Digital",
      type: "Stage",
      category: "commercial",
      location: "Abidjan",
      experience: "Étudiant",
      description: "Stage de 4 à 6 mois en marketing digital et communication.",
      requirements: ["Étudiant en marketing", "Maîtrise réseaux sociaux", "Créativité"],
      benefits: ["Gratification", "Projets concrets", "Mentorat", "Certificat de stage"],
      datePosted: "2024-01-22"
    }
  ];

  // Filtrer les offres
  const filteredOffers = jobOffers.filter(offer => {
    const matchesType = selectedType === "tous" || 
      (selectedType === "emploi" && offer.type !== "Stage" && offer.type !== "Alternance") ||
      (selectedType === "stage" && (offer.type === "Stage" || offer.type === "Alternance"));
    const matchesCategory = selectedCategory === "tous" || offer.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  // Gestion du drag & drop pour CV
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
      setCvFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const onSubmitApplication = (data: any) => {
    console.log("Candidature:", { ...data, cvFile });
    // Ici, vous enverriez les données à votre API
    alert("Votre candidature a été envoyée avec succès !");
    reset();
    setCvFile(null);
  };

  const benefits = [
    { icon: Award, title: "Formation continue", description: "Programmes de formation et développement professionnel", color: "from-blue-500 to-blue-600" },
    { icon: Heart, title: "Mutuelle santé", description: "Couverture santé complète pour vous et votre famille", color: "from-red-500 to-red-600" },
    { icon: TrendingUp, title: "Évolution de carrière", description: "Opportunités d'évolution et de promotion interne", color: "from-green-500 to-green-600" },
    { icon: Clock, title: "Équilibre vie pro/perso", description: "Horaires flexibles et congés payés", color: "from-purple-500 to-purple-600" },
    { icon: Building2, title: "Environnement moderne", description: "Locaux modernes et équipements de pointe", color: "from-orange-500 to-orange-600" },
    { icon: Shield, title: "Sécurité de l'emploi", description: "Stabilité et sécurité dans un secteur en croissance", color: "from-indigo-500 to-indigo-600" }
  ];

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section - Professionnel */}
        <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-sicta-orange-light/10">
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
                  Carrières SICTA
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-sicta-grey-dark">Rejoignez</span>{" "}
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-sicta-orange-light">
                    Notre Équipe
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-sicta-grey-light leading-relaxed max-w-3xl mx-auto mb-8">
                  Découvrez les opportunités de carrière chez SICTA et participez à notre mission 
                  de sécurité routière en Côte d'Ivoire. Plus de 300 collaborateurs nous font confiance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-hero text-lg px-8 py-6">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Voir les offres
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-6">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Candidature spontanée
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pourquoi Rejoindre SICTA */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                Avantages
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                Pourquoi Rejoindre SICTA ?
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Une entreprise en pleine croissance avec des valeurs fortes et des opportunités d'évolution
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-8 text-center h-full hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group">
                    <div className={`h-20 w-20 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <benefit.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-4 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sicta-grey-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Filtres et Recherche */}
        <section className="py-12 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5 sticky top-0 z-40 backdrop-blur-sm border-b border-sicta-grey/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Recherche */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sicta-grey-light" />
                    <Input
                      type="text"
                      placeholder="Rechercher un poste, une ville..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                </div>

                {/* Filtre Type */}
                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as JobType)}>
                  <SelectTrigger className="w-full lg:w-[200px] h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les postes</SelectItem>
                    <SelectItem value="emploi">Emploi</SelectItem>
                    <SelectItem value="stage">Stages</SelectItem>
                  </SelectContent>
                </Select>

                {/* Filtre Catégorie */}
                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as JobCategory)}>
                  <SelectTrigger className="w-full lg:w-[200px] h-12">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Toutes catégories</SelectItem>
                    <SelectItem value="technique">Technique</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="informatique">Informatique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Résultats */}
              <div className="mt-4 text-sm text-sicta-grey-light">
                {filteredOffers.length} offre{filteredOffers.length > 1 ? "s" : ""} trouvée{filteredOffers.length > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </section>

        {/* Offres d'Emploi */}
        <section ref={sectionRef} className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {filteredOffers.length === 0 ? (
                <Card className="p-12 text-center">
                  <AlertCircle className="h-16 w-16 text-sicta-grey-light mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-sicta-grey-dark mb-2">Aucune offre trouvée</h3>
                  <p className="text-sicta-grey-light">Essayez de modifier vos critères de recherche</p>
                </Card>
              ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                  {filteredOffers.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group h-full">
                        <div className="p-8">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={`${
                                  job.type === "CDI" ? "bg-green-500" :
                                  job.type === "CDD" ? "bg-blue-500" :
                                  "bg-purple-500"
                                } text-white`}>
                                  {job.type}
                                </Badge>
                                <Badge variant="outline" className="border-primary text-primary">
                                  {job.category}
                                </Badge>
                              </div>
                              <h3 className="text-2xl font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-sicta-grey-light mb-4">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{job.experience}</span>
                                </div>
                                {job.salary && (
                                  <div className="flex items-center gap-1">
                                    <Award className="h-4 w-4" />
                                    <span className="font-semibold">{job.salary}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sicta-grey-light mb-6 leading-relaxed line-clamp-3">
                            {job.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-sicta-grey/10">
                            <div className="text-xs text-sicta-grey-light">
                              Publié le {new Date(job.datePosted).toLocaleDateString("fr-FR")}
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  onClick={() => setSelectedJob(job)}
                                  className="btn-hero group-hover:scale-105 transition-transform"
                                >
                                  Voir détails
                                  <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-3xl">{job.title}</DialogTitle>
                                  <DialogDescription className="text-base">
                                    {job.location} • {job.experience} {job.salary && `• ${job.salary}`}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6 mt-4">
                                  <div>
                                    <h4 className="font-bold text-lg mb-2">Description du poste</h4>
                                    <p className="text-sicta-grey-light">{job.description}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-lg mb-2">Exigences</h4>
                                    <ul className="space-y-2">
                                      {job.requirements.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sicta-grey-light">
                                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                          <span>{req}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-lg mb-2">Avantages</h4>
                                    <ul className="space-y-2">
                                      {job.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sicta-grey-light">
                                          <Star className="h-5 w-5 text-sicta-orange-light mt-0.5 flex-shrink-0" />
                                          <span>{benefit}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  {job.deadline && (
                                    <div className="bg-primary/10 p-4 rounded-lg">
                                      <p className="text-sm text-sicta-grey-dark">
                                        <strong>Date limite de candidature :</strong> {new Date(job.deadline).toLocaleDateString("fr-FR")}
                                      </p>
                                    </div>
                                  )}
                                  <Button className="w-full btn-hero">
                                    <FileText className="h-5 w-5 mr-2" />
                                    Postuler maintenant
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Candidature Spontanée */}
        <section className="py-24 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                  Candidature
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Candidature Spontanée
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre candidature spontanée !
                </p>
              </motion.div>
              
              <Card className="p-8 lg:p-12 shadow-2xl border-2 border-primary/10 bg-white">
                <form onSubmit={handleSubmit(onSubmitApplication)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-sicta-grey-dark mb-2">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("fullName", { required: "Ce champ est requis" })}
                        placeholder="Votre nom complet"
                        className="h-12"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500 mt-1">{errors.fullName.message as string}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sicta-grey-dark mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        {...register("email", { 
                          required: "Ce champ est requis",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email invalide"
                          }
                        })}
                        placeholder="votre@email.com"
                        className="h-12"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message as string}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-sicta-grey-dark mb-2">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="tel"
                        {...register("phone", { required: "Ce champ est requis" })}
                        placeholder="+225 XX XX XX XX XX"
                        className="h-12"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone.message as string}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sicta-grey-dark mb-2">
                        Type de candidature
                      </label>
                      <Controller
                        name="applicationType"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="emploi">Emploi</SelectItem>
                              <SelectItem value="stage">Stage</SelectItem>
                              <SelectItem value="alternance">Alternance</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-sicta-grey-dark mb-2">
                      Message de motivation <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      {...register("message", { required: "Ce champ est requis" })}
                      rows={6}
                      placeholder="Présentez-vous et expliquez votre motivation..."
                      className="resize-none"
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">{errors.message.message as string}</p>
                    )}
                  </div>

                  {/* Upload CV */}
                  <div>
                    <label className="block text-sm font-semibold text-sicta-grey-dark mb-2">
                      CV (PDF, DOC, DOCX) <span className="text-red-500">*</span>
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                        isDragging 
                          ? "border-primary bg-primary/5" 
                          : "border-sicta-grey/20 hover:border-primary/50"
                      }`}
                    >
                      {cvFile ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div className="text-left">
                              <p className="font-semibold text-sicta-grey-dark">{cvFile.name}</p>
                              <p className="text-sm text-sicta-grey-light">
                                {(cvFile.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setCvFile(null)}
                              className="ml-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-sicta-grey-light mx-auto mb-4" />
                          <p className="text-sicta-grey-dark font-medium mb-2">
                            Glissez-déposez votre CV ici
                          </p>
                          <p className="text-sm text-sicta-grey-light mb-4">
                            ou cliquez pour sélectionner un fichier
                          </p>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="cv-upload"
                          />
                          <label htmlFor="cv-upload">
                            <Button type="button" variant="outline" className="cursor-pointer">
                              <Upload className="h-4 w-4 mr-2" />
                              Sélectionner un fichier
                            </Button>
                          </label>
                        </>
                      )}
                    </div>
                    {!cvFile && (
                      <p className="text-sm text-red-500 mt-2">Veuillez télécharger votre CV</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-hero text-lg py-6"
                    disabled={!cvFile}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Envoyer ma candidature
                  </Button>
                </form>
              </Card>
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
                Prêt à nous rejoindre ?
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                Découvrez toutes nos offres d'emploi et postulez dès maintenant. 
                Rejoignez une équipe dynamique et passionnée.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="btn-hero text-lg px-10 py-7">
                  <Briefcase className="h-6 w-6 mr-3" />
                  Voir toutes les offres
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sicta-grey text-lg px-10 py-7">
                  <UserPlus className="h-6 w-6 mr-3" />
                  Candidature spontanée
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

export default Carrieres;
