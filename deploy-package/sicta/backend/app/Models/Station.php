<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Station extends Model {
    use SoftDeletes;
    protected $fillable = ['nom', 'zone', 'ville', 'telephone', 'horaires', 'latitude', 'longitude', 'region', 'type', 'services_disponibles', 'texte_disponibilite', 'maps_url', 'actif'];
    protected $casts = ['services_disponibles' => 'array', 'actif' => 'boolean', 'latitude' => 'float', 'longitude' => 'float'];
    public function reservations() { return $this->hasMany(Reservation::class); }
}
