import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Lock, 
  FileText, 
  Calendar,
  History,
  Settings,
  ArrowRight,
  LogIn,
  Eye,
  Download,
  CheckCircle
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";

const EspaceClient = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const services = [
    {
      icon: FileText,
      title: "Mes Documents",
      description: "Consultez et téléchargez vos certificats de contrôle technique",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Calendar,
      title: "Mes Rendez-vous",
      description: "Gérez vos rendez-vous et consultez votre historique",
      color: "from-green-500 to-green-600"
    },
    {
      icon: History,
      title: "Historique",
      description: "Consultez l'historique complet de vos contrôles",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Settings,
      title: "Mon Profil",
      description: "Modifiez vos informations personnelles",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const recentDocuments = [
    {
      name: "Certificat Contrôle Technique - 15/01/2025",
      type: "PDF",
      date: "15 janvier 2025",
      status: "Valide"
    },
    {
      name: "Rapport de Contrôle - 15/01/2025",
      type: "PDF", 
      date: "15 janvier 2025",
      status: "Disponible"
    },
    {
      name: "Certificat Contrôle Technique - 15/07/2024",
      type: "PDF",
      date: "15 juillet 2024",
      status: "Expiré"
    }
  ];

  const upcomingAppointments = [
    {
      date: "25 février 2025",
      time: "14:30",
      location: "Agence SICTA Abidjan Plateau",
      service: "Contrôle Technique"
    },
    {
      date: "10 mars 2025", 
      time: "09:15",
      location: "Agence SICTA Cocody",
      service: "Pré-visite"
    }
  ];

  if (isLoggedIn) {
    return (
      <PageTransition>
        <div className="w-full">
          {/* Header */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-sicta-grey-dark mb-2">
                    Espace Client
                  </h1>
                  <p className="text-sicta-grey-light">
                    Bienvenue dans votre espace personnel SICTA
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsLoggedIn(false)}
                >
                  Déconnexion
                </Button>
              </div>
            </div>
          </section>

          {/* Dashboard */}
          <section ref={sectionRef} className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Services */}
                <div className="lg:col-span-3">
                  <h2 className="text-2xl font-bold text-sicta-grey-dark mb-6">
                    Mes Services
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                          <div className={`h-12 w-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <service.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-sicta-grey-dark mb-2">
                            {service.title}
                          </h3>
                          <p className="text-sicta-grey-light text-sm">
                            {service.description}
                          </p>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-sicta-grey-dark mb-4">
                      Mes Statistiques
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sicta-grey-light">Contrôles effectués</span>
                        <span className="font-semibold text-primary">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sicta-grey-light">Prochain contrôle</span>
                        <span className="font-semibold text-primary">25/02/2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sicta-grey-light">Documents</span>
                        <span className="font-semibold text-primary">8</span>
                      </div>
                    </div>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-sicta-grey-dark mb-4">
                      Actions Rapides
                    </h3>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Nouveau rendez-vous
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger documents
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Modifier profil
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Documents */}
          <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-sicta-grey-dark mb-8">
                Mes Documents Récents
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentDocuments.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-sicta-grey-dark mb-1">
                            {doc.name}
                          </h3>
                          <p className="text-sicta-grey-light text-sm">
                            {doc.date}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          doc.status === 'Valide' ? 'bg-green-100 text-green-800' :
                          doc.status === 'Disponible' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-sicta-grey-light">
                          {doc.type}
                        </span>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Upcoming Appointments */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-sicta-grey-dark mb-8">
                Mes Prochains Rendez-vous
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-sicta-grey-dark mb-1">
                            {appointment.service}
                          </h3>
                          <p className="text-sicta-grey-light text-sm">
                            {appointment.date} à {appointment.time}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Modifier
                        </Button>
                      </div>
                      <p className="text-sicta-grey-light text-sm">
                        {appointment.location}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <User className="h-4 w-4" />
                <span>Espace Client</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Espace</span>{" "}
                <span className="text-gradient">Client</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Accédez à votre espace personnel pour consulter vos documents, 
                gérer vos rendez-vous et suivre l'historique de vos contrôles.
              </p>
            </div>
          </div>
        </section>

        {/* Login Form */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card className="p-8 shadow-xl">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-sicta-grey-dark mb-2">
                    Connexion
                  </h2>
                  <p className="text-sicta-grey-light">
                    Connectez-vous à votre espace client
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-sicta-grey-dark">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-sicta-grey-dark">
                      Mot de passe
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Votre mot de passe"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sicta-grey-light hover:text-sicta-grey-dark"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-sicta-grey-light">Se souvenir de moi</span>
                    </label>
                    <a href="#" className="text-sm text-primary hover:underline">
                      Mot de passe oublié ?
                    </a>
                  </div>

                  <Button 
                    className="w-full btn-hero"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Se connecter
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-sicta-grey-light">
                    Pas encore de compte ?{" "}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Créer un compte
                    </a>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Fonctionnalités de l'Espace Client
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Gérez facilement tous vos services SICTA en ligne
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className={`h-16 w-16 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-sicta-grey-dark mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sicta-grey-light text-sm">
                      {service.description}
                    </p>
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
              Prêt à créer votre compte ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Rejoignez des milliers de clients qui gèrent leurs services SICTA en ligne
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <User className="h-5 w-5 mr-2" />
                Créer un compte
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                <FileText className="h-5 w-5 mr-2" />
                En savoir plus
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default EspaceClient;




