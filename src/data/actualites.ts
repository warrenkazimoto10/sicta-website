export type NewsCategoryId = "tous" | "entreprise" | "securite" | "innovation" | "reglementation";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  author: string;
  category: NewsCategoryId;
  readTime: string;
  image: string;
  featured?: boolean;
}

export const NEWS_CATEGORIES: { id: NewsCategoryId; label: string }[] = [
  { id: "tous", label: "Toutes les actualités" },
  { id: "entreprise", label: "Entreprise" },
  { id: "securite", label: "Sécurité routière" },
  { id: "innovation", label: "Innovation" },
  { id: "reglementation", label: "Réglementation" },
];

export const ACTUALITES: Article[] = [
  {
    id: "1",
    slug: "sicta-mayelia-participations-nouvelle-ere",
    title: "SICTA rejoint le groupe Mayelia Participations : une nouvelle ère d'innovation",
    excerpt: "Le rachat de SICTA par Mayelia Participations marque un tournant stratégique pour le leader du contrôle technique automobile en Côte d'Ivoire. Cette acquisition ouvre de nouvelles perspectives d'innovation et de développement au service des usagers.",
    content: [
      "Le rachat de SICTA par Mayelia Participations, annoncé en décembre 2024, constitue une étape majeure dans l'histoire de la Société Ivoirienne de Contrôles Techniques Automobiles et Industriels. Filiale historique du groupe SGS, SICTA reprend son destin en main sous l'égide d'un acteur ivoirien résolument tourné vers l'innovation et la modernisation.",
      "Cette transition s'inscrit dans une dynamique de renforcement des capacités nationales dans le domaine du contrôle technique. Mayelia Participations apporte à SICTA les moyens financiers et stratégiques pour accélérer la digitalisation, l'extension du réseau et l'amélioration continue de la qualité de service.",
      "Les usagers peuvent compter sur la continuité des services : même équipe, même engagement, avec à la clé des investissements renforcés dans les équipements et les formations. La nouvelle ère SICTA 2025 place la sécurité routière et la satisfaction client au cœur des priorités.",
    ],
    date: "2024-12-15",
    author: "Direction SICTA",
    category: "entreprise",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: "2",
    slug: "controle-technique-vehicules-occasion-importes",
    title: "Renforcement du contrôle technique des véhicules d'occasion importés",
    excerpt: "À compter du 1er janvier 2025, tout véhicule d'occasion importé devra présenter un contrôle technique conforme avant mise en circulation. SICTA accompagne les professionnels et les particuliers dans cette démarche.",
    content: [
      "En cohérence avec les orientations du Ministère des Transports et afin de renforcer la sécurité sur les routes ivoiriennes, une nouvelle mesure entre en vigueur au 1er janvier 2025 : tout véhicule d'occasion importé devra être soumis à un contrôle technique conforme avant toute mise en circulation.",
      "SICTA, en tant qu'opérateur de référence, met à disposition de tous – particuliers comme professionnels de l'import – un réseau de 29 stations permanentes et 22 stations temporaires. Les points de contrôle sont habilités à délivrer le certificat requis après inspection selon le référentiel en vigueur.",
      "Les importateurs et acheteurs sont invités à anticiper cette démarche en prenant rendez-vous sur sicta.ci ou auprès de nos agences. Un véhicule conforme, c'est une route plus sûre pour tous.",
    ],
    date: "2024-12-10",
    author: "Service Réglementation",
    category: "reglementation",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    slug: "nouveau-centre-yopougon-zone-industrielle",
    title: "Nouveau centre de contrôle SICTA à Yopougon : ouverture et capacités accrues",
    excerpt: "Le nouveau site de Yopougon Zone Industrielle permet de traiter davantage de véhicules par jour et de réduire les temps d'attente. Équipements de dernière génération et équipe dédiée à votre service.",
    content: [
      "Le centre SICTA de Yopougon Zone Industrielle a été inauguré dans le courant du mois de décembre 2024. Ce nouveau site s'inscrit dans le plan de développement du réseau et permet de mieux couvrir la zone ouest d'Abidjan.",
      "Équipé de matériel de contrôle de dernière génération, le centre peut traiter un volume accru de véhicules tout en garantissant les 123 points de contrôle réglementaires. L'équipe sur place a été formée aux protocoles et aux outils les plus récents.",
      "Les usagers de Yopougon et des environs peuvent désormais réserver leur créneau en ligne ou se présenter sur place. L'objectif est de limiter les temps d'attente et d'offrir un service de proximité de qualité.",
    ],
    date: "2024-12-08",
    author: "Communication SICTA",
    category: "entreprise",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    slug: "campagne-un-controle-une-vie-securite-routiere",
    title: "Campagne nationale « Un contrôle, une vie » pour la sécurité routière",
    excerpt: "SICTA s'associe aux autorités pour rappeler l'importance du contrôle technique dans la réduction des accidents. Véhicule en bon état = routes plus sûres pour tous.",
    content: [
      "La campagne « Un contrôle, une vie » portée par les autorités en matière de sécurité routière vise à sensibiliser conducteurs et propriétaires à l'entretien et au contrôle régulier des véhicules. SICTA y participe en tant que partenaire technique et acteur de terrain.",
      "Un véhicule contrôlé, c'est des freins, des pneus, des éclairages et une mécanique globale conformes aux normes. Autant d'éléments qui réduisent les risques d'accident. Le contrôle technique n'est pas une formalité : c'est un acte de responsabilité.",
      "Tout au long de l'année 2025, des spots, affiches et actions de proximité rappelleront ce message. SICTA continuera d'ouvrir ses portes et d'inviter chaque usager à prendre rendez-vous pour un contrôle dans les délais.",
    ],
    date: "2024-12-05",
    author: "Partenariats & Prévention",
    category: "securite",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    slug: "prise-rendez-vous-en-ligne-reseau-sicta",
    title: "Déploiement du logiciel de prise de rendez-vous en ligne sur tout le réseau",
    excerpt: "Réserver votre créneau de contrôle technique en quelques clics depuis votre smartphone ou votre ordinateur. Disponible sur l'ensemble des agences SICTA.",
    content: [
      "Depuis le 1er décembre 2024, la prise de rendez-vous en ligne est disponible sur l'ensemble du réseau SICTA. Plus besoin d'appeler ou de vous déplacer pour réserver : un formulaire simple sur sicta.ci ou depuis notre page dédiée suffit.",
      "Vous choisissez votre agence, la date et le créneau qui vous conviennent, puis vous recevez une confirmation par e-mail et par SMS. Le jour J, présentez-vous à l'heure avec votre véhicule et votre pièce d'identité.",
      "Cette évolution s'accompagne d'une modernisation des outils internes : file d'attente mieux gérée, temps de passage optimisés, et à terme possibilité de payer en ligne. L'objectif est de vous faire gagner du temps tout en maintenant la qualité du contrôle.",
    ],
    date: "2024-12-01",
    author: "Direction des Systèmes d'information",
    category: "innovation",
    readTime: "2 min",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    slug: "formation-inspecteurs-123-points-normes-2024",
    title: "Formation continue des inspecteurs : 123 points de contrôle et normes 2024",
    excerpt: "Nos équipes techniques ont suivi une session de mise à niveau sur les protocoles et les normes en vigueur. Garantir la qualité et l'homogénéité des contrôles sur tout le territoire.",
    content: [
      "En novembre 2024, les inspecteurs SICTA ont participé à une session de formation continue centrée sur les 123 points de contrôle et l'évolution des normes. Cette mise à niveau est réalisée régulièrement pour garantir un même niveau d'exigence sur tout le réseau.",
      "Les thèmes abordés ont couvert les contrôles mécaniques, les émissions, l'éclairage et la signalisation, ainsi que les aspects réglementaires et documentaires. Les formateurs ont insisté sur l'objectivité du contrôle et la relation avec l'usager.",
      "Résultat : des contrôles toujours plus homogènes, quelle que soit l'agence fréquentée, et une meilleure compréhension des refus ou des contre-visites. La formation continue est un pilier de notre démarche qualité ISO 9001:2015.",
    ],
    date: "2024-11-28",
    author: "Ressources humaines & Qualité",
    category: "entreprise",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    slug: "validite-controle-technique-vehicules-recents",
    title: "Prolongation du délai de validité du contrôle technique pour les véhicules récents",
    excerpt: "Pour les véhicules de moins de 5 ans, la validité du contrôle technique passe à 12 mois à compter du prochain rendez-vous. Détails et conditions sur sicta.ci.",
    content: [
      "Dans le cadre de l'évolution de la réglementation du contrôle technique, les véhicules de moins de 5 ans peuvent désormais bénéficier d'une validité du certificat portée à 12 mois (au lieu de 6) à compter du prochain contrôle.",
      "Cette mesure vise à alléger la charge pour les usagers dont le véhicule est récent et dont l'état est en général conforme. Elle ne dispense en rien du respect du délai : passé la date d'échéance, le véhicule doit avoir repassé un contrôle pour rester en règle.",
      "Les conditions précises (âge du véhicule, date de mise en circulation, absence de contre-visite récente, etc.) sont détaillées sur sicta.ci et disponibles auprès de nos agences. En cas de doute, un conseiller pourra vous orienter.",
    ],
    date: "2024-11-25",
    author: "Service Juridique & Réglementation",
    category: "reglementation",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
  {
    id: "8",
    slug: "pesee-poids-lourds-obligations-points-service",
    title: "SICTA et la pesée des poids lourds : rappel des obligations et des points de service",
    excerpt: "Rappel des obligations de pesée pour les transporteurs et liste des agences SICTA équipées pour le pesage. San-Pédro, Bouaké, Yamoussoukro et Plateau parmi les sites concernés.",
    content: [
      "La pesée des poids lourds est une obligation réglementaire et un enjeu de sécurité : surcharge = risque accru d'accident et de dégradation des chaussées. SICTA rappelle aux transporteurs et aux chargeurs les règles en vigueur et les points de service disponibles.",
      "Plusieurs agences SICTA sont équipées pour la pesée des véhicules lourds : San-Pédro, Bouaké, Yamoussoukro, Plateau (Abidjan), et d'autres selon les régions. La liste à jour est consultable sur la page Réseau de notre site.",
      "Un certificat de pesée est délivré à l'issue du contrôle. En cas de surcharge, des recommandations sont remises pour la mise en conformité. Pour planifier une pesée ou obtenir des créneaux dédiés aux professionnels, contactez l'agence concernée ou notre standard.",
    ],
    date: "2024-11-20",
    author: "Service Pesée & Contrôle",
    category: "securite",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ACTUALITES.find((a) => a.slug === slug);
}

export function getArticleById(id: string): Article | undefined {
  return ACTUALITES.find((a) => a.id === id);
}

export function getCategoryLabel(categoryId: NewsCategoryId): string {
  const cat = NEWS_CATEGORIES.find((c) => c.id === categoryId);
  return cat?.label ?? categoryId;
}

export function getRelatedArticles(currentSlug: string, category: NewsCategoryId, limit = 3): Article[] {
  return ACTUALITES.filter((a) => a.slug !== currentSlug && a.category === category).slice(0, limit);
}
