<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PageSection;

class PageSectionSeeder extends Seeder
{
    public function run(): void
    {
        $home = [
            'home_hero_image' => ['value' => 'sections/home-nouvelle-ere.jpg', 'type' => 'image'],
            'home_hero_title' => ['value' => 'Nouvelle Ère', 'type' => 'text'],
            'home_hero_title_highlight' => ['value' => 'SICTA 2025', 'type' => 'text'],
            'home_hero_subtitle' => ['value' => "Société Ivoirienne de Contrôle Technique Automobile, SICTA entre dans une nouvelle phase de développement sous l'impulsion de Mayelia PARTICIPATIONS. Leader incontesté depuis 1974.", 'type' => 'richtext'],
            'home_points_cles' => ['value' => "Filiale de Mayelia PARTICIPATIONS depuis avril 2025\nCertification ISO 9001:2015 par ABS Quality Evaluations\nLeader du contrôle technique en Afrique de l'Ouest\nInnovation technologique et digitalisation des services", 'type' => 'richtext'],
            'home_cta_button1_label' => ['value' => 'Trouver une agence', 'type' => 'text'],
            'home_cta_button1_url' => ['value' => '/reseau', 'type' => 'text'],
            'home_cta_button2_label' => ['value' => 'En savoir plus', 'type' => 'text'],
            'home_cta_button2_url' => ['value' => '/a-propos', 'type' => 'text'],
            'home_iso_value' => ['value' => 'ISO 9001:2015', 'type' => 'text'],
            'home_iso_label' => ['value' => 'Certification Qualité', 'type' => 'text'],
        ];

        foreach ($home as $key => $data) {
            PageSection::updateOrCreate(
                ['page' => 'home', 'section_key' => $key],
                ['value' => $data['value'], 'type' => $data['type']]
            );
        }

        $settings = [
            'settings_phone' => ['value' => '27 21 21 29 90', 'type' => 'text'],
            'settings_email' => ['value' => 'infos@sicta.ci', 'type' => 'text'],
            'settings_address' => ['value' => "Rue Abli Mathieu, Zone 4C, Marcory\nAbidjan, Côte d'Ivoire", 'type' => 'richtext'],
            'settings_facebook' => ['value' => 'https://www.facebook.com/p/SICTA-SA-61580641138223/', 'type' => 'text'],
            'settings_linkedin' => ['value' => 'https://www.linkedin.com/company/sicta-sa', 'type' => 'text'],
        ];

        foreach ($settings as $key => $data) {
            PageSection::updateOrCreate(
                ['page' => 'settings', 'section_key' => $key],
                ['value' => $data['value'], 'type' => $data['type']]
            );
        }
    }
}
