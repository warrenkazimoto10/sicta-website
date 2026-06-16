import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Calendar, 
  MapPin, 
  CheckCircle,
  ArrowRight,
  Target,
  Car,
  FileText,
  DollarSign,
  Clock,
  Award,
  Users,
  Zap,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { visiteTechniqueData } from "@/data/services/visiteTechnique";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ControleTechnique = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const data = visiteTechniqueData;

  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section avec image du flyer - Amélioré */}
        <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[380px] sm:min-h-[480px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={data.imageHero} 
              alt={data.titre}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
            {/* Effet de lumière */}
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
          
          {/* Scroll indicator */}
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

        {/* Description du Produit - Amélioré */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
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

        {/* Objectifs - Amélioré */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Pourquoi faire sa visite technique ?
                </h2>
                <p className="text-xl text-sicta-grey-light max-w-2xl mx-auto">
                  Trois objectifs essentiels pour garantir votre sécurité et celle des autres
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {data.objectifs.map((objectif, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                  >
                    <Card className="p-8 h-full hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-20 w-20 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <Target className="h-10 w-10 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-primary mb-2">0{index + 1}</div>
                        <p className="text-sicta-grey-light leading-relaxed text-base">
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

        {/* Véhicules Concernés - Amélioré */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-sicta-grey/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Véhicules Concernés
                </h2>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.vehiculesConcernes.map((vehicule, index) => (
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
                          <Car className="h-8 w-8 text-primary" />
                        </div>
                        <span className="text-sicta-grey-dark font-semibold leading-relaxed">
                          {vehicule}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Périodicité - Amélioré */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Périodicité des Contrôles
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Respectez les délais réglementaires selon votre type de véhicule
                </p>
              </motion.div>
              
              <Card className="overflow-hidden shadow-2xl border-2 border-primary/10">
                <div className="bg-gradient-to-r from-primary to-sicta-orange-light p-6">
                  <h3 className="text-2xl font-bold text-white text-center">
                    Calendrier des Visites Techniques
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-sicta-grey/5 hover:bg-sicta-grey/10">
                      <TableHead className="font-bold text-sicta-grey-dark text-lg">Type de Véhicule</TableHead>
                      <TableHead className="font-bold text-sicta-grey-dark text-lg text-right">Périodicité</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.periodicite.map((item, index) => (
                      <TableRow key={index} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="text-sicta-grey-light text-base py-6">
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary" />
                            {item.typeVehicule}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge className="bg-primary text-white text-base px-4 py-2">
                            {item.periodicite}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </section>

        {/* Points de Contrôle Essentiels - Amélioré */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Points de Contrôle Essentiels
                </h2>
                <p className="text-xl text-sicta-grey-light max-w-2xl mx-auto">
                  Nos techniciens certifiés vérifient minutieusement chaque élément de sécurité
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.pointsControle.map((point, index) => (
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
                          <CheckCircle2 className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sicta-grey-light leading-relaxed font-medium flex-1">
                          {point}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Documents Requis - Amélioré */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Documents Requis
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Assurez-vous d'avoir tous les documents nécessaires avant votre visite
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {data.documentsRequis.map((document, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-6 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 group">
                      <div className="flex items-center space-x-4">
                        <div className="h-14 w-14 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                          <FileText className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sicta-grey-dark font-semibold text-lg">
                            {document}
                          </span>
                        </div>
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Résultats Possibles - Amélioré */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-sicta-grey/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Résultats Possibles
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Deux issues possibles selon l'état de votre véhicule
                </p>
              </motion.div>
              
              <Card className="overflow-hidden shadow-2xl border-2 border-primary/10">
                <div className="bg-gradient-to-r from-primary to-sicta-orange-light p-6">
                  <h3 className="text-2xl font-bold text-white text-center">
                    Types de Résultats
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-sicta-grey/5 hover:bg-sicta-grey/10">
                      <TableHead className="font-bold text-sicta-grey-dark text-lg">Résultats</TableHead>
                      <TableHead className="font-bold text-sicta-grey-dark text-lg">Signification</TableHead>
                      <TableHead className="font-bold text-sicta-grey-dark text-lg">Document Délivré</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.resultatsPossibles.map((resultat, index) => (
                      <TableRow key={index} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-bold text-sicta-grey-dark text-base py-6">
                          <div className="flex items-center gap-3">
                            {index === 0 ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : (
                              <AlertCircle className="h-6 w-6 text-orange-600" />
                            )}
                            {resultat.resultat}
                          </div>
                        </TableCell>
                        <TableCell className="text-sicta-grey-light text-base">
                          {resultat.signification}
                        </TableCell>
                        <TableCell className="text-sicta-grey-light text-base">
                          <Badge variant="outline" className="border-primary text-primary">
                            {resultat.documentDelivre}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </section>

        {/* Réseau SICTA - Amélioré */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Réseau SICTA
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Un réseau étendu à travers toute la Côte d'Ivoire
                </p>
              </motion.div>
              
              <Card className="p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border-2 border-primary/10 bg-gradient-to-br from-white to-sicta-grey/5">
                <div className="space-y-6">
                  {data.reseauSicta.map((location, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <div className="h-10 w-10 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sicta-grey-dark leading-relaxed text-lg font-medium flex-1">
                        {location}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Tarifs - Amélioré */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-sicta-grey/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Tarifs Visite Technique
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Tarifs transparents et compétitifs selon le type de véhicule
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.tarifs.map((tarif, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="p-6 text-center hover:shadow-2xl transition-all duration-500 border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5 group">
                      <div className="h-14 w-14 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl">
                        <DollarSign className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-base font-bold text-sicta-grey-dark mb-2">
                        {tarif.type}
                      </h3>
                      <div className="text-xl sm:text-2xl font-bold text-primary mb-2">
                        {tarif.prix}
                      </div>
                      {tarif.description && (
                        <Badge variant="outline" className="border-primary text-primary text-xs">
                          {tarif.description}
                        </Badge>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Grille tarifs détaillés (document officiel 1- CONTRÔLE TECHNIQUE AUTOMOBILE) */}
              {"tarifsDetail" in data && data.tarifsDetail?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-16 space-y-8"
                >
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-sicta-grey-dark mb-2">
                      Tarifs détaillés (document officiel)
                    </h3>
                    <p className="text-sicta-grey-light text-sm sm:text-base max-w-2xl mx-auto">
                      Grille complète des tarifs du contrôle technique automobile — montants en FCFA.
                    </p>
                  </div>
                  {data.tarifsDetail.map((section, idx) => (
                    <Card key={idx} className="overflow-hidden border-2 border-primary/10">
                      <div className="bg-gradient-to-r from-primary/10 to-sicta-orange-light/10 px-4 py-3 sm:px-6">
                        <h4 className="font-bold text-sicta-grey-dark text-base sm:text-lg">
                          {section.titre}
                        </h4>
                        {section.periodicite && (
                          <p className="text-sm text-sicta-grey-light mt-0.5">
                            Périodicité : {section.periodicite}
                          </p>
                        )}
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-sicta-grey/5">
                            <TableHead className="font-semibold text-sicta-grey-dark">Libellé</TableHead>
                            <TableHead className="font-semibold text-sicta-grey-dark w-20 text-center">Code</TableHead>
                            <TableHead className="font-semibold text-sicta-grey-dark w-28 text-right">Prix</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {section.items.map((item, i) => (
                            <TableRow key={i} className="hover:bg-primary/5">
                              <TableCell className="text-sicta-grey-light text-sm sm:text-base">
                                {item.libelle}
                              </TableCell>
                              <TableCell className="text-center">
                                {item.code ? (
                                  <Badge variant="secondary" className="font-mono text-xs">
                                    {item.code}
                                  </Badge>
                                ) : (
                                  "—"
                                )}
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

        {/* CTA Section - Amélioré */}
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
                {t("controleTechnique.readyTitle")}
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                {t("controleTechnique.readySubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="btn-hero text-lg px-10 py-7" onClick={() => navigate("/reservation")}>
                  <Calendar className="h-6 w-6 mr-3" />
                  {t("controleTechnique.bookAppointment")}
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sicta-grey text-lg px-10 py-7" onClick={() => navigate("/reseau")}>
                  <MapPin className="h-6 w-6 mr-3" />
                  {t("controleTechnique.findAgency")}
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

export default ControleTechnique;
