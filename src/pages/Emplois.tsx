import { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight, Send, ChevronDown, ChevronUp, Loader2, Building2, GraduationCap, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

interface Offre {
  id: number;
  titre: string;
  departement: string;
  lieu: string;
  type_contrat: string;
  experience: string;
  description: string;
  missions: string[];
  profil: string[];
  date_limite: string | null;
  active: boolean;
}

const fetchOffres = (): Promise<Offre[]> =>
  apiClient.get<{ data: Offre[] }>("/offres-emploi").then((r) => r.data).catch(() => []);

const formatDate = (d: string | null) => {
  if (!d) return null;
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

const AVANTAGES = [
  { icon: Building2, title: "Entreprise leader", desc: "Premier réseau de contrôle technique en Côte d'Ivoire depuis 1974" },
  { icon: GraduationCap, title: "Formation continue", desc: "Accompagnement et montée en compétences tout au long de votre carrière" },
  { icon: Users, title: "Équipe dynamique", desc: "Rejoignez une équipe passionnée et engagée pour la sécurité routière" },
  { icon: Star, title: "Impact concret", desc: "Contribuez à la sécurité de millions d'automobilistes ivoiriens" },
];

const Emplois = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", poste: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const { data: offres = [], isLoading } = useQuery({
    queryKey: ["offres-emploi"],
    queryFn: fetchOffres,
    staleTime: 60_000,
  });

  const activeOffres = offres.filter((o) => o.active);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await apiClient.post("/candidatures-spontanees", form);
      setSent(true);
      setForm({ nom: "", email: "", telephone: "", poste: "", message: "" });
    } catch {
      // Affichage basique en cas d'erreur
    } finally {
      setSending(false);
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Offres d'emploi — Rejoignez SICTA"
        description="Découvrez nos offres d'emploi et rejoignez l'équipe SICTA, leader du contrôle technique automobile en Côte d'Ivoire. Envoyez votre candidature spontanée."
        keywords="emploi SICTA, recrutement contrôle technique, carrière Côte d'Ivoire, offres d'emploi Abidjan"
        url="/emplois"
      />
      <div className="w-full min-h-screen bg-white">

        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1117] via-[#1a1c23] to-[#251810] text-white py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-orange-300 text-sm font-semibold mb-6 backdrop-blur">
                <Briefcase className="h-4 w-4" /> Carrières & Recrutement
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6">
                Rejoignez{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-orange-400">
                  l'équipe SICTA
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Intégrez le leader du contrôle technique automobile en Côte d'Ivoire et participez à la sécurité routière de millions d'automobilistes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── POURQUOI NOUS REJOINDRE ─── */}
        <section className="py-16 bg-gray-50/60 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-sicta-grey-dark mb-10 text-center">
                Pourquoi nous rejoindre ?
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {AVANTAGES.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-6 text-center border-primary/10 hover:shadow-md transition-all duration-300 h-full">
                      <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <a.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-bold text-sicta-grey-dark mb-2 text-sm">{a.title}</h3>
                      <p className="text-xs text-sicta-grey-light leading-relaxed">{a.desc}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── OFFRES D'EMPLOI ─── */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-0.5 w-8 bg-primary rounded-full" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Postes ouverts</span>
              </div>
              <h2 className="text-3xl font-bold text-sicta-grey-dark mb-10">
                Nos offres d'emploi
                {!isLoading && (
                  <span className="ml-3 text-lg font-normal text-sicta-grey-light">
                    ({activeOffres.length} poste{activeOffres.length !== 1 ? "s" : ""})
                  </span>
                )}
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              ) : activeOffres.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-primary/50" />
                  </div>
                  <p className="text-lg font-semibold text-sicta-grey-dark mb-2">Aucune offre disponible actuellement</p>
                  <p className="text-sicta-grey-light text-sm">Consultez régulièrement cette page ou envoyez une candidature spontanée ci-dessous.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeOffres.map((offre, i) => (
                    <motion.div
                      key={offre.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                    >
                      <Card
                        className={`border transition-all duration-300 overflow-hidden ${openId === offre.id ? "border-primary/30 shadow-lg" : "border-gray-100 hover:border-primary/20 hover:shadow-md"}`}
                      >
                        <button
                          className="w-full text-left p-6"
                          onClick={() => setOpenId(openId === offre.id ? null : offre.id)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-sicta-grey-dark mb-2">{offre.titre}</h3>
                              <div className="flex flex-wrap gap-3 text-sm text-sicta-grey-light">
                                {offre.departement && (
                                  <span className="flex items-center gap-1.5">
                                    <Building2 className="h-3.5 w-3.5 text-primary/70" />{offre.departement}
                                  </span>
                                )}
                                {offre.lieu && (
                                  <span className="flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 text-primary/70" />{offre.lieu}
                                  </span>
                                )}
                                {offre.type_contrat && (
                                  <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-xs">
                                    {offre.type_contrat}
                                  </Badge>
                                )}
                                {offre.date_limite && (
                                  <span className="flex items-center gap-1.5 text-xs text-orange-600">
                                    <Clock className="h-3.5 w-3.5" />Limite : {formatDate(offre.date_limite)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sicta-grey">
                              {openId === offre.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {openId === offre.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5">
                                {offre.description && (
                                  <p className="text-sicta-grey-light leading-relaxed text-sm">{offre.description}</p>
                                )}
                                {offre.missions?.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-sicta-grey-dark mb-3 text-sm">Missions principales</h4>
                                    <ul className="space-y-2">
                                      {offre.missions.map((m, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-sicta-grey-light">
                                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                          {m}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {offre.profil?.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-sicta-grey-dark mb-3 text-sm">Profil recherché</h4>
                                    <ul className="space-y-2">
                                      {offre.profil.map((p, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-sicta-grey-light">
                                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                          {p}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                <Button
                                  className="btn-hero mt-2"
                                  onClick={() => {
                                    setForm(f => ({ ...f, poste: offre.titre }));
                                    document.getElementById("candidature-form")?.scrollIntoView({ behavior: "smooth" });
                                  }}
                                >
                                  Postuler à cette offre
                                  <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── CANDIDATURE SPONTANÉE ─── */}
        <section id="candidature-form" className="py-16 md:py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-0.5 w-8 bg-primary rounded-full" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Candidature ouverte</span>
              </div>
              <h2 className="text-3xl font-bold text-sicta-grey-dark mb-3">Candidature spontanée</h2>
              <p className="text-sicta-grey-light mb-10">
                Vous ne trouvez pas le poste idéal ? Envoyez-nous votre candidature, nous l'étudierons avec attention.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-green-50 rounded-2xl border border-green-100"
                >
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Candidature envoyée !</h3>
                  <p className="text-green-600 text-sm">Nous avons bien reçu votre candidature et reviendrons vers vous rapidement.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-sicta-grey-dark mb-1.5">Nom complet *</label>
                      <input
                        required
                        type="text"
                        value={form.nom}
                        onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                        placeholder="Votre nom et prénom"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-sicta-grey-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sicta-grey-dark mb-1.5">Adresse e-mail *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="votre@email.com"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-sicta-grey-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-sicta-grey-dark mb-1.5">Téléphone</label>
                      <input
                        type="tel"
                        value={form.telephone}
                        onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))}
                        placeholder="+225 00 00 00 00 00"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-sicta-grey-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sicta-grey-dark mb-1.5">Poste visé</label>
                      <input
                        type="text"
                        value={form.poste}
                        onChange={e => setForm(f => ({ ...f, poste: e.target.value }))}
                        placeholder="Intitulé du poste souhaité"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-sicta-grey-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-sicta-grey-dark mb-1.5">Message / Motivations *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Parlez-nous de votre parcours, de vos compétences et de vos motivations…"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-sicta-grey-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full btn-hero py-6 text-base" disabled={sending}>
                    {sending ? (
                      <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Envoi en cours…</>
                    ) : (
                      <><Send className="h-5 w-5 mr-2" />Envoyer ma candidature</>
                    )}
                  </Button>
                  <p className="text-xs text-center text-sicta-grey-light">
                    En soumettant ce formulaire, vous acceptez que vos données soient traitées par SICTA dans le cadre de votre candidature.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Emplois;
