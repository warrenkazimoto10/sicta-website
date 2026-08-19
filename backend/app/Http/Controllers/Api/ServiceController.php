<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::where('actif', true)
            ->orderBy('ordre')
            ->get()
            ->map(fn($s) => [
                'slug'    => $s->slug,
                'nom'     => $s->nom,
                'icone'   => $s->icone,
                'resume'  => $s->resume,
                'image'   => $s->hero_image ? asset('storage/' . $s->hero_image) : null,
                'source'  => $s->source,
            ]);

        return response()->json(['data' => $services]);
    }

    public function show(string $slug): JsonResponse
    {
        $service = Service::where('slug', $slug)->where('actif', true)->firstOrFail();

        $sections = $service->sections()
            ->where('actif', true)
            ->orderBy('ordre')
            ->get()
            ->map(fn($sec) => [
                'id'         => $sec->id,
                'type'       => $sec->type,
                'titre'      => $sec->titre,
                'sous_titre' => $sec->sous_titre,
                'contenu'    => $sec->contenu ?? [],
            ]);

        return response()->json([
            'data' => [
                'slug'            => $service->slug,
                'nom'             => $service->nom,
                'icone'           => $service->icone,
                'resume'          => $service->resume,
                'source'          => $service->source,
                'hero_titre'      => $service->hero_titre,
                'hero_sous_titre' => $service->hero_sous_titre,
                'hero_image'      => $service->hero_image ? asset('storage/' . $service->hero_image) : null,
                'meta_title'      => $service->meta_title,
                'meta_description'=> $service->meta_description,
                'sections'        => $sections,
            ],
        ]);
    }
}
