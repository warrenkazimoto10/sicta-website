<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HistoryEvent;
use App\Models\TeamMember;
use App\Models\PageSection;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        $history = [
            ['annee' => '1959', 'titre' => 'Début du contrôle technique', 'description' => "Obligation du contrôle technique automobile en Côte d'Ivoire selon la réglementation.", 'image' => null, 'highlight' => false],
            ['annee' => '1974', 'titre' => 'Création de la SICTA', 'description' => "Fondation de la Société Ivoirienne de Contrôle Technique Automobiles et Industriels.", 'image' => 'history/1974.jpg', 'highlight' => false],
            ['annee' => '1990', 'titre' => 'Rachat par SGS', 'description' => "La SICTA devient une société privatisée rachetée par le groupe SGS, leader mondial de l'inspection.", 'image' => null, 'highlight' => false],
            ['annee' => '2019', 'titre' => 'Certification ISO 9001:2015', 'description' => "Certification qualité par ABS Quality Evaluations, garantissant l'excellence de nos services.", 'image' => null, 'highlight' => false],
            ['annee' => '2025', 'titre' => 'Rachat par Mayelia PARTICIPATIONS', 'description' => "Nouvelle ère d'innovation et d'expansion sous l'égide de Mayelia Participations.", 'image' => 'history/2024.jpg', 'highlight' => true],
        ];
        foreach ($history as $i => $h) {
            HistoryEvent::updateOrCreate(
                ['annee' => $h['annee'], 'titre' => $h['titre']],
                $h + ['ordre' => $i + 1, 'actif' => true]
            );
        }

        $team = [
            ['nom' => 'Direction Générale', 'role' => 'Direction Générale'],
            ['nom' => 'Direction Technique', 'role' => 'Contrôle & Qualité'],
            ['nom' => 'Direction Commerciale', 'role' => 'Relation clients'],
            ['nom' => 'Direction des Opérations', 'role' => 'Réseau & Stations'],
        ];
        foreach ($team as $i => $t) {
            TeamMember::updateOrCreate(
                ['nom' => $t['nom']],
                $t + ['ordre' => $i + 1, 'actif' => true]
            );
        }

        // Réglages de la page À propos
        $flags = [
            'about_history_enabled' => ['1', 'toggle'],
            'about_history_title' => ['Notre Histoire et Évolution', 'text'],
            'about_history_subtitle' => ["Plus de 50 ans d'excellence au service de la sécurité routière", 'text'],
            'about_team_enabled' => ['1', 'toggle'],
            'about_team_title' => ['Notre Équipe', 'text'],
            'about_team_subtitle' => ['Des femmes et des hommes engagés pour la sécurité routière', 'text'],
        ];
        foreach ($flags as $key => [$value, $type]) {
            PageSection::updateOrCreate(
                ['page' => 'about', 'section_key' => $key],
                ['value' => $value, 'type' => $type]
            );
        }
    }
}
