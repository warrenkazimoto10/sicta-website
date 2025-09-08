import { Shield, Users, Award, Globe, Calendar, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import timeline1974 from "@/assets/timeline-1974-modern.jpg";
import timeline2024 from "@/assets/timeline-2024-modern.jpg";
import PageTransition from "@/components/PageTransition";

const About = () => {
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
              <span className="text-sicta-grey-dark">À propos de</span>{" "}
              <span className="text-gradient">SICTA</span>
            </h1>
            <p className="text-xl text-sicta-grey-light leading-relaxed">
              Société Ivoirienne de Contrôles Techniques Automobiles et Industriels, 
              leader du contrôle technique en Afrique de l'Ouest depuis 1974.
            </p>
          </div>
        </div>
      </section>

      {/* Historique */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-sicta-grey-dark">Notre Histoire</h2>
              <div className="space-y-4 text-sicta-grey-light">
                <p>
                  En Côte d'Ivoire, la visite technique existe et est obligatoire depuis avril 1959. 
                  Née en 1974, la SICTA devient en 1990 une société privatisée rachetée par le groupe SGS.
                </p>
                <p>
                  La SICTA est aujourd'hui leader du contrôle technique en Afrique et n°5 mondial 
                  au niveau du Groupe SGS. Pas moins de 1500 véhicules sont contrôlés quotidiennement 
                  sur l'ensemble du territoire.
                </p>
                <p>
                  Depuis le 25 février 2019, la SICTA est certifiée ISO 9001:2015 par ABS Quality Evaluations. 
                  En 2024, SICTA rejoint le groupe Mayelia Participations, marquant une nouvelle ère d'innovation 
                  et d'expansion.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <Card className="card-elevated relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-sicta-orange-light"></div>
                <div className="pl-8 pr-6 py-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <Calendar className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-semibold">Notre Évolution</h3>
                  </div>
                  
                  <div className="space-y-8">
                    {/* 1959 */}
                    <div className="flex items-start space-x-6">
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-4 bg-primary rounded-full border-4 border-primary/20"></div>
                        <div className="w-px h-16 bg-primary/30 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="font-bold text-2xl text-primary">1959</div>
                          <div className="h-px flex-1 bg-border"></div>
                        </div>
                        <h4 className="font-semibold text-sicta-grey-dark mb-2">Début du contrôle technique</h4>
                        <p className="text-sm text-sicta-grey-light">Obligation du contrôle technique automobile en Côte d'Ivoire selon la réglementation.</p>
                      </div>
                    </div>

                    {/* 1974 */}
                    <div className="flex items-start space-x-6">
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-4 bg-primary rounded-full border-4 border-primary/20"></div>
                        <div className="w-px h-16 bg-primary/30 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="font-bold text-2xl text-primary">1974</div>
                          <div className="h-px flex-1 bg-border"></div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 items-center">
                          <div className="md:col-span-2">
                            <h4 className="font-semibold text-sicta-grey-dark mb-2">Création de la SICTA</h4>
                            <p className="text-sm text-sicta-grey-light">Fondation de la Société Ivoirienne de Contrôles Techniques Automobiles et Industriels.</p>
                          </div>
                          <div className="relative overflow-hidden rounded-lg">
                            <img 
                              src={timeline1974} 
                              alt="Atelier d'inspection de 1974" 
                              className="w-full h-20 object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 1990 */}
                    <div className="flex items-start space-x-6">
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-4 bg-primary rounded-full border-4 border-primary/20"></div>
                        <div className="w-px h-16 bg-primary/30 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="font-bold text-2xl text-primary">1990</div>
                          <div className="h-px flex-1 bg-border"></div>
                        </div>
                        <h4 className="font-semibold text-sicta-grey-dark mb-2">Rachat par SGS</h4>
                        <p className="text-sm text-sicta-grey-light">La SICTA devient une société privatisée rachetée par le groupe SGS, leader mondial de l'inspection.</p>
                      </div>
                    </div>

                    {/* 2019 */}
                    <div className="flex items-start space-x-6">
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-4 bg-primary rounded-full border-4 border-primary/20"></div>
                        <div className="w-px h-16 bg-primary/30 mt-2"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="font-bold text-2xl text-primary">2019</div>
                          <div className="h-px flex-1 bg-border"></div>
                        </div>
                        <h4 className="font-semibold text-sicta-grey-dark mb-2">Certification ISO 9001:2015</h4>
                        <p className="text-sm text-sicta-grey-light">Certification qualité par ABS Quality Evaluations, garantissant l'excellence de nos services.</p>
                      </div>
                    </div>

                    {/* 2024 */}
                    <div className="flex items-start space-x-6">
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-4 bg-sicta-orange-light rounded-full border-4 border-sicta-orange-light/20"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="font-bold text-2xl text-sicta-orange-light">2024</div>
                          <div className="h-px flex-1 bg-border"></div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 items-center">
                          <div className="md:col-span-2">
                            <h4 className="font-semibold text-sicta-grey-dark mb-2">Rachat par Mayelia Participations</h4>
                            <p className="text-sm text-sicta-grey-light">Nouvelle ère d'innovation et d'expansion sous l'égide de Mayelia Participations.</p>
                          </div>
                          <div className="relative overflow-hidden rounded-lg">
                            <img 
                              src={timeline2024} 
                              alt="Centre moderne 2024" 
                              className="w-full h-20 object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Gouvernance & Valeurs */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">Gouvernance & Valeurs</h2>
            <p className="text-xl text-sicta-grey-light">
              Sous l'égide de Mayelia Participations, SICTA poursuit sa mission de sécurité routière
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-elevated text-center p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Sécurité</h3>
              <p className="text-sicta-grey-light text-sm">
                Garantir la sécurité routière à travers des contrôles rigoureux 
                et conformes aux standards internationaux.
              </p>
            </Card>

            <Card className="card-elevated text-center p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-sicta-grey-light text-sm">
                Maintenir les plus hauts standards de qualité et d'innovation 
                dans nos services de contrôle technique.
              </p>
            </Card>

            <Card className="card-elevated text-center p-6 sm:col-span-2 lg:col-span-1">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-sicta-grey-light text-sm">
                Développer des solutions techniques avancées pour répondre 
                aux défis de la mobilité moderne.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Partenariat Mayelia */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Partenariat avec Mayelia Participations
              </h2>
              <p className="text-xl text-sicta-grey-light">
                Un nouveau chapitre d'excellence et d'expansion
              </p>
            </div>

            <Card className="card-elevated">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Vision Stratégique</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1" />
                      <span className="text-sicta-grey-light">
                        Expansion du réseau national et sous-régional
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1" />
                      <span className="text-sicta-grey-light">
                        Innovation technologique et digitalisation
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1" />
                      <span className="text-sicta-grey-light">
                        Renforcement de la souveraineté industrielle
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Objectifs Communs</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1" />
                      <span className="text-sicta-grey-light">
                        Amélioration continue de la qualité de service
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1" />
                      <span className="text-sicta-grey-light">
                        Développement des compétences locales
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1" />
                      <span className="text-sicta-grey-light">
                        Contribution à la sécurité routière nationale
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Chiffres Clés */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-sicta-grey-dark">Chiffres Clés</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sicta-grey-light">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">28</div>
              <div className="text-sicta-grey-light">Agences permanentes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1500+</div>
              <div className="text-sicta-grey-light">Véhicules contrôlés/jour</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">123</div>
              <div className="text-sicta-grey-light">Points de contrôle</div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default About;