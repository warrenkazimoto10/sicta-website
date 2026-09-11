import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logoBlanc from "@/assets/logo-blanc.png";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Shield,
  Building2,
  Download,
  Users,
  Award,
  Calendar,
  Car,
  FileText,
  Network,
  Info,
  ChevronRight
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "@/services/settingsService";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 300_000,
  });

  const facebookLink = settings?.settings_facebook || "https://www.facebook.com/p/SICTA-SA-61580641138223/";
  const linkedinLink = settings?.settings_linkedin || "https://www.linkedin.com/company/sicta-sa";
  const mayeliaUrl = settings?.settings_mayelia_url || "https://mayeliaparticipations.com";
  const phoneValue = settings?.settings_phone || "27 21 21 29 90";
  const emailValue = settings?.settings_email || "infos@sicta.ci";
  const addressValue = settings?.settings_address || "Rue Abli Mathieu, Zone 4C, Marcory\nAbidjan, Côte d'Ivoire";

  return (
    <footer className="bg-gradient-to-b from-sicta-grey-dark via-sicta-grey to-sicta-grey-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <img
                src={logoBlanc}
                alt="SICTA Logo"
                className="h-12 w-auto"
              />
            </div>

            <p className="text-gray-300 leading-relaxed text-sm">
              Société Ivoirienne de Contrôle Technique Automobile, filiale de{" "}
              <a
                href={mayeliaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                Mayelia PARTICIPATIONS
              </a>
              . Leader du contrôle technique en Côte d'Ivoire depuis 1974.
            </p>





            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              <a
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-primary hover:text-white text-white p-2.5 rounded-full transition-all hover:scale-110 flex items-center justify-center"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-primary hover:text-white text-white p-2.5 rounded-full transition-all hover:scale-110 flex items-center justify-center"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link to="/reseau" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("nav.network")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("nav.news")}
                </Link>
              </li>
              <li>
                <Link to="/galerie" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Galerie
                </Link>
              </li>
              <li>
                <Link to="/emplois" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Offres d'emploi
                </Link>
              </li>
              {/* Lien Réservation temporairement désactivé */}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Nos Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/controle-technique" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contrôle technique
                </Link>
              </li>
              <li>
                <Link to="/services/civio" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  CIVIO
                </Link>
              </li>
              <li>
                <Link to="/services/jaugeage-baremage" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Jaugeage-Barémage
                </Link>
              </li>
              <li>
                <Link to="/services/immatriculation" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Immatriculation
                </Link>
              </li>
              <li>
                <Link to="/services/ivn" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  IVN
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm whitespace-pre-line">
                    {addressValue}
                  </p>
                  <a
                    href="https://maps.app.goo.gl/raaF3pipxgcsBByV7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 inline-block"
                  >
                    Voir sur Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <a href={`tel:${phoneValue.replace(/\s/g, "")}`} className="text-gray-300 font-semibold hover:text-primary transition-colors">{phoneValue}</a>
                  <p className="text-xs text-gray-400">Service client</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-semibold">800 800 41</p>
                  <p className="text-xs text-gray-400">N° vert gratuit</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <a href={`mailto:${emailValue}`} className="text-gray-300 text-sm hover:text-primary transition-colors">{emailValue}</a>
                  <p className="text-xs text-gray-400">Support général</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Lun - Ven: 7h30 - 17h00<br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} SICTA - Société Ivoirienne de Contrôle Technique Automobile.
            <br className="md:hidden" />
            <span className="md:ml-1">Tous droits réservés.</span>
          </div>

          <a
            href={mayeliaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary transition-colors"
          >
            <Building2 className="h-4 w-4 text-primary" />
            <span>Filiale du groupe <span className="text-primary font-semibold">Mayelia PARTICIPATIONS</span></span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;