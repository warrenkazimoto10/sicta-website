<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = ['nom', 'role', 'photo', 'email', 'linkedin', 'ordre', 'actif'];
    protected $casts = ['actif' => 'boolean'];
}
