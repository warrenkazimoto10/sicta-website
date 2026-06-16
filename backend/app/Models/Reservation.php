<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model {
    protected $fillable = ['numero_reservation', 'station_id', 'categorie_vehicule', 'puissance_cv', 'immatriculation', 'prenom', 'nom', 'telephone', 'date_rdv', 'heure_rdv', 'statut', 'note_interne'];
    protected $casts = ['date_rdv' => 'date'];
    public function station() { return $this->belongsTo(Station::class); }
}
