import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MapPin, 
  CheckCircle,
  FileText,
  Award,
  Users,
  ArrowRight,
  Clock,
  HeadphonesIcon,
  MessageCircle
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Assistance = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const services = [
    {
      icon: Phone,
      title: "Support Téléphonique",
      description: "Assistance téléphonique pour toutes vos questions techniques et administratives."
    },
    {
      icon: MessageCircle,
      title: "Conseils Techniques",
      description: "Conseils d'experts pour l'entretien et la maintenance de votre véhicule."
    },
    {
      icon: FileText,
      title: "Assistance Administrative",
      description: "Aide pour toutes vos démarches administratives liées au contrôle technique."
    },
    {
      icon: Users,
      title: "Service Client Dédié",
      description: "Un interlocuteur privilégié pour un suivi personnalisé."
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Téléphone",
      contact: "27 21 21 29 90",
      description: "Lun-Ven: 7h30-17h30, Sam: 8h-12h"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      contact: "+225 07 12 34 56 78",
      description: "Support instantané 24h/24"
    },
    {
      icon: FileText,
      title: "Email",
      contact: "infos@sicta.ci",
      description: "Réponse sous 24h"
    }
  ];

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Assistance & Conseils</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-sicta-grey-dark">Support</span>{" "}
                <span className="text-gradient">& Conseils</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-sicta-grey-light leading-relaxed">
                Support technique et accompagnement personnalisé pour tous vos besoins automobiles. 
                Nos experts sont à votre disposition pour vous conseiller.
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 text-sicta-grey-light leading-relaxed">
                <p>
                  Notre service d'assistance vous accompagne dans toutes vos démarches liées au contrôle technique. 
                  Notre équipe de professionnels est disponible pour répondre à vos questions techniques et administratives.
                </p>
                
                <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                    Nos services d'accompagnement
                  </h3>
                  <p className="mb-4">
                    Que vous ayez besoin d'informations sur les procédures, d'aide pour préparer votre véhicule, 
                    ou d'assistance administrative, notre équipe est là pour vous aider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Nos Services d'Assistance
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Un accompagnement complet pour toutes vos démarches automobiles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-8 w-8 text-primary" />
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

        {/* Contact Methods */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Comment Nous Contacter
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Plusieurs moyens de nous joindre selon vos préférences
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-sicta-grey-dark mb-2">
                      {method.title}
                    </h3>
                    <div className="text-lg font-bold text-primary mb-2">
                      {method.contact}
                    </div>
                    <p className="text-sicta-grey-light text-sm">
                      {method.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Questions Fréquentes
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Les réponses aux questions les plus courantes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "Quels documents dois-je apporter ?",
                  answer: "Carte grise, certificat d'assurance, justificatif d'identité et le véhicule en bon état."
                },
                {
                  question: "Combien de temps dure un contrôle ?",
                  answer: "Un contrôle technique dure généralement entre 30 et 45 minutes."
                },
                {
                  question: "Que faire en cas de contre-visite ?",
                  answer: "Vous avez 30 jours pour effectuer les réparations et revenir gratuitement."
                },
                {
                  question: "Puis-je réserver en ligne ?",
                  answer: "Oui, vous pouvez réserver votre créneau directement sur notre site web."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-sicta-grey-dark mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-sicta-grey-light">
                      {faq.answer}
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
              Besoin d'aide ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Notre équipe d'experts est là pour vous accompagner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Phone className="h-5 w-5 mr-2" />
                Nous appeler
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Assistance;


