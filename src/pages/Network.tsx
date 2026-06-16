import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Clock, Car, Building2, Map, CalendarClock, Navigation, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import networkMapModern from "@/assets/network-map-modern.jpg";
import AnimatedMapCard from "@/components/AnimatedMapCard";
import NearestAgencyModal from "@/components/NearestAgencyModal";
import { fetchStations } from "@/services/stationService";
import type { ApiStation } from "@/services/stationService";

const ITEMS_PER_PAGE_PERMANENT = 9;

const ALL_SERVICES = ["Contrôle technique", "CIVIO", "IVN", "Pesée", "Jaugeage", "PPAD", "Station Mobile"];

const getMissingServices = (stationServices: string[]): string[] => {
  const normalized = stationServices.map((s) => s.trim().toLowerCase());
  return ALL_SERVICES.filter((s) => !normalized.includes(s.toLowerCase()));
};

const stationSlug = (nom: string) =>
  nom.toLowerCase().replace(/\s+/g, "-").replace(/[éèê]/g, "e").replace(/[àâ]/g, "a").replace(/[ô]/g, "o").replace(/[ùû]/g, "u").replace(/'/g, "");

const Network = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const didRunRechercher = useRef(false);

  const [stations, setStations] = useState<ApiStation[]>([]);
  const [loadingStations, setLoadingStations] = useState(true);
  const [interieurPage, setInterieurPage] = useState(1);
  const [nearestOpen, setNearestOpen] = useState(false);

  useEffect(() => {
    fetchStations()
      .then(setStations)
      .catch(console.error)
      .finally(() => setLoadingStations(false));
  }, []);

  const stationsInterieur = stations.filter((s) => s.zone === "interieur");
  const stationsAbidjan = stations.filter((s) => s.zone === "abidjan");

  // Pagination — Intérieur du Pays
  const totalInterieurPages = Math.ceil(stationsInterieur.length / ITEMS_PER_PAGE_PERMANENT);
  const startInterieur = (interieurPage - 1) * ITEMS_PER_PAGE_PERMANENT;
  const endInterieur = startInterieur + ITEMS_PER_PAGE_PERMANENT;
  const currentInterieurAgencies = stationsInterieur.slice(startInterieur, endInterieur);

  const handleInterieurPageChange = (newPage: number) => {
    setInterieurPage(newPage);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Depuis la page Contact, clic sur « Rechercher » → ouvre la modale de géolocalisation
  useEffect(() => {
    const fromRechercher = (location.state as { rechercher?: boolean } | null)?.rechercher === true;
    if (fromRechercher && !didRunRechercher.current) {
      didRunRechercher.current = true;
      navigate(location.pathname, { replace: true, state: {} });
      setNearestOpen(true);
    }
  }, [location.state, location.pathname, navigate]);

  const cardMapsHref = (s: ApiStation) =>
    s.maps_url || `https://www.google.com/maps/search/?api=1&query=Sicta+${encodeURIComponent(s.nom)}+${encodeURIComponent(s.ville)}`;

  const AgencyCard = ({ agency }: { agency: ApiStation }) => (
    <Card className="card-elevated h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
            {agency.nom.includes("Banc") || agency.type === "mobile"
              ? <Navigation className="h-5 w-5 text-primary" />
              : <Car className="h-5 w-5 text-primary" />}
          </div>
          <h3 className="text-lg font-semibold">{agency.nom}</h3>
        </div>

        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-sicta-grey-light mt-1 flex-shrink-0" />
            <div className="text-sm">
              <div className="text-sicta-grey-light">{agency.ville}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-sicta-grey-light" />
            <span className="text-sm text-sicta-grey-light">{agency.horaires}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium mb-1">{t("network.servicesAvailable")}</div>
          {(() => {
            const stationServices = Array.isArray(agency.services) ? agency.services : [];
            const missing = stationServices.length > 0 ? getMissingServices(stationServices) : [];
            return (
              <>
                <div className="flex flex-wrap gap-2 mb-3">
                  {stationServices.map((service, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
                {missing.length > 0 && (
                  <div className="text-xs font-semibold text-sicta-orange-light bg-sicta-orange-light/5 p-2 rounded-md border border-sicta-orange-light/20">
                    {t("network.availability")} tous les produits sauf {missing.join(", ")}
                  </div>
                )}
              </>
            );
          })()}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex-1 text-sm py-2" asChild>
            <a href={cardMapsHref(agency)} target="_blank" rel="noopener noreferrer">
              {t("network.route")}
            </a>
          </Button>
          <Button
            size="sm"
            className="flex-1 text-sm py-2 bg-primary text-white hover:bg-primary/90"
            onClick={() => navigate("/reservation", { state: { stationId: stationSlug(agency.nom) } })}
          >
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Réserver
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <PageTransition>
      <SEO
        title="Notre Réseau - Agences Abidjan et Intérieur, Stations Périodiques"
        description="Découvrez le réseau SICTA : 28 agences permanentes, dont Abidjan avec bancs mobiles, et 22 stations périodiques pour une couverture à 100% du territoire national."
        keywords="agence SICTA, station contrôle technique, Abidjan Plateau, Vridi, Yopougon, banc mobile, station périodique, Côte d'Ivoire"
        url="/reseau"
      />
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">{t("network.title")}</span>
              </h1>
              <p className="text-lg md:text-xl text-sicta-grey-light leading-relaxed mb-6">
                {t("network.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Network Stats */}
        <section className="py-16 bg-sicta-bg-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">28</div>
                <div className="text-sm md:text-base text-sicta-grey-light">{t("network.stats.permanent")}</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">22</div>
                <div className="text-sm md:text-base text-sicta-grey-light">{t("network.stats.temporary")}</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">1500+</div>
                <div className="text-sm md:text-base text-sicta-grey-light">{t("network.stats.daily")}</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="text-sm md:text-base text-sicta-grey-light">{t("network.stats.coverage")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stations List */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="permanent" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-auto gap-1 sm:gap-2 mb-8 bg-transparent p-0">
                <TabsTrigger value="permanent" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white border border-primary/20 min-w-0">
                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{t("network.interiorTitle")}</span>
                </TabsTrigger>
                <TabsTrigger value="abidjan" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white border border-primary/20 min-w-0">
                  <Map className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{t("network.abidjanTitle")}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="permanent">
                <div className="text-center mb-8">
                  <p className="text-lg text-sicta-grey-light">
                    {t("network.interiorSubtitle")}
                  </p>
                  {!loadingStations && stationsInterieur.length > 0 && (
                    <p className="text-sm text-sicta-grey-light mt-2">
                      {t("network.interiorDisplay")} {startInterieur + 1}-{Math.min(endInterieur, stationsInterieur.length)} {t("network.interiorOf")} {stationsInterieur.length} {t("network.interiorAgencies")}
                    </p>
                  )}
                </div>

                {loadingStations ? (
                  <div className="text-center py-16 text-sicta-grey-light">Chargement des stations…</div>
                ) : stationsInterieur.length === 0 ? (
                  <div className="text-center py-16 text-sicta-grey-light">Aucune station disponible pour le moment.</div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {currentInterieurAgencies.map((agency) => (
                        <AgencyCard key={agency.id} agency={agency} />
                      ))}
                    </div>

                    {totalInterieurPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-8">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInterieurPageChange(interieurPage - 1)}
                          disabled={interieurPage === 1}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          {t("network.previous")}
                        </Button>
                        <div className="flex gap-1">
                          {Array.from({ length: totalInterieurPages }, (_, i) => i + 1).map((page) => (
                            <Button
                              key={page}
                              variant={page === interieurPage ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleInterieurPageChange(page)}
                              className={page === interieurPage ? "bg-primary text-white" : ""}
                            >
                              {page}
                            </Button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInterieurPageChange(interieurPage + 1)}
                          disabled={interieurPage === totalInterieurPages}
                          className="flex items-center gap-1"
                        >
                          {t("network.next")}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="abidjan">
                <div className="text-center mb-8">
                  <p className="text-lg text-sicta-grey-light">
                    {t("network.abidjanSubtitle")}
                  </p>
                </div>

                {loadingStations ? (
                  <div className="text-center py-16 text-sicta-grey-light">Chargement des stations…</div>
                ) : stationsAbidjan.length === 0 ? (
                  <div className="text-center py-16 text-sicta-grey-light">Aucune station disponible pour le moment.</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {stationsAbidjan.map((agency) => (
                      <AgencyCard key={agency.id} agency={agency} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <AnimatedMapCard />

        {/* Mobile Infrastructure */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                {t("network.mobileInfrastructure")}
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                {t("network.mobileInfrastructureSubtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* 4 Stations Mobiles */}
              <Card className="card-elevated">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Navigation className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-sicta-grey-dark">{t("network.mobileStations")}</h3>
                      <p className="text-sicta-grey-light">{t("network.mobileStationsDesc")}</p>
                    </div>
                  </div>
                  <p className="text-sicta-grey-light mb-6">
                    {t("network.mobileStationsText")}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold text-primary">100%</div>
                    <div className="text-sicta-grey-light">Couverture totale avec mobilité partout</div>
                  </div>
                </div>
              </Card>

              {/* 4 Bancs Mobiles */}
              <Card className="card-elevated">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Car className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-sicta-grey-dark">{t("network.mobileBancs")}</h3>
                      <p className="text-sicta-grey-light">{t("network.mobileBancsDesc")}</p>
                    </div>
                  </div>
                  <p className="text-sicta-grey-light mb-6">
                    {t("network.mobileBancsText")}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold text-primary">ISO</div>
                    <div className="text-sicta-grey-light">Certifié 9001:2015</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-orange-400">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">{t("network.ctaTitle")}</h2>
            <p className="text-xl mb-8 opacity-90">
              {t("network.ctaSubtitle")}
            </p>
            <Button
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={() => setNearestOpen(true)}
            >
              <MapPin className="h-5 w-5 mr-3" />
              {t("network.locateAgency")}
            </Button>
          </div>
        </section>
      </div>

      <NearestAgencyModal open={nearestOpen} onClose={() => setNearestOpen(false)} />
    </PageTransition>
  );
};

export default Network;
