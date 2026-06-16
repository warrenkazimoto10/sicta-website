import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Calendar, MapPin, Clock, Car, CheckCircle, ArrowRight, Shield,
  FileText, ChevronsUpDown, Check, Home
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { createReservation } from "@/services/reservationService";

// ─── Stations ──────────────────────────────────────────────────────────────────
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
  { name: "Yaou", city: "Yaou", phone: "07 59 39 93 06" },
];

const agenciesReseauAbidjan = [
  { name: "Angré", city: "Abidjan", phone: "07 67 11 04 85" },
  { name: "Guichet Unique", city: "Abidjan", phone: "07 09 52 08 09" },
  { name: "Marcory", city: "Abidjan", phone: "27 21 21 29 90" },
  { name: "Plateau", city: "Abidjan", phone: "07 00 25 88 93" },
  { name: "Vridi", city: "Abidjan", phone: "07 47 59 63 00" },
  { name: "Yopougon Zone Industrielle", city: "Abidjan", phone: "07 07 62 28 48" },
  { name: "Yopougon Niangon", city: "Abidjan", phone: "07 09 71 82 77" },
  { name: "Banc Mobile Abidjan", city: "Rayon de 50km", phone: "07 07 74 80 79" },
  { name: "Fourgon Intervention", city: "Abidjan & Zone Industrielle", phone: "07 57 25 31 23" },
];

const slugify = (s: string) =>
  s.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[éèê]/g, "e").replace(/[àâ]/g, "a")
    .replace(/[ô]/g, "o").replace(/[ùû]/g, "u")
    .replace(/'/g, "");

const allStations = [
  ...agenciesInterieurPays.map((s) => ({
    id: slugify(s.name),
    name: `SICTA ${s.name}`,
    address: s.city,
    phone: s.phone,
  })),
  ...agenciesReseauAbidjan.map((s) => ({
    id: slugify(s.name),
    name: `SICTA ${s.name}`,
    address: s.city === "Abidjan" ? "Abidjan" : s.city,
    phone: s.phone,
  })),
];

// ─── Tarifs visite technique (FCFA) ───────────────────────────────────────────
const INSPECTION_PRICE: Record<string, number> = {
  moto_low: 5000,   // < 125 cm³
  moto_high: 5000,  // ≥ 125 cm³
  auto_2_4: 13100,
  auto_5_7: 13100,
  auto_8_11: 15500,
  auto_12_14: 15500,
  auto_15plus: 15500,
  pl: 18000,
};

const CV_OPTIONS = [
  { id: "auto_2_4",   label: "2 — 4 CV" },
  { id: "auto_5_7",   label: "5 — 7 CV" },
  { id: "auto_8_11",  label: "8 — 11 CV" },
  { id: "auto_12_14", label: "12 — 14 CV" },
  { id: "auto_15plus",label: "> 14 CV" },
];

// ─── Créneaux horaires (spec complète) ────────────────────────────────────────
const TIME_SLOTS = [
  "07:30", "08:00", "08:30", "09:00",
  "09:30", "10:00", "10:30", "11:00",
  "11:30", "12:00", "12:30", "13:00",
  "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isSunday = (dateStr: string) => new Date(dateStr).getDay() === 0;

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const formatDateFr = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
};

const generateBookingRef = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "SICTA-";
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
};

// ─── Composant ────────────────────────────────────────────────────────────────
interface FormData {
  stationId: string;
  category: "moto" | "auto" | "pl";
  cvKey: string;
  immatriculation: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [stationOpen, setStationOpen] = useState(false);
  const [sundayError, setSundayError] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    stationId: "",
    category: "auto",
    cvKey: "auto_5_7",
    immatriculation: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Pré-sélection depuis la page Réseau
  useEffect(() => {
    const preStation = (location.state as { stationId?: string } | null)?.stationId;
    if (preStation) {
      setForm((f) => ({ ...f, stationId: preStation }));
    }
  }, [location.state]);

  const set = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const inspectionPrice =
    form.category === "moto"
      ? INSPECTION_PRICE["moto_low"]
      : form.category === "pl"
      ? INSPECTION_PRICE["pl"]
      : INSPECTION_PRICE[form.cvKey] ?? 13100;

  const selectedStation = allStations.find((s) => s.id === form.stationId);

  const step1Valid = !!form.immatriculation && !!form.stationId;
  const step2Valid =
    !!form.date && !sundayError && !!form.time &&
    !!form.firstName && !!form.lastName && !!form.phone;

