<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DossierGalerie;
use App\Models\MediaGalerie;
use App\Services\ImageUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalerieMediaController extends Controller
{
    public function store(Request $request, DossierGalerie $galerie): JsonResponse
    {
        $request->validate([
            'files.*' => 'required|file|mimes:jpg,jpeg,png,webp,gif,mp4,mov|max:51200',
        ]);

        $created = [];
        $nextOrdre = ($galerie->medias()->max('ordre') ?? 0) + 1;

        foreach ($request->file('files', []) as $i => $file) {
            $type = in_array(strtolower($file->getClientOriginalExtension()), ['mp4', 'mov']) ? 'video' : 'image';
            $path = ImageUploadService::store($file, 'galerie/medias');
            $media = MediaGalerie::create([
                'dossier_id' => $galerie->id,
                'type'       => $type,
                'fichier'    => $path,
                'ordre'      => $nextOrdre + $i,
            ]);
            $created[] = [
                'id'     => $media->id,
                'type'   => $media->type,
                'url'    => asset('storage/' . $media->fichier),
                'fichier'=> $media->fichier,
                'ordre'  => $media->ordre,
            ];
        }

        return response()->json(['success' => true, 'data' => $created]);
    }

    public function destroy(DossierGalerie $galerie, MediaGalerie $media): JsonResponse
    {
        if ($media->dossier_id !== $galerie->id) {
            abort(404);
        }
        Storage::disk('public')->delete($media->fichier);
        $media->delete();
        return response()->json(['success' => true, 'message' => 'Média supprimé.']);
    }
}
