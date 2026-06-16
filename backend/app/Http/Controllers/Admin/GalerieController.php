<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\DossierGalerie;
use App\Models\MediaGalerie;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalerieController extends Controller {
    public function index(Request $request) {
        $query = DossierGalerie::withCount('medias')->with('article:id,titre')->latest();
        if ($request->filled('categorie')) $query->where('categorie', $request->categorie);
        $dossiers = $query->paginate($request->input('per_page', 12))->withQueryString();
        return view('admin.galerie.index', compact('dossiers'));
    }

    public function create() {
        $articles    = Article::where('statut', 'publie')->select('id', 'titre', 'image_principale')->get();
        $articlesMap = $articles->keyBy('id')->map(fn($a) => [
            'titre'     => $a->titre,
            'image_url' => $a->image_principale ? asset('storage/' . $a->image_principale) : null,
        ]);
        return view('admin.galerie.form', ['dossier' => new DossierGalerie, 'articles' => $articles, 'articlesMap' => $articlesMap]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'categorie' => 'required|in:agences,equipements,evenements,vehicules,autre',
            'article_id' => 'nullable|exists:articles,id',
            'date' => 'nullable|date',
            'public' => 'boolean',
            'image_couverture' => 'nullable|image|max:4096',
            'medias'   => 'nullable|array|max:10',
            'medias.*' => 'nullable|file|mimes:jpg,jpeg,png,webp,mp4,mov|max:4096',
        ]);
        $data['public'] = $request->has('public') ? 1 : 0;
        if ($request->hasFile('image_couverture')) {
            $data['image_couverture'] = $request->file('image_couverture')->store('galerie/covers', 'public');
        } elseif (!empty($data['article_id'])) {
            $article = Article::find($data['article_id']);
            if ($article?->image_principale) {
                $data['image_couverture'] = $article->image_principale;
            }
        }
        $dossier = DossierGalerie::create($data);
        if ($request->hasFile('medias')) {
            foreach ($request->file('medias') as $i => $file) {
                $type = in_array($file->extension(), ['mp4', 'mov']) ? 'video' : 'image';
                $path = $file->store('galerie/medias', 'public');
                MediaGalerie::create(['dossier_id' => $dossier->id, 'type' => $type, 'fichier' => $path, 'ordre' => $i]);
            }
        }
        return redirect()->route('admin.galerie.index')->with('success', 'Dossier créé.');
    }

    public function show(DossierGalerie $galerie) {
        $galerie->load('medias');
        return view('admin.galerie.show', ['dossier' => $galerie]);
    }

    public function edit(DossierGalerie $galerie) {
        $articles    = Article::where('statut', 'publie')->select('id', 'titre', 'image_principale')->get();
        $articlesMap = $articles->keyBy('id')->map(fn($a) => [
            'titre'     => $a->titre,
            'image_url' => $a->image_principale ? asset('storage/' . $a->image_principale) : null,
        ]);
        return view('admin.galerie.form', ['dossier' => $galerie, 'articles' => $articles, 'articlesMap' => $articlesMap]);
    }

    public function update(Request $request, DossierGalerie $galerie) {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'categorie' => 'required|in:agences,equipements,evenements,vehicules,autre',
            'article_id' => 'nullable|exists:articles,id',
            'date' => 'nullable|date',
            'public' => 'boolean',
            'image_couverture' => 'nullable|image|max:4096',
        ]);
        $data['public'] = $request->has('public') ? 1 : 0;
        if ($request->hasFile('image_couverture')) {
            if ($galerie->image_couverture) Storage::disk('public')->delete($galerie->image_couverture);
            $data['image_couverture'] = $request->file('image_couverture')->store('galerie/covers', 'public');
        } elseif (!$galerie->image_couverture && !empty($data['article_id'])) {
            $article = Article::find($data['article_id']);
            if ($article?->image_principale) {
                $data['image_couverture'] = $article->image_principale;
            }
        }
        $galerie->update($data);
        return redirect()->route('admin.galerie.index')->with('success', 'Dossier mis à jour.');
    }

    public function destroy(DossierGalerie $galerie) {
        foreach ($galerie->medias as $media) {
            Storage::disk('public')->delete($media->fichier);
        }
        if ($galerie->image_couverture) Storage::disk('public')->delete($galerie->image_couverture);
        $galerie->delete();
        return back()->with('success', 'Dossier supprimé.');
    }
}
