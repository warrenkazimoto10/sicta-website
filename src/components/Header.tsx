import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, Calendar, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigationLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/a-propos" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.network"), href: "/reseau" },
    { name: t("nav.booking"), href: "/reservation" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      {/* Top contact bar */}
      <div className="bg-sicta-grey text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>27 21 21 29 90</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{t("header.agencies")}</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>{t("header.tagline")}</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo-sicta.png" 
              alt="SICTA Logo" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.slice(0, -1).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sicta-grey hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Médiathèque Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sicta-grey hover:text-primary transition-colors duration-200 font-medium">
                <span>Médiathèque</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/actualites">
                  <DropdownMenuItem className="cursor-pointer">
                    {t("nav.news")}
                  </DropdownMenuItem>
                </Link>
                <Link to="/galerie">
                  <DropdownMenuItem className="cursor-pointer">
                    Galerie
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Contact link */}
            <Link
              to="/contact"
              className="text-sicta-grey hover:text-primary transition-colors duration-200 font-medium"
            >
              {t("nav.contact")}
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/reservation">
              <Button className="btn-hero">
                <Calendar className="h-4 w-4 mr-2" />
                {t("header.bookAppointment")}
              </Button>
            </Link>
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
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              {navigationLinks.slice(0, -1).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sicta-grey hover:text-primary transition-colors duration-200 font-medium py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Médiathèque in mobile */}
              <div className="py-2">
                <div className="font-semibold text-sicta-grey-dark mb-2">Médiathèque</div>
                <div className="pl-4 space-y-2">
                  <Link
                    to="/actualites"
                    className="text-sicta-grey hover:text-primary transition-colors duration-200 block py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.news")}
                  </Link>
                  <Link
                    to="/galerie"
                    className="text-sicta-grey hover:text-primary transition-colors duration-200 block py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Galerie
                  </Link>
                </div>
              </div>
              
              {/* Contact in mobile */}
              <Link
                to="/contact"
                className="text-sicta-grey hover:text-primary transition-colors duration-200 font-medium py-2 block"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>
              
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <Link to="/reservation" className="w-full">
                <Button className="btn-hero w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t("header.bookAppointment")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;