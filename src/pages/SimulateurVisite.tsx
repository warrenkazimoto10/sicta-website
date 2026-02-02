import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  Calculator,
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  ArrowRight,
  Sparkles,
  Car,
  Truck,
  Info,
  Bell,
  MapPin,
  ArrowUp
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";

type VehicleType = "particulier" | "transport";

interface CalculationResult {
  nextVisitDate: Date;
  daysRemaining: number;
  isOverdue: boolean;
  isDueSoon: boolean;
  periodicity: string;
}

const SimulateurVisite = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [vehicleType, setVehicleType] = useState<VehicleType>("particulier");
  const [lastVisitDate, setLastVisitDate] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Calculer la prochaine visite
  const calculateNextVisit = () => {
    if (!lastVisitDate) {
      alert("Veuillez saisir la date de votre dernière visite");
      return;
    }

    const lastDate = new Date(lastVisitDate);
    const today = new Date();
    
    // Périodicité selon le type de véhicule
    let monthsToAdd = 0;
    let periodicity = "";

    if (vehicleType === "particulier") {
      // Véhicule particulier : contrôle tous les 2 ans (24 mois)
      monthsToAdd = 24;
      periodicity = "2 ans";
    } else {
      // Véhicule de transport : contrôle tous les ans (12 mois)
      monthsToAdd = 12;
      periodicity = "1 an";
    }

    // Calculer la prochaine date
    const nextDate = new Date(lastDate);
    nextDate.setMonth(nextDate.getMonth() + monthsToAdd);

    // Calculer les jours restants
    const diffTime = nextDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Vérifier si en retard ou bientôt dû
    const isOverdue = daysRemaining < 0;
    const isDueSoon = daysRemaining >= 0 && daysRemaining <= 30;

    setResult({
      nextVisitDate: nextDate,
      daysRemaining,
      isOverdue,
      isDueSoon,
      periodicity
    });

    // Scroll vers le résultat
    setTimeout(() => {
      const resultElement = document.getElementById("result");
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Gérer le scroll pour afficher le bouton "Haut de page"
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 400);
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
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
                  <Calculator className="h-4 w-4 mr-2" />
                  Simulateur
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-sicta-grey-dark">Prochain</span>{" "}
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-sicta-orange-light">
                    Contrôle Technique
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-sicta-grey-light leading-relaxed max-w-3xl mx-auto">
                  Calculez la date de votre prochain contrôle technique en quelques secondes
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Formulaire de Calcul */}
        <section ref={sectionRef} className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 lg:p-12 shadow-2xl border-2 border-primary/10 bg-gradient-to-br from-white to-sicta-grey/5">
                {/* Avertissement */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium mb-1">
                        Cette fonctionnalité est destinée au véhicule particulier uniquement.
                      </p>
                      <p className="text-sm text-blue-700">
                        Calculez la date de votre prochain contrôle de votre véhicule particulier (inférieur à 3.5 T) en remplissant les informations ci-dessous :
                      </p>
                    </div>
                  </div>
                </div>

                {/* Formulaire */}
                <div className="space-y-8">
                  {/* Type de véhicule */}
                  <div>
                    <Label className="text-lg font-bold text-sicta-grey-dark mb-4 block">
                      TYPE :
                    </Label>
                    <RadioGroup 
                      value={vehicleType} 
                      onValueChange={(value) => setVehicleType(value as VehicleType)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="particulier" id="particulier" />
                        <Label 
                          htmlFor="particulier" 
                          className="cursor-pointer text-sicta-grey-dark font-medium text-lg"
                        >
                          Particulier
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transport" id="transport" />
                        <Label 
                          htmlFor="transport" 
                          className="cursor-pointer text-sicta-grey-dark font-medium text-lg"
                        >
                          Transport
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-sicta-grey-light mt-2">
                      {vehicleType === "particulier" 
                        ? "Contrôle tous les 2 ans pour les véhicules particuliers"
                        : "Contrôle tous les ans pour les véhicules de transport"}
                    </p>
                  </div>

                  {/* Date de dernière visite */}
                  <div>
                    <Label htmlFor="lastVisit" className="text-lg font-bold text-sicta-grey-dark mb-4 block">
                      DATE DE VOTRE DERNIÈRE VISITE :
                    </Label>
                    <Input
                      id="lastVisit"
                      type="date"
                      value={lastVisitDate}
                      onChange={(e) => setLastVisitDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="h-14 text-lg border-2 border-sicta-grey/20 focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Bouton de validation */}
                  <Button
                    onClick={calculateNextVisit}
                    className="w-full btn-hero text-lg py-6 h-auto"
                    size="lg"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    VALIDEZ
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>

                  {/* Lien rappel email */}
                  <div className="text-center pt-4 border-t border-sicta-grey/20">
                    <p className="text-sicta-grey-light text-sm">
                      Afin d'être prévenu gratuitement par email de la date de votre prochain contrôle technique,{" "}
                      <Link to="/espace-client" className="text-primary font-semibold hover:underline">
                        cliquez ici
                      </Link>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Résultat */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    id="result"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6 }}
                    className="mt-12"
                  >
                    <Card className={`p-8 lg:p-12 shadow-2xl border-2 ${
                      result.isOverdue 
                        ? "border-red-500 bg-gradient-to-br from-red-50 to-white" 
                        : result.isDueSoon
                        ? "border-orange-500 bg-gradient-to-br from-orange-50 to-white"
                        : "border-green-500 bg-gradient-to-br from-green-50 to-white"
                    }`}>
                      <div className="text-center mb-8">
                        <div className={`h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          result.isOverdue 
                            ? "bg-red-500" 
                            : result.isDueSoon
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}>
                          {result.isOverdue ? (
                            <AlertCircle className="h-10 w-10 text-white" />
                          ) : (
                            <CheckCircle2 className="h-10 w-10 text-white" />
                          )}
                        </div>
                        <Badge className={`mb-4 ${
                          result.isOverdue 
                            ? "bg-red-500 text-white" 
                            : result.isDueSoon
                            ? "bg-orange-500 text-white"
                            : "bg-green-500 text-white"
                        }`}>
                          {result.isOverdue 
                            ? "Contrôle en retard" 
                            : result.isDueSoon
                            ? "Contrôle bientôt dû"
                            : "Contrôle à venir"}
                        </Badge>
                      </div>

                      <div className="space-y-6">
                        {/* Date de prochaine visite */}
                        <div className="text-center">
                          <p className="text-sicta-grey-light mb-2">Votre prochain contrôle technique</p>
                          <h3 className="text-3xl lg:text-4xl font-bold text-sicta-grey-dark mb-2">
                            {formatDate(result.nextVisitDate)}
                          </h3>
                          <p className="text-sicta-grey-light">
                            Périodicité : {result.periodicity}
                          </p>
                        </div>

                        {/* Jours restants */}
                        <div className="bg-white rounded-xl p-6 border-2 border-sicta-grey/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                                result.isOverdue 
                                  ? "bg-red-100" 
                                  : result.isDueSoon
                                  ? "bg-orange-100"
                                  : "bg-green-100"
                              }`}>
                                <Clock className={`h-6 w-6 ${
                                  result.isOverdue 
                                    ? "text-red-600" 
                                    : result.isDueSoon
                                    ? "text-orange-600"
                                    : "text-green-600"
                                }`} />
                              </div>
                              <div>
                                <p className="text-sicta-grey-light text-sm">Jours restants</p>
                                <p className={`text-2xl font-bold ${
                                  result.isOverdue 
                                    ? "text-red-600" 
                                    : result.isDueSoon
                                    ? "text-orange-600"
                                    : "text-green-600"
                                }`}>
                                  {result.isOverdue 
                                    ? `${Math.abs(result.daysRemaining)} jours de retard`
                                    : `${result.daysRemaining} jours`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <Button 
                            className="btn-hero w-full"
                            onClick={() => window.location.href = "/reservation"}
                          >
                            <Calendar className="h-5 w-5 mr-2" />
                            Réserver maintenant
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-2 border-primary text-primary hover:bg-primary hover:text-white w-full"
                            onClick={() => window.location.href = "/reseau"}
                          >
                            <MapPin className="h-5 w-5 mr-2" />
                            Trouver une station
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Actions Rapides */}
        <section className="py-24 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                  Actions Rapides
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Accédez rapidement aux services SICTA
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <Link to="/reseau">
                    <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 group h-full">
                      <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                        Trouver une Station
                      </h3>
                      <p className="text-sicta-grey-light">
                        Localisez la station SICTA la plus proche de chez vous
                      </p>
                    </Card>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Link to="/espace-client">
                    <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 group h-full">
                      <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Bell className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                        Rappel Gratuit
                      </h3>
                      <p className="text-sicta-grey-light">
                        Recevez un rappel par email avant votre prochain contrôle
                      </p>
                    </Card>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Link to="/reservation">
                    <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 group h-full">
                      <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                        RDV en Ligne
                      </h3>
                      <p className="text-sicta-grey-light">
                        Réservez votre créneau de contrôle technique en ligne
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Bouton Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 h-12 w-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default SimulateurVisite;



