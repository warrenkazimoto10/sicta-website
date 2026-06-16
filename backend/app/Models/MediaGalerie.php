<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class MediaGalerie extends Model {
    protected $table = 'medias_galerie';
    protected $fillable = ['dossier_id', 'type', 'fichier', 'legende', 'ordre'];
    public function dossier() { return $this->belongsTo(DossierGalerie::class, 'dossier_id'); }
}
