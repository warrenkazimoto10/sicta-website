<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class DossierGalerie extends Model {
    protected $table = 'dossiers_galerie';
    protected $fillable = ['nom', 'categorie', 'article_id', 'image_couverture', 'date', 'public'];
    protected $casts = ['public' => 'boolean', 'date' => 'date'];
    public function medias() { return $this->hasMany(MediaGalerie::class, 'dossier_id'); }
    public function article() { return $this->belongsTo(Article::class); }
}
