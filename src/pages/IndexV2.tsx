import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight, Calendar, MapPin, CheckCircle2, ShieldCheck, Award, Sparkles,
  ChevronRight, ChevronDown, Phone, Car, FileBadge, FileCheck, Search, Scale,
  Navigation, Building2, Layers, Star, Gauge, PackageCheck, LifeBuoy, FileText,
  ClipboardCheck, Truck, Users, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import HomeNewsSection from "@/components/HomeNewsSection";
import ParticleBackground from "@/components/three/ParticleBackground";
import { fetchStationStats } from "@/services/stationService";
import { fetchServices } from "@/services/serviceService";
import heroPoster from "@/assets/hero-automotive-service.jpg";

const ICONS: Record<string, any> = {
  ShieldCheck, Shield: ShieldCheck, Award, MapPin, Search, Scale, FileCheck, FileText,
  ClipboardCheck, Navigation, Building2, Layers, Star, Gauge, PackageCheck, LifeBuoy,
  Truck, Car, Users, Clock,
};
const SvcIcon = ({ name, className }: { name?: string | null; className?: string }) => {
  const C = (name && ICONS[name]) || FileCheck;
  return <C className={className} />;
};

/* ── Parallaxe souris ── */
function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 15 });
  const sy = useSpring(y, { stiffness: 60, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    const { innerWidth: w, innerHeight: h } = window;
    x.set(((e.clientX - w / 2) / w) * strength);
    y.set(((e.clientY - h / 2) / h) * strength);
  };
  return { sx, sy, onMove };
}

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ══════════ HERO ══════════ */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { sx, sy, onMove } = useMouseParallax(reduce ? 0 : 26);

  return (
    <section ref={ref} onMouseMove={onMove} className="relative min-h-dvh flex items-center overflow-hidden bg-white pt-24 pb-16">
      {/* décor de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-40 w-[38rem] h-[38rem] bg-orange-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/2 -left-40 w-[30rem] h-[30rem] bg-orange-50 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Texte */}
          <motion.div style={{ y: reduce ? 0 : yText, opacity }} className="lg:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-primary text-sm font-semibold mb-6">
                <Award className="h-4 w-4" /> Certifié ISO 9001:2015 · Depuis 1974
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 leading-[1.02]">
                La sécurité <br />
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">routière</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-1.5 bg-primary/30 rounded-full"
                    initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                  />
                </span>{" "}
                <br className="hidden sm:block" />commence ici.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-lg">
                Leader du contrôle technique automobile en Côte d'Ivoire. Réservez votre visite
                en ligne et roulez l'esprit tranquille, partout sur le territoire.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                {/* Bouton RDV temporairement désactivé */}
                <Link to="/reseau">
                  <Button variant="outline" className="h-14 px-8 text-base rounded-full border-slate-200 text-slate-700 hover:border-primary hover:text-primary w-full sm:w-auto">
                    <MapPin className="h-5 w-5 mr-2" /> Trouvez une station
                  </Button>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {["#F97316", "#fb923c", "#334155", "#64748b"].map((c, i) => (
                    <div key={i} className="h-9 w-9 rounded-full border-2 border-white" style={{ background: c }} />
                  ))}
                </div>
                <div className="text-sm text-slate-500">
                  <span className="font-bold text-slate-900">52 stations</span> · <span className="font-bold text-slate-900">1500+</span> véhicules/jour
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* Vidéo cinématique + calques */}
          <div className="lg:col-span-6 relative">
            <motion.div style={{ x: sx, y: reduce ? 0 : yVideo }} className="relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/5 aspect-[4/5] sm:aspect-video lg:aspect-[4/5]">
                <motion.video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay muted loop playsInline preload="metadata"
                  poster={heroPoster}
                  animate={reduce ? {} : { scale: [1, 1.08, 1] }}
                  transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                >
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </motion.video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/85 backdrop-blur px-4 py-3">
                  <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                    <img src="/iconeMap.png" alt="SICTA" className="h-7 w-7 object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Contrôle technique certifié</p>
                    <p className="text-xs text-slate-500">Équipements de dernière génération</p>
                  </div>
                </div>
              </div>

              {/* Cartes flottantes (parallaxe souris) */}
              <motion.div style={{ x: sx, y: sy }} className="absolute -top-6 -left-6 hidden sm:block">
                <div className="rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/5 px-4 py-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center"><ShieldCheck className="h-5 w-5 text-green-600" /></div>
                  <div><p className="text-lg font-bold text-slate-900 leading-none">100%</p><p className="text-xs text-slate-500">Conformité</p></div>
                </div>
              </motion.div>
              <motion.div style={{ x: useTransform(sx, (v) => v * -1.4), y: useTransform(sy, (v) => v * -1.2) }} className="absolute -bottom-6 -right-4 hidden sm:block">
                <div className="rounded-2xl bg-primary text-white shadow-xl px-4 py-3 flex items-center gap-3">
                  <Award className="h-6 w-6" />
                  <div><p className="text-sm font-bold leading-none">ISO 9001</p><p className="text-xs opacity-90">2015 certifié</p></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div style={{ opacity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400">
        <span className="text-xs uppercase tracking-wider">Découvrir</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}><ChevronDown className="h-5 w-5" /></motion.div>
      </motion.div>
    </section>
  );
};

