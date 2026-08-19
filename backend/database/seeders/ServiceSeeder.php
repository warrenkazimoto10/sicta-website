<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $meta = [
            'controle-technique' => ['Contrôle Technique', 'Shield',        'controle-technique.png', "Examen réglementaire et obligatoire pour vérifier l'état mécanique des véhicules."],
            'station-mobile'     => ['Station Mobile',      'Navigation',    'station-mobile.png',     "Le contrôle technique se déplace jusqu'à vous, sur site."],
            'civio'              => ['CIVIO',               'Search',        'civio.png',              "Contrôle d'identification des véhicules importés d'occasion."],
            'ivn'                => ['IVN',                 'FileCheck',     'ivn.png',                "Identification des véhicules neufs chez le concessionnaire."],
            'jaugeage-baremage'  => ['Jaugeage & Barémage', 'Gauge',        'jaugeage-baremage.png',  "Mesure certifiée de la capacité volumétrique des citernes."],
            'pre-visite'         => ['Pré-visite',          'ClipboardCheck','pre-visite.png',        "Un pré-diagnostic préventif pour préparer votre contrôle."],
            'ppad'               => ['PPAD',                'MapPin',        'ppad.png',               "Sécurisation et pose de plaques directement à votre domicile."],
            'pesee'              => ['Pesée',               'Scale',         'pesee.jpg',              "Pesage certifié des véhicules et de leur charge."],
            'immatriculation'    => ['Immatriculation',     'FileText',      'immatriculation.png',    "Immatriculation officielle et pose de plaques sécurisées."],
            'vip'                => ['Service VIP',         'Star',          'vip.png',                "Une prise en charge premium, sur rendez-vous et prioritaire."],
            'assistance'         => ['Assistance',          'LifeBuoy',      'assistance.jpg',         "Un accompagnement à chaque étape de vos démarches."],
        ];

        $order = 0;
        foreach ($meta as $slug => [$nom, $icone, $img, $resume]) {
            $order++;
            $service = Service::updateOrCreate(
                ['slug' => $slug],
                [
                    'nom'              => $nom,
                    'icone'            => $icone,
                    'resume'           => $resume,
                    'hero_titre'       => $nom,
                    'hero_sous_titre'  => $resume,
                    'hero_image'       => 'services/' . $img,
                    'meta_title'       => $nom . ' — SICTA',
                    'meta_description' => $resume,
                    'source'           => 'code',
                    'ordre'            => $order,
                    'actif'            => true,
                ]
            );

            // Reconstruit entièrement les blocs (seed complet et idempotent)
            $service->sections()->delete();
            $ordre = 0;
            foreach ($this->blocksFor($slug) as $block) {
                $ordre += 10;
                $service->sections()->create($block + ['ordre' => $ordre, 'actif' => true]);
            }
        }
    }

    private function intro(string $titre, string $html): array
    {
        return ['type' => 'intro', 'titre' => $titre, 'contenu' => ['html' => $html]];
    }

    /** @param array<int,array{0:string,1:string,2:string}> $items [icone, titre, description] */
    private function avantages(string $titre, ?string $sousTitre, array $items): array
    {
        return [
            'type' => 'avantages', 'titre' => $titre, 'sous_titre' => $sousTitre,
            'contenu' => ['items' => array_map(fn($i) => ['icone' => $i[0], 'titre' => $i[1], 'description' => $i[2]], $items)],
        ];
    }

    /** @param array<int,array{0:string,1:string}> $items [titre, description] */
    private function etapes(string $titre, ?string $sousTitre, array $items): array
    {
        return [
            'type' => 'etapes', 'titre' => $titre, 'sous_titre' => $sousTitre,
            'contenu' => ['items' => array_map(fn($i) => ['titre' => $i[0], 'description' => $i[1]], $items)],
        ];
    }

    /** @param array<int,array{0:string,1:string}> $items [titre, description] */
    private function documents(string $titre, array $items): array
    {
        return [
            'type' => 'documents', 'titre' => $titre,
            'contenu' => ['items' => array_map(fn($i) => ['titre' => $i[0], 'description' => $i[1] ?? ''], $items)],
        ];
    }

    private function tarifs(string $titre, ?string $sousTitre, array $colonnes, array $lignes): array
    {
        return ['type' => 'tarifs', 'titre' => $titre, 'sous_titre' => $sousTitre, 'contenu' => ['colonnes' => $colonnes, 'lignes' => $lignes]];
    }

    private function faq(string $titre, array $items): array
    {
        return ['type' => 'faq', 'titre' => $titre, 'contenu' => ['items' => array_map(fn($i) => ['question' => $i[0], 'reponse' => $i[1]], $items)]];
    }

    private function cta(string $titre, string $sousTitre, string $texte = 'Réserver en ligne', string $lien = '/reservation'): array
    {
        return ['type' => 'cta', 'titre' => $titre, 'sous_titre' => $sousTitre, 'contenu' => ['bouton_texte' => $texte, 'bouton_lien' => $lien]];
    }

    private function blocksFor(string $slug): array
    {
        return match ($slug) {

            'controle-technique' => [
                $this->intro("Qu'est-ce que la Visite Technique ?", "<p>La Visite Technique Automobile est un examen réglementaire et obligatoire qui vise à vérifier l'état mécanique des véhicules afin de garantir leur conformité aux normes en matière de sécurité routière et de protection de l'environnement. Elle s'applique à tous les véhicules automobiles en circulation, particuliers comme professionnels, selon une périodicité définie par la réglementation ivoirienne.</p>"),
                $this->avantages("Objectifs du contrôle", null, [
                    ['Shield', 'Fiabilité technique', "Prévenir les risques liés à des défaillances mécaniques."],
                    ['CheckCircle2', 'Conformité réglementaire', "Respecter les normes définies par la législation ivoirienne."],
                    ['Lightbulb', "Protection de l'environnement", "Contrôler et réduire les émissions polluantes."],
                ]),
                $this->avantages("Points de contrôle essentiels", "Un examen complet en plusieurs points", [
                    ['Search', 'Identification', "Identification du véhicule."],
                    ['Car', 'Équipements de sécurité', "Pneumatiques, ceintures, rétroviseurs, sièges, vitrage, triangles."],
                    ['Zap', 'Émissions & bruit', "Émission des gaz et niveau sonore."],
                    ['Settings', 'Freinage & direction', "Freinage, direction, suspension, alignement et dérive."],
                    ['Lightbulb', 'Éclairage', "Éclairage et signalisation."],
                    ['Wrench', 'Sous le véhicule', "Fixation, jeu articulation et roulement, état silentbloc."],
                ]),
                $this->tarifs("Tarifs officiels", "Contrôle technique automobile", ['Prestation', 'Code', 'Prix'], [
                    ['Véhicule léger ≤ 7 CV (PTAC < 3,5 t)', 'VL1', '13 100 FCFA'],
                    ['Véhicule léger > 7 CV (PTAC < 3,5 t)', 'VL2', '15 500 FCFA'],
                    ['Poids lourd PTAC < 10 t', 'PL1', '18 000 FCFA'],
                    ['Poids lourd PTAC ≥ 10 t', 'PL2', '20 450 FCFA'],
                    ['Revisite VL / TP1-TP2', 'RE1', '12 350 FCFA'],
                    ['Revisite PL / TP3-TP4', 'RE2', '14 700 FCFA'],
                    ['Visite VIP', '—', '7 000 FCFA'],
                    ['Pré-visite', '—', '12 000 FCFA'],
                ]),
                $this->documents("Documents requis", [
                    ['Carte grise du véhicule', ''],
                    ['Assurance', ''],
                    ['Ancien certificat de contrôle', 'Facultatif'],
                    ['Carte de transport', 'Si applicable'],
                ]),
                $this->cta("Prêt pour votre visite technique ?", "Réservez votre créneau en ligne et gagnez du temps."),
            ],

            'station-mobile' => [
                $this->intro("La Station Mobile SICTA", "<p>La station mobile est un camion entièrement équipé des technologies modernes de contrôle technique. Elle permet à la SICTA de réaliser les opérations de contrôle directement sur les sites de ses partenaires et clients, sans déplacement de véhicules vers les centres, avec le même niveau de fiabilité qu'en centre fixe.</p>"),
                $this->avantages("Les avantages", null, [
                    ['MapPin', 'Proximité', "Contrôle réalisé sur site, sans déplacement du client."],
                    ['Clock', 'Gain de temps', "Évite les files d'attente en centre."],
                    ['Settings', 'Performance', "Équipements de dernière génération identiques aux stations SICTA."],
                    ['Calendar', 'Flexibilité', "Créneaux adaptés aux contraintes (week-end / soirée)."],
                    ['Users', 'Professionnalisme', "Équipe qualifiée, formée au contrôle mobile."],
                ]),
                $this->etapes("Comment en bénéficier", "Un processus simple en 6 étapes", [
                    ['Prérequis', "Disposer d'un site d'environ 600 m²."],
                    ['Demande', "Demande de mise à disposition (email / téléphone / site web)."],
                    ['Validation', "Validation du devis et planification de l'intervention."],
                    ['Déploiement', "Déploiement de la station mobile sur site."],
                    ['Exécution', "Exécution du contrôle technique."],
                    ['Remise', "Remise immédiate du procès-verbal et de la vignette."],
                ]),
                $this->avantages("Équipements embarqués", null, [
                    ['Settings', 'Bancs intégrés', "Bancs de freinage et de suspension."],
                    ['Lightbulb', 'Reglophare', "Appareil de réglage des phares."],
                    ['Search', 'Caméras sous plancher', "Inspection visuelle de la partie inférieure."],
                    ['FileText', 'Poste de travail', "Machine de travail et imprimantes."],
                    ['Zap', 'Groupe électrogène', "Alimentation autonome sur site."],
                ]),
                $this->cta("Faites venir la station mobile", "Demandez une intervention sur votre site.", "Nous contacter", "/contact"),
            ],

            'civio' => [
                $this->intro("Qu'est-ce que le CIVIO ?", "<p>Le Contrôle d'Identification des Véhicules Importés d'Occasion (CIVIO) vise à vérifier l'authenticité des véhicules importés d'occasion en Côte d'Ivoire avant leur immatriculation. C'est une exigence réglementaire pour lutter contre la fraude, le trafic de véhicules et garantir la traçabilité.</p>"),
                $this->avantages("Objectifs", null, [
                    ['Search', 'Vérification', "Conformité des éléments d'identification (châssis, plaques constructeur, certificat d'origine)."],
                    ['Shield', 'Anti-fraude', "Détecter d'éventuelles falsifications ou anomalies."],
                    ['CheckCircle2', "Origine légale", "Attester de l'origine légale du véhicule."],
                    ['FileCheck', 'Immatriculation', "Autoriser l'immatriculation auprès des services compétents."],
                ]),
                $this->etapes("Les étapes du contrôle", null, [
                    ['Enregistrement', "Présentation des documents d'import (titre de propriété, certificat de dédouanement)."],
                    ['Inspection physique', "Vérification des numéros de série, plaques constructeur, marquages et empreintes de châssis."],
                    ['Analyse documentaire', "Contrôle de concordance entre les documents et le véhicule."],
                    ['Rapport & Attestation CIVIO', "Livraison d'un rapport donnant droit à l'immatriculation si favorable."],
                ]),
                $this->tarifs("Tarifs", null, ['Prestation', 'Prix', 'Détail'], [
                    ['Identification V.O. (VL)', '31 050 FCFA', 'PTAC < 3,5 tonnes'],
                    ['Identification V.O. (PL)', '52 425 FCFA', 'PTAC > 3,5 t ou > 9 places'],
                ]),
                $this->documents("Documents requis", [
                    ['Certificat de conformité / carte grise originale', ''],
                    ['Certificat de dédouanement', ''],
                    ['Justificatif de propriété ou facture', ''],
                    ["Pièce d'identité du propriétaire", ''],
                ]),
                $this->cta("Besoin d'un CIVIO ?", "Prenez rendez-vous dans un guichet unique SICTA."),
            ],

            'ivn' => [
                $this->intro("Identification de Véhicule Neuf (IVN)", "<p>SICTA effectue directement l'identification des véhicules neufs et la sécurisation des récépissés WW chez le concessionnaire. Cette solution de proximité évite les déplacements et garantit une prise en charge rapide et sécurisée des démarches, avec une disponibilité quasi immédiate des documents.</p>"),
                $this->avantages("Avantages pour le concessionnaire", null, [
                    ['MapPin', 'Zéro déplacement', "Aucun déplacement nécessaire."],
                    ['Clock', 'Gain de temps', "Simplification des démarches."],
                    ['Shield', 'Sécurisation certifiée', "Récépissés WW sécurisés et fiables."],
                    ['Zap', 'Livraison rapide', "Remise directe sur site."],
                    ['Users', 'Accompagnement', "Agents SICTA qualifiés."],
                ]),
                $this->etapes("Le processus", null, [
                    ['Enregistrement de la demande', "Le concessionnaire sollicite la SICTA (mail, portail ou téléphone)."],
                    ["Déploiement de l'équipe", "Une équipe mobile se rend sur le site du concessionnaire."],
                    ['Identification des véhicules', "Relevé des numéros d'identification et contrôle de conformité."],
                    ['Sécurisation des récépissés WW', "Traitement et sécurisation immédiate des documents."],
                    ['Livraison', "Remise directe des récépissés WW sécurisés."],
                ]),
                $this->tarifs("Tarif", null, ['Prestation', 'Prix', 'Détail'], [
                    ['Identification V.N.', '24 700 FCFA', 'Véhicules neufs importés par les concessionnaires'],
                ]),
                $this->cta("Concessionnaire ?", "Sollicitez une intervention IVN sur votre site.", "Nous contacter", "/contact"),
            ],

            'jaugeage-baremage' => [
                $this->intro("Jaugeage et Barémage", "<p>Le jaugeage et le barémage constituent un service technique certifié permettant de mesurer précisément la capacité volumétrique de différents réservoirs (camions citernes, cuves fixes, réservoirs de stockage) selon les normes internationales. L'objectif est d'établir une table de jaugeage garantissant la transparence et la traçabilité des transactions, la prévention de la fraude et la conformité réglementaire.</p>"),
                $this->avantages("Bénéfices pour le client", null, [
                    ['CheckCircle2', 'Fiabilité', "Transactions commerciales fiables."],
                    ['Shield', 'Sécurité', "Sécurité du personnel et de la chaîne d'approvisionnement."],
                    ['Award', 'Crédibilité', "Crédibilité accrue auprès des partenaires."],
                    ['FileCheck', 'Conformité', "Conformité aux exigences nationales."],
                ]),
                $this->etapes("Les étapes du processus", null, [
                    ['Prise de RDV', "Planification pour les opérations extérieures des cuves fixes."],
                    ['Inspection préalable', "Identification de la citerne et vérification de sa conformité."],
                    ['Prise de mesure', "Remplissage par étapes et mesure des volumes."],
                    ['Établissement du certificat', "Élaboration de la table de jaugeage certifiée."],
                    ['Remise du certificat', "Remise du certificat de jaugeage et de la table de barémage."],
                ]),
                $this->documents("Documents requis", [
                    ['Carte grise du véhicule', ''],
                    ['Document constructeur', 'Pour les cuves neuves'],
                    ['Numéros de série', "Cuves Présidence, Armée et cuves de l'intérieur"],
                ]),
                $this->cta("Une citerne à jauger ?", "Contactez le siège SICTA pour planifier l'opération.", "Nous contacter", "/contact"),
            ],

            'pre-visite' => [
                $this->intro("Le Diagnostic / Pré-visite", "<p>Le diagnostic (ou pré-visite) est un service proposé en amont de la visite technique, permettant d'identifier les anomalies potentielles d'un véhicule avant le passage au contrôle réglementaire. C'est un examen préventif volontaire qui sécurise le véhicule et réduit le risque d'échec lors de la visite.</p>"),
                $this->avantages("Vos avantages", null, [
                    ['Clock', 'Gain de temps', "Évitez un retour pour contre-visite."],
                    ['Search', "Aide à l'achat", "Outil utile lors de l'achat d'un véhicule d'occasion."],
                    ['CheckCircle2', 'Réduction des coûts', "Moins de coûts liés aux défauts non détectés."],
                    ['Users', 'Accompagnement', "Conseils personnalisés par des experts."],
                ]),
                $this->tarifs("Modalités", null, ['Élément', 'Détail'], [
                    ['Durée de la prestation', '30 min'],
                    ['Lieu', 'Toutes les stations SICTA'],
                    ['Rendez-vous', 'En ligne ou sur place'],
                    ['Tarif TTC', '12 000 FCFA (toute catégorie)'],
                ]),
                $this->documents("Documents requis", [
                    ['Carte grise ou extrait de carte grise', ''],
                    ['Note', "Le diagnostic n'a pas de valeur réglementaire et ne remplace pas la visite technique."],
                ]),
                $this->cta("Anticipez votre contrôle", "Réservez votre pré-visite dès maintenant."),
            ],

            'ppad' => [
                $this->intro("Pose de Plaque à Domicile (PPAD)", "<p>Le service « Plaques à Domicile » permet aux propriétaires de véhicules de faire sécuriser et poser leurs plaques sans se déplacer. Une équipe mobile se rend directement à l'adresse indiquée (domicile, lieu de travail, parking) pour procéder à la pose en toute conformité.</p>"),
                $this->avantages("Vos avantages", null, [
                    ['Clock', 'Gain de temps', "Aucun déplacement nécessaire."],
                    ['MapPin', 'Confort', "Pose à l'endroit choisi par le client."],
                    ['Shield', 'Sécurité', "Service officiel, sécurisé et traçable."],
                    ['Calendar', 'Flexibilité', "Rendez-vous selon votre disponibilité."],
                ]),
                $this->etapes("Comment ça marche", null, [
                    ['Inscription', "Via le site web, l'application ou le numéro de contact."],
                    ['Informations', "Renseignez véhicule, localisation et créneau souhaité."],
                    ['Paiement', "En ligne ou au moment de la pose."],
                    ['Intervention', "Une équipe mobile procède à la pose au créneau convenu."],
                ]),
                $this->tarifs("Tarif", null, ['Prestation', 'Prix', 'Détail'], [
                    ['Pose de plaque à domicile (PPAD)', '10 000 FCFA', 'Incluant la sécurisation'],
                ]),
                $this->cta("Faites poser vos plaques chez vous", "Planifiez une intervention à domicile."),
            ],

            'pesee' => [
                $this->intro("Le service de Pesée", "<p>La pesée SICTA permet un pesage certifié des véhicules et de leur charge : pesage par essieu ou pesage total, avec délivrance d'un certificat officiel. Un service essentiel pour les professionnels du transport et lors de l'immatriculation.</p>"),
                $this->avantages("Nos prestations de pesage", null, [
                    ['Scale', 'Pesage essieux', "Mesure précise du poids de chaque essieu."],
                    ['Truck', 'Pesage total', "Contrôle du poids total du véhicule et de sa cargaison."],
                    ['Award', 'Certificat de pesée', "Document officiel attestant du poids mesuré."],
                    ['Clock', 'Service 24h/24', "Disponible en permanence pour les professionnels."],
                ]),
                $this->tarifs("Tarifs Pesée", "Tarifs transparents selon le type de véhicule", ['Catégorie', 'Prix', 'Code'], [
                    ["Véhicule neuf (instance d'immatriculation)", '8 200 FCFA', 'PESEE1'],
                    ['Pesage essieux', 'Sur devis', ''],
                    ['Pesage total', 'Sur devis', ''],
                ]),
                $this->cta("Besoin d'une pesée ?", "Rendez-vous dans une station SICTA équipée."),
            ],

            'immatriculation' => [
                $this->intro("Service d'Immatriculation", "<p>Le service d'immatriculation permet l'immatriculation officielle des véhicules auprès des autorités compétentes et la pose de plaques sécurisées. Il garantit l'identification légale du véhicule sur le territoire ivoirien pour une circulation conforme à la réglementation. (Concerne les anciennes plaques bleues.)</p>"),
                $this->avantages("Bénéfices pour le client", null, [
                    ['Zap', 'Rapidité', "Démarches simples et rapides."],
                    ['Shield', 'Sécurité', "Plaques sécurisées."],
                    ['Search', 'Traçabilité', "Traçabilité immédiate du véhicule."],
                    ['CheckCircle2', 'Conformité', "Véhicule conforme à la réglementation."],
                ]),
                $this->tarifs("Tarifs", null, ['Prestation', 'Prix', 'Détail'], [
                    ['Sécurisation et pose plaques (VL/PL)', '5 700 FCFA', 'Inclut le timbre de 100 F'],
                    ['Identification V.N. (véhicules neufs)', '24 700 FCFA', 'Concessionnaires'],
                    ['Identification V.O. — véhicules légers', '31 050 FCFA', 'PTAC < 3,5 t'],
                    ['Identification V.O. — marchandises/personnes', '52 425 FCFA', 'PTAC > 3,5 t ou > 9 places'],
                    ['Identification complémentaire (PL déclarés VL)', '33 300 FCFA', ''],
                    ["Duplicata fiche d'identification", '5 000 FCFA', ''],
                    ['Pesée de véhicule', '8 200 FCFA', "En instance d'immatriculation"],
                    ['Extrait de carte grise', '2 000 FCFA', ''],
                ]),
                $this->documents("Conditions / prérequis", [
                    ['Documents requis', 'Originaux + copies'],
                    ['Paiement des frais', 'Frais réglementaires et administratifs'],
                    ['Présentation du véhicule', 'Pour la pose de plaque'],
                    ['Important', "Concerne uniquement les anciennes plaques bleues (pas les nouvelles plaques blanches NY)."],
                ]),
                $this->cta("Immatriculez votre véhicule", "Rendez-vous dans un centre SICTA autorisé.", "Nous contacter", "/contact"),
            ],

            'vip' => [
                $this->intro("Rendez-Vous / Service VIP", "<p>Le service « Rendez-Vous / VIP » est une offre premium conçue pour faciliter l'accès au contrôle technique. Il permet de planifier une date et une heure précises et de bénéficier d'un accueil privilégié sur site, avec un accompagnement dédié.</p>"),
                $this->avantages("Fonctionnalités du service", null, [
                    ['Calendar', 'Rendez-vous en ligne', "Choix de la date, du créneau et du centre."],
                    ['Star', 'Accueil dédié', "Priorité de traitement, sans file d'attente."],
                    ['Users', 'Accompagnement', "Un agent SICTA dédié tout au long du processus."],
                    ['Clock', 'Gain de temps', "Passage rapide et optimisé."],
                    ['Award', 'Espace VIP', "Accès à un espace d'attente confortable."],
                    ['CheckCircle2', 'Suivi client', "Rappel automatique de renouvellement."],
                ]),
                $this->tarifs("Tarif", null, ['Prestation', 'Prix'], [
                    ['Visite VIP', '7 000 FCFA'],
                ]),
                $this->cta("Réservez votre créneau VIP", "Gagnez du temps avec un accueil prioritaire."),
            ],

            'assistance' => [
                $this->intro("Assistance SICTA", "<p>Le service d'assistance SICTA accompagne les usagers à chaque étape de leurs démarches de contrôle technique et d'immatriculation : information, orientation, prise de rendez-vous et suivi personnalisé.</p>"),
                $this->avantages("Comment nous aidons", null, [
                    ['LifeBuoy', 'Accompagnement', "Un support à chaque étape de vos démarches."],
                    ['Users', 'Conseil', "Une équipe à l'écoute pour vous orienter."],
                    ['Clock', 'Réactivité', "Des réponses rapides à vos questions."],
                ]),
                $this->cta("Une question ?", "Notre équipe est là pour vous accompagner.", "Nous contacter", "/contact"),
            ],

            default => [],
        };
    }
}
