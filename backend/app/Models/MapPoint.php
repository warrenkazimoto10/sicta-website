<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MapPoint extends Model
{
    protected $fillable = ['type', 'ville', 'station_id', 'label', 'icone', 'taille', 'x', 'y', 'ordre'];

    protected $casts = ['x' => 'float', 'y' => 'float'];

    public const TYPES   = ['ville', 'station'];
    public const TAILLES = ['grand', 'moyen', 'petit'];

    /** Taille du marqueur (px de l'icône) selon le niveau. */
    public const TAILLE_PX = ['grand' => 30, 'moyen' => 22, 'petit' => 15];

    public function station()
    {
        return $this->belongsTo(Station::class);
    }
}
