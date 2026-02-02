import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Calendar, 
  MapPin, 
  CheckCircle,
  ArrowRight,
  Target,
  Users,
  FileText,
  Wrench,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  Building
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { stationMobileData } from "@/data/services/stationMobile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const StationMobile = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const data = stationMobileData;

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
                <Badge className="bg-primary/30 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-white/20 hover:bg-primary/40 transition-colors">
                  <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  Service SICTA
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                  {data.titre}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed opacity-95 max-w-3xl mx-auto mb-6 sm:mb-8">
                  {data.descriptionCourte}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button size="lg" className="btn-hero text-base sm:text-lg px-5 py-4 sm:px-8 sm:py-6 w-full sm:w-auto">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Demander un devis
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sicta-grey text-base sm:text-lg px-5 py-4 sm:px-8 sm:py-6 w-full sm:w-auto">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Nous contacter
                  </Button>
                </div>
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
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-8">
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
                <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                  Notre Mission
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Objectifs
                </h2>
              </motion.div>
              
              <Card className="p-4 sm:p-6 md:p-8 lg:p-12 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20">
                <div className="flex items-start space-x-6">
                  <div className="h-20 w-20 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-sicta-grey-light leading-relaxed text-lg lg:text-xl flex-1">
                    {data.objectifs[0]}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Public Concerné */}
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
                <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                  Public Cible
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Public ou Véhicules Concernés
                </h2>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Avantages */}
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
                <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                  Avantages
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Résultats Possibles
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Les avantages de notre station mobile
                </p>
              </motion.div>
              
              <Card className="overflow-hidden shadow-2xl border-2 border-primary/10">
                <div className="bg-gradient-to-r from-primary to-sicta-orange-light p-6">
                  <h3 className="text-2xl font-bold text-white text-center">
                    Avantages de la Station Mobile
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-sicta-grey/5 hover:bg-sicta-grey/10">
                      <TableHead className="font-bold text-sicta-grey-dark text-lg">Avantage</TableHead>
                      <TableHead className="font-bold text-sicta-grey-dark text-lg">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.avantages.map((avantage, index) => (
                      <TableRow key={index} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-bold text-sicta-grey-dark text-base py-6">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-6 w-6 text-primary" />
                            {avantage.avantage}
                          </div>
                        </TableCell>
                        <TableCell className="text-sicta-grey-light text-base">
                          {avantage.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </section>

        {/* Processus de Souscription */}
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
                <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                  Processus
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Processus de Souscription
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Un processus simple en 6 étapes
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.processusSouscription.map((etape, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="p-6 h-full hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                          <span className="text-2xl font-bold text-white">{index + 1}</span>
                        </div>
                        <h3 className="text-lg font-bold text-sicta-grey-dark mb-3">
                          {etape.etape.split('. ')[1] || etape.etape}
                        </h3>
                        <p className="text-sicta-grey-light leading-relaxed text-sm">
                          {etape.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Équipements */}
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
                <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                  Équipements
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Composantes / Équipements
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Une station mobile entièrement équipée
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.equipements.map((equipement, index) => (
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
                          <Wrench className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sicta-grey-dark font-semibold mb-2">
                            {equipement.nom}
                          </h3>
                          {equipement.description && (
                            <p className="text-sicta-grey-light text-sm leading-relaxed">
                              {equipement.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
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
                <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                  Contact
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Contactez-nous
                </h2>
                <p className="text-xl text-sicta-grey-light">
                  Pour demander la mise à disposition de la station mobile
                </p>
              </motion.div>
              
              <Card className="p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border-2 border-primary/10 bg-gradient-to-br from-white to-sicta-grey/5">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sicta-grey-dark mb-2">Adresse</h3>
                      <p className="text-sicta-grey-light text-sm">{data.contact.adresse}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sicta-grey-dark mb-2">Téléphone</h3>
                      <p className="text-sicta-grey-light text-sm">{data.contact.telephone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sicta-grey-dark mb-2">Email</h3>
                      <p className="text-sicta-grey-light text-sm">{data.contact.email}</p>
                    </div>
                  </div>
                </div>
              </Card>
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
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Prêt à faire venir la station mobile ?
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                Demandez un devis et bénéficiez d'un contrôle technique directement sur votre site
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

export default StationMobile;



