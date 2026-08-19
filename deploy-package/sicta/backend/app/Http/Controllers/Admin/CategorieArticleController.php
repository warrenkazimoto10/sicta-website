<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\CategorieArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategorieArticleController extends Controller {
    public function index() {
        $categories = CategorieArticle::withCount('articles')->get();
        return view('admin.categories.index', compact('categories'));
    }

    public function store(Request $request) {
        $data = $request->validate(['nom' => 'required|string|max:100|unique:categories_articles']);
        $data['slug'] = Str::slug($data['nom']);
        CategorieArticle::create($data);
        return back()->with('success', 'Catégorie créée.');
    }

    public function update(Request $request, CategorieArticle $category) {
        $data = $request->validate(['nom' => 'required|string|max:100']);
        $data['slug'] = Str::slug($data['nom']);
        $category->update($data);
        return back()->with('success', 'Catégorie mise à jour.');
    }

    public function destroy(CategorieArticle $category) {
        $category->delete();
        return back()->with('success', 'Catégorie supprimée.');
    }
}
