<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleMedia;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleMediaController extends Controller
{
    /** POST /api/v1/articles/{article}/media — upload multi-fichiers */
    public function store(Request $request, Article $article): JsonResponse
    {
        $request->validate([
            'files'   => 'required|array|max:20',
            'files.*' => 'required|file|mimes:jpeg,jpg,png,gif,webp,mp4,mov,avi|max:51200',
        ]);

        $created = [];
        $maxOrder = $article->medias()->max('order') ?? -1;

        foreach ($request->file('files') as $file) {
            $type = str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image';
            $path = $file->store("articles/{$article->id}/media", 'public');
            $maxOrder++;

            $media = $article->medias()->create([
                'path'     => $path,
                'filename' => $file->getClientOriginalName(),
                'type'     => $type,
                'order'    => $maxOrder,
            ]);

            $created[] = [
                'id'       => $media->id,
                'url'      => asset('storage/' . $media->path),
                'filename' => $media->filename,
                'type'     => $media->type,
                'order'    => $media->order,
            ];
        }

        return response()->json(['success' => true, 'data' => $created], 201);
    }

    /** DELETE /api/v1/articles/{article}/media/{media} */
    public function destroy(Article $article, ArticleMedia $media): JsonResponse
    {
        if ($media->article_id !== $article->id) {
            return response()->json(['success' => false, 'message' => 'Non autorisé.'], 403);
        }
        Storage::disk('public')->delete($media->path);
        $media->delete();
        return response()->json(['success' => true, 'message' => 'Média supprimé.']);
    }
}
