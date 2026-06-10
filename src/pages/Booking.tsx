import { useState } from "react";
import { Calendar, MapPin, Clock, Car, CreditCard, Smartphone, CheckCircle, ArrowRight, Shield, FileText, ChevronsUpDown, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

// Import des données du réseau depuis Network.tsx
// Tableau 1 — Intérieur du Pays (21 agences hors Abidjan)
const agenciesInterieurPays = [
  { name: "Abengourou", city: "Abengourou", phone: "07 47 04 91 40" },
  { name: "Aboisso", city: "Aboisso", phone: "07 57 20 90 77" },
  { name: "Adzopé", city: "Adzopé", phone: "07 69 88 40 84" },
  { name: "Agnibilékro", city: "Agnibilékro", phone: "07 47 58 37 41" },
  { name: "Agboville", city: "Agboville", phone: "07 68 31 15 89" },
  { name: "Bondoukou", city: "Bondoukou", phone: "07 09 66 57 63" },
  { name: "Bouaké", city: "Bouaké", phone: "07 59 39 93 07" },
  { name: "Bouaflé", city: "Bouaflé", phone: "07 59 08 11 83" },
  { name: "Dabou", city: "Dabou", phone: "07 68 62 84 35" },
  { name: "Daloa", city: "Daloa", phone: "07 67 45 90 93" },
  { name: "Daoukro", city: "Daoukro", phone: "07 08 26 46 19" },
  { name: "Divo", city: "Divo", phone: "07 59 39 93 04" },
  { name: "Gagnoa", city: "Gagnoa", phone: "07 07 00 92 12" },
  { name: "Guiglo", city: "Guiglo", phone: "07 57 44 02 69" },
  { name: "Korhogo", city: "Korhogo", phone: "07 59 08 11 79" },
  { name: "Man", city: "Man", phone: "07 07 70 53 07" },
  { name: "Odienné", city: "Odienné", phone: "07 57 43 83 68" },
  { name: "San Pédro", city: "San Pédro", phone: "07 59 39 93 03" },
  { name: "Soubré", city: "Soubré", phone: "07 59 39 93 05" },
  { name: "Yamoussoukro", city: "Yamoussoukro", phone: "07 48 48 16 66" },
  { name: "Yaou", city: "Yaou", phone: "07 59 39 93 06" }
];

// Tableau 2 — Réseau Abidjan (8 stations fixes + 2 bancs mobiles)
const agenciesReseauAbidjan = [
  { name: "Abatta", city: "Abidjan", phone: "07 59 08 11 84" },
  { name: "Angré", city: "Abidjan", phone: "07 67 11 04 85" },
  { name: "Guichet Unique", city: "Abidjan", phone: "07 09 52 08 09" },
  { name: "Marcory", city: "Abidjan", phone: "27 21 21 29 90" },
  { name: "Plateau", city: "Abidjan", phone: "07 00 25 88 93" },
  { name: "Vridi", city: "Abidjan", phone: "07 47 59 63 00" },
  { name: "Yopougon Zone Industrielle", city: "Abidjan", phone: "07 07 62 28 48" },
  { name: "Yopougon Niangon", city: "Abidjan", phone: "07 09 71 82 77" },
  { name: "Banc Mobile Abidjan", city: "Rayon de 50km", phone: "07 07 74 80 79" },
  { name: "Fourgon Intervention", city: "Abidjan & Zone Industrielle", phone: "07 57 25 31 23" }
];

// Liste des stations périodiques à exclure
const stationsPeriodiques = [
  "Bongouanou", "Boundiali", "Bouna", "Danané", "Dimbokro", "Duékoué", "Fresco",
  "Ferkessédougou", "Grand Lahou", "Issia", "Katiola", "M'bahiakro", "Méagui",
  "Oumé", "Sassandra", "Séguéla", "Tabou", "Tiassalé", "Tengrela", "Toumodi",
  "Touba", "Zuénoula"
];

// Combiner toutes les stations permanentes (hors périodiques)
const allPermanentStations = [
  ...agenciesInterieurPays.map(station => ({
    id: station.name.toLowerCase().replace(/\s+/g, '-').replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a').replace(/[ô]/g, 'o').replace(/[ùû]/g, 'u').replace(/'/g, ''),
    name: `SICTA ${station.name}`,
    address: station.city,
    phone: station.phone,
    city: station.city
  })),
  ...agenciesReseauAbidjan.map(station => ({
    id: station.name.toLowerCase().replace(/\s+/g, '-').replace(/[éèê]/g, 'e').replace(/[àâ]/g, 'a').replace(/[ô]/g, 'o').replace(/[ùû]/g, 'u').replace(/'/g, ''),
    name: `SICTA ${station.name}`,
    address: station.city === "Abidjan" ? station.city : `${station.city}, Abidjan`,
    phone: station.phone,
    city: station.city
  }))
].filter(station => !stationsPeriodiques.some(periodic => station.name.toLowerCase().includes(periodic.toLowerCase())));

const agencies = allPermanentStations;

const timeSlots = [
  "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const VIGNETTE_TARIFFS = {
  moto: {
    low: [5000, 3750, 3500], // < 125cm3
    high: [12000, 9000, 6000] // >= 125cm3
  },
  auto: {
    "2-4CV": [19000, 14250, 13500],
    "5-7CV": [35000, 26250, 25000],
    "8-11CV": [49000, 36750, 30000],
    "12-15CV": [96000, 72000, 40000],
    "16CV_camion": [190000, 142500, 80000],
    "16CV_tourisme": [250000, 142500, 80000]
  }
};

const INSPECTION_PRICE = {
  moto: 5000,
  vl1: 13100, // <= 7 CV
  vl2: 15500, // > 7 CV
  pl1: 18000, // < 10 T
  pl2: 20450  // >= 10 T
};

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    agencyId: "",
    date: "",
    time: "",
    category: "auto", // auto, moto, pl
    subCategory: "5-7CV",
    ageRange: 0, // 0: 1-4, 1: 5-10, 2: 11+
    immatriculation: "",
    brand: "",
    model: "",
    year: new Date().getFullYear().toString(),
    paymentMethod: "",
    firstName: "",
    lastName: "",
    phone: ""
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const calculateTotalPrice = () => {
    let vignette = 0;
    let inspection = 0;

    if (formData.category === "moto") {
      inspection = INSPECTION_PRICE.moto;
      const range = formData.subCategory === "low" ? "low" : "high";
      vignette = VIGNETTE_TARIFFS.moto[range][formData.ageRange];
    } else if (formData.category === "auto") {
      const isLarge = ["8-11CV", "12-15CV", "16CV_tourisme"].includes(formData.subCategory);
      inspection = isLarge ? INSPECTION_PRICE.vl2 : INSPECTION_PRICE.vl1;
      vignette = VIGNETTE_TARIFFS.auto[formData.subCategory][formData.ageRange];
    } else {
      // Pour les poids lourds (PL), on utilise par défaut le tarif PL1 si non spécifié davantage
      inspection = INSPECTION_PRICE.pl1;
      vignette = VIGNETTE_TARIFFS.auto["16CV_camion"][formData.ageRange];
    }

    return { inspection, vignette, total: inspection + vignette };
  };

  const prices = calculateTotalPrice();
  const selectedAgency = agencies.find(a => a.id === formData.agencyId);

  return (
    <PageTransition>
      <div className="w-full pb-20">
        {/* Dynamic Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-sicta-orange-light/5 z-0" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-sicta-grey-dark">
                  Simplifiez votre <span className="text-gradient">Contrôle Technique</span>
                </h1>
                <p className="text-xl lg:text-2xl text-sicta-grey-light leading-relaxed max-w-2xl mx-auto">
                  Bénéficiez des tarifs officiels 2025 incluant la vignette et la visite technique en quelques clics.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Improved Progress Tracker */}
        <div className="container mx-auto px-4 -mt-8 relative z-20">
          <Card className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-md shadow-2xl border-0 ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              {[
                { step: 1, label: "Véhicule", icon: Car },
                { step: 2, label: "Rendez-vous", icon: Clock },
                { step: 3, label: "Paiement", icon: CreditCard }
              ].map((item, idx) => (
                <div key={item.step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${currentStep >= item.step ? 'bg-primary text-white scale-110 shadow-primary/30' : 'bg-sicta-grey/10 text-sicta-grey-light'
                      }`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-tighter ${currentStep >= item.step ? 'text-primary' : 'text-sicta-grey-light'}`}>
                      {item.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-700 ${currentStep > item.step ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' : 'bg-sicta-grey/10'
                      }`} />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

              {/* Form Content */}
              <div className="lg:col-span-2 space-y-6">
                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="p-8 shadow-xl border-0 bg-white group hover:ring-1 hover:ring-primary/20 transition-all duration-300">
                      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Détails du Véhicule
                      </h2>

                      <div className="space-y-8">
                        <div>
                          <label className="text-sm font-bold text-sicta-grey-dark/70 mb-4 block uppercase tracking-widest">Catégorie</label>
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { id: "moto", label: "Moto", icon: "🏍️" },
                              { id: "auto", label: "Auto", icon: "🚗" },
                              { id: "pl", label: "Poids Lourd", icon: "🚛" }
                            ].map(cat => (
                              <button
                                key={cat.id}
                                onClick={() => {
                                  let defaultSub = "";
                                  if (cat.id === "auto") defaultSub = "5-7CV";
                                  if (cat.id === "moto") defaultSub = "low";
                                  setFormData({ ...formData, category: cat.id as any, subCategory: defaultSub as any });
                                }}
                                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.category === cat.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-sicta-grey/10 hover:border-primary/30'
                                  }`}
                              >
                                <span className="text-3xl">{cat.icon}</span>
                                <span className="font-bold text-sm">{cat.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {formData.category === "auto" && (
                          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                            <label className="text-sm font-bold text-sicta-grey-dark/70 mb-4 block uppercase tracking-widest">Puissance (CV)</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {Object.keys(VIGNETTE_TARIFFS.auto).map(cv => (
                                <button
                                  key={cv}
                                  onClick={() => setFormData({ ...formData, subCategory: cv as any })}
                                  className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.subCategory === cv ? 'border-primary bg-primary text-white shadow-lg' : 'border-sicta-grey/10 hover:border-primary/50'
                                    }`}
                                >
                                  {cv.replace('_', ' ')}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {formData.category === "moto" && (
                          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                            <label className="text-sm font-bold text-sicta-grey-dark/70 mb-4 block uppercase tracking-widest">Cylindrée</label>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                onClick={() => setFormData({ ...formData, subCategory: "low" })}
                                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.subCategory === "low" ? 'border-primary bg-primary text-white shadow-lg' : 'border-sicta-grey/10'
                                  }`}
                              >
                                &lt; 125 cm3
                              </button>
                              <button
                                onClick={() => setFormData({ ...formData, subCategory: "high" })}
                                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.subCategory === "high" ? 'border-primary bg-primary text-white shadow-lg' : 'border-sicta-grey/10'
                                  }`}
                              >
                                &ge; 125 cm3
                              </button>
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="text-sm font-bold text-sicta-grey-dark/70 mb-4 block uppercase tracking-widest">Âge du véhicule</label>
                          <div className="grid grid-cols-3 gap-3">
                            {["1 à 4 ans", "5 à 10 ans", "11 ans et +"].map((range, idx) => (
                              <button
                                key={idx}
                                onClick={() => setFormData({ ...formData, ageRange: idx })}
                                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.ageRange === idx ? 'border-primary bg-primary text-white shadow-lg' : 'border-sicta-grey/10'
                                  }`}
                              >
                                {range}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light">Plaque d'immatriculation</label>
                            <Input
                              placeholder="Ex: 1234 AB 01"
                              value={formData.immatriculation}
                              onChange={(e) => setFormData({ ...formData, immatriculation: e.target.value.toUpperCase() })}
                              className="uppercase font-mono text-lg tracking-widest"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light">Marque / Modèle</label>
                            <Input
                              placeholder="Ex: Toyota Corolla"
                              value={formData.brand}
                              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-10">
                        <Button onClick={nextStep} className="w-full btn-hero py-8 text-xl group" disabled={!formData.immatriculation}>
                          Continuer la réservation
                          <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="p-8 shadow-xl border-0 bg-white">
                      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Planification
                      </h2>

                      <div className="space-y-8">
                        <div>
                          <label className="text-sm font-bold text-sicta-grey-dark/70 mb-4 block uppercase tracking-widest">Agence SICTA</label>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                  "w-full justify-between py-6 text-lg h-auto",
                                  !formData.agencyId && "text-muted-foreground"
                                )}
                              >
                                {formData.agencyId
                                  ? agencies.find((agency) => agency.id === formData.agencyId)?.name
                                  : "Choisir une station de contrôle"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                              <Command>
                                <CommandInput placeholder="Rechercher une station..." />
                                <CommandList>
                                  <CommandEmpty>Aucune station trouvée.</CommandEmpty>
                                  <CommandGroup>
                                    {agencies.map((agency) => (
                                      <CommandItem
                                        key={agency.id}
                                        value={`${agency.name} ${agency.address} ${agency.city}`}
                                        onSelect={() => {
                                          setFormData({ ...formData, agencyId: agency.id });
                                          setOpen(false);
                                        }}
                                        className="py-3"
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            formData.agencyId === agency.id ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        <div className="flex flex-col">
                                          <span className="font-bold">{agency.name}</span>
                                          <span className="text-xs text-sicta-grey-light">{agency.address}</span>
                                        </div>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <label className="text-sm font-bold text-sicta-grey-dark/70 block uppercase tracking-widest">Date</label>
                            <Input
                              type="date"
                              className="py-6 text-lg"
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="text-sm font-bold text-sicta-grey-dark/70 block uppercase tracking-widest">Heure</label>
                            <div className="grid grid-cols-4 gap-2">
                              {timeSlots.map(time => (
                                <button
                                  key={time}
                                  onClick={() => setFormData({ ...formData, time: time })}
                                  className={`p-2 text-sm font-bold rounded-lg border-2 transition-all ${formData.time === time ? 'border-primary bg-primary text-white' : 'border-sicta-grey/10 hover:border-primary/50'
                                    }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t">
                          <label className="text-sm font-bold text-sicta-grey-dark/70 mb-6 block uppercase tracking-widest">Informations de contact</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light">Prénom</label>
                              <Input
                                placeholder="Ex: Jean"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="py-6 text-lg"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light">Nom</label>
                              <Input
                                placeholder="Ex: Kouassi"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="py-6 text-lg"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light">Numéro de téléphone</label>
                              <Input
                                placeholder="Ex: 07 12 34 56 78"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="py-6 text-lg"
                                type="tel"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-12">
                        <Button variant="outline" onClick={prevStep} className="px-8 py-7 text-lg font-bold border-2">Retour</Button>
                        <Button
                          onClick={nextStep}
                          className="flex-1 btn-hero py-7 text-xl"
                          disabled={!formData.agencyId || !formData.date || !formData.time || !formData.firstName || !formData.lastName || !formData.phone}
                        >
                          Confirmer le créneau
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="p-8 shadow-2xl border-0 bg-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

                      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Paiement Sécurisé
                      </h2>

                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { id: "mobile", name: "Mobile Money", desc: "Orange, MTN, Moov", icon: Smartphone },
                            { id: "card", name: "Carte Bancaire", desc: "Visa, Mastercard", icon: CreditCard },
                            { id: "onsite", name: "Paiement en Agence", desc: "Le jour du rendez-vous", icon: MapPin }
                          ].map(method => (
                            <button
                              key={method.id}
                              onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                              className={`p-6 rounded-2xl border-2 transition-all flex items-start gap-4 text-left ${formData.paymentMethod === method.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-sicta-grey/10 hover:border-primary/20'
                                }`}
                            >
                              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${formData.paymentMethod === method.id ? 'bg-primary text-white' : 'bg-sicta-grey/10 text-sicta-grey-dark'
                                }`}>
                                <method.icon className="h-6 w-6" />
                              </div>
                              <div>
                                <div className="font-bold text-lg">{method.name}</div>
                                <div className="text-sm text-sicta-grey-light">{method.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="p-6 bg-sicta-orange-light/10 rounded-2xl border border-sicta-orange-light/20">
                          <div className="flex gap-4 items-center">
                            <div className="h-10 w-10 bg-sicta-orange-light text-white rounded-full flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="h-6 w-6" />
                            </div>
                            <p className="text-sm font-medium text-sicta-grey-dark">
                              Votre réservation sera confirmée immédiatement après le paiement. Un ticket de réservation sera envoyé à votre adresse.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-12">
                        <Button variant="outline" onClick={prevStep} className="px-8 py-7 text-lg font-bold border-2">Retour</Button>
                        <Button
                          className="flex-1 btn-hero py-7 text-xl shadow-xl shadow-primary/30"
                          disabled={!formData.paymentMethod}
                          onClick={() => window.location.href = '#/confirmation-success'}
                        >
                          Payer {prices.total.toLocaleString()} FCFA
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>

              {/* Sidebar Summary */}
              <div className="space-y-6">
                <Card className="p-8 sticky top-24 shadow-2xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm group">
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Récapitulatif
                  </h3>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      {formData.immatriculation && (
                        <div className="flex justify-between items-center animate-in fade-in zoom-in duration-300">
                          <span className="text-sm text-sicta-grey-light font-medium uppercase tracking-tighter">Véhicule</span>
                          <span className="font-mono font-bold bg-sicta-grey/5 px-2 py-1 rounded border">{formData.immatriculation}</span>
                        </div>
                      )}
                      {selectedAgency && (
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-sm text-sicta-grey-light font-medium uppercase tracking-tighter">Station</span>
                          <span className="font-bold text-right text-sm">{selectedAgency.name}</span>
                        </div>
                      )}
                      {formData.date && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-sicta-grey-light font-medium uppercase tracking-tighter">Date & Heure</span>
                          <span className="font-bold text-sm">{formData.date} à {formData.time || '--:--'}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-sicta-grey-light">Visite Technique</span>
                        <span className="font-bold">{prices.inspection.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-sicta-grey-light">Vignette 2025</span>
                        <span className="font-bold">{prices.vignette.toLocaleString()} FCFA</span>
                      </div>
                      <div className="pt-4 mt-2 border-t flex justify-between items-end">
                        <span className="text-lg font-bold text-sicta-grey-dark">Total à payer</span>
                        <div className="text-right">
                          <div className="text-3xl font-black text-primary leading-none">
                            {prices.total.toLocaleString()}
                          </div>
                          <div className="text-[10px] font-bold text-primary tracking-tighter uppercase">FCFA TTC</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Helpful Info Badge */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-sicta-grey to-sicta-grey-dark text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                    <Shield className="h-24 w-24" />
                  </div>
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Garantie SICTA
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Tous vos reçus et certificats sont certifiés par le ministère des transports et reconnus par les autorités.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Booking;
