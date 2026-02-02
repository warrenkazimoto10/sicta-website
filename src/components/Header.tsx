import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, Calendar, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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

            {/* Espace PRO - Lien direct */}
            <Link
              to="/espace-pro"
              className="text-sicta-grey hover:text-primary transition-colors duration-200 font-medium"
            >
              Espace PRO
            </Link>

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

          {/* Mobile Menu using Sheet */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-sicta-grey" />
                  <span className="sr-only">{t("header.toggleMenu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="text-2xl font-bold text-sicta-grey-dark">{t("header.menu")}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col space-y-2">
                    {navigationLinks.slice(0, -1).map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="text-lg font-medium text-sicta-grey hover:text-primary transition-colors py-2 border-b border-border/50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  {/* Médiathèque */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sicta-grey-dark">Médiathèque</h4>
                    <div className="flex flex-col space-y-2 pl-4 border-l-2 border-primary/20">
                      <Link
                        to="/actualites"
                        className="text-sicta-grey hover:text-primary transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t("nav.news")}
                      </Link>
                      <Link
                        to="/galerie"
                        className="text-sicta-grey hover:text-primary transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Galerie
                      </Link>
                    </div>
                  </div>

                  {/* Espace PRO */}
                  <Link
                    to="/espace-pro"
                    className="text-lg font-medium text-sicta-grey hover:text-primary transition-colors py-2 border-b border-border/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Espace PRO
                  </Link>

                  {/* Contact */}
                  <Link
                    to="/contact"
                    className="text-lg font-medium text-sicta-grey hover:text-primary transition-colors py-2 border-b border-border/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.contact")}
                  </Link>

                  <div className="pt-4 space-y-4">
                    <div className="flex justify-start">
                      <LanguageSwitcher />
                    </div>
                    <Link to="/reservation" className="w-full block" onClick={() => setIsMenuOpen(false)}>
                      <Button className="btn-hero w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        {t("header.bookAppointment")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;