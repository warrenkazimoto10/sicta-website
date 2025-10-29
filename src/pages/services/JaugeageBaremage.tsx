import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  MapPin, 
  CheckCircle,
  FileText,
  Award,
  Users,
  ArrowRight,
  Shield,
  Calendar
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const JaugeageBaremage = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);

  const features = [
    {
      icon: Scale,
      title: "Jaugeage Réservoirs",
      description: "Mesure précise de la capacité des réservoirs de carburant selon les normes internationales."
    },
    {
      icon: Award,
      title: "Certification Officielle",
      description: "Délivrance de certificats officiels reconnus par les autorités compétentes."
    },
    {
      icon: CheckCircle,
      title: "Contrôle Conformité",
      description: "Vérification de la conformité aux réglementations en vigueur."
    },
    {
      icon: Shield,
      title: "Expertise Technique",
      description: "Intervention par nos techniciens spécialisés et certifiés."
    }
  ];

  const applications = [
    "Stations-service",
    "Dépôts pétroliers",
    "Réservoirs industriels",
    "Citernes de transport",
    "Installations portuaires"
  ];

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Scale className="h-4 w-4" />
                <span>Jaugeage & Barémage</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Jaugeage</span>{" "}
                <span className="text-gradient">& Barémage</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                Le jaugeage et le baremage sont des opérations destinées à déterminer avec précision 
                la capacité volumique des camions citernes, des citernes, des cuves ou réservoirs.
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 text-sicta-grey-light leading-relaxed">
                <p>
                  Service spécialisé de métrologie pour l'étalonnage des cuves de stockage de carburants. 
                  Nos techniciens certifiés procèdent à la mesure précise de la capacité volumique des équipements 
                  pétroliers selon les normes en vigueur.
                </p>
                
                <div className="bg-white rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                    Applications
                  </h3>
                  <p className="mb-4">
                    Nos services s'adressent aux professionnels du secteur pétrolier et des hydrocarbures :
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2 list-disc list-inside">
                    {applications.map((app, index) => (
                      <li key={index} className="text-sicta-grey-light">{app}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Nos Services
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Des solutions complètes pour tous vos besoins de jaugeage et barémage
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-sicta-grey-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sicta-grey-light text-sm">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-sicta-grey-dark mb-6">
                  Secteurs d'Application
                </h2>
                <p className="text-xl text-sicta-grey-light mb-8">
                  Nos services de jaugeage et barémage s'adressent à de nombreux secteurs d'activité
                </p>
                <div className="space-y-4">
                  {applications.map((app, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sicta-grey">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Card className="p-8 bg-white/80 backdrop-blur">
                  <div className="text-center">
                    <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
                      Certification Valide
                    </h3>
                    <p className="text-sicta-grey-light mb-6">
                      Certificats valides selon les normes internationales
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">5 ans</div>
                        <div className="text-sm text-sicta-grey">Validité certificat</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">±0.1%</div>
                        <div className="text-sm text-sicta-grey">Précision mesure</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Processus de Jaugeage
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Un processus rigoureux en plusieurs étapes pour garantir la précision
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Prise de contact", desc: "Évaluation des besoins et planification" },
                { step: "02", title: "Préparation", desc: "Mise en place des équipements de mesure" },
                { step: "03", title: "Mesurage", desc: "Jaugeage précis selon les normes" },
                { step: "04", title: "Certification", desc: "Délivrance du certificat officiel" }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="h-20 w-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-sicta-grey-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sicta-grey-light">
                    {step.desc}
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
              Besoin d'un jaugeage ?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Contactez nos experts pour une évaluation personnalisée de vos besoins
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                <Calendar className="h-5 w-5 mr-2" />
                Demander un devis
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey">
                <MapPin className="h-5 w-5 mr-2" />
                Nous contacter
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default JaugeageBaremage;


