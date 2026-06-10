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

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-sicta-grey-dark via-sicta-grey to-sicta-grey-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
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
              Société Ivoirienne de Contrôle Technique Automobiles et Industriels, filiale de Mayelia Participations.
              Leader du contrôle technique en Côte d'Ivoire depuis 1974.
            </p>

            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Filiale Mayelia Participations</span>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-xs">
                <Shield className="h-3 w-3 mr-1" />
                ISO 9001:2015
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 text-xs">
                <Award className="h-3 w-3 mr-1" />
                Certifié
              </Badge>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-primary/20 text-white p-2 rounded-full transition-all hover:scale-110">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-primary/20 text-white p-2 rounded-full transition-all hover:scale-110">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-primary/20 text-white p-2 rounded-full transition-all hover:scale-110">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-primary/20 text-white p-2 rounded-full transition-all hover:scale-110">
                <Instagram className="h-4 w-4" />
              </Button>
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
                <Link to="/reservation" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm font-semibold">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Calendar className="h-3 w-3 mr-1" />
                  Réservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/controle-technique" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contrôle Technique
                </Link>
              </li>
              <li>
                <Link to="/services/immatriculation" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Immatriculation
                </Link>
              </li>
              <li>
                <Link to="/services/civio" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  CIVIO
                </Link>
              </li>
              <li>
                <Link to="/services/ivn" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  IVN
                </Link>
              </li>
              <li>
                <Link to="/services/pre-visite" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Pré-visite
                </Link>
              </li>
              <li>
                <Link to="/services/station-mobile" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Station Mobile
                </Link>
              </li>
              <li>
                <Link to="/services/ppad" className="text-gray-300 hover:text-primary transition-colors flex items-center group text-sm">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  PPAD
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
                  <p className="text-gray-300 text-sm">
                    Abidjan, Côte d'Ivoire<br />
                    Zone 4C, Marcory
                  </p>
                  <p className="text-xs text-gray-400 mt-1">29 stations permanentes</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-semibold">27 21 21 29 90</p>
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
                  <p className="text-gray-300 text-sm">infos.sicta@sicta.ci</p>
                  <p className="text-xs text-gray-400">Support général</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Lun - Ven: 7h30 - 17h30<br />
                    Sam: 8h00 - 12h00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} SICTA - Société Ivoirienne de Contrôle Technique Automobiles et Industriels.
              <br className="md:hidden" />
              <span className="md:ml-1">Tous droits réservés.</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">
                Conditions d'utilisation
              </Link>
              <Link to="/legal" className="text-gray-400 hover:text-primary transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Building2 className="h-4 w-4 text-primary" />
                <span>Filliale du groupe <span className="text-primary font-semibold">Mayelia Participations</span></span>
              </div>
              <span className="hidden md:inline text-gray-600">•</span>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span>Nouvelle ère depuis 2025</span>
              </div>
              <span className="hidden md:inline text-gray-600">•</span>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Leader sécurité routière en Côte d'Ivoire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;