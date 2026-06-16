<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use Illuminate\Http\Request;

class PageSectionController extends Controller
{
    private function allFields(string $page): array
    {
        $fields = [
            'home' => [
                ['key' => 'home_hero_badge',       'label' => 'Badge hero (ex: "Nouvelle Ère")',        'type' => 'text'],
                ['key' => 'home_hero_title',        'label' => 'Titre hero principal',                   'type' => 'text'],
                ['key' => 'home_hero_subtitle',     'label' => 'Sous-titre / description hero',          'type' => 'richtext'],
                ['key' => 'home_points_cles',       'label' => 'Points clés (un par ligne)',             'type' => 'richtext'],
                ['key' => 'home_stats_value1',      'label' => 'Stat 1 — Valeur (ex: "Mayelia")',        'type' => 'text'],
                ['key' => 'home_stats_label1',      'label' => 'Stat 1 — Label (ex: "Actionnaire")',     'type' => 'text'],
                ['key' => 'home_stats_value2',      'label' => 'Stat 2 — Valeur (ex: "28")',             'type' => 'text'],
                ['key' => 'home_stats_label2',      'label' => 'Stat 2 — Label (ex: "Agences")',         'type' => 'text'],
                ['key' => 'home_stats_value3',      'label' => 'Stat 3 — Valeur (ex: "ISO 9001")',       'type' => 'text'],
                ['key' => 'home_stats_label3',      'label' => 'Stat 3 — Label (ex: "Certification")',   'type' => 'text'],
                ['key' => 'home_cta_button1_label', 'label' => 'CTA bouton 1 — Texte',                  'type' => 'text'],
                ['key' => 'home_cta_button1_url',   'label' => 'CTA bouton 1 — URL',                    'type' => 'text'],
                ['key' => 'home_cta_button2_label', 'label' => 'CTA bouton 2 — Texte',                  'type' => 'text'],
                ['key' => 'home_cta_button2_url',   'label' => 'CTA bouton 2 — URL',                    'type' => 'text'],
            ],
            'about' => [
                ['key' => 'about_title',    'label' => 'Titre de la page À propos', 'type' => 'text'],
                ['key' => 'about_subtitle', 'label' => 'Sous-titre',               'type' => 'text'],
                ['key' => 'about_body',     'label' => 'Contenu principal',        'type' => 'richtext'],
                ['key' => 'about_stats',    'label' => 'Statistiques (JSON)',      'type' => 'json'],
                ['key' => 'about_timeline', 'label' => 'Historique (JSON)',        'type' => 'json'],
            ],
        ];
        return $fields[$page] ?? [];
    }

    public function home()
    {
        $page     = 'home';
        $fields   = $this->allFields($page);
        $sections = PageSection::where('page', $page)->pluck('value', 'section_key');
        return view('admin.page_sections.form', compact('page', 'fields', 'sections'));
    }

    public function about()
    {
        $page     = 'about';
        $fields   = $this->allFields($page);
        $sections = PageSection::where('page', $page)->pluck('value', 'section_key');
        return view('admin.page_sections.form', compact('page', 'fields', 'sections'));
    }

    public function update(Request $request, string $page)
    {
        $fields = collect($this->allFields($page));

        foreach ($request->all() as $key => $value) {
            if ($key === '_token' || $key === '_method') continue;
            $field = $fields->firstWhere('key', $key);
            if (!$field) continue;

            PageSection::updateOrCreate(
                ['page' => $page, 'section_key' => $key],
                ['value' => $value, 'type' => $field['type']]
            );
        }

        return back()->with('success', 'Contenu mis à jour avec succès.');
    }
}
