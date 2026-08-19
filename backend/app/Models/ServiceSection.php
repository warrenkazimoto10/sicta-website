<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceSection extends Model
{
    protected $fillable = ['service_id', 'type', 'titre', 'sous_titre', 'contenu', 'ordre', 'actif'];

    protected $casts = [
        'contenu' => 'array',
        'actif'   => 'boolean',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    /** Types de blocs disponibles et leur libellé pour l'admin. */
    public const TYPES = [
        'intro'     => 'Introduction / définition',
        'avantages' => 'Avantages (cartes)',
        'etapes'    => 'Étapes du processus',
        'tarifs'    => 'Tableau de tarifs',
        'documents' => 'Documents requis',
        'faq'       => 'Questions fréquentes',
        'texte'     => 'Texte libre',
        'cta'       => 'Appel à action',
        'custom'    => 'Bloc spécial (codé)',
    ];
}
