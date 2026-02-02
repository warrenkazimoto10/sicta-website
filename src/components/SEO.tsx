import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title = "SICTA - Contrôle Technique Automobile en Côte d'Ivoire",
    description = "Leader du contrôle technique automobile en Côte d'Ivoire depuis 1974. 29 stations permanentes, 22 stations temporaires. Réservez votre contrôle technique en ligne.",
    keywords = "contrôle technique, automobile, Côte d'Ivoire, SICTA, inspection véhicule, sécurité routière, réservation en ligne, Abidjan, Yamoussoukro",
    image = "/logo-sicta.png",
    url = "https://www.sicta.ci",
    type = "website"
}: SEOProps) => {
    const fullTitle = title.includes("SICTA") ? title : `${title} | SICTA`;
    const fullUrl = url.startsWith("http") ? url : `https://www.sicta.ci${url}`;

    return (
        <Helmet>
            {/* Balises Meta de Base */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="SICTA - Société Ivoirienne de Contrôle Technique Automobile" />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="French" />
            <meta name="revisit-after" content="7 days" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="SICTA" />
            <meta property="og:locale" content="fr_CI" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Liens Canoniques */}
            <link rel="canonical" href={fullUrl} />

            {/* Schema.org pour Google */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "SICTA",
                    "legalName": "Société Ivoirienne de Contrôle Technique Automobile",
                    "url": "https://www.sicta.ci",
                    "logo": "https://www.sicta.ci/logo-sicta.png",
                    "foundingDate": "1974",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "CI",
                        "addressLocality": "Abidjan"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+225-27-21-21-29-90",
                        "contactType": "Customer Service",
                        "availableLanguage": ["French"]
                    },
                    "sameAs": [
                        "https://www.facebook.com/sicta.ci",
                        "https://www.linkedin.com/company/sicta"
                    ]
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
