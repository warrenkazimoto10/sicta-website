import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Zap
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Carrieres = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const jobOffers = [
    {
      title: "Technicien Contrôle Technique",
      location: "Abidjan",
      type: "CDI",
      experience: "2-5 ans",
      salary: "300 000 - 450 000 FCFA",
      description: "Effectuer les contrôles techniques automobiles selon les normes en vigueur. Formation technique fournie.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center",
      requirements: ["Bac+2 technique", "Expérience automobile", "Rigueur et précision"],
      benefits: ["Formation continue", "Mutuelle santé", "Prime de performance"]
    },
    {
      title: "Conseiller Client",
      location: "Bouaké",
      type: "CDI",
      experience: "1-3 ans",
      salary: "250 000 - 350 000 FCFA",
      description: "Accueillir et conseiller les clients dans leurs démarches de contrôle technique.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      requirements: ["Bac+2 commercial", "Relation client", "Maîtrise informatique"],
      benefits: ["Commission sur vente", "Formation produit", "Évolution rapide"]
    },
    {
      title: "Responsable Agence",
      location: "San-Pédro",
      type: "CDI",
      experience: "5+ ans",
      salary: "500 000 - 700 000 FCFA",
      description: "Gérer l'activité d'une agence SICTA et son équipe de techniciens.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
      requirements: ["Bac+5 management", "Expérience équipe", "Leadership"],
      benefits: ["Prime de direction", "Véhicule de fonction", "Participation aux bénéfices"]
    },
    {
      title: "Développeur Web",
      location: "Abidjan",
      type: "CDI",
      experience: "3-5 ans",
      salary: "400 000 - 600 000 FCFA",
      description: "Développer et maintenir les applications web et mobiles de SICTA.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center",
      requirements: ["Bac+3 informatique", "React/Node.js", "Base de données"],
      benefits: ["Télétravail possible", "Formation tech", "Équipement fourni"]
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Formation continue",
      description: "Programmes de formation et développement professionnel",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Heart,
      title: "Mutuelle santé",
      description: "Couverture santé complète pour vous et votre famille",
      color: "from-red-500 to-red-600"
    },
    {
      icon: TrendingUp,
      title: "Évolution de carrière",
      description: "Opportunités d'évolution et de promotion interne",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Équilibre vie pro/perso",
      description: "Horaires flexibles et congés payés",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Building2,
      title: "Environnement moderne",
      description: "Locaux modernes et équipements de pointe",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Shield,
      title: "Sécurité de l'emploi",
      description: "Stabilité et sécurité dans un secteur en croissance",
      color: "from-indigo-500 to-indigo-600"
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
                <Users className="h-4 w-4" />
                <span>Carrières SICTA</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Rejoignez</span>{" "}
                <span className="text-gradient">Notre Équipe</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Découvrez les opportunités de carrière chez SICTA et participez à notre mission 
                de sécurité routière en Côte d'Ivoire.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Pourquoi Rejoindre SICTA ?
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Une entreprise en pleine croissance avec des valeurs fortes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center h-full hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-white to-gray-50">
                    <div className={`h-20 w-20 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
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

        {/* Job Offers */}
        <section ref={sectionRef} className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Offres d'Emploi
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Découvrez nos postes à pourvoir
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {jobOffers.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={job.image}
                        alt={job.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          {job.type}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white/90 text-sicta-grey-dark px-3 py-1 rounded-full text-sm font-semibold">
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-sicta-grey-light mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.experience}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sicta-grey-light mb-4 leading-relaxed">
                        {job.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="text-sm font-semibold text-sicta-grey-dark mb-2">Exigences</h4>
                          <ul className="space-y-1">
                            {job.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-center space-x-2 text-xs text-sicta-grey-light">
                                <CheckCircle className="h-3 w-3 text-primary" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-sicta-grey-dark mb-2">Avantages</h4>
                          <ul className="space-y-1">
                            {job.benefits.map((benefit, benIndex) => (
                              <li key={benIndex} className="flex items-center space-x-2 text-xs text-sicta-grey-light">
                                <Zap className="h-3 w-3 text-sicta-orange-light" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <Button className="w-full btn-hero group-hover:scale-105 transition-transform duration-200">
                        Postuler maintenant
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Candidature Spontanée */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-sicta-grey-dark mb-6">
                  Candidature Spontanée
                </h2>
                <p className="text-xl text-sicta-grey-light mb-8">
                  Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre candidature spontanée !
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sicta-grey-dark">Rejoignez notre équipe</h3>
                        <p className="text-sicta-grey-light">Plus de 500 collaborateurs nous font confiance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sicta-grey-dark">Évolution garantie</h3>
                        <p className="text-sicta-grey-light">Des opportunités de carrière dans un secteur en croissance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sicta-grey-dark">Formation continue</h3>
                        <p className="text-sicta-grey-light">Développez vos compétences avec nos programmes de formation</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="p-8 shadow-xl border-0 bg-white">
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-sicta-grey-dark mb-2">
                            Nom complet
                          </label>
                          <input 
                            type="text" 
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                            placeholder="Votre nom complet"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-sicta-grey-dark mb-2">
                            Email
                          </label>
                          <input 
                            type="email" 
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-sicta-grey-dark mb-2">
                          Téléphone
                        </label>
                        <input 
                          type="tel" 
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                          placeholder="+225 XX XX XX XX XX"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-sicta-grey-dark mb-2">
                          Message
                        </label>
                        <textarea 
                          rows={4}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                          placeholder="Présentez-vous et expliquez votre motivation..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-sicta-grey-dark mb-2">
                          CV (PDF, DOC, DOCX)
                        </label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                          <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-sicta-grey-light">Glissez-déposez votre CV ou cliquez pour sélectionner</p>
                          <input 
                            type="file" 
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                        </div>
                      </div>
                      
                      <Button className="w-full btn-hero">
                        <FileText className="h-5 w-5 mr-2" />
                        Envoyer ma candidature
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sicta-grey text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à nous rejoindre ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Découvrez toutes nos offres d'emploi et postulez dès maintenant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Users className="h-5 w-5 mr-2" />
                Voir toutes les offres
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                <FileText className="h-5 w-5 mr-2" />
                Candidature spontanée
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Carrieres;
