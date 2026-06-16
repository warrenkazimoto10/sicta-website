<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model {
    use SoftDeletes;
    protected $fillable = ['titre', 'slug', 'categorie_id', 'image_principale', 'extrait', 'contenu', 'auteur', 'temps_lecture', 'date_publication', 'statut', 'a_la_une', 'tendance'];
    protected $casts = ['a_la_une' => 'boolean', 'tendance' => 'boolean', 'date_publication' => 'date'];
    public function categorie() { return $this->belongsTo(CategorieArticle::class, 'categorie_id'); }
    public function medias()    { return $this->hasMany(ArticleMedia::class)->orderBy('order'); }
}
