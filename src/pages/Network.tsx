import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin, Clock, Car, Building2, Map, Navigation, ChevronLeft, ChevronRight,
  Calendar, Phone, Search, X, CheckCircle2, ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import NetworkImageMap from "@/components/NetworkImageMap";
import NearestAgencyModal from "@/components/NearestAgencyModal";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchStations, fetchStationStats } from "@/services/stationService";
import { fetchPageSections } from "@/services/pageSectionService";
import type { ApiStation } from "@/services/stationService";

const ITEMS_PER_PAGE_PERMANENT = 9;

const ALL_SERVICES = ["Contrôle technique", "CIVIO", "IVN", "Pesée", "Jaugeage", "PPAD", "Station Mobile"];

const getMissingServices = (stationServices: string[]): string[] => {
  const normalized = stationServices.map((s) => s.trim().toLowerCase());
  return ALL_SERVICES.filter((s) => !normalized.includes(s.toLowerCase()));
};

const stationSlug = (nom: string) =>
  nom.toLowerCase().replace(/\s+/g, "-").replace(/[éèê]/g, "e").replace(/[àâ]/g, "a").replace(/[ô]/g, "o").replace(/[ùû]/g, "u").replace(/'/g, "");

const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(DIACRITICS, "");

/* Compteur animé */
function useCountUp(target: number, run: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run || !target) { setValue(target || 0); return; }
    const steps = 40;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setValue(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(t);
    }, durationMs / steps);
    return () => clearInterval(t);
  }, [target, run, durationMs]);
  return value;
}

