import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Shield, ShieldCheck, Scale, Search, FileCheck, FileText, Navigation, ClipboardCheck,
  PackageCheck, LifeBuoy, Star, Truck, Award, Clock, CheckCircle2, ArrowRight,
  Loader2, HelpCircle, FileBadge, MapPin, Car, Users, Calendar, Lightbulb,
  Settings, Zap, Wrench, Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { fetchService } from "@/services/serviceService";
import type { ServiceSectionAPI } from "@/services/serviceService";
import NotFound from "./NotFound";

const ICONS: Record<string, any> = {
  Shield, ShieldCheck, Scale, Search, FileCheck, FileText, Navigation, ClipboardCheck,
  PackageCheck, LifeBuoy, Star, Truck, Award, Clock, MapPin, Car, Users, Calendar,
  CheckCircle2, Lightbulb, Settings, Zap, Wrench, Gauge,
};
const Icon = ({ name, className }: { name?: string | null; className?: string }) => {
  const Cmp = (name && ICONS[name]) || CheckCircle2;
  return <Cmp className={className} />;
};

const SectionBlock = ({ section }: { section: ServiceSectionAPI }) => {
  const c = section.contenu ?? {};
  const Header = () =>
    section.titre ? (
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sicta-grey-dark mb-3">{section.titre}</h2>
        {section.sous_titre && <p className="text-lg text-sicta-grey-light max-w-2xl mx-auto">{section.sous_titre}</p>}
      </div>
    ) : null;

  switch (section.type) {
    case "intro":
      return (
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-16 bg-primary rounded-full" />
                  <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-primary text-primary bg-primary/5">
                    À propos
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-8">
                  {section.titre || "Description du Produit"}
                </h2>
                <Card className="p-6 md:p-10 lg:p-12 bg-white/90 backdrop-blur-sm border-l-4 border-primary shadow-xl rounded-2xl">
                  <div 
                    className="prose prose-lg max-w-none text-sicta-grey-light leading-relaxed text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: c.html ?? "" }} 
                  />
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      );

    case "texte":
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <Header />
            <div className="prose prose-lg max-w-none text-sicta-grey-light" dangerouslySetInnerHTML={{ __html: c.html ?? "" }} />
          </div>
        </section>
      );

    case "avantages": {
      const items = c.items ?? [];
      const gridCols = items.length === 1 
        ? "grid-cols-1 max-w-md mx-auto" 
        : items.length === 2 
          ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto" 
          : items.length === 3 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto" 
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      return (
        <section className="py-16 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <Header />
            <div className={`grid gap-6 ${gridCols}`}>
              {items.map((it: any, i: number) => (
                <Card key={i} className="p-6 text-center rounded-2xl border-primary/10 hover:shadow-lg transition-shadow">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={it.icone} className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-sicta-grey-dark mb-2">{it.titre}</h3>
                  <p className="text-sm text-sicta-grey-light">{it.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "etapes":
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Header />
            <div className="space-y-4">
              {(c.items ?? []).map((it: any, i: number) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl bg-secondary/20 border border-gray-100">
                  <div className="h-10 w-10 rounded-full bg-primary text-white font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-bold text-sicta-grey-dark">{it.titre}</h3>
                    {it.description && <p className="text-sicta-grey-light text-sm mt-1">{it.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "tarifs": {
      const colonnes: string[] = c.colonnes ?? [];
      const lignes: string[][] = c.lignes ?? [];
      return (
        <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-sicta-grey/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <Header />
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-sicta-grey/5">
                    {colonnes.map((col, i) => (
                      <TableHead key={i} className="font-bold text-sicta-grey-dark">{col}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lignes.map((ligne, ri) => (
                    <TableRow key={ri}>
                      {ligne.map((cell, ci) => (
                        <TableCell key={ci} className={ci === 0 ? "font-medium text-sicta-grey-dark" : "text-sicta-grey-light"}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      );
    }

    case "documents": {
      const items = c.items ?? [];
      const gridCols = items.length === 1 
        ? "grid-cols-1 max-w-md mx-auto" 
        : "grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto";
      return (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Header />
            <div className={`grid gap-4 ${gridCols}`}>
              {items.map((it: any, i: number) => (
                <div key={i} className="flex gap-3 items-start p-4 rounded-xl border border-gray-100 bg-secondary/10">
                  <FileBadge className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sicta-grey-dark">{it.titre}</p>
                    {it.description && <p className="text-sm text-sicta-grey-light mt-0.5">{it.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "faq":
      return (
        <section className="py-16 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <Header />
            <div className="space-y-3">
              {(c.items ?? []).map((it: any, i: number) => (
                <details key={i} className="group rounded-2xl bg-white border border-gray-100 p-5 [&_svg]:open:rotate-180">
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-sicta-grey-dark list-none">
                    <span className="flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary" />{it.question}</span>
                    <ArrowRight className="h-4 w-4 rotate-90 transition-transform text-primary" />
                  </summary>
                  <p className="text-sicta-grey-light mt-3 pl-7">{it.reponse}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      );

    case "cta":
      return (
        <section className="py-20 bg-gradient-to-r from-primary to-orange-400">
          <div className="container mx-auto px-4 text-center text-white">
            {section.titre && <h2 className="text-3xl lg:text-4xl font-bold mb-3">{section.titre}</h2>}
            {section.sous_titre && <p className="text-xl mb-8 opacity-90">{section.sous_titre}</p>}
            {c.bouton_texte && (
              <Link to={c.bouton_lien || "/reservation"}>
                <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg h-auto">
                  {c.bouton_texte}<ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </section>
      );

    default:
      return null; // 'custom' : rendu par un composant codé dédié, non géré ici
  }
};

const ServiceDynamic = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: service, isLoading, isError } = useQuery({
    queryKey: ["service", slug],
    queryFn: () => fetchService(slug!),
    enabled: !!slug,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !service) return <NotFound />;

  return (
    <PageTransition>
      <SEO
        title={service.meta_title || `${service.nom} — SICTA`}
        description={service.meta_description || service.resume || ""}
        url={`/services/${service.slug}`}
      />
      <div className="w-full">
        {/* Hero */}
        <section className="relative h-[46vh] min-h-[360px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            {service.hero_image ? (
              <img src={service.hero_image} alt={service.nom} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-sicta-grey-dark to-[#1a1a1a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
          </div>
          <motion.div
            className="relative z-10 text-center text-white px-4 max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/90 mb-5">
              <Icon name={service.icone} className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">{service.hero_titre || service.nom}</h1>
            {service.hero_sous_titre && <p className="text-lg text-gray-200 max-w-2xl mx-auto">{service.hero_sous_titre}</p>}
          </motion.div>
        </section>

        {/* Blocs */}
        {service.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}

        {/* Repli si aucun bloc */}
        {service.sections.length === 0 && (
          <section className="py-20 text-center">
            <p className="text-sicta-grey-light">Le contenu de ce service sera bientôt disponible.</p>
            <Button className="mt-4 btn-hero" onClick={() => navigate("/services")}>Voir tous les services</Button>
          </section>
        )}
      </div>
    </PageTransition>
  );
};

export default ServiceDynamic;
