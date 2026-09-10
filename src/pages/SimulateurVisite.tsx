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
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcStep, setCalcStep] = useState(0);

  // Calculer la prochaine visite avec simulation d'analyse technique
  const calculateNextVisit = () => {
    if (!lastVisitDate) {
      alert("Veuillez saisir la date de votre dernière visite");
      return;
    }

    setIsCalculating(true);
    setCalcStep(1);

    // Étape 1 : Analyse de la catégorie
    setTimeout(() => {
      setCalcStep(2);
      // Étape 2 : Calcul de la périodicité réglementaire
      setTimeout(() => {
        setCalcStep(3);
        // Étape 3 : Génération du certificat d'échéance
        setTimeout(() => {
          const lastDate = new Date(lastVisitDate);
          const today = new Date();

          let monthsToAdd = 0;
          let periodicity = "";

          if (vehicleType === "particulier") {
            monthsToAdd = 24;
            periodicity = "2 ans (Véhicule Particulier)";
          } else {
            monthsToAdd = 12;
            periodicity = "1 an (Véhicule de Transport)";
          }

          const nextDate = new Date(lastDate);
          nextDate.setMonth(nextDate.getMonth() + monthsToAdd);

          const diffTime = nextDate.getTime() - today.getTime();
          const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const isOverdue = daysRemaining < 0;
          const isDueSoon = daysRemaining >= 0 && daysRemaining <= 30;

          setResult({
            nextVisitDate: nextDate,
            daysRemaining,
            isOverdue,
            isDueSoon,
            periodicity
          });
          setIsCalculating(false);

          // Scroll vers le résultat
          setTimeout(() => {
            const resultElement = document.getElementById("result");
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        }, 800);
      }, 800);
    }, 800);
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
        <section className="relative h-[55vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f1117] via-[#1a1c23] to-[#251810]">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
                  <Calculator className="h-4 w-4" /> Simulateur Officiel
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                  Prochain <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-orange-400">Contrôle Technique</span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  Calculez instantanément la date de votre prochaine visite réglementaire SICTA
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Formulaire de Calcul */}
        <section ref={sectionRef} className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 lg:p-12 shadow-2xl border-0 bg-gradient-to-br from-slate-900 via-[#1e2330] to-slate-900 text-white rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.02]" />

                {/* Avertissement */}
                <div className="bg-primary/10 border-l-4 border-primary p-5 mb-10 rounded-r-2xl relative z-10">
                  <div className="flex items-start gap-4">
                    <Info className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base text-orange-200 font-bold mb-1">
                        Simulateur réglementaire SICTA
                      </p>
                      <p className="text-sm text-gray-300">
                        Vérifiez si votre véhicule particulier ou de transport est à jour en renseignant les critères officiels de visite technique ci-dessous.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Formulaire */}
                <div className="space-y-10 relative z-10">
                  {/* Type de véhicule */}
                  <div>
                    <Label className="text-base font-bold text-gray-300 uppercase tracking-widest mb-4 block">
                      1. Choisissez la catégorie de votre véhicule :
                    </Label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Carte Particulier */}
                      <button
                        type="button"
                        onClick={() => setVehicleType("particulier")}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 flex items-start gap-4 ${
                          vehicleType === "particulier"
                            ? "border-primary bg-primary/10 text-white shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                            : "border-white/10 hover:border-white/20 bg-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          vehicleType === "particulier" ? "bg-primary text-white" : "bg-white/10 text-gray-400"
                        }`}>
                          <Car className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-white">Véhicule Particulier</p>
                          <p className="text-xs text-gray-400 mt-1">Visite obligatoire tous les 2 ans (24 mois)</p>
                        </div>
                      </button>

                      {/* Carte Transport */}
                      <button
                        type="button"
                        onClick={() => setVehicleType("transport")}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 flex items-start gap-4 ${
                          vehicleType === "transport"
                            ? "border-primary bg-primary/10 text-white shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                            : "border-white/10 hover:border-white/20 bg-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          vehicleType === "transport" ? "bg-primary text-white" : "bg-white/10 text-gray-400"
                        }`}>
                          <Truck className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-white">Véhicule de Transport</p>
                          <p className="text-xs text-gray-400 mt-1">Visite obligatoire tous les ans (12 mois)</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Date de dernière visite */}
                  <div>
                    <Label htmlFor="lastVisit" className="text-base font-bold text-gray-300 uppercase tracking-widest mb-4 block">
                      2. Date de votre dernière visite technique :
                    </Label>
                    <Input
                      id="lastVisit"
                      type="date"
                      value={lastVisitDate}
                      onChange={(e) => setLastVisitDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="h-14 text-lg border-2 border-white/10 bg-white/5 focus:border-primary text-white transition-all rounded-2xl outline-none"
                    />
                  </div>

                  {/* Bouton de validation */}
                  <Button
                    onClick={calculateNextVisit}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white text-lg py-6 h-auto rounded-2xl shadow-lg hover:shadow-orange-500/20 transition-all font-bold group"
                    size="lg"
                  >
                    {isCalculating ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyse réglementaire...
                      </span>
                    ) : (
                      <>
                        <Calculator className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                        LANCER LA SIMULATION
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  {/* Rappel diagnostic en cours */}
                  {isCalculating && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3"
                    >
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Analyse en cours...</span>
                        <span>{calcStep * 33}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary" 
                          initial={{ width: "0%" }}
                          animate={{ width: `${calcStep * 33.3}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="text-sm text-gray-300 text-center animate-pulse">
                        {calcStep === 1 && "1. Analyse des paramètres de carrosserie..."}
                        {calcStep === 2 && "2. Application des barèmes officiels SICTA..."}
                        {calcStep === 3 && "3. Génération de la fiche d'échéance..."}
                      </p>
                    </motion.div>
                  )}

                  {/* Lien rappel email */}
                  <div className="text-center pt-5 border-t border-white/10">
                    <p className="text-gray-400 text-sm">
                      Afin d'être prévenu gratuitement par email de la date de votre prochain contrôle technique,{" "}
                      <Link to="/espace-client" className="text-primary font-bold hover:underline">
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
                    <Card className={`p-8 lg:p-12 shadow-2xl border-2 ${result.isOverdue
                      ? "border-red-500 bg-gradient-to-br from-red-50 to-white"
                      : result.isDueSoon
                        ? "border-orange-500 bg-gradient-to-br from-orange-50 to-white"
                        : "border-green-500 bg-gradient-to-br from-green-50 to-white"
                      }`}>
                      <div className="text-center mb-8">
                        <div className={`h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 ${result.isOverdue
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
                        <Badge className={`mb-4 ${result.isOverdue
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
                              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${result.isOverdue
                                ? "bg-red-100"
                                : result.isDueSoon
                                  ? "bg-orange-100"
                                  : "bg-green-100"
                                }`}>
                                <Clock className={`h-6 w-6 ${result.isOverdue
                                  ? "text-red-600"
                                  : result.isDueSoon
                                    ? "text-orange-600"
                                    : "text-green-600"
                                  }`} />
                              </div>
                              <div>
                                <p className="text-sicta-grey-light text-sm">Jours restants</p>
                                <p className={`text-2xl font-bold ${result.isOverdue
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

                        {/* Frise chronologique visuelle */}
                        <div className="bg-white rounded-xl p-6 border-2 border-sicta-grey/10">
                          <h4 className="font-bold text-sicta-grey-dark text-sm mb-4 uppercase tracking-wider">Ligne Temporelle de Validité</h4>
                          <div className="relative pt-6 pb-2">
                            {/* Ligne de fond */}
                            <div className="h-2 w-full bg-gray-200 rounded-full relative">
                              {/* Progression active */}
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  result.isOverdue 
                                    ? "bg-red-500 w-full" 
                                    : result.isDueSoon 
                                      ? "bg-orange-500 w-[90%]" 
                                      : "bg-green-500 w-[60%]"
                                }`} 
                              />
                            </div>
                            
                            {/* Points d'étapes */}
                            <div className="absolute top-4 left-0 -ml-2 flex flex-col items-center">
                              <div className="h-5.5 w-5.5 rounded-full bg-slate-300 border-4 border-white flex items-center justify-center shadow-sm" />
                              <span className="text-[10px] text-sicta-grey-light font-bold mt-1">Dernière visite</span>
                            </div>

                            <div className={`absolute top-4 ${
                              result.isOverdue 
                                ? "left-3/4" 
                                : result.isDueSoon 
                                  ? "left-[90%]" 
                                  : "left-[60%]"
                            } -ml-2 flex flex-col items-center`}>
                              <div className={`h-5.5 w-5.5 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                                result.isOverdue ? "bg-red-500" : result.isDueSoon ? "bg-orange-500" : "bg-green-500"
                              }`} />
                              <span className="text-[10px] text-sicta-grey-light font-bold mt-1">Aujourd'hui</span>
                            </div>

                            <div className="absolute top-4 right-0 -mr-2 flex flex-col items-center">
                              <div className={`h-5.5 w-5.5 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                                result.isOverdue ? "bg-red-300" : "bg-primary"
                              }`} />
                              <span className="text-[10px] text-sicta-grey-light font-bold mt-1">Échéance</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Bouton RDV temporairement désactivé */}
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
                  {/* Carte RDV en ligne temporairement désactivée */}
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



