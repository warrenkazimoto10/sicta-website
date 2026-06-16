<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slide;
use Illuminate\Http\JsonResponse;

class SlideController extends Controller
{
    public function index(): JsonResponse
    {
        $slides = Slide::where('actif', true)
            ->orderBy('ordre')
            ->get()
            ->map(fn($s) => [
                'id'          => $s->id,
                'titre'       => $s->titre,
                'sous_titre'  => $s->sous_titre,
                'description' => $s->description,
                'badge_texte' => $s->badge_texte,
                'image'       => $s->image ? asset('storage/' . $s->image) : null,
                'bouton_texte'=> $s->bouton_texte,
                'bouton_lien' => $s->bouton_lien,
                'stats'       => $s->stats ?? [],
                'ordre'       => $s->ordre,
            ]);

        return response()->json(['data' => $slides]);
    }
}
