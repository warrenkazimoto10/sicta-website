import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building2, 
  Car,
  Bell,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Clock,
  Download,
  Upload,
  Eye,
  X,
  CheckCircle2,
  FileCheck,
  Sparkles,
  LogIn,
  EyeOff,
  BarChart3,
  History,
  Settings,
  ArrowRight,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useVehicles, useAlerts, useRequests, useNotifications } from "@/hooks/espacePro";
import { VehicleModal } from "@/components/espacePro/modals/VehicleModal";
import { VehicleDetailsModal } from "@/components/espacePro/modals/VehicleDetailsModal";
import { DeleteConfirmModal } from "@/components/espacePro/modals/DeleteConfirmModal";
import { RequestModal } from "@/components/espacePro/modals/RequestModal";
import { loginSchema, LoginValues } from "@/lib/validations/espacePro";
import { FleetVehicle } from "@/types/espacePro";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { exportVehicles, generateMonthlyReportPDF } from "@/lib/export";

const EspacePro = () => {
  const { ref: sectionRef, isInView } = useScrollAnimation(0.2);
  const { user, company, isAuthenticated, isLoading: authLoading, login, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [agenceFilter, setAgenceFilter] = useState<string>("all");
  
  // Modals states
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicle | null>(null);
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<FleetVehicle | null>(null);

  // Hooks avec React Query
  const filters = {
    search: searchQuery,
    statut: statusFilter !== "all" ? statusFilter : undefined,
    agence: agenceFilter !== "all" ? agenceFilter : undefined,
  };

  const { 
    vehicles, 
    isLoading: vehiclesLoading, 
    createVehicle, 
    updateVehicle, 
    deleteVehicle,
    isCreating,
    isUpdating,
    isDeleting,
  } = useVehicles(1, 100, filters);

  const { 
    alerts, 
    isLoading: alertsLoading,
    markAsRead,
    markAllAsRead,
    deleteAlert,
  } = useAlerts(1, 50);

  const { 
    requests, 
    isLoading: requestsLoading,
    createRequest,
    isCreating: isCreatingRequest,
  } = useRequests(1, 50);

  const { 
    notifications, 
    unreadCount,
    isLoading: notificationsLoading,
    markAsRead: markNotificationAsRead,
    markAllAsRead: markAllNotificationsAsRead,
  } = useNotifications(1, 50);

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginValues) => {
    try {
      await login(data);
    } catch (error: any) {
      console.error("Login error:", error);
    }
  };

  // Calculs statistiques
  const vehiclesData = vehicles?.data || [];
  const vehiclesExpired = vehiclesData.filter((v) => v.statut === "expire").length;
  const vehiclesDueSoon = vehiclesData.filter((v) => v.statut === "bientot-du").length;
  const vehiclesValid = vehiclesData.filter((v) => v.statut === "valide").length;
  const vehicleCount = vehiclesData.length;

  const calculateDiscount = (count: number) => {
    if (count >= 100) return 25;
    if (count >= 50) return 20;
    if (count >= 25) return 15;
    if (count >= 10) return 10;
    return 0;
  };

  // Données pour graphiques
  const statusChartData = [
    { name: "Valides", value: vehiclesValid, color: "#22c55e" },
    { name: "Bientôt dû", value: vehiclesDueSoon, color: "#f97316" },
    { name: "Expirés", value: vehiclesExpired, color: "#ef4444" },
  ];

  const monthlyControlsData = [
    { month: "Jan", controls: 12 },
    { month: "Fév", controls: 8 },
    { month: "Mar", controls: 15 },
    { month: "Avr", controls: 10 },
    { month: "Mai", controls: 18 },
    { month: "Jun", controls: 14 },
  ];

  // Handlers
  const handleCreateVehicle = async (data: any) => {
    if (!company) return;
    await createVehicle(data);
  };

  const handleUpdateVehicle = async (id: string, data: any) => {
    await updateVehicle({ id, data });
    setSelectedVehicle(null);
    setShowVehicleDetails(false);
  };

  const handleDeleteVehicle = async () => {
    if (!vehicleToDelete) return;
    await deleteVehicle(vehicleToDelete.id);
    setVehicleToDelete(null);
    setShowDeleteConfirm(false);
  };

  const handleCreateRequest = async (data: any) => {
    if (!company) return;
    await createRequest(data);
  };

  if (authLoading) {
    return (
      <PageTransition>
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sicta-grey-light">Chargement...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!isAuthenticated) {
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
                    Espace Professionnel
                  </Badge>
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="text-sicta-grey-dark">Espace</span>{" "}
                    <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-sicta-orange-light">
                      Professionnel
                    </span>
              </h1>
                  <p className="text-xl lg:text-2xl text-sicta-grey-light leading-relaxed max-w-3xl mx-auto">
                    Gérez votre flotte, recevez des alertes automatiques, suivez vos demandes et exportez vos données
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
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">
                      Connexion Professionnelle
              </h2>
                    <p className="text-sicta-grey-light">
                      Accédez à votre espace entreprise
              </p>
            </div>

                  <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-6">
                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-sicta-grey-dark mb-2 block">
                        Email professionnel
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@entreprise.com"
                        className="h-12"
                        {...registerLogin("email")}
                      />
                      {loginErrors.email && (
                        <p className="text-sm text-red-500 mt-1">{loginErrors.email.message}</p>
                      )}
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
                          {...registerLogin("password")}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-sicta-grey-light hover:text-sicta-grey-dark transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {loginErrors.password && (
                        <p className="text-sm text-red-500 mt-1">{loginErrors.password.message}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-sicta-grey/20" {...registerLogin("rememberMe")} />
                        <span className="text-sm text-sicta-grey-light">Se souvenir de moi</span>
                      </label>
                      <a href="#" className="text-sm text-primary hover:underline font-medium">
                        Mot de passe oublié ?
                      </a>
                    </div>

                    <Button type="submit" className="w-full btn-hero h-12 text-lg">
                      <LogIn className="h-5 w-5 mr-2" />
                      Se connecter
                    </Button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-sicta-grey/20 text-center">
                    <p className="text-sm text-sicta-grey-light mb-4">
                      Pas encore de compte entreprise ?
                    </p>
                    <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white">
                      <Building2 className="h-4 w-4 mr-2" />
                      Demander un accès
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
                    Fonctionnalités de l'Espace PRO
                  </h2>
                  <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                    Des outils professionnels pour optimiser la gestion de votre flotte
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: BarChart3,
                      title: "Tableau de Bord",
                      description: "Vue d'ensemble complète de votre flotte avec statistiques en temps réel"
                    },
                    {
                      icon: Car,
                      title: "Gestion Flotte",
                      description: "Enregistrez, gérez et suivez tous vos véhicules en un seul endroit"
                    },
                    {
                      icon: Bell,
                      title: "Alertes Automatiques",
                      description: "Recevez des alertes personnalisées pour chaque véhicule"
                    },
                    {
                      icon: FileCheck,
                      title: "Suivi Demandes",
                      description: "Suivez l'état de vos demandes de transfert et dossiers"
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
                  Prêt à optimiser votre flotte ?
                </h2>
                <p className="text-xl lg:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
                  Contactez notre équipe commerciale pour une solution sur mesure
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button size="lg" className="btn-hero text-lg px-10 py-7">
                    <FileCheck className="h-6 w-6 mr-3" />
                    Demander un devis
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sicta-grey text-lg px-10 py-7">
                    <Building2 className="h-6 w-6 mr-3" />
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
  }

  // Dashboard connecté
  return (
    <PageTransition>
      <div className="w-full">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/20 via-background to-sicta-orange-light/10 py-8 border-b border-sicta-grey/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-sicta-grey-dark mb-1">
                  Espace Professionnel
                </h1>
                <p className="text-sicta-grey-light">
                  {company?.nom} • {vehicleCount} véhicule{vehicleCount > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Notifications</DialogTitle>
                      <DialogDescription>
                        {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue{unreadCount > 1 ? "s" : ""}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      {notificationsLoading ? (
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-20 w-full" />
                          ))}
                        </div>
                      ) : (
                        notifications?.data?.map((notif) => (
                          <Card 
                            key={notif.id} 
                            className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                              !notif.lu ? "bg-primary/5 border-primary/20" : ""
                            }`}
                            onClick={() => markNotificationAsRead(notif.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notif.type === "alerte" ? "bg-red-100 text-red-600" :
                                notif.type === "demande" ? "bg-blue-100 text-blue-600" :
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
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" onClick={logout}>
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
              <TabsList className="grid w-full grid-cols-6 mb-8">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="flotte">Flotte</TabsTrigger>
                <TabsTrigger value="alertes">Alertes</TabsTrigger>
                <TabsTrigger value="demandes">Demandes</TabsTrigger>
                <TabsTrigger value="rapports">Rapports</TabsTrigger>
                <TabsTrigger value="parametres">Paramètres</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-8">
                {/* Statistiques Flotte */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center">
                        <Car className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-primary/10 text-primary">{vehicleCount}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-sicta-grey-dark mb-1">Véhicules</h3>
                    <p className="text-sicta-grey-light text-sm">Total de la flotte</p>
                  </Card>

                  <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-green-500 text-white">{vehiclesValid}</Badge>
                  </div>
                    <h3 className="text-2xl font-bold text-sicta-grey-dark mb-1">Valides</h3>
                    <p className="text-sicta-grey-light text-sm">Contrôles en cours</p>
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
                </div>

                {/* Alertes Urgentes */}
                {alerts?.data && alerts.data.filter(a => !a.lu && a.priorite === "haute").length > 0 && (
                  <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-red-500 rounded-xl flex items-center justify-center">
                          <AlertCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-sicta-grey-dark mb-1">
                            {alerts.data.filter(a => !a.lu && a.priorite === "haute").length} Alerte{alerts.data.filter(a => !a.lu && a.priorite === "haute").length > 1 ? "s" : ""} Urgente{alerts.data.filter(a => !a.lu && a.priorite === "haute").length > 1 ? "s" : ""}
                          </h3>
                          <p className="text-sicta-grey-light">
                            Nécessitent votre attention immédiate
                          </p>
                </div>
              </div>
                      <Button className="btn-hero" onClick={() => setActiveTab("alertes")}>
                        Voir les alertes
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                )}

                {/* Graphiques et Analyses */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">Répartition par Statut</h3>
                    {vehiclesLoading ? (
                      <Skeleton className="h-64 w-full" />
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={statusChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {statusChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">Contrôles par Mois</h3>
                    {vehiclesLoading ? (
                      <Skeleton className="h-64 w-full" />
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyControlsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="controls" fill="#0088FE" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </Card>
                </div>

                {/* Tarifs Préférentiels */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">Tarifs Préférentiels</h3>
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-sicta-orange-light/10 rounded-xl">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {calculateDiscount(vehicleCount)}%
                      </div>
                      <p className="text-sicta-grey-light">Remise appliquée</p>
                      <p className="text-sm text-sicta-grey-light mt-2">
                        {vehicleCount} véhicule{vehicleCount > 1 ? "s" : ""} dans votre flotte
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>10-24 véhicules</span>
                        <span className="font-semibold">-10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>25-49 véhicules</span>
                        <span className="font-semibold">-15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>50-99 véhicules</span>
                        <span className="font-semibold">-20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>100+ véhicules</span>
                        <span className="font-semibold">-25%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Flotte Tab */}
              <TabsContent value="flotte" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">Gestion de Flotte</h2>
                    <p className="text-sicta-grey-light">Gérez tous vos véhicules en un seul endroit</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Importer (CSV)
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => exportVehicles(vehiclesData, "excel")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                    <Button className="btn-hero" onClick={() => setShowAddVehicle(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un véhicule
                    </Button>
                  </div>
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                  <Select value={agenceFilter} onValueChange={setAgenceFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filtrer par station" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les stations</SelectItem>
                      <SelectItem value="Abidjan Plateau">Abidjan Plateau</SelectItem>
                      <SelectItem value="Cocody">Cocody</SelectItem>
                      <SelectItem value="Yopougon">Yopougon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tableau de la Flotte */}
                <Card className="overflow-hidden">
                  {vehiclesLoading ? (
                    <div className="p-6 space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Immatriculation</TableHead>
                          <TableHead>Véhicule</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Station</TableHead>
                          <TableHead>Dernier Contrôle</TableHead>
                          <TableHead>Prochain Contrôle</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vehiclesData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-sicta-grey-light">
                              Aucun véhicule trouvé
                            </TableCell>
                          </TableRow>
                        ) : (
                          vehiclesData.map((vehicle) => (
                            <TableRow key={vehicle.id}>
                              <TableCell className="font-semibold">{vehicle.immatriculation}</TableCell>
                              <TableCell>
                                <div className="font-medium">{vehicle.marque} {vehicle.modele}</div>
                              </TableCell>
                              <TableCell>{vehicle.type}</TableCell>
                              <TableCell>{vehicle.agence}</TableCell>
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
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedVehicle(vehicle);
                                      setShowVehicleDetails(true);
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedVehicle(vehicle);
                                      setShowAddVehicle(true);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      setVehicleToDelete(vehicle);
                                      setShowDeleteConfirm(true);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  )}
                </Card>
              </TabsContent>

              {/* Alertes Tab */}
              <TabsContent value="alertes" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">Alertes de Visite</h2>
                    <p className="text-sicta-grey-light">Gérez les alertes automatiques pour vos véhicules</p>
                  </div>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurer les alertes
                  </Button>
                </div>

                {alertsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts?.data && alerts.data.length === 0 ? (
                      <Card className="p-8 text-center">
                        <p className="text-sicta-grey-light">Aucune alerte pour le moment</p>
                      </Card>
                    ) : (
                      alerts?.data?.map((alert) => (
                        <Card 
                          key={alert.id} 
                          className={`p-6 border-2 ${
                            alert.priorite === "haute" ? "border-red-500 bg-red-50" :
                            alert.priorite === "moyenne" ? "border-orange-500 bg-orange-50" :
                            "border-blue-500 bg-blue-50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className={
                                  alert.priorite === "haute" ? "bg-red-500 text-white" :
                                  alert.priorite === "moyenne" ? "bg-orange-500 text-white" :
                                  "bg-blue-500 text-white"
                                }>
                                  {alert.priorite === "haute" ? "Haute" :
                                   alert.priorite === "moyenne" ? "Moyenne" :
                                   "Basse"}
                                </Badge>
                                <h4 className="font-bold text-sicta-grey-dark">
                                  {alert.vehicleId}
                                </h4>
                                {!alert.lu && (
                                  <div className="h-2 w-2 bg-primary rounded-full" />
                                )}
                              </div>
                              <p className="text-sicta-grey-light mb-2">{alert.message}</p>
                              <p className="text-sm text-sicta-grey-light">{alert.date}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => markAsRead(alert.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => deleteAlert(alert.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
              </div>
            </div>
                        </Card>
                      ))
                    )}
                  </div>
                )}
              </TabsContent>

              {/* Demandes Tab */}
              <TabsContent value="demandes" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">Suivi des Demandes</h2>
                    <p className="text-sicta-grey-light">Suivez l'état de vos demandes de transfert et dossiers</p>
                  </div>
                  <Button className="btn-hero" onClick={() => setShowRequestModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle demande
                  </Button>
                </div>

                {requestsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
          </div>
                ) : (
                  <Card className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Véhicule</TableHead>
                          <TableHead>Date de création</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requests?.data && requests.data.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-sicta-grey-light">
                              Aucune demande pour le moment
                            </TableCell>
                          </TableRow>
                        ) : (
                          requests?.data?.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <Badge className="bg-primary/10 text-primary">
                                  {request.type === "transfert-plaque" ? "Transfert Plaque" :
                                   request.type === "civio" ? "CIVIO" :
                                   request.type === "ivn" ? "IVN" :
                                   request.type === "jaugeage" ? "Jaugeage" :
                                   request.type === "immatriculation" ? "Immatriculation" :
                                   request.type === "ppad" ? "PPAD" :
                                   "Autre"}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-semibold">{request.vehicleId}</TableCell>
                              <TableCell>
                                {new Date(request.dateCreation).toLocaleDateString("fr-FR")}
                              </TableCell>
                              <TableCell>{request.description}</TableCell>
                              <TableCell>
                                <Badge className={
                                  request.statut === "traite" ? "bg-green-500 text-white" :
                                  request.statut === "en-cours" ? "bg-blue-500 text-white" :
                                  request.statut === "refuse" ? "bg-red-500 text-white" :
                                  "bg-orange-500 text-white"
                                }>
                                  {request.statut === "traite" ? "Traité" :
                                   request.statut === "en-cours" ? "En cours" :
                                   request.statut === "refuse" ? "Refusé" :
                                   request.statut === "annule" ? "Annulé" :
                                   "En attente"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </Card>
                )}
              </TabsContent>

              {/* Rapports Tab */}
              <TabsContent value="rapports" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">Rapports & Export</h2>
                    <p className="text-sicta-grey-light">Générez et exportez vos rapports de flotte</p>
                  </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20 cursor-pointer">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center mb-4">
                      <FileCheck className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-sicta-grey-dark mb-2">Rapport Mensuel</h3>
                    <p className="text-sicta-grey-light text-sm mb-4">
                      Rapport complet de votre flotte pour le mois en cours
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        const now = new Date();
                        generateMonthlyReportPDF(vehiclesData, now.getMonth() + 1, now.getFullYear());
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Générer (PDF)
                    </Button>
                  </Card>

                  <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20 cursor-pointer">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center mb-4">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-sicta-grey-dark mb-2">Export Flotte</h3>
                    <p className="text-sicta-grey-light text-sm mb-4">
                      Exportez la liste complète de vos véhicules
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => exportVehicles(vehiclesData, "excel")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exporter (Excel)
                    </Button>
                  </Card>

                  <Card className="p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20 cursor-pointer">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-xl flex items-center justify-center mb-4">
                      <History className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-sicta-grey-dark mb-2">Historique Complet</h3>
                    <p className="text-sicta-grey-light text-sm mb-4">
                      Historique de tous les contrôles de votre flotte
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => exportVehicles(vehiclesData, "csv")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger (CSV)
                    </Button>
                  </Card>
                </div>
              </TabsContent>

              {/* Paramètres Tab */}
              <TabsContent value="parametres" className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-sicta-grey-dark mb-2">Paramètres</h2>
                  <p className="text-sicta-grey-light">Configurez votre espace professionnel</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">Informations Entreprise</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Nom de l'entreprise</Label>
                        <Input placeholder={company?.nom || "Nom de l'entreprise"} />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder={company?.email || "contact@entreprise.com"} />
                      </div>
                      <div>
                        <Label>Téléphone</Label>
                        <Input placeholder={company?.telephone || "+225 XX XX XX XX XX"} />
                      </div>
                      <Button className="btn-hero w-full">
                        Enregistrer les modifications
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-bold text-sicta-grey-dark mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Alertes par email</Label>
                          <p className="text-sm text-sicta-grey-light">Recevoir des alertes par email</p>
                        </div>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Alertes SMS</Label>
                          <p className="text-sm text-sicta-grey-light">Recevoir des alertes par SMS</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Seuil d'alerte</Label>
                          <p className="text-sm text-sicta-grey-light">Jours avant expiration</p>
            </div>
                        <Select defaultValue="30">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 jours</SelectItem>
                            <SelectItem value="15">15 jours</SelectItem>
                            <SelectItem value="30">30 jours</SelectItem>
                            <SelectItem value="60">60 jours</SelectItem>
                          </SelectContent>
                        </Select>
          </div>
                      <Button className="btn-hero w-full">
                        Enregistrer les préférences
              </Button>
            </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Modals */}
        <VehicleModal
          open={showAddVehicle}
          onOpenChange={setShowAddVehicle}
          vehicle={selectedVehicle}
          onCreate={handleCreateVehicle}
          onUpdate={handleUpdateVehicle}
          onSuccess={() => {
            setSelectedVehicle(null);
          }}
        />

        <VehicleDetailsModal
          open={showVehicleDetails}
          onOpenChange={setShowVehicleDetails}
          vehicle={selectedVehicle}
          onEdit={() => {
            setShowVehicleDetails(false);
            setShowAddVehicle(true);
          }}
          onDelete={() => {
            setVehicleToDelete(selectedVehicle);
            setShowVehicleDetails(false);
            setShowDeleteConfirm(true);
          }}
        />

        <DeleteConfirmModal
          open={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
          title="Supprimer le véhicule"
          description="Êtes-vous sûr de vouloir supprimer ce véhicule de votre flotte ?"
          itemName={vehicleToDelete?.immatriculation}
          onConfirm={handleDeleteVehicle}
          isDeleting={isDeleting}
        />

        <RequestModal
          open={showRequestModal}
          onOpenChange={setShowRequestModal}
          onCreate={handleCreateRequest}
          onSuccess={() => {
            setShowRequestModal(false);
          }}
        />
      </div>
    </PageTransition>
  );
};

export default EspacePro;
