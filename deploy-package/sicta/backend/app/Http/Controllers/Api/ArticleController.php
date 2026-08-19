<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $articles = Article::with(['categorie', 'medias'])
            ->where('statut', 'publie')
            ->orderByDesc('date_publication')
            ->get()
            ->map(fn($a) => $this->format($a));

        return response()->json(['data' => $articles]);
    }

    public function show(string $slug): JsonResponse
    {
        $article = Article::with(['categorie', 'medias'])
            ->where('slug', $slug)
            ->where('statut', 'publie')
            ->firstOrFail();

        $related = Article::with(['categorie', 'medias'])
            ->where('statut', 'publie')
            ->where('id', '!=', $article->id)
            ->where('categorie_id', $article->categorie_id)
            ->orderByDesc('date_publication')
            ->limit(3)
            ->get()
            ->map(fn($a) => $this->format($a));

        return response()->json([
            'data'    => $this->format($article),
            'related' => $related,
        ]);
    }

    private function format(Article $article): array
    {
        return [
            'id'               => $article->id,
            'slug'             => $article->slug,
            'titre'            => $article->titre,
            'extrait'          => $article->extrait,
            'contenu'          => $article->contenu,
            'auteur'           => $article->auteur ?? 'Rédaction SICTA',
            'temps_lecture'    => $article->temps_lecture ? $article->temps_lecture . ' min' : null,
            'date_publication' => $article->date_publication?->format('Y-m-d'),
            'a_la_une'         => (bool) $article->a_la_une,
            'tendance'         => (bool) $article->tendance,
            'image_principale' => $article->image_principale
                ? asset('storage/' . $article->image_principale)
                : null,
            'categorie'        => $article->categorie?->nom,
            // Médias de l'article (pour la galerie)
            'medias'           => $article->relationLoaded('medias')
                ? $article->medias->map(fn($m) => [
                    'id'       => $m->id,
                    'url'      => asset('storage/' . $m->path),
                    'filename' => $m->filename,
                    'type'     => $m->type,
                    'order'    => $m->order,
                ])->values()
                : [],
            'has_gallery'      => $article->relationLoaded('medias') && $article->medias->isNotEmpty(),
        ];
    }
}
