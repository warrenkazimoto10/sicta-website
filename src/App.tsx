import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Network from "./pages/Network";
import Booking from "./pages/Booking";
import News from "./pages/News";
import ActualiteDetail from "./pages/ActualiteDetail";
import EspacePro from "./pages/EspacePro";
import NotFound from "./pages/NotFound";
import AdminRedirect from "./pages/AdminRedirect";
// Services détaillés
import ControleTechnique from "./pages/services/ControleTechnique";
import StationMobile from "./pages/services/StationMobile";
import CIVIO from "./pages/services/CIVIO";
import IVN from "./pages/services/IVN";
import JaugeageBaremage from "./pages/services/JaugeageBaremage";
import PreVisite from "./pages/services/PreVisite";
import PPAD from "./pages/services/PPAD";
import Pesee from "./pages/services/Pesee";
import Assistance from "./pages/services/Assistance";
import Immatriculation from "./pages/services/Immatriculation";
import VIP from "./pages/services/VIP";
// Pages supplémentaires
import Carrieres from "./pages/Carrieres";
import MurExcellence from "./pages/MurExcellence";
import Galerie from "./pages/Galerie";
import GalerieArticle from "./pages/GalerieArticle";
import Telechargements from "./pages/Telechargements";
import Contact from "./pages/Contact";
import SimulateurVisite from "./pages/SimulateurVisite";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>

            {/* ── Routes /admin → redirect vers le backoffice Laravel ── */}
            <Route path="/admin" element={<AdminRedirect />} />
            <Route path="/admin/*" element={<AdminRedirect />} />

            {/* ── Routes publiques avec Header + Footer ── */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/controle-technique" element={<ControleTechnique />} />
                    <Route path="/services/station-mobile" element={<StationMobile />} />
                    <Route path="/services/civio" element={<CIVIO />} />
                    <Route path="/services/ivn" element={<IVN />} />
                    <Route path="/services/jaugeage-baremage" element={<JaugeageBaremage />} />
                    <Route path="/services/pre-visite" element={<PreVisite />} />
                    <Route path="/services/ppad" element={<PPAD />} />
                    <Route path="/services/pesee" element={<Pesee />} />
                    <Route path="/services/assistance" element={<Assistance />} />
                    <Route path="/services/immatriculation" element={<Immatriculation />} />
                    <Route path="/services/vip" element={<VIP />} />
                    <Route path="/carrieres" element={<Carrieres />} />
                    <Route path="/excellence" element={<MurExcellence />} />
                    <Route path="/galerie" element={<Galerie />} />
                    <Route path="/galerie/article/:slug" element={<GalerieArticle />} />
                    <Route path="/telechargements" element={<Telechargements />} />
                    <Route path="/simulateur-visite" element={<SimulateurVisite />} />
                    <Route path="/reseau" element={<Network />} />
                    <Route path="/espace-pro" element={<EspacePro />} />
                    <Route path="/reservation" element={<Booking />} />
                    <Route path="/actualites" element={<News />} />
                    <Route path="/actualites/:slug" element={<ActualiteDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            } />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
