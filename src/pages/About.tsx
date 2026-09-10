import { Shield, Users, Award, Globe, Calendar, CheckCircle, Mail, Phone, Building, Target, TrendingUp, CheckCircle2, Sparkles, Car, MapPin, FileCheck, Linkedin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useQuery } from "@tanstack/react-query";
import { fetchPageSections } from "@/services/pageSectionService";
import { fetchTeam, fetchHistory, TeamMemberAPI } from "@/services/aboutService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRef, useState, useCallback } from "react";

const About = () => {
  const { t } = useTranslation();

  const { data: cms } = useQuery({ queryKey: ["page-sections", "about"], queryFn: () => fetchPageSections("about"), staleTime: 300_000 });
  const { data: team = [] } = useQuery({ queryKey: ["team"], queryFn: fetchTeam, staleTime: 300_000 });
  const { data: history = [] } = useQuery({ queryKey: ["history"], queryFn: fetchHistory, staleTime: 300_000 });

  const [selectedMember, setSelectedMember] = useState<TeamMemberAPI | null>(null);

  // Curseur personnalisé — section Histoire
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const historySectionRef = useRef<HTMLElement>(null);

  const handleHistoryMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleHistoryMouseEnter = useCallback(() => setCursorVisible(true), []);
  const handleHistoryMouseLeave = useCallback(() => setCursorVisible(false), []);

  const historyEnabled = cms?.about_history_enabled !== "0";
  const teamEnabled = cms?.about_team_enabled !== "0" && team.length > 0;
  const historyTitle = cms?.about_history_title || "Notre Histoire et Évolution";
  const historySubtitle = cms?.about_history_subtitle || "Plus de 50 ans d'excellence au service de la sécurité routière";
  const teamTitle = cms?.about_team_title || "Notre Équipe";
  const teamSubtitle = cms?.about_team_subtitle || "Des femmes et des hommes engagés pour la sécurité routière";

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">

              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">{t("about.title")}</span>
              </h1>
              <p className="text-xl text-sicta-grey-light leading-relaxed">
                {t("about.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Qui sommes-nous - Amélioré */}
        <section className="py-24 bg-gradient-to-br from-background via-sicta-grey/5 to-primary/5 relative overflow-hidden">
          {/* Effet de fond décoratif */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sicta-orange-light rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">




              {/* Contenu Principal */}
              <div className="space-y-8">
                {/* Paragraphe 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="p-8 lg:p-10 bg-white/80 backdrop-blur-sm border-l-4 border-primary shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-sicta-grey-dark mb-3">Leader depuis 1974</h3>
                        <p className="text-sicta-grey-light leading-relaxed text-lg">
                          En Côte d'Ivoire la visite technique existe et est obligatoire depuis avril 1959.
                          Depuis 1974, la Société Ivoirienne de Contrôle Technique Automobile (SICTA) est le leader
                          du contrôle technique automobile en Côte d'Ivoire, examinant plus de 1 500 véhicules chaque jour.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Paragraphe 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="p-8 lg:p-10 bg-white/80 backdrop-blur-sm border-l-4 border-sicta-orange-light shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-sicta-orange-light to-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-sicta-grey-dark mb-3">Certification Qualité</h3>
                        <p className="text-sicta-grey-light leading-relaxed text-lg mb-3">
                          Abidjan avec ses 07 stations couvre 80% des contrôles et 20% sont effectués à l'intérieur.
                          Depuis le 25 février 2019, la SICTA est certifiée ISO 9001 :2015 par ABS Quality Evaluations.
                        </p>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Certification ISO 9001:2015
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Paragraphe 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="p-8 lg:p-10 bg-white/80 backdrop-blur-sm border-l-4 border-primary shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-sicta-grey-dark mb-3">Acteur majeur de la sécurité routière</h3>
                        <p className="text-sicta-grey-light leading-relaxed text-lg">
                          Ayant une bonne couverture nationale, forte de son expérience et du professionnalisme de ses agents,
                          la SICTA propose divers services essentiels qui font d'elle un acteur majeur de la sécurité routière
                          et un partenaire clé pour les particuliers, les entreprises et l'administration.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Paragraphe 4 - Nouvelle ère */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="p-8 lg:p-10 bg-gradient-to-br from-primary/10 via-white to-sicta-orange-light/10 border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
                          <TrendingUp className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <Badge className="bg-primary text-white mb-3">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Nouvelle Ère 2025
                          </Badge>
                          <h3 className="text-2xl font-bold text-sicta-grey-dark mb-3">
                            Rejoindre le groupe Mayelia PARTCIPATIONS
                          </h3>
                        </div>
                      </div>
                      <p className="text-sicta-grey-light leading-relaxed text-lg mb-6">
                        En avril 2025, la SICTA rejoint le groupe Mayelia PARTCIPATIONS. Aujourd'hui, La SICTA s'appuie sur
                        une organisation agile et une nouvelle vision fondée sur les trois piliers du groupe : gouvernance,
                        croissance et patrimoine. En dehors du contrôle technique qui est son activité principale, elle propose
                        8 services tous liés à l'automobile.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-primary/10">
                          <div className="text-2xl font-bold text-primary mb-1">Gouvernance</div>
                          <p className="text-sm text-sicta-grey-light">Pilier essentiel</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-primary/10">
                          <div className="text-2xl font-bold text-primary mb-1">Croissance</div>
                          <p className="text-sm text-sicta-grey-light">Développement continu</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-primary/10">
                          <div className="text-2xl font-bold text-primary mb-1">Patrimoine</div>
                          <p className="text-sm text-sicta-grey-light">Valeur durable</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Paragraphe 5 - Conclusion */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="p-8 lg:p-10 bg-gradient-to-r from-primary to-sicta-orange-light text-white shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-white/30">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">Notre Engagement</h3>
                        <p className="text-white/95 leading-relaxed text-lg">
                          La SICTA reste un acteur incontournable, garantissant sécurité, fiabilité et performance à travers tout le pays.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Histoire et Évolution (géré depuis le backoffice) */}
        {historyEnabled && history.length > 0 && (
          <section
            ref={historySectionRef}
            className="py-20 bg-white relative overflow-hidden"
            style={{ cursor: cursorVisible ? "none" : "auto" }}
            onMouseMove={handleHistoryMouseMove}
            onMouseEnter={handleHistoryMouseEnter}
            onMouseLeave={handleHistoryMouseLeave}
          >
            {/* Curseur personnalisé orange/noir */}
            <AnimatePresence>
              {cursorVisible && (
                <>
                  {/* Halo orange animé */}
                  <motion.div
                    key="cursor-glow"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      left: cursorPos.x,
                      top: cursorPos.y,
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0) 70%)",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                      zIndex: 9998,
                      filter: "blur(3px)",
                    }}
                  />
                  {/* Anneau noir */}
                  <motion.div
                    key="cursor-ring"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      left: cursorPos.x,
                      top: cursorPos.y,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "2.5px solid #111",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                      zIndex: 9999,
                    }}
                  />
                  {/* Point central orange */}
                  <motion.div
                    key="cursor-dot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: "absolute",
                      left: cursorPos.x,
                      top: cursorPos.y,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#f97316",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                      zIndex: 10000,
                      boxShadow: "0 0 10px 3px rgba(249,115,22,0.9)",
                    }}
                  />
                </>
              )}
            </AnimatePresence>
            {/* Fond décoratif */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              {/* En-tête compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-14"
              >

                <h2 className="text-3xl lg:text-4xl font-bold text-sicta-grey-dark mb-2">{historyTitle}</h2>
                <p className="text-base text-sicta-grey-light max-w-xl mx-auto">{historySubtitle}</p>
              </motion.div>

              {/* Timeline */}
              <div className="relative max-w-4xl mx-auto">
                {/* Ligne verticale centrale */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ transformOrigin: "top" }}
                  className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 via-primary/40 to-transparent hidden md:block"
                />

                <div className="space-y-6">
                  {history.map((ev, i) => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, delay: i * 0.06 }}
                      className={`relative flex items-center gap-4 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                    >
                      {/* Carte */}
                      <div className={`w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                        <motion.div
                          whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(249,115,22,0.12)" }}
                          transition={{ duration: 0.2 }}
                          className={`rounded-xl p-4 lg:p-5 border transition-all duration-300 ${ev.highlight
                            ? "bg-gradient-to-br from-primary/8 to-orange-50 border-primary/25 shadow-md"
                            : "bg-white border-gray-100 shadow-sm hover:border-primary/20"
                            }`}
                        >
                          {/* Année + badge inline */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${ev.highlight
                              ? "bg-primary text-white"
                              : "bg-primary/10 text-primary"
                              }`}>
                              {ev.annee}
                            </span>
                            {ev.highlight && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                                <Sparkles className="h-3 w-3" /> Événement clé
                              </span>
                            )}
                          </div>

                          <h3 className="text-base font-bold text-sicta-grey-dark mb-1 leading-snug">{ev.titre}</h3>
                          {ev.description && (
                            <p className="text-sm text-sicta-grey-light leading-relaxed">{ev.description}</p>
                          )}
                          {ev.image && (
                            <img
                              src={ev.image}
                              alt={`SICTA ${ev.annee}`}
                              loading="lazy"
                              className="mt-3 w-full h-32 object-cover rounded-lg"
                            />
                          )}
                        </motion.div>
                      </div>

                      {/* Point central sur la ligne — desktop uniquement */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-10">
                        <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-md ${ev.highlight ? "bg-primary" : "bg-primary/60"
                          }`}>
                          {ev.highlight && (
                            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
                          )}
                        </div>
                      </div>

                      {/* Espace vide côté opposé */}
                      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Notre Équipe (géré depuis le backoffice) */}
        {teamEnabled && (
          <section className="py-20 bg-[#0f1117] relative overflow-hidden">
            {/* Fond déco subtil */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 50%, #f97316 0%, transparent 50%)" }} />

            <div className="container mx-auto px-4 relative z-10">
              {/* En-tête */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-14"
              >

                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">{teamTitle}</h2>
                <p className="text-base text-gray-400 max-w-xl mx-auto">{teamSubtitle}</p>
              </motion.div>

              {/* Grille cartes — style Mayelia Mobilité */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {team.map((m, i) => {
                  const fullName = [m.prenom, m.nom].filter(Boolean).join(" ");
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="group"
                    >
                      {/* Photo — ratio portrait */}
                      <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
                        {/* Image */}
                        <img
                          src={m.photo || "https://cdn.vectorstock.com/i/1000v/38/71/avatar-man-in-modern-flat-design-vector-15133871.jpg"}
                          alt={fullName}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:blur-sm group-hover:brightness-50"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "https://cdn.vectorstock.com/i/1000v/38/71/avatar-man-in-modern-flat-design-vector-15133871.jpg";
                          }}
                        />

                        {/* Overlay hover — texte intégral défilable sans troncature */}
                        <div 
                          className="absolute inset-0 bg-black/85 backdrop-blur-md p-6 flex flex-col items-start justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-left cursor-pointer"
                          onClick={() => setSelectedMember(m)}
                        >
                          <div className="w-full flex-1 overflow-hidden flex flex-col">
                            <h3 className="text-lg font-black text-white uppercase tracking-wide leading-tight mb-1 flex-shrink-0">
                              {fullName}
                            </h3>
                            {m.role && (
                              <span className="inline-block border border-white/40 text-white/90 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3 self-start flex-shrink-0">
                                {m.role}
                              </span>
                            )}
                            {m.description && (
                              <div className="flex-1 overflow-y-auto pr-1 text-xs text-white/90 leading-relaxed text-left" style={{ scrollbarWidth: "thin" }}>
                                {m.description}
                              </div>
                            )}
                          </div>

                          <div className="w-full flex items-center justify-between pt-3 border-t border-white/10 mt-2 flex-shrink-0">
                            <span className="text-[11px] text-primary font-semibold hover:underline">Voir le profil →</span>
                            <div className="flex gap-2">
                              {m.email && (
                                <a
                                  href={`mailto:${m.email}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
                                  aria-label="Email"
                                >
                                  <Mail className="h-3.5 w-3.5 text-white" />
                                </a>
                              )}
                              {m.linkedin && (
                                <a
                                  href={m.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center hover:bg-[#0077B5] hover:border-[#0077B5] transition-colors"
                                  aria-label="LinkedIn"
                                >
                                  <Linkedin className="h-3.5 w-3.5 text-white" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Infos bas de carte — toujours visibles */}
                      <div className="pt-4 pb-2 border-b border-white/10 cursor-pointer" onClick={() => setSelectedMember(m)}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-black text-white text-base uppercase tracking-wide leading-snug">
                              {fullName}
                            </h3>
                            {m.role && (
                              <p className="text-primary text-xs font-semibold uppercase tracking-wider mt-1">
                                {m.role}
                              </p>
                            )}
                          </div>
                          {/* Pastille colorée style Mayelia */}
                          <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Modal de profil complet */}
            <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
              <DialogContent className="max-w-2xl bg-[#0f1117] border-white/10 text-white p-6 sm:p-8">
                {selectedMember && (
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <img
                      src={selectedMember.photo || "https://cdn.vectorstock.com/i/1000v/38/71/avatar-man-in-modern-flat-design-vector-15133871.jpg"}
                      alt={[selectedMember.prenom, selectedMember.nom].filter(Boolean).join(" ")}
                      className="w-32 h-40 object-cover object-top rounded-lg border border-white/10 flex-shrink-0 mx-auto sm:mx-0"
                    />
                    <div className="flex-1 space-y-3">
                      <DialogHeader className="text-left p-0 space-y-1">
                        <DialogTitle className="text-2xl font-black text-white uppercase tracking-wide">
                          {[selectedMember.prenom, selectedMember.nom].filter(Boolean).join(" ")}
                        </DialogTitle>
                        {selectedMember.role && (
                          <DialogDescription className="text-primary text-sm font-semibold uppercase tracking-wider">
                            {selectedMember.role}
                          </DialogDescription>
                        )}
                      </DialogHeader>

                      {selectedMember.description && (
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto pr-2" style={{ scrollbarWidth: "thin" }}>
                          {selectedMember.description}
                        </p>
                      )}

                      <div className="flex gap-3 pt-2">
                        {selectedMember.email && (
                          <a
                            href={`mailto:${selectedMember.email}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white hover:bg-primary hover:border-primary transition-colors"
                          >
                            <Mail className="h-4 w-4" /> Email
                          </a>
                        )}
                        {selectedMember.linkedin && (
                          <a
                            href={selectedMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white hover:bg-[#0077B5] hover:border-[#0077B5] transition-colors"
                          >
                            <Linkedin className="h-4 w-4" /> LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </section>
        )}

        {/* Vision et Mission */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Vision */}
              <Card className="card-elevated p-8 md:p-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-sicta-grey-dark">Quelle Vision ?</h2>
                </div>

                <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">
                  Demeurer le leader et la référence en Afrique de l'Ouest
                </h3>
                <p className="text-lg text-sicta-grey-light leading-relaxed mb-6">
                  {t("about.vision.text")}
                </p>

                <div className="space-y-3">
                  <div className="bg-primary/5 rounded-lg p-3">
                    <h4 className="font-semibold text-sicta-grey-dark mb-1">Innovation continue</h4>
                    <p className="text-sm text-sicta-grey-light">
                      Adopter les dernières technologies pour optimiser nos services et améliorer l'expérience client.
                    </p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3">
                    <h4 className="font-semibold text-sicta-grey-dark mb-1">Accessibilité</h4>
                    <p className="text-sm text-sicta-grey-light">
                      Déployer un réseau couvrant l'ensemble du territoire pour un service de proximité.
                    </p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3">
                    <h4 className="font-semibold text-sicta-grey-dark mb-1">Fiabilité</h4>
                    <p className="text-sm text-sicta-grey-light">
                      Maintenir les plus hauts standards de qualité pour garantir la sécurité et la confiance.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Mission */}
              <Card className="card-elevated p-8 md:p-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-gradient-to-br from-sicta-orange-light to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-sicta-grey-dark">Quelle Mission ?</h2>
                </div>

                <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">
                  Garantir la sécurité et la protection de l'environnement
                </h3>
                <p className="text-sicta-grey-light mb-6">
                  À travers un contrôle technique rigoureux, conformes à la réglementation nationale et internationale.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sicta-grey-dark mb-1">Sécurité routière maximale</h4>
                      <p className="text-sm text-sicta-grey-light">
                        Contrôles rigoureux de 123 points pour garantir le respect des normes de sécurité les plus strictes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sicta-grey-dark mb-1">Protection de l'environnement</h4>
                      <p className="text-sm text-sicta-grey-light">
                        Contrôler les émissions polluantes et sensibiliser à l'écoconduite pour préserver notre écosystème.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sicta-grey-dark mb-1">Conformité réglementaire</h4>
                      <p className="text-sm text-sicta-grey-light">
                        Assurer le respect strict des normes nationales et internationales pour une traçabilité totale.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>






      </div>
    </PageTransition>
  );
};

export default About;