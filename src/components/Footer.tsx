import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  Calendar
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sicta-grey-dark text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo-sicta.png" 
                alt="SICTA Logo" 
                className="h-12 w-auto"
              />
              <div>
                <div className="text-xl font-bold">SICTA</div>
                <div className="text-sm opacity-80">Contrôle Automobile</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Société Ivoirienne de Contrôle Technique Automobiles et Industriels, filiale de Mayelia Participations. 
              Leader du contrôle technique en Côte d'Ivoire depuis 1974. Nouvelle ère 2025.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Building2 className="h-4 w-4" />
              <span>Filiale Mayelia Participations</span>
            </div>
            
            <div className="flex space-x-4">
              <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white p-2">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white p-2">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/controle-technique" className="text-gray-300 hover:text-primary transition-colors">
                  Contrôle Technique
                </Link>
              </li>
              <li>
                <Link to="/services/civio" className="text-gray-300 hover:text-primary transition-colors">
                  CIVIO
                </Link>
              </li>
              <li>
                <Link to="/services/immatriculation" className="text-gray-300 hover:text-primary transition-colors">
                  Immatriculation
                </Link>
              </li>
              <li>
                <Link to="/services/jaugeage-baremage" className="text-gray-300 hover:text-primary transition-colors">
                  Jaugeage & Barémage
                </Link>
              </li>
              <li>
                <Link to="/services/pesee" className="text-gray-300 hover:text-primary transition-colors">
                  Pesée
                </Link>
              </li>
              <li>
                <Link to="/services/pre-visite" className="text-gray-300 hover:text-primary transition-colors">
                  Pré-visite
                </Link>
              </li>
              <li>
                <Link to="/services/assistance" className="text-gray-300 hover:text-primary transition-colors">
                  Assistance & Conseils
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-primary transition-colors">
                  À propos de SICTA
                </Link>
              </li>
              <li>
                <Link to="/reseau" className="text-gray-300 hover:text-primary transition-colors">
                  Réseau d'agences
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-gray-300 hover:text-primary transition-colors">
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="text-gray-300 hover:text-primary transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/espace-pro" className="text-gray-300 hover:text-primary transition-colors">
                  Espace Pro
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services Supplémentaires</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/carrieres" className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Carrières</span>
                </Link>
              </li>
              <li>
                <Link to="/excellence" className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>Mur de l'Excellence</span>
                </Link>
              </li>
              <li>
                <Link to="/galerie" className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Galerie</span>
                </Link>
              </li>
              <li>
                <Link to="/telechargements" className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>À télécharger</span>
                </Link>
              </li>
              <li>
                <Link to="/espace-client" className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Espace Client</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Abidjan, Côte d'Ivoire, Zone 4C<br />
                    29 stations permanentes sur le territoire
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-300">27 21 21 29 90</p>
                  <p className="text-sm text-gray-400">Service client</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-300">800 800 41</p>
                  <p className="text-sm text-gray-400">N° vert gratuit</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-300">infos.sicta@sicta.ci</p>
                  <p className="text-sm text-gray-400">Support général</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Lun - Ven: 7h30 - 17h30<br />
                    Sam: 8h00 - 12h00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} SICTA - Société Ivoirienne de Contrôle Technique Automobiles et Industriels. 
              Tous droits réservés.
            </div>
            
            <div className="flex space-x-6 text-sm">
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
          
          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              Une société du groupe <span className="text-primary font-medium">Mayelia Participations</span> • 
              Nouvelle ère depuis 2025 • Leader sécurité routière en Côte d'Ivoire
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;