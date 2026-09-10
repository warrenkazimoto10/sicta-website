<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PageSectionController extends Controller
{
    private function allFields(string $page): array
    {
        $fields = [
            'home' => [
                ['key' => 'home_v2_enabled', 'label' => 'Activer la nouvelle page d\'accueil (V2, premium)', 'type' => 'toggle', 'group' => 'Version de la page d\'accueil', 'help' => "Désactivé = page d'accueil classique. Activé = nouvelle page d'accueil professionnelle."],

                ['key' => 'home_hero_image',        'label' => 'Image de la section',            'type' => 'image',    'group' => 'Section « Nouvelle Ère »', 'help' => "L'image affichée à droite de la section, avec le badge de certification par-dessus."],
                ['key' => 'home_hero_title',        'label' => 'Titre',                          'type' => 'text',     'group' => 'Section « Nouvelle Ère »', 'help' => 'Première partie du titre, en noir.', 'placeholder' => 'Nouvelle Ère'],
                ['key' => 'home_hero_title_highlight', 'label' => 'Titre — partie colorée',      'type' => 'text',     'group' => 'Section « Nouvelle Ère »', 'help' => 'Deuxième partie du titre, affichée en orange.', 'placeholder' => 'SICTA 2025'],
                ['key' => 'home_hero_subtitle',     'label' => 'Description',                     'type' => 'richtext', 'group' => 'Section « Nouvelle Ère »', 'help' => "Le paragraphe d'introduction sous le titre."],
                ['key' => 'home_points_cles',       'label' => 'Points clés',                    'type' => 'repeater', 'group' => 'Section « Nouvelle Ère »', 'help' => 'La liste à puces avec les coches vertes. Ajoutez autant de points que nécessaire.'],
                ['key' => 'home_cta_button1_label', 'label' => 'Bouton principal — texte',       'type' => 'text',     'group' => 'Boutons d\'action',        'help' => 'Le bouton orange.', 'placeholder' => 'Trouver une agence'],
                ['key' => 'home_cta_button1_url',   'label' => 'Bouton principal — lien',        'type' => 'text',     'group' => 'Boutons d\'action',        'help' => 'La page vers laquelle mène le bouton.', 'placeholder' => '/reseau'],
                ['key' => 'home_cta_button2_label', 'label' => 'Bouton secondaire — texte',      'type' => 'text',     'group' => 'Boutons d\'action',        'help' => 'Le bouton bordé.', 'placeholder' => 'En savoir plus'],
                ['key' => 'home_cta_button2_url',   'label' => 'Bouton secondaire — lien',       'type' => 'text',     'group' => 'Boutons d\'action',        'help' => 'La page vers laquelle mène le bouton.', 'placeholder' => '/a-propos'],
                ['key' => 'home_iso_value',         'label' => 'Badge — titre',                  'type' => 'text',     'group' => 'Badge de certification',   'help' => 'Le texte en gras dans la carte blanche sur l\'image.', 'placeholder' => 'ISO 9001:2015'],
                ['key' => 'home_iso_label',         'label' => 'Badge — sous-titre',             'type' => 'text',     'group' => 'Badge de certification',   'help' => 'Le texte gris sous le titre du badge.', 'placeholder' => 'Certification Qualité'],
                ['key' => 'home_era_title_highlight', 'label' => 'Section 2 — Titre (partie orange)', 'type' => 'text',     'group' => 'Section « L\'expertise au cœur »', 'help' => 'Première ligne en orange.', 'placeholder' => "L'expertise"],
                ['key' => 'home_era_title',           'label' => 'Section 2 — Titre (partie noire)',  'type' => 'text',     'group' => 'Section « L\'expertise au cœur »', 'help' => 'Deuxième ligne en noir.', 'placeholder' => "au cœur de notre métier"],
                ['key' => 'home_era_subtitle',        'label' => 'Section 2 — Sous-titre',           'type' => 'text',     'group' => 'Section « L\'expertise au cœur »', 'help' => 'La description sous le titre de la section 2.', 'placeholder' => 'Rigueur, innovation et excellence...'],
            ],
            'about' => [
                ['key' => 'about_title',    'label' => 'Titre de la page',   'type' => 'text',     'group' => 'En-tête',    'help' => 'Le grand titre en haut de la page À propos.', 'placeholder' => 'À propos de SICTA'],
                ['key' => 'about_subtitle', 'label' => 'Sous-titre',         'type' => 'text',     'group' => 'En-tête',    'help' => 'Une phrase d\'accroche sous le titre.'],
                ['key' => 'about_body',     'label' => 'Contenu principal',  'type' => 'richtext', 'group' => 'Contenu',    'help' => 'Le texte de présentation de l\'entreprise.'],

                ['key' => 'about_history_enabled',  'label' => 'Afficher la section « Notre Histoire »', 'type' => 'toggle', 'group' => 'Section Histoire', 'help' => 'Gérez les étapes dans le menu « Histoire » du backoffice.'],
                ['key' => 'about_history_title',    'label' => 'Titre de la section Histoire',           'type' => 'text',   'group' => 'Section Histoire', 'placeholder' => 'Notre Histoire et Évolution'],
                ['key' => 'about_history_subtitle', 'label' => 'Sous-titre de la section Histoire',       'type' => 'text',   'group' => 'Section Histoire', 'placeholder' => "Plus de 50 ans d'excellence"],

                ['key' => 'about_team_enabled',  'label' => 'Afficher la section « Notre Équipe »', 'type' => 'toggle', 'group' => 'Section Équipe', 'help' => 'Gérez les membres dans le menu « Équipe » du backoffice.'],
                ['key' => 'about_team_title',    'label' => 'Titre de la section Équipe',           'type' => 'text',   'group' => 'Section Équipe', 'placeholder' => 'Notre Équipe'],
                ['key' => 'about_team_subtitle', 'label' => 'Sous-titre de la section Équipe',       'type' => 'text',   'group' => 'Section Équipe', 'placeholder' => 'Des experts au service de la sécurité routière'],
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

        foreach ($fields as $field) {
            $key = $field['key'];

            if ($field['type'] === 'image') {
                // Upload d'image : ne remplace la valeur que si un nouveau fichier est envoyé
                if ($request->hasFile($key)) {
                    $request->validate([$key => 'image|max:20480']);
                    $existing = PageSection::where('page', $page)->where('section_key', $key)->value('value');
                    if ($existing) {
                        Storage::disk('public')->delete($existing);
                    }
                    $path = ImageUploadService::store($request->file($key), 'sections');
                    PageSection::updateOrCreate(
                        ['page' => $page, 'section_key' => $key],
                        ['value' => $path, 'type' => 'image']
                    );
                }
                continue;
            }

            if ($field['type'] === 'toggle') {
                // Case à cocher : présente = '1', absente = '0'
                PageSection::updateOrCreate(
                    ['page' => $page, 'section_key' => $key],
                    ['value' => $request->has($key) ? '1' : '0', 'type' => 'toggle']
                );
                continue;
            }

            if ($request->has($key)) {
                PageSection::updateOrCreate(
                    ['page' => $page, 'section_key' => $key],
                    ['value' => $request->input($key), 'type' => $field['type']]
                );
            }
        }

        return back()->with('success', 'Contenu mis à jour avec succès.');
    }

    public function settings()
    {
        $settings = PageSection::where('page', 'settings')->pluck('value', 'section_key');
        return view('admin.settings.index', compact('settings'));
    }

    public function updateSettings(Request $request)
    {
        $keys = [
            'settings_phone',
            'settings_email',
            'settings_address',
            'settings_facebook',
            'settings_linkedin',
            'settings_mayelia_url'
        ];

        foreach ($keys as $key) {
            PageSection::updateOrCreate(
                ['page' => 'settings', 'section_key' => $key],
                ['value' => $request->input($key) ?? '', 'type' => $key === 'settings_address' ? 'richtext' : 'text']
            );
        }

        return redirect()->route('admin.settings.index')->with('success', 'Réglages mis à jour avec succès.');
    }
}
