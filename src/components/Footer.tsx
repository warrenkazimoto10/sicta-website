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
  Shield
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sicta-grey-dark text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">SICTA</div>
                <div className="text-sm opacity-80">Contrôle Automobile</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Société Ivoirienne de Contrôle Technique Automobile, filiale de Mayelia Participations. 
              Leader du contrôle technique en Côte d'Ivoire depuis plus de 20 ans.
            </p>
            
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
                <Link to="/services/plaques" className="text-gray-300 hover:text-primary transition-colors">
                  Pose de Plaques
                </Link>
              </li>
              <li>
                <Link to="/services/jaugeage" className="text-gray-300 hover:text-primary transition-colors">
                  Jaugeage & Barémage
                </Link>
              </li>
              <li>
                <Link to="/services/pesee" className="text-gray-300 hover:text-primary transition-colors">
                  Pesée et Vignettes
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
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">
                  À propos de SICTA
                </Link>
              </li>
              <li>
                <Link to="/network" className="text-gray-300 hover:text-primary transition-colors">
                  Réseau d'agences
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-gray-300 hover:text-primary transition-colors">
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-primary transition-colors">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact
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
                    Siège social: Abidjan, Côte d'Ivoire<br />
                    28 agences permanentes sur le territoire
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+225 27 20 33 44 00</p>
                  <p className="text-sm text-gray-400">Service client</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-300">contact@sicta.ci</p>
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
              © {currentYear} SICTA - Société Ivoirienne de Contrôle Technique Automobile. 
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
              Une société du groupe <span className="text-primary font-medium">Mayelia Participations</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;