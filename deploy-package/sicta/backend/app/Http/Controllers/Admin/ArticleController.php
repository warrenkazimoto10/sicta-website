<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\CategorieArticle;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArticleController extends Controller {
    public function index(Request $request) {
        $query = Article::with('categorie')->latest();
        if ($request->filled('statut')) $query->where('statut', $request->statut);
        if ($request->filled('categorie_id')) $query->where('categorie_id', $request->categorie_id);
        if ($request->filled('search')) $query->where('titre', 'like', '%'.$request->search.'%');
        if ($request->filled('auteur')) $query->where('auteur', 'like', '%'.$request->auteur.'%');
        if ($request->filled('date_debut')) $query->whereDate('date_publication', '>=', $request->date_debut);
        if ($request->filled('date_fin'))   $query->whereDate('date_publication', '<=', $request->date_fin);
        $articles = $query->paginate($request->input('per_page', 10))->withQueryString();
        $categories = CategorieArticle::all();
        return view('admin.articles.index', compact('articles', 'categories'));
    }

    public function create() {
        $categories = CategorieArticle::all();
        return view('admin.articles.form', ['article' => new Article, 'categories' => $categories]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'titre' => 'required|string|max:255',
            'categorie_id' => 'nullable|exists:categories_articles,id',
            'extrait' => 'nullable|string',
            'contenu' => 'nullable|string',
            'auteur' => 'nullable|string|max:100',
            'temps_lecture' => 'nullable|integer|min:1',
            'date_publication' => 'nullable|date',
            'statut' => 'required|in:brouillon,publie,archive',
            'a_la_une' => 'boolean',
            'tendance' => 'boolean',
            'image_principale' => 'nullable|image|max:20480',
        ]);
        $data['slug'] = Str::slug($data['titre']) . '-' . time();
        $data['a_la_une'] = $request->has('a_la_une') ? 1 : 0;
        $data['tendance'] = $request->has('tendance') ? 1 : 0;
        if ($request->hasFile('image_principale')) {
            $data['image_principale'] = ImageUploadService::store($request->file('image_principale'), 'articles');
        }
        Article::create($data);
        return redirect()->route('admin.articles.index')->with('success', 'Article créé.');
    }

    public function show(Article $article) {
        $article->load(['categorie', 'medias']);
        return view('admin.articles.show', compact('article'));
    }

    public function edit(Article $article) {
        $categories = CategorieArticle::all();
        return view('admin.articles.form', compact('article', 'categories'));
    }

    public function update(Request $request, Article $article) {
        $data = $request->validate([
            'titre' => 'required|string|max:255',
            'categorie_id' => 'nullable|exists:categories_articles,id',
            'extrait' => 'nullable|string',
            'contenu' => 'nullable|string',
            'auteur' => 'nullable|string|max:100',
            'temps_lecture' => 'nullable|integer|min:1',
            'date_publication' => 'nullable|date',
            'statut' => 'required|in:brouillon,publie,archive',
            'a_la_une' => 'boolean',
            'tendance' => 'boolean',
            'image_principale' => 'nullable|image|max:20480',
        ]);
        $data['a_la_une'] = $request->has('a_la_une') ? 1 : 0;
        $data['tendance'] = $request->has('tendance') ? 1 : 0;
        if ($request->hasFile('image_principale')) {
            if ($article->image_principale) Storage::disk('public')->delete($article->image_principale);
            $data['image_principale'] = ImageUploadService::store($request->file('image_principale'), 'articles');
        }
        $article->update($data);
        return redirect()->route('admin.articles.index')->with('success', 'Article mis à jour.');
    }

    public function duplicate(Article $article) {
        $copy = $article->replicate();
        $copy->titre = 'Copie — ' . $article->titre;
        $copy->slug = Str::slug($copy->titre) . '-' . time();
        $copy->statut = 'brouillon';
        $copy->a_la_une = false;
        $copy->tendance = false;
        $copy->image_principale = null;
        $copy->save();
        return redirect()->route('admin.articles.edit', $copy)
            ->with('success', 'Article dupliqué. Modifiez-le avant de le publier.');
    }

    public function destroy(Article $article) {
        if ($article->image_principale) Storage::disk('public')->delete($article->image_principale);
        $article->delete();
        return back()->with('success', 'Article supprimé.');
    }
}
