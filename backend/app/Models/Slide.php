<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Slide extends Model {
    use SoftDeletes;
    protected $fillable = ['titre', 'sous_titre', 'description', 'badge_texte', 'image', 'bouton_texte', 'bouton_lien', 'stats', 'ordre', 'actif'];
    protected $casts = ['stats' => 'array', 'actif' => 'boolean'];
}
