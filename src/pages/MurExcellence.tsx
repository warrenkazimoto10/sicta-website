import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  MapPin, 
  CheckCircle,
  Star,
  Trophy,
  Users,
  ArrowRight,
  Calendar,
  Target,
  Heart
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const MurExcellence = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const achievements = [
    {
      title: "Certification ISO 9001:2015",
      description: "Certification qualité pour l'ensemble de nos processus",
      date: "2024",
      icon: Award,
      category: "Certification",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
      details: "Certification internationale de management de la qualité obtenue après un audit rigoureux de nos processus opérationnels."
    },
    {
      title: "Prix Excellence Service Client",
      description: "Reconnaissance de la qualité de notre service client",
      date: "2023",
      icon: Heart,
      category: "Service",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      details: "Récompense décernée par l'Association des Entreprises de Côte d'Ivoire pour notre excellence en service client."
    },
    {
      title: "Leader Sécurité Routière",
      description: "Position de leader dans le contrôle technique en Côte d'Ivoire",
      date: "2024",
      icon: Target,
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center",
      details: "Reconnaissance officielle du Ministère des Transports pour notre contribution à la sécurité routière."
    },
    {
      title: "Innovation Technologique",
      description: "Prix pour nos innovations dans le domaine du contrôle technique",
      date: "2023",
      icon: Star,
      category: "Innovation",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
      details: "Prix de l'innovation décerné par la Chambre de Commerce pour nos solutions technologiques avancées."
    }
  ];

  const teamMembers = [
    {
      name: "Marie Kouassi",
      role: "Technicienne Senior",
      achievement: "Excellence technique 2024",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      department: "Contrôle Technique",
      experience: "8 ans d'expérience"
    },
    {
      name: "Jean-Baptiste Traoré",
      role: "Responsable Agence",
      achievement: "Meilleur manager 2024",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      department: "Management",
      experience: "12 ans d'expérience"
    },
    {
      name: "Fatou Diabaté",
      role: "Conseillère Client",
      achievement: "Service client exemplaire",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      department: "Service Client",
      experience: "6 ans d'expérience"
    },
    {
      name: "Kouadio N'Guessan",
      role: "Technicien Contrôle",
      achievement: "Innovation technique 2024",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      department: "Innovation",
      experience: "10 ans d'expérience"
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
                <Award className="h-4 w-4" />
                <span>Mur de l'Excellence</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Excellence</span>{" "}
                <span className="text-gradient">& Reconnaissance</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Découvrez nos récompenses, certifications et les membres de notre équipe 
                qui se distinguent par leur excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Nos Récompenses & Certifications
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                La reconnaissance de notre engagement pour l'excellence
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          {achievement.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <achievement.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2 text-primary">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">{achievement.date}</span>
                        </div>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-sicta-grey-dark mb-3 group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h3>
                      
                      <p className="text-sicta-grey-light mb-4 leading-relaxed">
                        {achievement.description}
                      </p>
                      
                      <div className="bg-gradient-to-r from-primary/5 to-sicta-orange-light/5 rounded-lg p-4">
                        <p className="text-sm text-sicta-grey-dark leading-relaxed">
                          {achievement.details}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Excellence */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Équipe d'Excellence
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Nos collaborateurs qui se distinguent par leur performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-white">
                    <div className="relative mb-6">
                      <div className="h-32 w-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-colors duration-300">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                          {member.department}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-sicta-grey-dark mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    
                    <p className="text-sicta-grey-light text-sm mb-2">
                      {member.role}
                    </p>
                    
                    <p className="text-xs text-sicta-grey-light mb-4">
                      {member.experience}
                    </p>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-sicta-orange-light/10 text-primary px-4 py-2 rounded-full text-xs font-medium">
                      {member.achievement}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Nos Performances
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Des chiffres qui témoignent de notre excellence
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "50+", label: "Années d'expérience", icon: Calendar },
                { number: "29", label: "Stations permanentes", icon: MapPin },
                { number: "1500+", label: "Véhicules/jour", icon: Target },
                { number: "98%", label: "Satisfaction client", icon: Heart }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <p className="text-sicta-grey-light">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sicta-grey text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Rejoignez l'Excellence SICTA
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Découvrez comment vous pouvez contribuer à notre mission d'excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Users className="h-5 w-5 mr-2" />
                Rejoindre notre équipe
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                <Award className="h-5 w-5 mr-2" />
                Nos certifications
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default MurExcellence;
