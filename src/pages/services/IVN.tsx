import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
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
  Package,
  Phone,
  Mail,
  DollarSign
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ivnData } from "@/data/services/ivn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const IVN = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const data = ivnData;

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
                  {data.titreCourt}
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
                  Trois objectifs pour améliorer votre efficacité opérationnelle
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

        {/* Avantages pour le Client */}
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
                  Avantages pour le Client
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Pourquoi choisir notre service IVN ?
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.avantagesClient.map((avantage, index) => (
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
                          {avantage.avantage}
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
                  Public ou Véhicules Concernés
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {data.publicConcernes.map((publicItem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-8 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 group h-full">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <Building className="h-10 w-10 text-primary" />
                        </div>
                        <span className="text-sicta-grey-dark font-semibold text-lg leading-relaxed">
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

        {/* Livrables */}
        <section className="py-24 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
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
                  Livrables
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Documents délivrés après l'identification
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {data.livrables.map((livrable, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-8 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30 group text-center">
                      <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        <Package className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-sicta-grey-dark">
                        {livrable}
                      </h3>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Étapes du Processus */}
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
                  Résultats Possibles / Étapes du Processus
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Un processus en 5 étapes pour une identification rapide et sécurisée
                </p>
              </motion.div>

              <Card className="overflow-hidden shadow-2xl border-2 border-primary/10">
                <div className="bg-gradient-to-r from-primary to-sicta-orange-light p-6">
                  <h3 className="text-2xl font-bold text-white text-center">
                    Étapes du Processus IVN
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-sicta-grey/5 hover:bg-sicta-grey/10">
                      <TableHead className="font-bold text-sicta-grey-dark text-lg">Étape</TableHead>
                      <TableHead className="font-bold text-sicta-grey-dark text-lg">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.etapesProcessus.map((etape, index) => (
                      <TableRow key={index} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-bold text-sicta-grey-dark text-base py-6">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            {etape.etape}
                          </div>
                        </TableCell>
                        <TableCell className="text-sicta-grey-light text-base">
                          {etape.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </section>

        {/* Documents Requis */}
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
                  Documents Requis
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Ce dont vous avez besoin pour bénéficier du service
                </p>
              </motion.div>

              <Card className="p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border-2 border-primary/10 bg-gradient-to-br from-white to-sicta-grey/5">
                <div className="space-y-4">
                  {data.documentsRequis.map((document, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 transition-colors"
                    >
                      <div className="h-10 w-10 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sicta-grey-dark leading-relaxed text-lg font-medium flex-1">
                        {document}
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
                  Tarifs transparents pour l'identification des véhicules neufs
                </p>
              </motion.div>

              <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
                {data.tarifs.map((tarif, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                  >
                    <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5 group">
                      <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl">
                        <DollarSign className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">
                        {tarif.service}
                      </h3>
                      <div className="text-3xl lg:text-4xl font-bold text-primary mb-3">
                        {tarif.prix}
                      </div>
                      {tarif.description && (
                        <p className="text-sm text-sicta-grey-light italic">
                          {tarif.description}
                        </p>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
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
                Prêt à bénéficier du service IVN ?
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                Demandez un devis et bénéficiez d'une identification rapide directement sur votre site
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="btn-hero text-lg px-10 py-7">
                  <Calendar className="h-6 w-6 mr-3" />
                  Demander un devis
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sicta-grey text-lg px-10 py-7">
                  <Phone className="h-6 w-6 mr-3" />
                  Nous contacter
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

export default IVN;



