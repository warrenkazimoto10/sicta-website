<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DossierGalerie;
use Illuminate\Http\JsonResponse;

class GalerieController extends Controller
{
    public function index(): JsonResponse
    {
        $dossiers = DossierGalerie::with(['medias' => fn($q) => $q->orderBy('ordre')])
            ->where('public', true)
            ->orderByDesc('date')
            ->get()
            ->map(fn($d) => $this->formatDossier($d));

        return response()->json(['data' => $dossiers]);
    }

    public function show(DossierGalerie $galerie): JsonResponse
    {
        if (!$galerie->public) {
            abort(404);
        }

        $galerie->load(['medias' => fn($q) => $q->orderBy('ordre')]);

        return response()->json(['data' => $this->formatDossier($galerie)]);
    }

    private function formatDossier(DossierGalerie $d): array
    {
        return [
            'id'               => $d->id,
            'nom'              => $d->nom,
            'categorie'        => $d->categorie,
            'image_couverture' => $d->image_couverture
                ? asset('storage/' . $d->image_couverture)
                : null,
            'date'             => $d->date?->format('Y-m-d'),
            'medias'           => $d->medias->map(fn($m) => [
                'id'      => $m->id,
                'type'    => $m->type,
                'fichier' => asset('storage/' . $m->fichier),
                'legende' => $m->legende,
                'ordre'   => $m->ordre,
            ])->values(),
        ];
    }
}