const Network = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const didRunRechercher = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [interieurPage, setInterieurPage] = useState(1);
  const [nearestOpen, setNearestOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("permanent");

  const { data: stations = [], isLoading: loadingStations } = useQuery({
    queryKey: ["stations"],
    queryFn: fetchStations,
    staleTime: 300_000,
  });

  const { data: stats } = useQuery({
    queryKey: ["station-stats"],
    queryFn: fetchStationStats,
    staleTime: 300_000,
  });

  const { data: networkSections } = useQuery({
    queryKey: ["page-sections", "network"],
    queryFn: () => fetchPageSections("network"),
    staleTime: 300_000,
  });

  const heroTitle = networkSections?.network_hero_title || "Trouvez la station SICTA la plus proche de vous";
  const ctaTitle = networkSections?.network_cta_title || "Prêt à passer votre visite technique ?";
  const ctaButton = networkSections?.network_cta_button || "Trouvez une station SICTA à proximité";

  // Filtrage (recherche + service)
  const matches = (s: ApiStation) => {
    const q = normalize(query.trim());
    const okQuery =
      !q ||
      normalize(s.nom).includes(q) ||
      normalize(s.ville).includes(q) ||
      normalize(s.region ?? "").includes(q) ||
      normalize(s.zone).includes(q) ||
      (Array.isArray(s.services) && s.services.some((sv) => normalize(sv).includes(q)));
    const okService =
      !serviceFilter ||
      (Array.isArray(s.services) && s.services.some((sv) => normalize(sv) === normalize(serviceFilter)));
    return okQuery && okService;
  };

  const stationsInterieur = useMemo(() => stations.filter((s) => s.zone === "interieur" && matches(s)), [stations, query, serviceFilter]);
  const stationsAbidjan = useMemo(() => stations.filter((s) => s.zone === "abidjan" && matches(s)), [stations, query, serviceFilter]);

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Réinitialise la pagination & bascule automatiquement sur l'onglet ayant des résultats
  useEffect(() => {
    setInterieurPage(1);
    if (query.trim() || serviceFilter) {
      if (stationsAbidjan.length > 0 && stationsInterieur.length === 0) {
        setActiveTab("abidjan");
      } else if (stationsInterieur.length > 0 && stationsAbidjan.length === 0) {
        setActiveTab("permanent");
      }
    }
  }, [query, serviceFilter, stationsAbidjan.length, stationsInterieur.length]);

  const totalInterieurPages = Math.ceil(stationsInterieur.length / ITEMS_PER_PAGE_PERMANENT) || 1;
  const startInterieur = (interieurPage - 1) * ITEMS_PER_PAGE_PERMANENT;
  const endInterieur = startInterieur + ITEMS_PER_PAGE_PERMANENT;
  const currentInterieurAgencies = stationsInterieur.slice(startInterieur, endInterieur);

  const handleInterieurPageChange = (newPage: number) => {
    setInterieurPage(newPage);
    window.scrollTo({ top: 480, behavior: "smooth" });
  };

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

  /* ---------- Stats ---------- */
  const permanentCount = useCountUp(stats?.permanent ?? 29, true);
  const abidjanRaw = useMemo(() => stations.filter(s => s.zone === "abidjan").length, [stations]);
  const interieurRaw = useMemo(() => stations.filter(s => s.zone === "interieur").length, [stations]);
  const abidjanCount = useCountUp(abidjanRaw || 7, true);
  const interieurCount = useCountUp(interieurRaw || 22, true);
  const statItems = [
    { icon: Building2, value: `${permanentCount}`, label: "Stations fixes" },
    { icon: Building2, value: `${abidjanCount}`, label: "Stations Abidjan" },
    { icon: Navigation, value: `${interieurCount}`, label: "Stations Intérieur" },
    { icon: ShieldCheck, value: "", label: "Couverture Nationale" },
  ];

  /* ---------- Carte station ---------- */
  const AgencyCard = ({ agency, index = 0 }: { agency: ApiStation; index?: number }) => {
    const isMobile = agency.nom.includes("Banc") || agency.type === "mobile";
    const stationServices = Array.isArray(agency.services) ? agency.services : [];
    const missing = stationServices.length > 0 ? getMissingServices(stationServices) : [];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
        className="h-full"
      >
        <Card className="group h-full flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden">
          {/* En-tête */}
          <div className="p-5 pb-4 flex items-start gap-3 border-b border-gray-50">
            <div className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isMobile ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
              {isMobile ? <Navigation className="h-5 w-5" /> : <Car className="h-5 w-5" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sicta-grey-dark leading-tight truncate">{agency.nom}</h3>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-sicta-grey-light">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{agency.ville}{agency.region ? ` · ${agency.region}` : ""}</span>
              </div>
            </div>
          </div>

          {/* Corps */}
          <div className="p-5 pt-4 flex flex-col flex-grow gap-4">
            <div className="space-y-2 text-sm text-sicta-grey-light">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 text-primary/70 mt-0.5" />
                <span className="whitespace-pre-line">{agency.horaires}</span>
              </div>
              {agency.telephone && (
                <a href={`tel:${agency.telephone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 flex-shrink-0 text-primary/70" />
                  <span>{agency.telephone}</span>
                </a>
              )}
            </div>

            {stationServices.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-sicta-grey-dark mb-2">{t("network.servicesAvailable")}</div>
                <div className="flex flex-wrap gap-1.5">
                  {stationServices.map((service, i) => {
                    const SERVICE_SLUGS: Record<string, string> = {
                      "contrôle technique": "controle-technique",
                      "civio": "civio",
                      "ivn": "ivn",
                      "pesée": "pesee",
                      "jaugeage": "jaugeage-baremage",
                      "ppad": "ppad",
                      "station mobile": "station-mobile",
                      "vip": "vip"
                    };
                    const slug = SERVICE_SLUGS[service.trim().toLowerCase()];
                    if (slug) {
                      return (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/services/${slug}`);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/8 text-primary hover:bg-primary/20 text-xs font-medium rounded-full transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="h-3 w-3" />{service}
                        </button>
                      );
                    }
                    return (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/8 text-primary text-xs font-medium rounded-full">
                        <CheckCircle2 className="h-3 w-3" />{service}
                      </span>
                    );
                  })}
                </div>

              </div>
            )}

            {/* Actions */}
            <div className="mt-auto pt-1 flex gap-2">
              <Button variant="outline" className="flex-1 h-11 text-sm border-gray-200" asChild>
                <a href={cardMapsHref(agency)} target="_blank" rel="noopener noreferrer">
                  <Navigation className="h-4 w-4 mr-1.5" />{t("network.route")}
                </a>
              </Button>
              {/* Bouton RDV temporairement désactivé */}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  const SkeletonCard = () => (
    <div className="h-full rounded-2xl border border-gray-100 bg-white p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-11 w-11 rounded-xl bg-gray-100" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
      <div className="flex gap-1.5 mb-4">
        {[...Array(3)].map((_, i) => <div key={i} className="h-6 w-16 bg-gray-100 rounded-full" />)}
      </div>
      <div className="flex gap-2">
        <div className="h-11 flex-1 bg-gray-100 rounded-lg" />
        <div className="h-11 flex-1 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );

  const EmptyState = ({ onReset }: { onReset: () => void }) => (
    <div className="text-center py-16">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Search className="h-7 w-7 text-primary" />
      </div>
      <p className="text-sicta-grey-dark font-semibold">Aucune station ne correspond à votre recherche</p>
      <p className="text-sicta-grey-light text-sm mt-1">Essayez un autre nom de ville ou réinitialisez les filtres.</p>
      <Button variant="outline" className="mt-4" onClick={onReset}>
        <X className="h-4 w-4 mr-1.5" />Réinitialiser
      </Button>
    </div>
  );

  const resetFilters = () => { setQuery(""); setServiceFilter(null); };
  const hasFilters = query.trim() !== "" || serviceFilter !== null;

  return (
    <PageTransition>
      <SEO
        title="Notre Réseau - Stations de contrôle technique SICTA"
        description="Découvrez le réseau SICTA : 29 stations fixes réparties sur l'ensemble du territoire ivoirien (07 Abidjan / 22 Intérieur) pour une couverture nationale complète."
        keywords="station SICTA, contrôle technique, Abidjan, Côte d'Ivoire"
        url="/reseau"
      />
      <div className="w-full">
        {/* ---------- HERO ---------- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sicta-grey-dark via-sicta-grey-dark to-[#1a1a1a] py-20 lg:py-28">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-orange-300 text-sm font-semibold mb-5 backdrop-blur">
                <MapPin className="h-4 w-4" />{t("network.title")}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
                {heroTitle}
              </h1>

              {/* Barre de recherche */}
              <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") scrollToResults();
                    }}
                    placeholder="Trouvez une station SICTA…"
                    aria-label="Rechercher une station SICTA"
                    className="w-full h-14 pl-12 pr-10 rounded-2xl bg-white text-sicta-grey-dark placeholder:text-gray-400 shadow-lg outline-none focus:ring-4 focus:ring-primary/30"
                  />
                  {query && (
                    <button onClick={() => setQuery("")} aria-label="Effacer" className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Button className="h-14 px-6 bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg" onClick={scrollToResults}>
                  <Search className="h-5 w-5 mr-2" />Rechercher
                </Button>
                <Button className="h-14 px-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 backdrop-blur" onClick={() => setNearestOpen(true)} title="Localiser une station à proximité">
                  <Navigation className="h-5 w-5" />
                </Button>
              </div>

              {query.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 inline-flex items-center gap-2 bg-white/95 text-sicta-grey-dark px-5 py-2.5 rounded-full text-sm font-semibold shadow-xl backdrop-blur cursor-pointer hover:bg-white transition-all border border-white/20"
                  onClick={scrollToResults}
                >
                  <span>
                    {stationsAbidjan.length + stationsInterieur.length} station(s) trouvée(s) pour « {query} »
                  </span>
                  <span className="text-primary font-bold ml-1">Voir les résultats ↓</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ---------- STATS ---------- */}
        <section className="py-14 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {statItems.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 p-5 text-center"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary tabular-nums">{s.value}</div>
                  <div className="text-xs md:text-sm text-sicta-grey-light mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- LISTE ---------- */}
        <section ref={resultsRef} className="py-16 bg-secondary/20 scroll-mt-6">
          <div className="container mx-auto px-4">
            {/* Filtre par service */}
            <div className="mb-8">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={() => setServiceFilter(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${serviceFilter === null ? "bg-primary text-white" : "bg-white text-sicta-grey-light border border-gray-200 hover:border-primary/40"}`}
                >
                  Tous les services
                </button>
                {ALL_SERVICES.map((sv) => (
                  <button
                    key={sv}
                    onClick={() => setServiceFilter(serviceFilter === sv ? null : sv)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${serviceFilter === sv ? "bg-primary text-white" : "bg-white text-sicta-grey-light border border-gray-200 hover:border-primary/40"}`}
                  >
                    {sv}
                  </button>
                ))}
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 h-auto gap-2 mb-10 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
                <TabsTrigger value="permanent" className="flex items-center justify-center gap-2 py-2.5 px-3 text-sm rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow">
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t("network.interiorTitle")} ({stationsInterieur.length})</span>
                </TabsTrigger>
                <TabsTrigger value="abidjan" className="flex items-center justify-center gap-2 py-2.5 px-3 text-sm rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow">
                  <Map className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t("network.abidjanTitle")} ({stationsAbidjan.length})</span>
                </TabsTrigger>
              </TabsList>

              {/* Intérieur */}
              <TabsContent value="permanent">
                <div className="text-center mb-8">
                  <p className="text-lg text-sicta-grey-light">{t("network.interiorSubtitle")}</p>
                  {!loadingStations && stationsInterieur.length > 0 && (
                    <p className="text-sm text-sicta-grey-light mt-2">
                      {t("network.interiorDisplay")} {startInterieur + 1}-{Math.min(endInterieur, stationsInterieur.length)} {t("network.interiorOf")} {stationsInterieur.length} {t("network.interiorAgencies")}
                    </p>
                  )}
                </div>

                {loadingStations ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                ) : stationsInterieur.length === 0 ? (
                  <EmptyState onReset={resetFilters} />
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {currentInterieurAgencies.map((agency, i) => (
                        <AgencyCard key={agency.id} agency={agency} index={i} />
                      ))}
                    </div>

                    {totalInterieurPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-10">
                        <Button variant="outline" size="sm" onClick={() => handleInterieurPageChange(interieurPage - 1)} disabled={interieurPage === 1} className="gap-1">
                          <ChevronLeft className="h-4 w-4" />{t("network.previous")}
                        </Button>
                        <div className="flex gap-1">
                          {Array.from({ length: totalInterieurPages }, (_, i) => i + 1).map((page) => (
                            <Button key={page} variant={page === interieurPage ? "default" : "outline"} size="sm"
                              onClick={() => handleInterieurPageChange(page)}
                              className={page === interieurPage ? "bg-primary text-white w-10" : "w-10"}>
                              {page}
                            </Button>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleInterieurPageChange(interieurPage + 1)} disabled={interieurPage === totalInterieurPages} className="gap-1">
                          {t("network.next")}<ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              {/* Abidjan */}
              <TabsContent value="abidjan">
                <div className="text-center mb-8">
                  <p className="text-lg text-sicta-grey-light">{t("network.abidjanSubtitle")}</p>
                </div>

                {loadingStations ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                ) : stationsAbidjan.length === 0 ? (
                  <EmptyState onReset={resetFilters} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {stationsAbidjan.map((agency, i) => (
                      <AgencyCard key={agency.id} agency={agency} index={i} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {hasFilters && (
              <div className="text-center mt-8">
                <Button variant="ghost" className="text-sicta-grey-light" onClick={resetFilters}>
                  <X className="h-4 w-4 mr-1.5" />Réinitialiser la recherche
                </Button>
              </div>
            )}
          </div>
        </section>

        <NetworkImageMap />



        {/* ---------- CTA ---------- */}
        <section className="py-20 bg-gradient-to-r from-primary to-orange-400">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              {ctaTitle}
            </h2>
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg h-auto" onClick={() => setNearestOpen(true)}>
              <MapPin className="h-5 w-5 mr-3" />{ctaButton}
            </Button>
          </div>
        </section>
      </div>

      <NearestAgencyModal open={nearestOpen} onClose={() => setNearestOpen(false)} />
    </PageTransition>
  );
};

export default Network;