/* ══════════ MARQUEE (bandeau confiance) ══════════ */
const Marquee = () => {
  const { data: stats } = useQuery({
    queryKey: ["station-stats"],
    queryFn: fetchStationStats,
    staleTime: 300_000,
  });
  const items = ["ISO 9001:2015", "Leader depuis 1974", "Mayelia PARTICIPATIONS", `${stats?.total ?? 29} stations fixes`, "100% couverture nationale"];
  const row = [...items, ...items];
  return (
    <section className="py-8 border-y border-slate-100 bg-white overflow-hidden">
      <motion.div className="flex gap-10 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }}>
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-lg font-semibold text-slate-400">
            <Sparkles className="h-4 w-4 text-primary" /> {t}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

/* ══════════ STATS ÉPINGLÉ (scrollytelling) ══════════ */
const PinnedStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const slides = [
    { k: "1974", t: "Une expertise fondée il y a 50 ans", d: "Depuis un demi-siècle, SICTA veille sur la sécurité des véhicules ivoiriens." },
    { k: "52", t: "Stations sur tout le territoire", d: "Stations permanentes, périodiques et bancs mobiles pour être toujours proche de vous." },
    { k: "1500+", t: "Véhicules contrôlés chaque jour", d: "Des équipes qualifiées et des équipements de dernière génération." },
    { k: "ISO", t: "Une qualité certifiée 9001:2015", d: "Un gage de rigueur, de fiabilité et de confiance reconnu internationalement." },
  ];
  const n = slides.length;

  return (
    <section ref={ref} className="relative bg-slate-900 text-white" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 h-dvh flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          {slides.map((s, i) => {
            const start = i / n, end = (i + 1) / n;
            const mid = (start + end) / 2;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, mid - 0.02, mid + 0.06, end], [0, 1, 1, 0]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [start, end], [60, -60]);
            return (
              <motion.div key={i} style={{ opacity, y }} className="absolute inset-x-4 top-1/2 -translate-y-1/2 max-w-4xl mx-auto text-center">
                <div className="text-7xl sm:text-8xl xl:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-orange-300">{s.k}</div>
                <h3 className="mt-4 text-2xl sm:text-4xl font-bold">{s.t}</h3>
                <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">{s.d}</p>
              </motion.div>
            );
          })}
          {/* progression */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => {
              const active = useTransform(scrollYProgress, [i / n, (i + 0.5) / n, (i + 1) / n], [0.3, 1, 0.3]);
              return <motion.span key={i} style={{ opacity: active }} className="h-1.5 w-8 rounded-full bg-primary" />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════ SERVICES — pin horizontal ══════════ */
const HorizontalServices = ({ list }: { list: any[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);

  return (
    <section ref={ref} className="relative bg-white" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-dvh flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 mb-10">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Nos services</span>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 mt-2">Tout pour votre véhicule</h2>
            <Link to="/services" className="hidden sm:inline-flex items-center gap-1 text-primary font-semibold whitespace-nowrap">Voir tout <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <motion.div style={{ x }} className="flex gap-6 pl-4 sm:pl-[max(1rem,calc((100vw-72rem)/2))]">
          {list.map((s) => (
            <div key={s.slug} className="w-[78vw] sm:w-[42vw] lg:w-[26rem] flex-shrink-0">
              <ServiceCard s={s} big />
            </div>
          ))}
          <div className="w-[60vw] lg:w-[26rem] flex-shrink-0 flex items-center">
            <Link to="/services" className="group flex items-center gap-3 text-2xl font-bold text-slate-900">
              Tous les services
              <span className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform"><ArrowRight className="h-6 w-6" /></span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PinnedServices = ({ services }: { services: any[] }) => {
  const reduce = useReducedMotion();
  const list = services.slice(0, 6);

  if (list.length === 0) return null;

  // Sur mobile / reduced-motion : grille simple (pas de scroll horizontal épinglé)
  if (reduce) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-10">Nos services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{list.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
        </div>
      </section>
    );
  }

  return <HorizontalServices list={list} />;
};

const ServiceCard = ({ s, big = false }: { s: any; big?: boolean }) => (
  <Link to={`/services/${s.slug}`} className="group block h-full">
    <Card className={`h-full rounded-3xl border-slate-100 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 overflow-hidden ${big ? "p-8" : "p-6"} flex flex-col`}>
      <div className="h-14 w-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
        <SvcIcon name={s.icone} className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
      </div>
      <h3 className={`font-bold text-slate-900 mb-2 ${big ? "text-2xl" : "text-lg"}`}>{s.nom}</h3>
      <p className="text-slate-500 line-clamp-3 flex-1">{s.resume}</p>
      <span className="inline-flex items-center gap-1 text-primary font-semibold mt-5">En savoir plus <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
    </Card>
  </Link>
);

/* ══════════ RÉSEAU 3D ══════════ */
const ReseauSection = () => (
  <section className="relative py-28 bg-gradient-to-b from-white via-orange-50/40 to-white overflow-hidden">
    <ParticleBackground className="opacity-90" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-white/70 backdrop-blur text-primary text-sm font-semibold mb-5">
            <Navigation className="h-4 w-4" /> Notre réseau
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-4xl sm:text-6xl font-bold text-slate-900">Un maillage <span className="text-gradient">national</span></h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-lg text-slate-500">
            Des dizaines de points de contrôle interconnectés à travers toute la Côte d'Ivoire.
            Où que vous soyez, une station SICTA n'est jamais loin.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <Link to="/reseau"><Button className="mt-8 h-14 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white"><MapPin className="h-5 w-5 mr-2" /> Explorer le réseau</Button></Link>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ══════════ PROCESS ══════════ */
const Process = () => {
  const steps = [
    { icon: Calendar, title: "Réservez en ligne", text: "Choisissez la station, la date et l'heure en quelques clics." },
    { icon: Car, title: "Présentez le véhicule", text: "Nos experts réalisent un contrôle complet et rigoureux." },
    { icon: FileBadge, title: "Recevez le certificat", text: "Repartez en conformité, l'esprit tranquille." },
  ];
  return (
    <section className="py-28 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <Reveal><div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Comment ça marche</span>
          <h2 className="text-4xl sm:text-6xl font-bold mt-3">Simple comme 1 · 2 · 3</h2>
        </div></Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative rounded-3xl bg-white/5 border border-white/10 p-8 h-full backdrop-blur">
                <div className="text-7xl font-bold text-white/10 absolute top-4 right-6">{i + 1}</div>
                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6"><s.icon className="h-8 w-8 text-primary" /></div>
                <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-300">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════ CTA ══════════ */
const FinalCTA = () => (
  <section className="py-28 bg-white">
    <div className="container mx-auto px-4">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-orange-500 px-6 py-20 sm:px-16 text-center text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-16 -left-10 w-80 h-80 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-10 w-96 h-96 bg-slate-900 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-4xl sm:text-6xl font-bold mb-5">Prenez la route sereinement.</h2>
            <p className="text-xl opacity-90 mb-9 max-w-2xl mx-auto">Réservez votre visite technique en ligne — c'est rapide, simple et sans attente.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {/* Bouton RDV temporairement désactivé */}
              <Link to="/contact"><Button variant="outline" className="h-14 px-8 rounded-full border-white/50 bg-transparent text-white hover:bg-white/10 w-full sm:w-auto"><Phone className="h-5 w-5 mr-2" />Nous contacter</Button></Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ══════════ PAGE ══════════ */
const IndexV2 = () => {
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices, staleTime: 300_000 });

  return (
    <PageTransition>
      <SEO
        title="SICTA - Contrôle Technique Automobile en Côte d'Ivoire | Leader depuis 1974"
        description="Leader du contrôle technique automobile en Côte d'Ivoire depuis 1974. Réservez en ligne, 52 stations, certifié ISO 9001:2015."
        url="/"
      />
      <div className="w-full">
        <Hero />
        <Marquee />
        <PinnedStats />
        <PinnedServices services={services} />
        <ReseauSection />
        <Process />
        <HomeNewsSection />
        <FinalCTA />
      </div>
    </PageTransition>
  );
};

export default IndexV2;
