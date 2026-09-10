<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HistoryEvent;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;

class AboutController extends Controller
{
    public function team(): JsonResponse
    {
        $team = TeamMember::where('actif', true)
            ->orderBy('ordre')
            ->get()
            ->map(fn($m) => [
                'id'          => $m->id,
                'nom'         => $m->nom,
                'role'        => $m->role,
                'photo'       => $m->photo ? asset('storage/' . $m->photo) : null,
                'email'       => $m->email,
                'linkedin'    => $m->linkedin,
                'description' => $m->description,
            ]);

        return response()->json(['data' => $team]);
    }

    public function history(): JsonResponse
    {
        $events = HistoryEvent::where('actif', true)
            ->orderBy('ordre')
            ->get()
            ->map(fn($e) => [
                'id'          => $e->id,
                'annee'       => $e->annee,
                'titre'       => $e->titre,
                'description' => $e->description,
                'image'       => $e->image ? asset('storage/' . $e->image) : null,
                'highlight'   => (bool) $e->highlight,
            ]);

        return response()->json(['data' => $events]);
    }
}
