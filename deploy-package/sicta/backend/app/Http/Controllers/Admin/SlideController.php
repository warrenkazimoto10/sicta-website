<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Slide;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SlideController extends Controller {
    public function index() {
        $slides = Slide::orderBy('ordre')->paginate(10);
        return view('admin.slides.index', compact('slides'));
    }

    public function create() { return view('admin.slides.form', ['slide' => new Slide]); }

    public function store(Request $request) {
        $data = $request->validate([
            'titre' => 'required|string|max:255',
            'sous_titre' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'badge_texte' => 'nullable|string|max:255',
            'bouton_texte' => 'nullable|string|max:100',
            'bouton_lien' => 'nullable|string|max:255',
            'ordre' => 'integer|min:0',
            'duree' => 'integer|min:1|max:60',
            'actif' => 'boolean',
            'image' => 'nullable|image|max:20480',
        ]);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        if ($request->hasFile('image')) {
            $data['image'] = ImageUploadService::store($request->file('image'), 'slides');
        }
        Slide::create($data);
        return redirect()->route('admin.slides.index')->with('success', 'Slide créé.');
    }

    public function edit(Slide $slide) { return view('admin.slides.form', compact('slide')); }

    public function update(Request $request, Slide $slide) {
        $data = $request->validate([
            'titre' => 'required|string|max:255',
            'sous_titre' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'badge_texte' => 'nullable|string|max:255',
            'bouton_texte' => 'nullable|string|max:100',
            'bouton_lien' => 'nullable|string|max:255',
            'ordre' => 'integer|min:0',
            'duree' => 'integer|min:1|max:60',
            'actif' => 'boolean',
            'image' => 'nullable|image|max:20480',
        ]);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        if ($request->hasFile('image')) {
            if ($slide->image) Storage::disk('public')->delete($slide->image);
            $data['image'] = ImageUploadService::store($request->file('image'), 'slides');
        }
        $slide->update($data);
        return redirect()->route('admin.slides.index')->with('success', 'Slide mis à jour.');
    }

    public function destroy(Slide $slide) {
        if ($slide->image) Storage::disk('public')->delete($slide->image);
        $slide->delete();
        return back()->with('success', 'Slide supprimé.');
    }

    public function toggle(Slide $slide) {
        $slide->update(['actif' => !$slide->actif]);
        return back()->with('success', 'Statut mis à jour.');
    }
}
