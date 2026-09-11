import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  User, 
  Lock, 
  FileText, 
  Calendar,
  History,
  Settings,
  ArrowRight,
  LogIn,
  Eye,
  Download,
  CheckCircle,
  Car,
  Bell,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Clock,
  MapPin,
  Mail,
  Phone,
  Shield,
  TrendingUp,
  FileCheck,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Vehicle {
  id: string;
  immatriculation: string;
  marque: string;
  modele: string;
  type: string;
  dernierControle: string;
  prochainControle: string;
  statut: "valide" | "expire" | "bientot-du";
  joursRestants: number;
}

interface Document {
  id: string;
  nom: string;
  type: string;
  vehicule: string;
  date: string;
  statut: "valide" | "expire" | "disponible";
  taille: string;
}

interface Appointment {
  id: string;
  date: string;
  heure: string;
  station: string;
  service: string;
  vehicule: string;
  statut: "confirme" | "en-attente" | "annule";
}

interface Notification {
  id: string;
  type: "alerte" | "document" | "rapport" | "rappel";
  titre: string;
  message: string;
  date: string;
  lu: boolean;
}

const EspaceClient = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "alerte",
      titre: "Contrôle bientôt dû",
      message: "Le contrôle technique de votre véhicule ABC-123-CD expire dans 15 jours",
      date: "2025-01-20",
      lu: false
    },
    {
      id: "2",
      type: "document",
      titre: "Nouveau document disponible",
      message: "Votre certificat de contrôle technique du 15/01/2025 est disponible",
      date: "2025-01-16",
      lu: false
    },
    {
      id: "3",
      type: "rappel",
      titre: "Rappel de rendez-vous",
      message: "Vous avez un rendez-vous le 25/02/2025 à 14:30",
      date: "2025-01-18",
      lu: true
    }
  ]);

  // Données de démonstration
  const vehicles: Vehicle[] = [
    {
      id: "1",
      immatriculation: "ABC-123-CD",
      marque: "Toyota",
      modele: "Corolla",
      type: "Particulier",
      dernierControle: "2023-01-15",
      prochainControle: "2025-01-15",
      statut: "bientot-du",
      joursRestants: 15
    },
    {
      id: "2",
      immatriculation: "XYZ-789-EF",
      marque: "Peugeot",
      modele: "208",
      type: "Particulier",
      dernierControle: "2024-07-20",
      prochainControle: "2026-07-20",
      statut: "valide",
      joursRestants: 545
    },
    {
      id: "3",
      immatriculation: "DEF-456-GH",
      marque: "Renault",
      modele: "Clio",
      type: "Particulier",
      dernierControle: "2022-03-10",
      prochainControle: "2024-03-10",
      statut: "expire",
      joursRestants: -285
    }
  ];

  const documents: Document[] = [
    {
      id: "1",
      nom: "Certificat Contrôle Technique",
      type: "PDF",
      vehicule: "ABC-123-CD",
      date: "2025-01-15",
      statut: "valide",
      taille: "2.3 MB"
    },
    {
      id: "2",
      nom: "Rapport de Contrôle",
      type: "PDF",
      vehicule: "ABC-123-CD",
      date: "2025-01-15",
      statut: "disponible",
      taille: "1.8 MB"
    },
    {
      id: "3",
      nom: "Certificat Contrôle Technique",
      type: "PDF",
      vehicule: "XYZ-789-EF",
      date: "2024-07-20",
      statut: "valide",
      taille: "2.1 MB"
    },
    {
      id: "4",
      nom: "Certificat Contrôle Technique",
      type: "PDF",
      vehicule: "DEF-456-GH",
      date: "2022-03-10",
      statut: "expire",
      taille: "2.0 MB"
    }
  ];

  const appointments: Appointment[] = [
    {
      id: "1",
      date: "2025-02-25",
      heure: "14:30",
      station: "SICTA Abidjan Plateau",
      service: "Contrôle Technique",
      vehicule: "ABC-123-CD",
      statut: "confirme"
    },
    {
      id: "2",
      date: "2025-03-10",
      heure: "09:15",
      station: "SICTA Cocody",
      service: "Pré-visite",
      vehicule: "XYZ-789-EF",
      statut: "en-attente"
    }
  ];

  const unreadNotifications = notifications.filter(n => !n.lu).length;
  const vehiclesExpired = vehicles.filter(v => v.statut === "expire").length;
  const vehiclesDueSoon = vehicles.filter(v => v.statut === "bientot-du").length;
  const nextControl = vehicles
    .filter(v => v.statut !== "expire")
    .sort((a, b) => a.joursRestants - b.joursRestants)[0];

  if (isLoggedIn) {
    return (
      <PageTransition>
        <div className="w-full">
          {/* Header avec notifications */}
          <section className="bg-gradient-to-br from-primary/20 via-background to-sicta-orange-light/10 py-8 border-b border-sicta-grey/10">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-sicta-grey-dark mb-1">
                    Espace Client
                  </h1>
                  <p className="text-sicta-grey-light">
                    Bienvenue dans votre espace personnel SICTA
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {/* Notifications */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="relative">
                        <Bell className="h-5 w-5" />
                        {unreadNotifications > 0 && (
                          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                            {unreadNotifications}
                          </span>
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Notifications</DialogTitle>
                        <DialogDescription>
                          {unreadNotifications} notification{unreadNotifications > 1 ? "s" : ""} non lue{unreadNotifications > 1 ? "s" : ""}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-3 mt-4">
                        {notifications.map((notif) => (
                          <Card 
                            key={notif.id} 
                            className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                              !notif.lu ? "bg-primary/5 border-primary/20" : ""
                            }`}
                            onClick={() => {
                              setNotifications(notifications.map(n => 
                                n.id === notif.id ? { ...n, lu: true } : n
                              ));
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notif.type === "alerte" ? "bg-red-100 text-red-600" :
                                notif.type === "document" ? "bg-blue-100 text-blue-600" :
                                "bg-green-100 text-green-600"
                              }`}>
                                <Bell className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className="font-semibold text-sicta-grey-dark">{notif.titre}</h4>
                                  {!notif.lu && (
                                    <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                                  )}
                                </div>
                                <p className="text-sm text-sicta-grey-light mb-2">{notif.message}</p>
                                <p className="text-xs text-sicta-grey-light">{notif.date}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    variant="outline" 
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Déconnexion
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Dashboard Principal */}
          <section ref={sectionRef} className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="vehicules">Mes Véhicules</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="rendez-vous">Rendez-vous</TabsTrigger>
                  <TabsTrigger value="historique">Historique</TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-8">
                  {/* Statistiques Rapides */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center">
                          <Car className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-primary/10 text-primary">{vehicles.length}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-sicta-grey-dark mb-1">Véhicules</h3>
                      <p className="text-sicta-grey-light text-sm">Véhicules enregistrés</p>
                    </Card>

                    <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-red-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                          <AlertCircle className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-red-500 text-white">{vehiclesExpired}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-sicta-grey-dark mb-1">En Retard</h3>
                      <p className="text-sicta-grey-light text-sm">Contrôles expirés</p>
                    </Card>

                    <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-orange-500 text-white">{vehiclesDueSoon}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-sicta-grey-dark mb-1">Bientôt Dû</h3>
                      <p className="text-sicta-grey-light text-sm">Contrôles à venir</p>
                    </Card>

                    <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-green-500 text-white">{documents.length}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-sicta-grey-dark mb-1">Documents</h3>
                      <p className="text-sicta-grey-light text-sm">Documents disponibles</p>
                    </Card>
                  </div>

                  {/* Prochain Contrôle */}
                  {nextControl && (
                    <Card className="p-8 bg-gradient-to-br from-primary/10 via-white to-sicta-orange-light/10 border-2 border-primary/20">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <Badge className="bg-primary text-white mb-3">
                            <Clock className="h-3 w-3 mr-1" />
                            Prochain Contrôle
                          </Badge>
                          <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">
                            {nextControl.immatriculation}
                          </h2>
                          <p className="text-sicta-grey-light">
                            {nextControl.marque} {nextControl.modele}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-4xl font-bold mb-2 ${
                            nextControl.statut === "expire" ? "text-red-600" :
                            nextControl.statut === "bientot-du" ? "text-orange-600" :
                            "text-green-600"
                          }`}>
                            {Math.abs(nextControl.joursRestants)}
                          </div>
                          <p className="text-sicta-grey-light">
                            {nextControl.statut === "expire" ? "jours de retard" : "jours restants"}
                          </p>
                          <p className="text-sm text-sicta-grey-light mt-1">
                            {new Date(nextControl.prochainControle).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button className="btn-hero">
                          <Calendar className="h-4 w-4 mr-2" />
                          Réserver un contrôle
                        </Button>
                        <Button variant="outline" className="border-primary text-primary">
                          <Bell className="h-4 w-4 mr-2" />
                          Activer le rappel
                        </Button>
                      </div>
                    </Card>
                  )}

                  {/* Actions Rapides */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <Link to="/simulateur-visite">
                      <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20 group cursor-pointer">
                        <div className="h-14 w-14 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <TrendingUp className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                          Simulateur de Visite
                        </h3>
                        <p className="text-sicta-grey-light text-sm">
                          Calculez la date de votre prochain contrôle
                        </p>
                      </Card>
                    </Link>

                    <Link to="/reservation">
                      <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20 group cursor-pointer">
                        <div className="h-14 w-14 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Calendar className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                          Nouveau Rendez-vous
                        </h3>
                        <p className="text-sicta-grey-light text-sm">
                          Réservez votre créneau en ligne
                        </p>
                      </Card>
                    </Link>

                    <Link to="/reseau">
                      <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20 group cursor-pointer">
                        <div className="h-14 w-14 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <MapPin className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                          Trouvez une Station
                        </h3>
                        <p className="text-sicta-grey-light text-sm">
                          Localisez la station la plus proche
                        </p>
                      </Card>
                    </Link>
                  </div>
                </TabsContent>

                {/* Mes Véhicules Tab */}
                <TabsContent value="vehicules" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">Mes Véhicules</h2>
                      <p className="text-sicta-grey-light">Gérez votre flotte de véhicules</p>
                    </div>
                    <Dialog open={showAddVehicle} onOpenChange={setShowAddVehicle}>
                      <DialogTrigger asChild>
                        <Button className="btn-hero">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter un véhicule
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Ajouter un Véhicule</DialogTitle>
                          <DialogDescription>
                            Enregistrez un nouveau véhicule dans votre espace
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Immatriculation *</Label>
                              <Input placeholder="ABC-123-CD" />
                            </div>
                            <div>
                              <Label>Marque *</Label>
                              <Input placeholder="Toyota" />
                            </div>
                            <div>
                              <Label>Modèle *</Label>
                              <Input placeholder="Corolla" />
                            </div>
                            <div>
                              <Label>Type de véhicule *</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="particulier">Particulier</SelectItem>
                                  <SelectItem value="transport">Transport</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Date du dernier contrôle *</Label>
                              <Input type="date" />
                            </div>
                            <div>
                              <Label>Numéro de série</Label>
                              <Input placeholder="Optionnel" />
                            </div>
                          </div>
                          <div className="flex gap-4 justify-end pt-4">
                            <Button variant="outline" onClick={() => setShowAddVehicle(false)}>
                              Annuler
                            </Button>
                            <Button className="btn-hero">
                              Enregistrer
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Recherche et Filtres */}
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sicta-grey-light" />
                      <Input
                        placeholder="Rechercher un véhicule..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filtrer par statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        <SelectItem value="valide">Valide</SelectItem>
                        <SelectItem value="bientot-du">Bientôt dû</SelectItem>
                        <SelectItem value="expire">Expiré</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tableau des Véhicules */}
                  <Card className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Immatriculation</TableHead>
                          <TableHead>Véhicule</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Dernier Contrôle</TableHead>
                          <TableHead>Prochain Contrôle</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehicles
                          .filter(v => 
                            searchQuery === "" || 
                            v.immatriculation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            v.marque.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((vehicle) => (
                            <TableRow key={vehicle.id}>
                              <TableCell className="font-semibold">{vehicle.immatriculation}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{vehicle.marque} {vehicle.modele}</div>
                                </div>
                              </TableCell>
                              <TableCell>{vehicle.type}</TableCell>
                              <TableCell>
                                {new Date(vehicle.dernierControle).toLocaleDateString("fr-FR")}
                              </TableCell>
                              <TableCell>
                                {new Date(vehicle.prochainControle).toLocaleDateString("fr-FR")}
                              </TableCell>
                              <TableCell>
                                <Badge className={
                                  vehicle.statut === "valide" ? "bg-green-500 text-white" :
                                  vehicle.statut === "bientot-du" ? "bg-orange-500 text-white" :
                                  "bg-red-500 text-white"
                                }>
                                  {vehicle.statut === "valide" ? "Valide" :
                                   vehicle.statut === "bientot-du" ? "Bientôt dû" :
                                   "Expiré"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">Mes Documents</h2>
                      <p className="text-sicta-grey-light">Téléchargez vos certificats et rapports</p>
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Tout exporter
                    </Button>
                  </div>

                  {/* Filtres */}
                  <div className="flex gap-4">
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filtrer par véhicule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les véhicules</SelectItem>
                        {vehicles.map(v => (
                          <SelectItem key={v.id} value={v.id}>{v.immatriculation}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filtrer par type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="certificat">Certificat</SelectItem>
                        <SelectItem value="rapport">Rapport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Liste des Documents */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc) => (
                      <Card key={doc.id} className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <Badge className={
                            doc.statut === "valide" ? "bg-green-500 text-white" :
                            doc.statut === "expire" ? "bg-red-500 text-white" :
                            "bg-blue-500 text-white"
                          }>
                            {doc.statut}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-sicta-grey-dark mb-2">
                          {doc.nom}
                        </h3>
                        <div className="space-y-2 text-sm text-sicta-grey-light mb-4">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            <span>{doc.vehicule}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(doc.date).toLocaleDateString("fr-FR")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>{doc.type} • {doc.taille}</span>
                          </div>
                        </div>
                        <Button className="w-full btn-hero">
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Rendez-vous Tab */}
                <TabsContent value="rendez-vous" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">Mes Rendez-vous</h2>
                      <p className="text-sicta-grey-light">Gérez vos rendez-vous et consultez votre historique</p>
                    </div>
                    <Link to="/reservation">
                      <Button className="btn-hero">
                        <Plus className="h-4 w-4 mr-2" />
                        Nouveau rendez-vous
                      </Button>
                    </Link>
                  </div>

                  {/* Rendez-vous à venir */}
                  <div>
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">À Venir</h3>
                    <div className="space-y-4">
                      {appointments
                        .filter(a => new Date(a.date) >= new Date())
                        .map((appointment) => (
                          <Card key={appointment.id} className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <Badge className={
                                    appointment.statut === "confirme" ? "bg-green-500 text-white" :
                                    "bg-orange-500 text-white"
                                  }>
                                    {appointment.statut === "confirme" ? "Confirmé" : "En attente"}
                                  </Badge>
                                  <h4 className="text-lg font-bold text-sicta-grey-dark">
                                    {appointment.service}
                                  </h4>
                                </div>
                                <div className="space-y-2 text-sicta-grey-light">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {new Date(appointment.date).toLocaleDateString("fr-FR", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                      })} à {appointment.heure}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{appointment.station}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Car className="h-4 w-4" />
                                    <span>{appointment.vehicule}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Modifier
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                  <X className="h-4 w-4 mr-1" />
                                  Annuler
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>

                  {/* Historique */}
                  <div>
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">Historique</h3>
                    <Card className="overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Station</TableHead>
                            <TableHead>Véhicule</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {appointments
                            .filter(a => new Date(a.date) < new Date())
                            .map((appointment) => (
                              <TableRow key={appointment.id}>
                                <TableCell>
                                  {new Date(appointment.date).toLocaleDateString("fr-FR")} {appointment.heure}
                                </TableCell>
                                <TableCell>{appointment.service}</TableCell>
                                <TableCell>{appointment.station}</TableCell>
                                <TableCell>{appointment.vehicule}</TableCell>
                                <TableCell>
                                  <Badge className="bg-sicta-grey text-white">Terminé</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </div>
                </TabsContent>

                {/* Historique Tab */}
                <TabsContent value="historique" className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">Historique Complet</h2>
                    <p className="text-sicta-grey-light">Consultez l'historique de tous vos contrôles</p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6">
                    {vehicles.map((vehicle) => (
                      <Card key={vehicle.id} className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center">
                            <Car className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-sicta-grey-dark">
                              {vehicle.immatriculation}
                            </h3>
                            <p className="text-sicta-grey-light">
                              {vehicle.marque} {vehicle.modele} • {vehicle.type}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-sicta-grey/5 rounded-lg">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            <div className="flex-1">
                              <p className="font-semibold text-sicta-grey-dark">Dernier Contrôle</p>
                              <p className="text-sm text-sicta-grey-light">
                                {new Date(vehicle.dernierControle).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric"
                                })}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Documents
                            </Button>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                            <div className="h-2 w-2 bg-primary rounded-full" />
                            <div className="flex-1">
                              <p className="font-semibold text-sicta-grey-dark">Prochain Contrôle</p>
                              <p className="text-sm text-sicta-grey-light">
                                {new Date(vehicle.prochainControle).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric"
                                })}
                              </p>
                            </div>
                            <Badge className={
                              vehicle.statut === "valide" ? "bg-green-500 text-white" :
                              vehicle.statut === "bientot-du" ? "bg-orange-500 text-white" :
                              "bg-red-500 text-white"
                            }>
                              {Math.abs(vehicle.joursRestants)} {vehicle.statut === "expire" ? "jours de retard" : "jours"}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </div>
      </PageTransition>
    );
  }

  // Page de connexion
  return (
    <PageTransition>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-sicta-orange-light/10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="bg-primary/10 text-primary px-6 py-2 text-sm font-medium border border-primary/20 mb-6">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Espace Client
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-sicta-grey-dark">Espace</span>{" "}
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-sicta-orange-light">
                    Client
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-sicta-grey-light leading-relaxed max-w-3xl mx-auto">
                  Gérez vos véhicules, consultez vos documents, réservez vos rendez-vous et recevez des alertes automatiques
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Login Form */}
        <section ref={sectionRef} className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card className="p-8 lg:p-12 shadow-2xl border-2 border-primary/10">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">
                    Connexion
                  </h2>
                  <p className="text-sicta-grey-light">
                    Connectez-vous à votre espace client
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-sicta-grey-dark mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-semibold text-sicta-grey-dark mb-2 block">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Votre mot de passe"
                        className="h-12 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sicta-grey-light hover:text-sicta-grey-dark transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-sicta-grey/20" />
                      <span className="text-sm text-sicta-grey-light">Se souvenir de moi</span>
                    </label>
                    <a href="#" className="text-sm text-primary hover:underline font-medium">
                      Mot de passe oublié ?
                    </a>
                  </div>

                  <Button 
                    className="w-full btn-hero h-12 text-lg"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Se connecter
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-sicta-grey/20 text-center">
                  <p className="text-sm text-sicta-grey-light mb-4">
                    Pas encore de compte ?
                  </p>
                  <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white">
                    <User className="h-4 w-4 mr-2" />
                    Créer un compte
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
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
                <Badge className="bg-primary/10 text-primary mb-4 px-4 py-2">
                  Fonctionnalités
                </Badge>
                <h2 className="text-4xl lg:text-5xl font-bold text-sicta-grey-dark mb-4">
                  Fonctionnalités de l'Espace Client
                </h2>
                <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                  Gérez facilement tous vos services SICTA en ligne
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Car,
                    title: "Gestion Véhicules",
                    description: "Enregistrez et gérez tous vos véhicules en un seul endroit"
                  },
                  {
                    icon: FileText,
                    title: "Mes Documents",
                    description: "Téléchargez vos certificats et rapports de contrôle"
                  },
                  {
                    icon: Calendar,
                    title: "Rendez-vous",
                    description: "Réservez et gérez vos rendez-vous en ligne"
                  },
                  {
                    icon: Bell,
                    title: "Alertes Automatiques",
                    description: "Recevez des rappels avant l'expiration de vos contrôles"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="p-6 text-center hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 group h-full">
                      <div className="h-16 w-16 bg-gradient-to-br from-primary to-sicta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-sicta-grey-dark mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sicta-grey-light text-sm leading-relaxed">
                        {feature.description}
                      </p>
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
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Prêt à créer votre compte ?
              </h2>
              <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                Rejoignez des milliers de clients qui gèrent leurs services SICTA en ligne
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="btn-hero text-lg px-10 py-7">
                  <User className="h-6 w-6 mr-3" />
                  Créer un compte
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sicta-grey text-lg px-10 py-7">
                  <FileText className="h-6 w-6 mr-3" />
                  En savoir plus
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

export default EspaceClient;
