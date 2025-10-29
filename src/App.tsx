import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Toolbox from "./components/Toolbox";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Network from "./pages/Network";
import Booking from "./pages/Booking";
import News from "./pages/News";
import EspacePro from "./pages/EspacePro";
import NotFound from "./pages/NotFound";
// Services détaillés
import ControleTechnique from "./pages/services/ControleTechnique";
import CIVIO from "./pages/services/CIVIO";
import JaugeageBaremage from "./pages/services/JaugeageBaremage";
import PreVisite from "./pages/services/PreVisite";
import Pesee from "./pages/services/Pesee";
import Assistance from "./pages/services/Assistance";
import Immatriculation from "./pages/services/Immatriculation";
// Pages supplémentaires
import Carrieres from "./pages/Carrieres";
import MurExcellence from "./pages/MurExcellence";
import Galerie from "./pages/Galerie";
import Telechargements from "./pages/Telechargements";
import EspaceClient from "./pages/EspaceClient";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/services" element={<Services />} />
            <Route path="/services/controle-technique" element={<ControleTechnique />} />
            <Route path="/services/civio" element={<CIVIO />} />
            <Route path="/services/jaugeage-baremage" element={<JaugeageBaremage />} />
            <Route path="/services/pre-visite" element={<PreVisite />} />
            <Route path="/services/pesee" element={<Pesee />} />
            <Route path="/services/assistance" element={<Assistance />} />
            <Route path="/services/immatriculation" element={<Immatriculation />} />
            <Route path="/carrieres" element={<Carrieres />} />
            <Route path="/excellence" element={<MurExcellence />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/telechargements" element={<Telechargements />} />
            <Route path="/espace-client" element={<EspaceClient />} />
              <Route path="/reseau" element={<Network />} />
              <Route path="/espace-pro" element={<EspacePro />} />
              <Route path="/reservation" element={<Booking />} />
              <Route path="/actualites" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toolbox />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
