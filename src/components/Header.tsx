import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollHeader } from "@/hooks/useScrollAnimation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollHeader();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigationLinks = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Nos services", href: "/services" },
    { name: "Réseau SICTA", href: "/reseau" },
    { name: "Actualités", href: "/actualites" },
    { name: "Réservation", href: "/reservation" },
  ];

  return (
    <motion.header 
      className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/98 border-b border-border shadow-lg' 
          : 'bg-background/95 border-b border-border'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top contact bar */}
      <div className="bg-sicta-grey text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+225 27 20 33 44 00</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>28 agences permanentes</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Contrôle technique automobile - Côte d'Ivoire</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-br from-primary to-sicta-orange-light rounded-lg flex items-center justify-center">
              <div className="text-white font-bold text-lg">SICTA</div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-sicta-grey-dark">SICTA</div>
              <div className="text-sm text-sicta-grey-light">Contrôle Automobile</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sicta-grey hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="btn-hero">
              <Calendar className="h-4 w-4 mr-2" />
              Prendre rendez-vous
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-sicta-grey" />
            ) : (
              <Menu className="h-6 w-6 text-sicta-grey" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden mt-4 pb-4 border-t border-border overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4 pt-4">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className="text-sicta-grey hover:text-primary transition-colors duration-200 font-medium py-2 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button className="btn-hero mt-4 w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre rendez-vous
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;