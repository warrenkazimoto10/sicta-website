import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileCheck,
  Calendar,
  MapPin,
  CheckCircle,
  ArrowRight,
  Target,
  Users,
  FileText,
  Clock,
  CheckCircle2,
  Award,
  Building,
  DollarSign,
  Phone,
  Shield,
  AlertCircle,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { immatriculationData, tarifsVignette2025 } from "@/data/services/immatriculation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Immatriculation = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const data = immatriculationData;

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[380px] sm:min-h-[480px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={data.imageHero}
              alt={data.titre}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center text-white px-0 sm:px-2"
              >
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                  {data.titre}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed opacity-95 max-w-3xl mx-auto mb-6 sm:mb-8">
                  {data.descriptionCourte}
                </p>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2"
            >
              <div className="w-1 h-3 bg-white/50 rounded-full" />
            </motion.div>
          </div>
        </section>

        {/* Description du Produit */}
        <section className="py-24 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
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
                  <Badge variant="outline" className="text-primary border-primary">
                    À propos
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-8">
                  Description du Produit
                </h2>
                <Card className="p-4 sm:p-6 md:p-8 lg:p-12 bg-white/80 backdrop-blur-sm border-l-4 border-primary shadow-xl">
                  <p className="text-sicta-grey-light leading-relaxed text-lg lg:text-xl">
                    {data.descriptionProduit}
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Objectifs */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Objectifs
                </h2>
                <p className="text-xl text-sicta-grey-light max-w-2xl mx-auto">
                  Trois objectifs pour garantir la conformité et la sécurité
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {data.objectifs.map((objectif, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                  >
                    <Card className="p-6 h-full hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <Target className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-xl font-bold text-primary mb-2">0{index + 1}</div>
                        <p className="text-sicta-grey-light leading-relaxed text-sm">
                          {objectif}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Public Concerné */}
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-sicta-grey/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Public ou Véhicules Concernés
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.publicConcernes.map((publicItem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-6 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 group h-full">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <span className="text-sicta-grey-dark font-semibold leading-relaxed">
                          {publicItem}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lieux de Prestation */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10 sm:mb-12 md:mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-3 sm:mb-4">
                  Lieux de Prestation Immatriculation
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-sicta-grey-light font-medium">
                  {data.lieuxPrestation.titre}
                </p>
                <p className="text-sicta-grey-light mt-1">
                  {data.lieuxPrestation.sousTitre}
                </p>
              </motion.div>

              <div className="space-y-6">
                {/* Sécurisation / Resécurisation des plaques */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-sicta-grey-dark mb-3 uppercase tracking-wide">
                          Pour la sécurisation ou la resécurisation des plaques
                        </h3>
                        <ul className="space-y-2">
                          {data.lieuxPrestation.secuResecu.centres.map((centre, i) => (
                            <li key={i} className="flex items-center gap-2 text-sicta-grey-dark font-medium">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                              {centre}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Pose des plaques */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05, duration: 0.5 }}
                >
                  <Card className="p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <FileCheck className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-sicta-grey-dark mb-2 uppercase tracking-wide">
                          Pour la pose des plaques
                        </h3>
                        <p className="text-sicta-grey-dark leading-relaxed">
                          {data.lieuxPrestation.pose.texte}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Impressions vignettes Auto VN */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Card className="p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <FileText className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-sicta-grey-dark mb-2 uppercase tracking-wide">
                          Pour les impressions des vignettes Auto VN
                        </h3>
                        <p className="text-sicta-grey-dark leading-relaxed">
                          {data.lieuxPrestation.vignettes.texte}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Transfert et pose de plaques */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <Card className="p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Building className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-sicta-grey-dark mb-2">
                          Transfert et pose de plaques d'immatriculation
                        </h3>
                        <p className="text-sicta-grey-dark leading-relaxed">
                          {data.lieuxPrestation.transfertPose.texte}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Note : anciennes plaques bleues uniquement */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-start gap-4 p-4 sm:p-6 rounded-xl border-2 border-amber-200 bg-amber-50/80">
                    <AlertCircle className="h-6 w-6 sm:h-7 sm:w-7 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sicta-grey-dark font-semibold leading-relaxed text-sm sm:text-base">
                      {data.lieuxPrestation.notePlaquesBleues}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Bénéfices pour le Client */}
        <section className="py-24 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Bénéfices pour le Client
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Pourquoi choisir notre service d'immatriculation ?
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.beneficesClient.map((benefice, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-6 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 h-full group">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-sicta-grey-light leading-relaxed font-medium flex-1">
                          {benefice.benefice}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conditions / Prérequis */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Conditions / Prérequis
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Ce dont vous avez besoin pour bénéficier du service
                </p>
              </motion.div>

              <Card className="p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border-2 border-primary/10 bg-gradient-to-br from-white to-sicta-grey/5">
                <div className="space-y-4">
                  {data.conditions.map((condition, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <div className="h-10 w-10 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sicta-grey-dark leading-relaxed text-lg font-medium flex-1">
                        {condition.condition}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-sicta-grey/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Tarifs
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Tarifs transparents pour nos services d'immatriculation
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.tarifs.map((tarif, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                  >
                    <Card className="p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5 group">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-xl">
                        <DollarSign className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-sicta-grey-dark mb-3 sm:mb-4">
                        {tarif.service}
                      </h3>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 sm:mb-3">
                        {tarif.prix}
                      </div>
                      {tarif.description && (
                        <p className="text-xs sm:text-sm text-sicta-grey-light italic">
                          {tarif.description}
                        </p>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Grille Tarifs Vignettes Auto - Moto 2025 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-16"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-sicta-grey-dark mb-2 text-center">
                  {tarifsVignette2025.titre}
                </h3>
                <p className="text-sicta-grey-light text-center text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                  Grille officielle SICTA 2025 — montants en FCFA. Les vignettes Auto - Moto varient selon la cylindrée (motos) ou la puissance fiscale (auto) et l’âge du véhicule.
                </p>

                <div className="overflow-x-auto rounded-xl border-2 border-primary/10 bg-white shadow-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/10 hover:bg-primary/15">
                        <TableHead className="font-bold text-sicta-grey-dark whitespace-nowrap">
                          MOTOS
                        </TableHead>
                        {tarifsVignette2025.annees.map((a, i) => (
                          <TableHead key={i} className="text-center font-semibold text-sicta-grey-dark whitespace-nowrap">
                            {a}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tarifsVignette2025.moto.map((row, i) => (
                        <TableRow key={i} className="hover:bg-sicta-grey/5">
                          <TableCell className="font-medium text-sicta-grey-dark">
                            {row.libelle}
                          </TableCell>
                          {row.prix.map((p, j) => (
                            <TableCell key={j} className="text-center font-mono font-semibold text-primary">
                              {p.toLocaleString("fr-FR")}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="overflow-x-auto rounded-xl border-2 border-primary/10 bg-white shadow-lg mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/10 hover:bg-primary/15">
                        <TableHead className="font-bold text-sicta-grey-dark whitespace-nowrap">
                          AUTO
                        </TableHead>
                        {tarifsVignette2025.annees.map((a, i) => (
                          <TableHead key={i} className="text-center font-semibold text-sicta-grey-dark whitespace-nowrap">
                            {a}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tarifsVignette2025.auto.map((row, i) => (
                        <TableRow key={i} className="hover:bg-sicta-grey/5">
                          <TableCell className="font-medium text-sicta-grey-dark text-sm sm:text-base">
                            {row.libelle}
                          </TableCell>
                          {row.prix.map((p, j) => (
                            <TableCell key={j} className="text-center font-mono font-semibold text-primary text-sm sm:text-base">
                              {p.toLocaleString("fr-FR")}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>

              {/* Grille Tarifs Identification (document officiel – V.N. / V.O.) */}
              {"tarifsIdentificationDetail" in data && data.tarifsIdentificationDetail?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-16 space-y-6"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-sicta-grey-dark mb-2 text-center">
                    Tarifs identification des véhicules
                  </h3>
                  <p className="text-sicta-grey-light text-center text-sm sm:text-base mb-6 max-w-2xl mx-auto">
                    Grille officielle — Identification V.N. (neufs) et V.O. (d’occasion), montants en FCFA.
                  </p>
                  {data.tarifsIdentificationDetail.map((section, idx) => (
                    <Card key={idx} className="overflow-hidden border-2 border-primary/10">
                      <div className="bg-gradient-to-r from-primary/10 to-sicta-orange-light/10 px-4 py-3 sm:px-6">
                        <h4 className="font-bold text-sicta-grey-dark text-base sm:text-lg">
                          {section.titre}
                        </h4>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-sicta-grey/5">
                            <TableHead className="font-semibold text-sicta-grey-dark">Libellé</TableHead>
                            <TableHead className="font-semibold text-sicta-grey-dark w-32 text-right">Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {section.items.map((item, i) => (
                            <TableRow key={i} className="hover:bg-primary/5">
                              <TableCell className="text-sicta-grey-light text-sm sm:text-base">
                                {item.libelle}
                              </TableCell>
                              <TableCell className="text-right font-semibold text-primary whitespace-nowrap">
                                {item.prix}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-sicta-grey via-sicta-grey-dark to-sicta-grey text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Prêt pour votre immatriculation ?
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                Une plaque sécurisée, une identité légale. Réservez votre créneau et bénéficiez d'un service complet d'immatriculation
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {/* Bouton RDV temporairement désactivé */}
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sicta-grey text-lg px-10 py-7">
                  <MapPin className="h-6 w-6 mr-3" />
                  Trouvez une station
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Immatriculation;