  const handleConfirm = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await createReservation({
        station_nom: selectedStation?.name ?? null,
        categorie_vehicule: form.category,
        puissance_cv: form.category === "auto" ? form.cvKey : undefined,
        immatriculation: form.immatriculation,
        prenom: form.firstName,
        nom: form.lastName,
        telephone: form.phone,
        date_rdv: form.date,
        heure_rdv: form.time,
      });
      setBookingRef(res.numero_reservation);
      setStep(3);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erreur réseau. Veuillez réessayer."
      );
    } finally {
      setSubmitting(false);
    }
  }, [form, selectedStation]);

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <PageTransition>
      <div className="w-full pb-20">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-sicta-orange-light/5 z-0" />
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-sicta-grey-dark">
                Réservez votre{" "}
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-sicta-orange-light">
                  contrôle technique
                </span>
              </h1>
              <p className="text-lg text-sicta-grey-light">
                3 étapes simples — sans paiement en ligne.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stepper */}
        <div className="container mx-auto px-4 -mt-4 relative z-20">
          <Card className="max-w-3xl mx-auto p-6 shadow-2xl border-0 ring-1 ring-black/5 bg-white/90 backdrop-blur-md">
            <div className="flex items-center justify-between">
              {[
                { n: 1, label: "Véhicule", Icon: Car },
                { n: 2, label: "Rendez-vous", Icon: Clock },
                { n: 3, label: "Confirmation", Icon: CheckCircle },
              ].map(({ n, label, Icon }, idx) => (
                <div key={n} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={cn(
                      "h-11 w-11 rounded-2xl flex items-center justify-center transition-all duration-500 shadow",
                      step >= n ? "bg-primary text-white scale-110 shadow-primary/30" : "bg-sicta-grey/10 text-sicta-grey-light"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      step >= n ? "text-primary" : "text-sicta-grey-light"
                    )}>
                      {label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={cn(
                      "flex-1 h-1 mx-3 rounded-full transition-all duration-700",
                      step > n ? "bg-primary" : "bg-sicta-grey/10"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main content */}
        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

              {/* ── Formulaire ─────────────────────────────────────────────── */}
              <div className="lg:col-span-2 space-y-6">

                {/* ── ÉTAPE 1 : Véhicule + Station ─────────────────────────── */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="p-8 shadow-xl border-0 bg-white">
                      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Détails du véhicule
                      </h2>

                      <div className="space-y-8">
                        {/* Catégorie */}
                        <div>
                          <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light mb-3 block">
                            Catégorie
                          </label>
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { id: "moto", label: "Moto", emoji: "🏍️" },
                              { id: "auto", label: "Auto", emoji: "🚗" },
                              { id: "pl", label: "Poids Lourd", emoji: "🚛" },
                            ].map((cat) => (
                              <button
                                key={cat.id}
                                onClick={() => {
                                  const cvKey = cat.id === "auto" ? "auto_5_7" : "";
                                  set("category", cat.id as FormData["category"]);
                                  set("cvKey", cvKey);
                                }}
                                className={cn(
                                  "p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                                  form.category === cat.id
                                    ? "border-primary bg-primary/5 shadow-inner"
                                    : "border-sicta-grey/15 hover:border-primary/30"
                                )}
                              >
                                <span className="text-3xl">{cat.emoji}</span>
                                <span className="font-bold text-sm">{cat.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Puissance (Auto) */}
                        {form.category === "auto" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="overflow-hidden"
                          >
                            <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light mb-3 block">
                              Puissance fiscale (CV)
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                              {CV_OPTIONS.map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => set("cvKey", opt.id)}
                                  className={cn(
                                    "py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all text-center",
                                    form.cvKey === opt.id
                                      ? "border-primary bg-primary text-white shadow-lg"
                                      : "border-sicta-grey/15 hover:border-primary/50"
                                  )}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Cylindrée (Moto) */}
                        {form.category === "moto" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="overflow-hidden"
                          >
                            <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light mb-3 block">
                              Cylindrée
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { id: "moto_low", label: "< 125 cm³" },
                                { id: "moto_high", label: "≥ 125 cm³" },
                              ].map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => set("cvKey", opt.id)}
                                  className={cn(
                                    "py-4 rounded-xl border-2 font-bold text-sm transition-all",
                                    form.cvKey === opt.id
                                      ? "border-primary bg-primary text-white shadow-lg"
                                      : "border-sicta-grey/15 hover:border-primary/50"
                                  )}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Immatriculation */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light">
                            Numéro d'immatriculation *
                          </label>
                          <Input
                            placeholder="Ex: 1234 AB 01"
                            value={form.immatriculation}
                            onChange={(e) => set("immatriculation", e.target.value.toUpperCase())}
                            className="uppercase font-mono text-lg tracking-widest py-6"
                          />
                        </div>

                        {/* Station de contrôle */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light">
                            Station de contrôle *
                          </label>
                          <Popover open={stationOpen} onOpenChange={setStationOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={stationOpen}
                                className={cn(
                                  "w-full justify-between py-6 text-base h-auto",
                                  !form.stationId && "text-muted-foreground"
                                )}
                              >
                                {form.stationId
                                  ? allStations.find((s) => s.id === form.stationId)?.name
                                  : "Choisir une station de contrôle"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                              <Command>
                                <CommandInput placeholder="Rechercher une station..." />
                                <CommandList className="max-h-64">
                                  <CommandEmpty>Aucune station trouvée.</CommandEmpty>
                                  <CommandGroup>
                                    {allStations.map((station) => (
                                      <CommandItem
                                        key={station.id}
                                        value={`${station.name} ${station.address}`}
                                        onSelect={() => {
                                          set("stationId", station.id);
                                          setStationOpen(false);
                                        }}
                                        className="py-3"
                                      >
                                        <Check className={cn(
                                          "mr-2 h-4 w-4 flex-shrink-0",
                                          form.stationId === station.id ? "opacity-100 text-primary" : "opacity-0"
                                        )} />
                                        <div className="flex flex-col">
                                          <span className="font-semibold">{station.name}</span>
                                          <span className="text-xs text-sicta-grey-light">{station.address}</span>
                                        </div>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="mt-10">
                        <Button
                          onClick={() => setStep(2)}
                          className="w-full btn-hero py-7 text-xl group"
                          disabled={!step1Valid}
                        >
                          Choisir mon rendez-vous
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* ── ÉTAPE 2 : Rendez-vous ────────────────────────────────── */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="p-8 shadow-xl border-0 bg-white">
                      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        Choisissez votre rendez-vous
                      </h2>

                      <div className="space-y-8">
                        {/* Date */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light">
                            Date *{" "}
                            <span className="normal-case font-normal text-sicta-grey-light/70">
                              (jours ouvrables, lundi — samedi)
                            </span>
                          </label>
                          <Input
                            type="date"
                            min={getTomorrow()}
                            className={cn("py-6 text-base", sundayError && "border-red-400 focus-visible:ring-red-400")}
                            value={form.date}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSundayError(isSunday(val));
                              set("date", val);
                            }}
                          />
                          {sundayError && (
                            <p className="text-red-500 text-sm">
                              Les stations sont fermées le dimanche. Veuillez choisir un autre jour.
                            </p>
                          )}
                        </div>

                        {/* Créneaux horaires */}
                        <div className="space-y-3">
                          <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light">
                            Créneau horaire *
                          </label>
                          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                            {TIME_SLOTS.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => set("time", slot)}
                                className={cn(
                                  "py-2.5 text-sm font-bold rounded-lg border-2 transition-all",
                                  form.time === slot
                                    ? "border-primary bg-primary text-white shadow-md"
                                    : "border-sicta-grey/15 hover:border-primary/50"
                                )}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Infos contact */}
                        <div className="pt-6 border-t space-y-4">
                          <label className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light block">
                            Informations de contact
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs text-sicta-grey-light">Prénom *</label>
                              <Input
                                placeholder="Ex: Jean"
                                value={form.firstName}
                                onChange={(e) => set("firstName", e.target.value)}
                                className="py-5"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs text-sicta-grey-light">Nom *</label>
                              <Input
                                placeholder="Ex: Kouassi"
                                value={form.lastName}
                                onChange={(e) => set("lastName", e.target.value)}
                                className="py-5"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-xs text-sicta-grey-light">Numéro de téléphone *</label>
                              <Input
                                type="tel"
                                placeholder="Ex: 07 12 34 56 78"
                                value={form.phone}
                                onChange={(e) => set("phone", e.target.value)}
                                className="py-5"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-10">
                        <Button variant="outline" onClick={() => setStep(1)} className="px-8 py-6 font-bold border-2">
                          Retour
                        </Button>
                        {submitError && (
                          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mt-2">
                            {submitError}
                          </p>
                        )}
                        <Button
                          onClick={handleConfirm}
                          className="flex-1 btn-hero py-6 text-lg"
                          disabled={!step2Valid || submitting}
                        >
                          {submitting ? "Envoi en cours…" : "Confirmer le rendez-vous"}
                          {!submitting && <CheckCircle className="ml-2 h-5 w-5" />}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* ── ÉTAPE 3 : Confirmation ───────────────────────────────── */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  >
                    <Card className="p-8 shadow-2xl border-0 bg-white relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />

                      {/* Icône succès */}
                      <div className="flex flex-col items-center text-center mb-8 pt-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                        >
                          <CheckCircle className="h-12 w-12 text-primary" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-sicta-grey-dark mb-1">
                          Réservation enregistrée !
                        </h2>
                        <p className="text-sicta-grey-light">
                          Votre demande a bien été prise en compte.
                        </p>
                      </div>

                      {/* N° de réservation */}
                      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8 text-center">
                        <p className="text-xs font-bold uppercase tracking-widest text-sicta-grey-light mb-1">
                          Numéro de réservation
                        </p>
                        <p className="text-3xl font-black text-primary tracking-wider font-mono">
                          {bookingRef}
                        </p>
                        <p className="text-xs text-sicta-grey-light mt-2">
                          Conservez ce numéro et présentez-le lors de votre visite.
                        </p>
                      </div>

                      {/* Résumé */}
                      <div className="divide-y border rounded-xl overflow-hidden mb-8">
                        {[
                          { label: "Véhicule", value: form.immatriculation },
                          { label: "Station", value: selectedStation?.name ?? "" },
                          { label: "Date", value: formatDateFr(form.date) },
                          { label: "Heure", value: form.time },
                          { label: "Client", value: `${form.firstName} ${form.lastName}` },
                          { label: "Téléphone", value: form.phone },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex justify-between px-4 py-3 bg-white even:bg-gray-50/60">
                            <span className="text-sm text-sicta-grey-light">{label}</span>
                            <span className="text-sm font-semibold text-sicta-grey-dark text-right max-w-[55%]">{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Instruction */}
                      <div className="bg-sicta-grey-dark text-white rounded-2xl p-5 mb-8">
                        <p className="text-sm leading-relaxed">
                          <span className="font-bold block mb-1 text-primary">Instructions</span>
                          Présentez-vous à{" "}
                          <span className="font-bold">{selectedStation?.name}</span> le{" "}
                          <span className="font-bold">{formatDateFr(form.date)}</span> à{" "}
                          <span className="font-bold">{form.time}</span>.{" "}
                          Le paiement s'effectue directement en agence.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 py-5 border-2"
                          onClick={() => {
                            setStep(1);
                            setForm({
                              stationId: "", category: "auto", cvKey: "auto_5_7",
                              immatriculation: "", date: "", time: "",
                              firstName: "", lastName: "", phone: "",
                            });
                          }}
                        >
                          Nouvelle réservation
                        </Button>
                        <Button
                          className="flex-1 btn-hero py-5"
                          onClick={() => navigate("/")}
                        >
                          <Home className="h-4 w-4 mr-2" />
                          Retour à l'accueil
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>

              {/* ── Sidebar récapitulatif ───────────────────────────────────── */}
              <div className="space-y-6">
                <Card className="p-7 sticky top-24 shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
                  <h3 className="font-bold mb-5 flex items-center gap-2 text-sicta-grey-dark">
                    <FileText className="h-4 w-4 text-primary" />
                    Récapitulatif
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-sicta-grey-light">Type de visite</span>
                      <span className="font-semibold">Visite Technique</span>
                    </div>

                    {form.immatriculation && (
                      <div className="flex justify-between items-center">
                        <span className="text-sicta-grey-light">Véhicule</span>
                        <span className="font-mono font-bold bg-gray-100 px-2 py-0.5 rounded text-xs">
                          {form.immatriculation}
                        </span>
                      </div>
                    )}

                    {selectedStation && (
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-sicta-grey-light shrink-0">Station</span>
                        <span className="font-semibold text-right text-xs">{selectedStation.name}</span>
                      </div>
                    )}

                    {form.date && !sundayError && (
                      <div className="flex justify-between items-center">
                        <span className="text-sicta-grey-light">Date</span>
                        <span className="font-semibold text-xs text-right">
                          {new Date(form.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                    )}

                    {form.time && (
                      <div className="flex justify-between">
                        <span className="text-sicta-grey-light">Heure</span>
                        <span className="font-semibold">{form.time}</span>
                      </div>
                    )}

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sicta-grey-light">Visite technique</span>
                        <span className="font-bold">{inspectionPrice.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between text-xs text-sicta-grey-light/70">
                        <span>Timbre + sécurisation</span>
                        <span>600 FCFA</span>
                      </div>
                    </div>

                    <div className="border-t pt-3 flex justify-between items-end">
                      <span className="font-bold text-sicta-grey-dark">Total estimé</span>
                      <div className="text-right">
                        <div className="text-2xl font-black text-primary leading-none">
                          {(inspectionPrice + 600).toLocaleString()}
                        </div>
                        <div className="text-[10px] font-bold text-primary uppercase tracking-tight">FCFA TTC</div>
                      </div>
                    </div>

                    <p className="text-[10px] text-sicta-grey-light/60 pt-1">
                      * Hors vignette. Paiement en agence le jour du rendez-vous.
                    </p>
                  </div>
                </Card>

                {/* Garantie SICTA */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-sicta-grey to-sicta-grey-dark text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Shield className="h-20 w-20" />
                  </div>
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    Garantie SICTA
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Tous vos certificats sont délivrés par un organisme agrée par le Ministère des Transports.
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
