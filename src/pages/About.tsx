import { Shield, Users, Award, Globe, Calendar, CheckCircle, Mail, Phone, Building, Target, TrendingUp, CheckCircle2, Sparkles, Car, MapPin, FileCheck, Linkedin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useQuery } from "@tanstack/react-query";
import { fetchPageSections } from "@/services/pageSectionService";
import { fetchTeam, fetchHistory } from "@/services/aboutService";

const About = () => {
  const { t } = useTranslation();

  const { data: cms } = useQuery({ queryKey: ["page-sections", "about"], queryFn: () => fetchPageSections("about"), staleTime: 300_000 });
  const { data: team = [] } = useQuery({ queryKey: ["team"], queryFn: fetchTeam, staleTime: 300_000 });
  const { data: history = [] } = useQuery({ queryKey: ["history"], queryFn: fetchHistory, staleTime: 300_000 });

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
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                <span>Filiale de Mayelia Participations</span>
              </div>
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
                          Abidjan avec ses 08 stations couvre 80% des contrôles et 20% sont effectués à l'intérieur.
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
                            Rejoindre le groupe MAYELIA Participation
                          </h3>
                        </div>
                      </div>
                      <p className="text-sicta-grey-light leading-relaxed text-lg mb-6">
                        En avril 2025, la SICTA rejoint le groupe MAYELIA Participation. Aujourd'hui, La SICTA s'appuie sur
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
        <section className="py-24 bg-gradient-to-br from-slate-50 via-background to-primary/5 relative overflow-hidden">
          {/* Décoration de fond */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Calendar className="h-4 w-4" /> Chronologie
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">{historyTitle}</h2>
              <p className="text-xl text-sicta-grey-light max-w-2xl mx-auto">{historySubtitle}</p>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
              {history.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  className={`flex items-start gap-6 md:gap-10 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Année badge */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg font-bold text-lg ${
                      ev.highlight
                        ? "bg-gradient-to-br from-primary to-sicta-orange-light text-white shadow-primary/30"
                        : "bg-white border-2 border-primary/20 text-primary"
                    }`}>
                      {ev.annee}
                    </div>
                    <div className="w-0.5 h-8 bg-primary/20 mt-2 md:hidden" />
                  </div>

                  {/* Contenu */}
                  <Card className={`flex-1 p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${
                    ev.highlight ? "border-2 border-primary/30 bg-gradient-to-br from-white to-primary/5" : "bg-white border border-gray-100"
                  }`}>
                    {ev.highlight && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                    )}
                    <div className="relative z-10">
                      {ev.highlight && (
                        <Badge className="bg-primary text-white mb-3">
                          <Sparkles className="h-3 w-3 mr-1" /> Événement clé
                        </Badge>
                      )}
                      <h3 className="text-xl font-bold text-sicta-grey-dark mb-2">{ev.titre}</h3>
                      {ev.description && (
                        <p className="text-sicta-grey-light leading-relaxed">{ev.description}</p>
                      )}
                      {ev.image && (
                        <img
                          src={ev.image}
                          alt={`SICTA ${ev.annee}`}
                          loading="lazy"
                          className="mt-4 w-full h-40 object-cover rounded-xl shadow-md"
                        />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Notre Équipe (géré depuis le backoffice) */}
        {teamEnabled && (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Users className="h-4 w-4" /> {teamTitle}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">{teamTitle}</h2>
              <p className="text-xl text-sicta-grey-light max-w-2xl mx-auto">{teamSubtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {team.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 hover:border-primary/30 hover:-translate-y-2">
                    {/* Photo */}
                    <div className="aspect-square bg-gradient-to-br from-orange-50 via-orange-100 to-primary/10 overflow-hidden">
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt={m.nom}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-sicta-orange-light flex items-center justify-center shadow-lg">
                            <span className="text-3xl font-bold text-white">{m.nom.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Overlay au survol */}
                    <div className="absolute inset-0 bg-gradient-to-t from-sicta-grey-dark/95 via-sicta-grey/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-bold text-white text-lg mb-1">{m.nom}</h3>
                        {m.role && (
                          <p className="text-sicta-orange-light text-sm font-medium mb-3">{m.role}</p>
                        )}
                        {(m.email || m.linkedin) && (
                          <div className="flex items-center gap-3 mt-2">
                            {m.email && (
                              <a
                                href={`mailto:${m.email}`}
                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-primary flex items-center justify-center transition-colors backdrop-blur-sm"
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
                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#0077B5] flex items-center justify-center transition-colors backdrop-blur-sm"
                                aria-label="LinkedIn"
                              >
                                <Linkedin className="h-3.5 w-3.5 text-white" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info bas de carte (visible sans hover) */}
                    <div className="p-4 border-t border-gray-50 group-hover:bg-primary/5 transition-colors">
                      <h3 className="font-bold text-sicta-grey-dark text-sm leading-tight">{m.nom}</h3>
                      {m.role && (
                        <p className="text-xs text-primary font-medium mt-0.5 truncate">{m.role}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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

        {/* Engagement / Valeurs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">Avec quel Engagement ?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="card-elevated p-6 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("about.values.professionalism.title")}</h3>
                <p className="text-sicta-grey-light text-sm">{t("about.values.professionalism.description")}</p>
              </Card>

              <Card className="card-elevated p-6 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("about.values.integrity.title")}</h3>
                <p className="text-sicta-grey-light text-sm">{t("about.values.integrity.description")}</p>
              </Card>

              <Card className="card-elevated p-6 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("about.values.innovation.title")}</h3>
                <p className="text-sicta-grey-light text-sm">{t("about.values.innovation.description")}</p>
              </Card>

              <Card className="card-elevated p-6 text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("about.values.proximity.title")}</h3>
                <p className="text-sicta-grey-light text-sm">{t("about.values.proximity.description")}</p>
              </Card>
            </div>
          </div>



          {/* Stats Cards - En haut */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group">
                <div className="h-20 w-20 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Car className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">1 500+</div>
                <p className="text-sicta-grey-light font-medium">Véhicules examinés chaque jour</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group">
                <div className="h-20 w-20 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">08</div>
                <p className="text-sicta-grey-light font-medium">Stations à Abidjan</p>
                <Badge className="mt-2 bg-primary/10 text-primary">80% des contrôles</Badge>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group">
                <div className="h-20 w-20 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <FileCheck className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">ISO</div>
                <p className="text-sicta-grey-light font-medium">Certifié 9001:2015</p>
                <Badge className="mt-2 bg-primary/10 text-primary">Depuis 2019</Badge>
              </Card>
            </motion.div>
          </div>
        </section>




      </div>
    </PageTransition>
  );
};

export default About;