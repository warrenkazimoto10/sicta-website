import { useState } from "react";
import { Calendar, Shield, CheckCircle, Clock, MapPin, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import inspectionProcess from "@/assets/inspection-process.jpg";
import NearestAgencyModal from "@/components/NearestAgencyModal";

const processSteps = [
  {
    icon: Calendar,
    title: "Réservation",
    description: "Réservez votre créneau en ligne ou par téléphone",
    details: ["Choix de la station", "Sélection date/heure", "Confirmation instantanée"]
  },
  {
    icon: Shield, 
    title: "Contrôle technique",
    description: "Inspection complète de votre véhicule par nos experts",
    details: ["123 points de contrôle", "Équipements certifiés", "Personnel qualifié"]
  },
  {
    icon: FileText,
    title: "Certification",
    description: "Récupération de votre certificat et rapport détaillé",
    details: ["Certificat valide 6 mois", "Rapport personnalisé", "Conseils d'entretien"]
  }
];

const ProcessSection = () => {
  const [nearestOpen, setNearestOpen] = useState(false);
  return (
    <>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
            Un processus simple et efficace
          </h2>
          <p className="text-xl text-sicta-grey-light">
            Découvrez comment se déroule votre contrôle technique chez SICTA
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <img 
              src={inspectionProcess}
              alt="Processus d'inspection SICTA - Contrôle technique professionnel"
              className="w-full h-80 lg:h-96 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            
            {/* Overlay content */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Technologie moderne</h3>
              <p className="text-white/90">
                Équipements de pointe pour un contrôle précis et fiable
              </p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <Card key={index} className="card-elevated p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <step.icon className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold text-sicta-grey-dark">{step.title}</h3>
                    </div>
                    
                    <p className="text-sicta-grey-light mb-4">{step.description}</p>
                    
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm text-sicta-grey-light">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-sicta-grey-dark mb-4">
              Prêt à commencer ?
            </h3>
            <p className="text-sicta-grey-light mb-6">
              Réservez dès maintenant votre contrôle technique dans la station la plus proche
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Bouton RDV temporairement désactivé */}
              <Button variant="outline" onClick={() => setNearestOpen(true)}>
                <MapPin className="h-4 w-4 mr-2" />
                Trouvez une station
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
      <NearestAgencyModal open={nearestOpen} onClose={() => setNearestOpen(false)} />
    </>
  );
};

export default ProcessSection;