import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin, Calendar, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchStationStats } from "@/services/stationService";
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
import { fetchSettings } from "@/services/settingsService";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: stats } = useQuery({
    queryKey: ["station-stats"],
    queryFn: fetchStationStats,
    staleTime: 300_000,
  });

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
    staleTime: 300_000,
  });

  const phoneValue = settings?.settings_phone || "27 21 21 29 90";

  const isHomePage = location.pathname === "/";

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
            <a href={`tel:${phoneValue.replace(/\s/g, "")}`} className="flex items-center space-x-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span>{phoneValue}</span>
            </a>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>
                {stats ? `${stats.total} Stations` : t("header.agencies")}
              </span>
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

            {/* Offres d'emploi link */}
            <Link
              to="/emplois"
              className="text-sicta-grey hover:text-primary transition-colors duration-200 font-medium"
            >
              Offres d'emploi
            </Link>

            {/* Contact link */}
            <Link
              to="/contact"
              className="text-sicta-grey hover:text-primary transition-colors duration-200 font-medium"
            >
              {t("nav.contact")}
            </Link>
          </div>

          {/* Logo ISO 9001 + CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Logo ISO 9001 */}
            <img
              src="/img-ISO9001.png"
              alt="Certification ISO 9001"
              className="h-12 w-auto object-contain"
              title="SICTA - Certifiée ISO 9001:2015"
            />
            {/* Bouton RDV temporairement désactivé */}
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

                  {/* Offres d'emploi */}
                  <Link
                    to="/emplois"
                    className="text-lg font-medium text-sicta-grey hover:text-primary transition-colors py-2 border-b border-border/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Offres d'emploi
                  </Link>

                  {/* Logo ISO 9001 mobile */}
                  <div className="flex items-center gap-2 py-2">
                    <img
                      src="/img-ISO9001.png"
                      alt="Certification ISO 9001"
                      className="h-10 w-auto object-contain"
                    />
                    <span className="text-xs text-sicta-grey-light">Certifiée ISO 9001:2015</span>
                  </div>

                  {/* Contact */}
                  <Link
                    to="/contact"
                    className="text-lg font-medium text-sicta-grey hover:text-primary transition-colors py-2 border-b border-border/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("nav.contact")}
                  </Link>

                  <div className="pt-4 space-y-4">
                    {/* Bouton RDV temporairement désactivé */}
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