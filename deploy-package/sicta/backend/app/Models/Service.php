<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'slug', 'nom', 'icone', 'resume',
        'hero_titre', 'hero_sous_titre', 'hero_image',
        'meta_title', 'meta_description',
        'source', 'ordre', 'actif',
    ];

    protected $casts = ['actif' => 'boolean'];

    /**
     * Icônes proposées dans l'admin.
     * Clé = nom Lucide (stocké et utilisé côté site) ; valeurs = classe Font Awesome (aperçu admin) + libellé FR.
     */
    public const ICON_CHOICES = [
        'Shield'         => ['fa' => 'fa-shield-halved',   'label' => 'Bouclier / Sécurité'],
        'ShieldCheck'    => ['fa' => 'fa-shield-halved',   'label' => 'Sécurité validée'],
        'Scale'          => ['fa' => 'fa-scale-balanced',  'label' => 'Balance / Pesée'],
        'Search'         => ['fa' => 'fa-magnifying-glass','label' => 'Loupe / Inspection'],
        'FileCheck'      => ['fa' => 'fa-file-circle-check','label' => 'Document validé'],
        'FileText'       => ['fa' => 'fa-file-lines',      'label' => 'Document'],
        'ClipboardCheck' => ['fa' => 'fa-clipboard-check', 'label' => 'Contrôle / Checklist'],
        'Navigation'     => ['fa' => 'fa-location-arrow',  'label' => 'Mobilité / Navigation'],
        'MapPin'         => ['fa' => 'fa-location-dot',    'label' => 'Localisation'],
        'Truck'          => ['fa' => 'fa-truck',           'label' => 'Camion / Transport'],
        'Car'            => ['fa' => 'fa-car',             'label' => 'Véhicule'],
        'PackageCheck'   => ['fa' => 'fa-box-open',        'label' => 'Colis / Programme'],
        'LifeBuoy'       => ['fa' => 'fa-life-ring',       'label' => 'Assistance'],
        'Star'           => ['fa' => 'fa-star',            'label' => 'Étoile / VIP'],
        'Award'          => ['fa' => 'fa-award',           'label' => 'Récompense / Certif.'],
        'Clock'          => ['fa' => 'fa-clock',           'label' => 'Horaire / Rapidité'],
        'Users'          => ['fa' => 'fa-users',           'label' => 'Équipe / Clients'],
        'Calendar'       => ['fa' => 'fa-calendar',        'label' => 'Calendrier'],
        'CheckCircle2'   => ['fa' => 'fa-circle-check',    'label' => 'Coche / Validé'],
        'Lightbulb'      => ['fa' => 'fa-lightbulb',       'label' => 'Innovation'],
        'Settings'       => ['fa' => 'fa-gear',            'label' => 'Réglage / Technique'],
        'Zap'            => ['fa' => 'fa-bolt',            'label' => 'Éclair / Express'],
        'Wrench'         => ['fa' => 'fa-wrench',          'label' => 'Réparation'],
        'Gauge'          => ['fa' => 'fa-gauge',           'label' => 'Jauge / Mesure'],
    ];

    public function sections()
    {
        return $this->hasMany(ServiceSection::class)->orderBy('ordre');
    }
}
