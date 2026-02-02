import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Clock, Phone, Car, Building2, Map, CalendarClock, Navigation, Users, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import networkMapModern from "@/assets/network-map-modern.jpg";

// Tableau 1 — Intérieur du Pays (21 agences hors Abidjan)
const agenciesInterieurPays = [
  { name: "Abengourou", city: "Abengourou", phone: "07 47 04 91 40", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+ABENGOUROU/@6.1010732,-3.8581794,18.56z/data=!4m6!3m5!1s0xfc15d356f2ce2d7:0xbafe24edd21e18ec!8m2!3d6.0988769!4d-3.8548147!16s%2Fg%2F11kg_6jt83?entry=ttu" },
  { name: "Aboisso", city: "Aboisso", phone: "07 57 20 90 77", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA/@5.4591906,-3.2122457,17z/data=!3m1!4b1!4m6!3m5!1s0xfc25c7ad1c10279:0x492c6e162d5a5b3f!8m2!3d5.4591906!4d-3.2100517!16s%2Fg%2F11fylnd39d" },
  { name: "Adzopé", city: "Adzopé", phone: "07 69 88 40 84", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+ADZOPE/@6.0988541,-3.8569304,17z/data=!3m1!4b1!4m6!3m5!1s0xfc15d356f2ce2d7:0xbafe24edd21e18ec!8m2!3d6.0988541!4d-3.8547364!16s%2Fg%2F11kg_6jt83" },
  { name: "Agnibilékro", city: "Agnibilékro", phone: "07 47 58 37 41", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+AGNIBILEKROU/@7.1379729,-3.2019632,17z/data=!3m1!4b1!4m6!3m5!1s0xfc5add6ee70f805:0x50bdf2ec7ff70bb2!8m2!3d7.1379729!4d-3.1997692!16s%2Fg%2F11s8r5ffdy" },
  { name: "Agboville", city: "Agboville", phone: "07 68 31 15 89", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SGS+SICTA+Agboville/@5.9349241,-4.2033192,17z/data=!3m1!4b1!4m6!3m5!1s0xfc110fac635e2b7:0x589b97291eacb3e8!8m2!3d5.9349241!4d-4.2011252!16s%2Fg%2F11hctjtjq_" },
  { name: "Bondoukou", city: "Bondoukou", phone: "07 09 66 57 63", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SGS+sicta/@8.0436615,-2.7965599,17z/data=!3m1!4b1!4m6!3m5!1s0xfcf94a41afbcb49:0xf9a91816c3286eee!8m2!3d8.0436615!4d-2.7920699!16s%2Fg%2F11c2lbns0c" },
  { name: "Bouaké", city: "Bouaké", phone: "07 59 39 93 07", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"], availability: "tous les produits sauf jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+BOUAKE/@7.6858725,-5.0404133,17z/data=!3m1!4b1!4m6!3m5!1s0xfc7ff7762bf485b:0xbc3a448ff01148d9!8m2!3d7.6858725!4d-5.0404133!16s%2Fg%2F11n72p_1dz?entry=ttu" },
  { name: "Bouaflé", city: "Bouaflé", phone: "07 59 08 11 83", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SGS+SICTA+BOUAFL%C3%89/@6.9891243,-5.7570338,17z/data=!3m1!4b1!4m6!3m5!1s0xfb9016ce5505b9b:0x708333bfa37624ae!8m2!3d6.9891243!4d-5.7548398!16s%2Fg%2F11rklxq1_t" },
  { name: "Dabou", city: "Dabou", phone: "07 68 62 84 35", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA/@5.3193281,-4.3876563,17z/data=!4m6!3m5!1s0xfc1cb1a7686fc17:0x33d672359180e2c9!8m2!3d5.3193281!4d-4.3854623!16s%2Fg%2F11sdsl8s58?entry=ttu" },
  { name: "Daloa", city: "Daloa", phone: "07 67 45 90 93", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA/@6.8695029,-6.4560197,17z/data=!3m1!4b1!4m6!3m5!1s0xfbbd913cdf267ef:0x10cb8b906623f7d0!8m2!3d6.8695029!4d-6.4538257!16s%2Fg%2F11h4zqfj9h" },
  { name: "Daoukro", city: "Daoukro", phone: "07 08 26 46 19", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+DAOUKRO/@5.3291625,-4.0768352,12z/data=!4m10!1m2!2m1!1ssicta!3m6!1s0xfc1eb6aaaaaaaab:0xbc0fc7b76dd9014a!8m2!3d5.3599517!4d-4.0082563!15sCgVzaWN0YZIBFmNhcl9pbnNwZWN0aW9uX3N0YXRpb27gAQA!16s%2Fg%2F11ggrrrtpq" },
  { name: "Divo", city: "Divo", phone: "07 59 39 93 04", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+DIVO/@5.8425965,-5.3327308,17z/data=!3m1!4b1!4m6!3m5!1s0xfbf73a5169ddcdf:0xd96d064010130115!8m2!3d5.8425965!4d-5.3305368!16s%2Fg%2F11k4jst4pz" },
  { name: "Gagnoa", city: "Gagnoa", phone: "07 07 00 92 12", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/Sicta+Gagnoa/@5.2615389,-4.0031421,17z/data=!3m1!4b1!4m6!3m5!1s0xfc1e969d8e5c851:0x9dfc6114eb74899a!8m2!3d5.2615389!4d-4.0005672!16s%2Fg%2F11csbczrjs?entry=ttu" },
  { name: "Guiglo", city: "Guiglo", phone: "07 57 44 02 69", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/Sicta+Guiglo/@6.5520419,-7.4958559,17.58z/data=!4m6!3m5!1s0xfbb4375cdd0d53b:0x559c63035bc726c2!8m2!3d6.5510775!4d-7.4926936!16s%2Fg%2F11tgf1lfx2?entry=ttu" },
  { name: "Korhogo", city: "Korhogo", phone: "07 59 08 11 79", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA/@9.4670554,-5.6221423,17z/data=!3m1!4b1!4m6!3m5!1s0xfb5c9bcac608d39:0x488fb9d02abb86c0!8m2!3d9.4670554!4d-5.6199483!16s%2Fg%2F11c1tmws3f" },
  { name: "Man", city: "Man", phone: "07 07 70 53 07", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/Sicta+YOPOUGON/@5.3291625,-4.0768352,12z/data=!4m10!1m2!2m1!1ssicta!3m6!1s0xfc1c0057ec56f9b:0x1d4e3ad341a9c9fe!8m2!3d5.3723248!4d-4.0794904!15sCgVzaWN0YZIBFmNhcl9pbnNwZWN0aW9uX3N0YXRpb27gAQA!16s%2Fg%2F11f55yygd7" },
  { name: "Odienné", city: "Odienné", phone: "07 57 43 83 68", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+Odienne/@9.4890907,-7.5654555,17z/data=!3m1!4b1!4m6!3m5!1s0xfb26d4e5d885229:0x1317803c77849456!8m2!3d9.4890907!4d-7.5632615!16s%2Fg%2F11p1235nl3" },
  { name: "San Pédro", city: "San Pédro", phone: "07 59 39 93 03", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+SAN-PEDRO/@4.7771671,-6.647725,17z/data=!3m1!4b1!4m6!3m5!1s0xf9613a0999d0da5:0xd3852e494fdc53ae!8m2!3d4.7771671!4d-6.645531!16s%2Fg%2F11sdng0rvn" },
  { name: "Soubré", city: "Soubré", phone: "07 59 39 93 05", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+SOUBR%C3%89/@5.7881934,-6.6008071,17z/data=!3m1!4b1!4m6!3m5!1s0xfbc31308483b5e7:0x48aaad2c8dbb051!8m2!3d5.7881934!4d-6.5986131!16s%2Fg%2F11sdnfdq_p" },
  { name: "Yamoussoukro", city: "Yamoussoukro", phone: "07 48 48 16 66", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/Sicta+SGS/@6.8174777,-5.2906623,17z/data=!3m1!4b1!4m6!3m5!1s0xfb891381a4ea59d:0xfa655bd9b4d63c87!8m2!3d6.8174777!4d-5.2884683!16s%2Fg%2F11f159hn2k" },
  { name: "Yaou", city: "Yaou", phone: "07 59 39 93 06", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+YAOU+korka/@5.2358374,-3.6397377,17z/data=!3m1!4b1!4m6!3m5!1s0xfc21b102a68fc5f:0x45cef1a5fe724728!8m2!3d5.2358374!4d-3.6375437!16s%2Fg%2F11hyl3qw82" }
];

// Tableau 2 — Réseau Abidjan (8 stations fixes + 2 bancs mobiles)
const agenciesReseauAbidjan = [
  { name: "Abatta", city: "Abidjan", phone: "07 59 08 11 84", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+ABATTA/@5.3291625,-4.0768352,12z/data=!4m10!1m2!2m1!1ssicta!3m6!1s0xfc1ed756d0c968f:0xcce6b7988954da6d!8m2!3d5.341496!4d-3.9229077!15sCgVzaWN0YZIBEGNvcnBvcmF0ZV9vZmZpY2XgAQA!16s%2Fg%2F11jv5tlk03" },
  { name: "Angré", city: "Abidjan", phone: "07 67 11 04 85", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage" },
  { name: "Guichet Unique", city: "Abidjan", phone: "07 09 52 08 09", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/Guichet+Unique+Automobile/@5.2629958,-4.0054962,17z/data=!3m1!4b1!4m6!3m5!1s0xfc1e92387961ae3:0xdd72ce3ac58181fb!8m2!3d5.2629958!4d-4.0033022!16s%2Fg%2F11c6zyhq5f" },
  { name: "Marcory", city: "Abidjan", phone: "27 21 21 29 90", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/dir/5.3673984,-3.997696/7X6X%2BJQ7+Sicta+Vridi,+Boulevard+de+Vridi,+Abidjan/@5.3116538,-4.031291,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0xfc1e969d8e5c851:0x9dfc6114eb74899a!2m2!1d-4.0005858!2d5.2615576?entry=ttu" },
  { name: "Plateau", city: "Abidjan", phone: "07 00 25 88 93", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO", "Pesée"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/Sicta,+PLATEAU/@5.3291625,-4.0768352,12z/data=!4m10!1m2!2m1!1ssicta!3m6!1s0xfc1eb192368ea59:0xb01728da43de6a06!8m2!3d5.3295783!4d-4.0271933!15sCgVzaWN0YZIBEGNvcnBvcmF0ZV9vZmZpY2XgAQA!16s%2Fg%2F11fktjd4cw" },
  { name: "Vridi", city: "Abidjan", phone: "07 47 59 63 00", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf jaugeage", mapsUrl: "https://www.google.com/maps/place/Sicta+Vridi/@5.3291625,-4.0768352,12z/data=!4m10!1m2!2m1!1ssicta!3m6!1s0xfc1e969d8e5c851:0x9dfc6114eb74899a!8m2!3d5.2615389!4d-4.0005672!15sCgVzaWN0YZIBFmNhcl9pbnNwZWN0aW9uX3N0YXRpb27gAQA!16s%2Fg%2F11csbczrjs" },
  { name: "Yopougon Zone Industrielle", city: "Abidjan", phone: "07 07 62 28 48", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO", mapsUrl: "https://www.google.com/maps/place/Sicta+YOPOUGON/@5.3291625,-4.0768352,12z/data=!4m10!1m2!2m1!1ssicta!3m6!1s0xfc1c0057ec56f9b:0x1d4e3ad341a9c9fe!8m2!3d5.3727557!4d-4.0800007!15sCgVzaWN0YZIBFmNhcl9pbnNwZWN0aW9uX3N0YXRpb27gAQA!16s%2Fg%2F11f55yygd7?entry=ttu" },
  { name: "Yopougon Niangon", city: "Abidjan", phone: "07 09 71 82 77", hours: "Lun-Ven: 7h-17h", services: ["Contrôle technique", "CIVIO"], availability: "tous les produits sauf CIVIO et jaugeage", mapsUrl: "https://www.google.com/maps/place/SICTA+NIANGON/@5.3291625,-4.0768352,12z/data=!4m10!1m2!2m1!1ssicta!3m6!1s0xfc1c1db491d6ac5:0x9055399f929e78fb!8m2!3d5.3214679!4d-4.0906814!15sCgVzaWN0YZIBEnZlaGljbGVfaW5zcGVjdGlvbuABAA!16s%2Fg%2F11r9pym1_c" },
  { name: "Banc Mobile Abidjan", city: "Rayon de 50km", phone: "07 07 74 80 79", hours: "Sur RDV", services: ["Contrôle Technique"], availability: "Contrôle technique complet sur site" },
  { name: "Fourgon Intervention", city: "Abidjan & Zone Industrielle", phone: "07 57 25 31 23", hours: "Sur RDV", services: ["Contrôle Technique"], availability: "Service Grands Comptes & Parcs" }
];

// Tableau 3 — Stations Périodiques (22 stations temporaires)
const stationsPeriodiques = [
  { name: "Bongouanou", city: "Bongouanou", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Boundiali", city: "Boundiali", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Bouna", city: "Bouna", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Danané", city: "Danané", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Dimbokro", city: "Dimbokro", schedule: "Périodique", services: ["Contrôle technique", "CIVIO"] },
  { name: "Duékoué", city: "Duékoué", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Fresco", city: "Fresco", schedule: "Périodique", services: ["Contrôle technique", "CIVIO"] },
  { name: "Ferkessédougou", city: "Ferkessédougou", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Grand Lahou", city: "Grand Lahou", schedule: "Périodique", services: ["Contrôle technique", "CIVIO"] },
  { name: "Issia", city: "Issia", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Katiola", city: "Katiola", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "M'bahiakro", city: "M'bahiakro", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Méagui", city: "Méagui", schedule: "Périodique", services: ["Contrôle technique", "CIVIO"] },
  { name: "Oumé", city: "Oumé", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Sassandra", city: "Sassandra", schedule: "Périodique", services: ["Contrôle technique", "CIVIO"] },
  { name: "Séguéla", city: "Séguéla", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Tabou", city: "Tabou", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Tiassalé", city: "Tiassalé", schedule: "Périodique", services: ["Contrôle technique", "CIVIO"] },
  { name: "Tengrela", city: "Tengrela", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Toumodi", city: "Toumodi", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Touba", city: "Touba", schedule: "Périodique", services: ["Contrôle technique"] },
  { name: "Zuénoula", city: "Zuénoula", schedule: "Périodique", services: ["Contrôle technique"] }
];

// 4 Équipes de Mission (pour la section Missions)
const missionTeams = [
  { team: "Équipe 1", base: "Abidjan", zones: ["Abidjan et environs"] },
  { team: "Équipe 2", base: "Yamoussoukro", zones: ["Centre du pays"] },
  { team: "Équipe 3", base: "Soubré", zones: ["Ouest du pays"] },
  { team: "Équipe 4", base: "Korhogo", zones: ["Nord du pays"] }
];

const ITEMS_PER_PAGE_PERMANENT = 9;
const ITEMS_PER_PAGE_TEMPORARY = 12;

/** Extrait lat/lng d'une URL Google Maps (place ou dir) */
function parseLatLngFromMapsUrl(url: string): { lat: number; lng: number } | null {
  const m1 = url.match(/!8m2!3d([\d.-]+)!4d([\d.-]+)/);
  if (m1) return { lat: parseFloat(m1[1]), lng: parseFloat(m1[2]) };
  const m2 = url.match(/@[\d.-]+,[\d.-]+,?\d*z.*!8m2!3d([\d.-]+)!4d([\d.-]+)/) ?? url.match(/!8m2!3d([\d.-]+)!4d([\d.-]+)/);
  if (m2) return { lat: parseFloat(m2[1]), lng: parseFloat(m2[2]) };
  const m3 = url.match(/!2m2!1d([\d.-]+)!2d([\d.-]+)/);
  if (m3) return { lat: parseFloat(m3[2]), lng: parseFloat(m3[1]) };
  const m4 = url.match(/@([\d.-]+),([\d.-]+)/);
  if (m4) return { lat: parseFloat(m4[1]), lng: parseFloat(m4[2]) };
  return null;
}

/** Liste des agences avec coordonnées (pour "agence la plus proche") */
function buildAgenciesWithCoords(): { name: string; city: string; mapsUrl: string; lat: number; lng: number }[] {
  const out: { name: string; city: string; mapsUrl: string; lat: number; lng: number }[] = [];
  for (const a of [...agenciesInterieurPays, ...agenciesReseauAbidjan]) {
    if (typeof (a as { mapsUrl?: string }).mapsUrl !== "string") continue;
    const url = (a as { mapsUrl: string }).mapsUrl;
    const coords = parseLatLngFromMapsUrl(url);
    if (coords) out.push({ name: a.name, city: a.city, mapsUrl: url, ...coords });
  }
  return out;
}
const agenciesWithCoords = buildAgenciesWithCoords();

/** Distance Haversine en km entre deux points (lat/lng en degrés) */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const Network = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const didRunRechercher = useRef(false);
  const [interieurPage, setInterieurPage] = useState(1);
  const [periodiquesPage, setPeriodiquesPage] = useState(1);
  const [locateLoading, setLocateLoading] = useState(false);
  const [locateError, setLocateError] = useState<string | null>(null);

  // Pagination — Intérieur du Pays (tableau 1)
  const totalInterieurPages = Math.ceil(agenciesInterieurPays.length / ITEMS_PER_PAGE_PERMANENT);
  const startInterieur = (interieurPage - 1) * ITEMS_PER_PAGE_PERMANENT;
  const endInterieur = startInterieur + ITEMS_PER_PAGE_PERMANENT;
  const currentInterieurAgencies = agenciesInterieurPays.slice(startInterieur, endInterieur);

  // Pagination — Stations Périodiques (tableau 3) — Réseau Abidjan (tableau 2) affiché en entier, pas de pagination
  const totalPeriodiquesPages = Math.ceil(stationsPeriodiques.length / ITEMS_PER_PAGE_TEMPORARY);
  const startPeriodiques = (periodiquesPage - 1) * ITEMS_PER_PAGE_TEMPORARY;
  const endPeriodiques = startPeriodiques + ITEMS_PER_PAGE_TEMPORARY;
  const currentPeriodiquesStations = stationsPeriodiques.slice(startPeriodiques, endPeriodiques);

  const handleInterieurPageChange = (newPage: number) => {
    setInterieurPage(newPage);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handlePeriodiquesPageChange = (newPage: number) => {
    setPeriodiquesPage(newPage);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  /** Ouvre l’itinéraire vers l’agence la plus proche de la position de l’utilisateur */
  const handleLocateNearestAgency = () => {
    setLocateError(null);
    setLocateLoading(true);
    if (agenciesWithCoords.length === 0) {
      setLocateError("Aucune agence avec coordonnées disponible.");
      setLocateLoading(false);
      return;
    }
    if (!navigator.geolocation) {
      setLocateError("La géolocalisation n’est pas prise en charge par votre navigateur.");
      setLocateLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let nearest = agenciesWithCoords[0];
        let minDist = haversineKm(latitude, longitude, nearest.lat, nearest.lng);
        for (let i = 1; i < agenciesWithCoords.length; i++) {
          const d = haversineKm(latitude, longitude, agenciesWithCoords[i].lat, agenciesWithCoords[i].lng);
          if (d < minDist) {
            minDist = d;
            nearest = agenciesWithCoords[i];
          }
        }
        const dirUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${nearest.lat},${nearest.lng}&travelmode=driving`;
        window.open(dirUrl, "_blank", "noopener,noreferrer");
        setLocateLoading(false);
      },
      (err) => {
        setLocateError(
          err.code === 1
            ? "Localisation refusée. Autorisez l’accès à votre position pour trouver l’agence la plus proche."
            : "Impossible d’accéder à votre position. Vérifiez que la géolocalisation est activée."
        );
        setLocateLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Depuis la page Contact, clic sur « Rechercher » → recherche par position puis itinéraire
  useEffect(() => {
    const fromRechercher = (location.state as { rechercher?: boolean } | null)?.rechercher === true;
    if (fromRechercher && !didRunRechercher.current) {
      didRunRechercher.current = true;
      navigate(location.pathname, { replace: true, state: {} });
      handleLocateNearestAgency();
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <PageTransition>
      <SEO
        title="Notre Réseau - Agences Abidjan et Intérieur, Stations Périodiques"
        description="Découvrez le réseau SICTA : 29 agences permanentes, dont le Réseau Abidjan avec bancs mobiles, et 22 stations périodiques pour une couverture à 100% du territoire national."
        keywords="agence SICTA, station contrôle technique, Abidjan Plateau, Vridi, Yopougon, banc mobile, station périodique, Côte d'Ivoire"
        url="/reseau"
      />
      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                <span>Réseau National SICTA</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-sicta-grey-dark">Notre</span>{" "}
                <span className="text-gradient">Réseau</span>
              </h1>
              <p className="text-lg md:text-xl text-sicta-grey-light leading-relaxed">
                29 stations permanentes et 22 stations temporaires réparties sur l'ensemble
                du territoire ivoirien pour vous servir au plus près.
              </p>
            </div>
          </div>
        </section>

        {/* Network Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">29</div>
                <div className="text-sm md:text-base text-sicta-grey-light">Stations permanentes</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">22</div>
                <div className="text-sm md:text-base text-sicta-grey-light">Stations temporaires</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">1500+</div>
                <div className="text-sm md:text-base text-sicta-grey-light">Véhicules/jour</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="text-sm md:text-base text-sicta-grey-light">Couverture nationale</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stations List */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="permanent" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto gap-1 sm:gap-2 mb-8 bg-transparent p-0">
                <TabsTrigger value="permanent" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white border border-primary/20 min-w-0">
                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">Intérieur du Pays</span>
                </TabsTrigger>
                <TabsTrigger value="abidjan" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white border border-primary/20 min-w-0">
                  <Map className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">Réseau Abidjan</span>
                </TabsTrigger>
                <TabsTrigger value="temporary" className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-1 sm:px-3 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-white border border-primary/20 min-w-0">
                  <CalendarClock className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">Stations Périodiques</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="permanent">
                <div className="text-center mb-8">
                  <p className="text-lg text-sicta-grey-light">
                    Nos principales agences pour tous vos besoins de contrôle technique
                  </p>
                  <p className="text-sm text-sicta-grey-light mt-2">
                    Affichage {startInterieur + 1}-{Math.min(endInterieur, agenciesInterieurPays.length)} sur {agenciesInterieurPays.length} agences
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {currentInterieurAgencies.map((agency, index) => (
                    <Card key={index} className="card-elevated h-full">
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Car className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold">{agency.name}</h3>
                        </div>

                        <div className="space-y-3 mb-6 flex-grow">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-sicta-grey-light mt-1 flex-shrink-0" />
                            <div className="text-sm">
                              <div className="text-sicta-grey-light">{agency.city}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-sicta-grey-light" />
                            <span className="text-sm text-sicta-grey-light">{agency.phone}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-sicta-grey-light" />
                            <span className="text-sm text-sicta-grey-light">{agency.hours}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm font-medium mb-1">Services disponibles :</div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {agency.services.map((service, serviceIndex) => (
                              <span
                                key={serviceIndex}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs font-semibold text-sicta-orange-light bg-sicta-orange-light/5 p-2 rounded-md border border-sicta-orange-light/20">
                            Disponibilité : {agency.availability || "tous les produits sauf CIVIO et jaugeage"}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button className="btn-hero flex-1 text-sm py-2">
                            Réserver
                          </Button>
                          <Button variant="outline" className="flex-1 text-sm py-2" asChild>
                            <a
                              href={"mapsUrl" in agency && typeof agency.mapsUrl === "string" ? agency.mapsUrl : `https://www.google.com/maps/search/?api=1&query=Sicta+${encodeURIComponent(agency.name)}+${encodeURIComponent(agency.city)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Itinéraire
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination — Intérieur du Pays */}
                {totalInterieurPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInterieurPageChange(interieurPage - 1)}
                      disabled={interieurPage === 1}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Précédent
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalInterieurPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={page === interieurPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInterieurPageChange(page)}
                          className={page === interieurPage ? "bg-primary text-white" : ""}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInterieurPageChange(interieurPage + 1)}
                      disabled={interieurPage === totalInterieurPages}
                      className="flex items-center gap-1"
                    >
                      Suivant
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="abidjan">
                <div className="text-center mb-8">
                  <p className="text-lg text-sicta-grey-light">
                    Retrouvez nos stations fixes et nos bancs mobiles sur le Grand Abidjan
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {agenciesReseauAbidjan.map((agency, index) => (
                    <Card key={index} className="card-elevated h-full">
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            {agency.name.includes("Banc") ? <Navigation className="h-5 w-5 text-primary" /> : <Car className="h-5 w-5 text-primary" />}
                          </div>
                          <h3 className="text-lg font-semibold">{agency.name}</h3>
                        </div>

                        <div className="space-y-3 mb-6 flex-grow">
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-sicta-grey-light mt-1 flex-shrink-0" />
                            <div className="text-sm">
                              <div className="text-sicta-grey-light">{agency.city}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-sicta-grey-light" />
                            <span className="text-sm text-sicta-grey-light">{agency.phone}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-sicta-grey-light" />
                            <span className="text-sm text-sicta-grey-light">{agency.hours}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">Disponibilité :</div>
                          <div className="text-sm font-semibold text-sicta-orange-light bg-sicta-orange-light/5 p-3 rounded-md border border-sicta-orange-light/20 italic">
                            {agency.availability}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button className="btn-hero flex-1 text-sm py-2">
                            Réserver
                          </Button>
                          <Button variant="outline" className="flex-1 text-sm py-2" asChild>
                            <a
                              href={"mapsUrl" in agency && typeof agency.mapsUrl === "string" ? agency.mapsUrl : `https://www.google.com/maps/search/?api=1&query=Sicta+${encodeURIComponent(agency.name)}+${encodeURIComponent(agency.city)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Itinéraire
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="temporary">
                <div className="text-center mb-8">
                  <p className="text-lg text-sicta-grey-light">
                    Unités mobiles au service des zones périodiques et couverture 100% du territoire
                  </p>
                  <p className="text-sm text-sicta-grey-light mt-2">
                    Affichage {startPeriodiques + 1}-{Math.min(endPeriodiques, stationsPeriodiques.length)} sur {stationsPeriodiques.length} stations
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {currentPeriodiquesStations.map((station, index) => (
                    <Card key={index} className="card-elevated">
                      <div className="p-6 text-center">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Car className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{station.name}</h3>
                        <div className="text-sicta-grey-light text-sm mb-3">{station.city}</div>
                        <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mb-4">
                          {station.schedule}
                        </div>
                        <div className="space-y-1">
                          {station.services.map((service, serviceIndex) => (
                            <div key={serviceIndex} className="text-xs text-sicta-grey-light">
                              {service}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination — Stations Périodiques */}
                {totalPeriodiquesPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePeriodiquesPageChange(periodiquesPage - 1)}
                      disabled={periodiquesPage === 1}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Précédent
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPeriodiquesPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={page === periodiquesPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePeriodiquesPageChange(page)}
                          className={page === periodiquesPage ? "bg-primary text-white" : ""}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePeriodiquesPageChange(periodiquesPage + 1)}
                      disabled={periodiquesPage === totalPeriodiquesPages}
                      className="flex items-center gap-1"
                    >
                      Suivant
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>


        {/* Mobile Infrastructure */}
        <section className="py-20 bg-gradient-to-br from-sicta-grey/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-sicta-grey-dark mb-4">
                Infrastructure Mobile
              </h2>
              <p className="text-xl text-sicta-grey-light max-w-3xl mx-auto">
                Unités mobiles et bancs mobiles pour desservir tout le territoire ivoirien
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* 4 Stations Mobiles */}
              <Card className="card-elevated">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Navigation className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-sicta-grey-dark">4 Stations Mobiles</h3>
                      <p className="text-sicta-grey-light">Unités de contrôle itinérantes</p>
                    </div>
                  </div>
                  <p className="text-sicta-grey-light mb-6">
                    Nos stations mobiles équipées parcourent les zones moins accessibles pour apporter
                    nos services de contrôle technique partout en Côte d'Ivoire.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold text-primary">100%</div>
                    <div className="text-sicta-grey-light">Couverture totale avec mobilité partout</div>
                  </div>
                </div>
              </Card>

              {/* 4 Bancs Mobiles */}
              <Card className="card-elevated">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Car className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-sicta-grey-dark">4 Bancs Mobiles</h3>
                      <p className="text-sicta-grey-light">Équipement technique itinérant</p>
                    </div>
                  </div>
                  <p className="text-sicta-grey-light mb-6">
                    Nos bancs mobiles assurent la même qualité de contrôle technique que nos stations permanentes,
                    avec des équipements certifiés et des techniciens qualifiés.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold text-primary">ISO</div>
                    <div className="text-sicta-grey-light">Certifié 9001:2015</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-orange-400">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Une agence près de chez vous</h2>
            <p className="text-xl mb-8 opacity-90">
              Trouvez l’agence SICTA la plus proche et réservez votre contrôle technique
            </p>
            <Button
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={handleLocateNearestAgency}
              disabled={locateLoading}
            >
              <MapPin className="h-5 w-5 mr-3" />
              {locateLoading ? "Recherche en cours…" : "Localiser une agence"}
            </Button>
            {locateError && (
              <p className="mt-4 text-sm text-white/90 max-w-md mx-auto">{locateError}</p>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Network;