<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Slide;

class SlideSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'titre'        => 'Nouvelle Ère SICTA 2025',
                'sous_titre'   => 'Innovation SICTA 2025',
                'description'  => "Société Ivoirienne de Contrôles Techniques Automobiles et Industriels, SICTA entre dans une nouvelle phase de développement sous l'impulsion de Mayelia Participations. Leader incontesté depuis 1974.",
                'badge_texte'  => 'Leader sécurité routière • Nouvelle ère 2025',
                'image'        => 'slides/slide-1.png',
                'bouton_texte' => 'Nos Solutions Mobiles',
                'bouton_lien'  => '/services/station-mobile',
                'stats'        => [
                    ['icon' => 'Shield', 'value' => '100%', 'label' => 'Couverture Nationale'],
                    ['icon' => 'Users',  'value' => 'Proximité', 'label' => 'Service à domicile'],
                ],
                'ordre'  => 1,
                'duree'  => 7,
                'actif'  => true,
            ],
            [
                'titre'        => 'Banc Mobile Haute Technologie',
                'sous_titre'   => "L'expertise partout en Côte d'Ivoire",
                'description'  => "Nos bancs mobiles de nouvelle génération permettent un contrôle technique complet et certifié ISO 9001:2015, même dans les zones les plus reculées.",
                'badge_texte'  => 'Certifié ISO 9001:2015',
                'image'        => 'slides/slide-2.png',
                'bouton_texte' => 'Découvrir le Banc Mobile',
                'bouton_lien'  => '/services/station-mobile',
                'stats'        => [
                    ['icon' => 'MapPin', 'value' => '22', 'label' => 'Stations temporaires'],
                    ['icon' => 'Shield', 'value' => 'ISO 9001', 'label' => 'Certifié 2015'],
                ],
                'ordre'  => 2,
                'duree'  => 6,
                'actif'  => true,
            ],
            [
                'titre'        => 'Sécurité Routière Garantie',
                'sous_titre'   => 'Leader depuis 1974 • Nouvelle ère 2025',
                'description'  => "Certifié ISO 9001:2015, SICTA est le partenaire de confiance pour la sécurité routière en Côte d'Ivoire et en Afrique de l'Ouest.",
                'badge_texte'  => 'Leader depuis 1974',
                'image'        => 'slides/slide-3.png',
                'bouton_texte' => 'En savoir plus',
                'bouton_lien'  => '/a-propos',
                'stats'        => [
                    ['icon' => 'Calendar', 'value' => '50+', 'label' => "Années d'expérience"],
                    ['icon' => 'Shield',   'value' => '100%', 'label' => 'Conformité réglementaire'],
                ],
                'ordre'  => 3,
                'duree'  => 6,
                'actif'  => true,
            ],
        ];

        foreach ($slides as $slide) {
            Slide::updateOrCreate(
                ['titre' => $slide['titre']],
                $slide
            );
        }
    }
}
