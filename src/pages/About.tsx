import { Shield, Users, Award, Globe, Calendar, CheckCircle, Mail, Phone, Building, Target, TrendingUp, CheckCircle2, Sparkles, Car, MapPin, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import timeline1974 from "@/assets/timeline-1974-modern.jpg";
import timeline2024 from "@/assets/timeline-2024-modern.jpg";
import PageTransition from "@/components/PageTransition";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const About = () => {
  const { t } = useTranslation();

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

        {/* Historique */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">Notre Histoire et Évolution</h2>
              <p className="text-xl text-sicta-grey-light">
                Plus de 50 ans d'excellence au service de la sécurité routière
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 1959 */}
                <Card className="card-elevated p-6 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-bold text-primary/20 mb-2">1959</div>
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-3">Début du contrôle technique</h3>
                    <p className="text-sicta-grey-light">Obligation du contrôle technique automobile en Côte d'Ivoire selon la réglementation.</p>
                  </div>
                </Card>

                {/* 1974 */}
                <Card className="card-elevated p-6 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-bold text-primary/20 mb-2">1974</div>
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-3">Création de la SICTA</h3>
                    <p className="text-sicta-grey-light">Fondation de la Société Ivoirienne de Contrôles Techniques Automobiles et Industriels.</p>
                    <div className="mt-4">
                      <img src={timeline1974} alt="SICTA 1974" className="w-full h-32 object-cover rounded-lg" />
                    </div>
                  </div>
                </Card>

                {/* 1990 */}
                <Card className="card-elevated p-6 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-bold text-primary/20 mb-2">1990</div>
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-3">Rachat par SGS</h3>
                    <p className="text-sicta-grey-light">La SICTA devient une société privatisée rachetée par le groupe SGS, leader mondial de l'inspection.</p>
                  </div>
                </Card>

                {/* 2019 */}
                <Card className="card-elevated p-6 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-bold text-primary/20 mb-2">2019</div>
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-3">Certification ISO 9001:2015</h3>
                    <p className="text-sicta-grey-light">Certification qualité par ABS Quality Evaluations, garantissant l'excellence de nos services.</p>
                  </div>
                </Card>

                {/* 2024 */}
                <Card className="card-elevated p-6 relative border-2 border-primary">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-sicta-orange-light/10 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-bold text-sicta-orange-light/20 mb-2">2024</div>
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-3">Rachat par Mayelia Participations</h3>
                    <p className="text-sicta-grey-light">Nouvelle ère d'innovation et d'expansion sous l'égide de Mayelia Participations.</p>
                    <div className="mt-4">
                      <img src={timeline2024} alt="SICTA 2024" className="w-full h-32 object-cover rounded-lg" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

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