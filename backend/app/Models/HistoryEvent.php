<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoryEvent extends Model
{
    protected $fillable = ['annee', 'titre', 'description', 'image', 'highlight', 'ordre', 'actif'];
    protected $casts = ['actif' => 'boolean', 'highlight' => 'boolean'];
}
