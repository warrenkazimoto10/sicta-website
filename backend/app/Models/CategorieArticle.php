<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class CategorieArticle extends Model {
    protected $table = 'categories_articles';
    protected $fillable = ['nom', 'slug'];
    public function articles() { return $this->hasMany(Article::class, 'categorie_id'); }
}
