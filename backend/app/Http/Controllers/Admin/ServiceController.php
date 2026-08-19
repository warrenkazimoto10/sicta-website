<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('ordre')->withCount('sections')->get();
        return view('admin.services.index', compact('services'));
    }

    public function create()
    {
        return view('admin.services.form', ['service' => new Service(['actif' => true, 'source' => 'code'])]);
    }

    public function store(Request $request)
    {
        $data = $this->validateData($request);
        $data['slug'] = $data['slug'] ?: Str::slug($data['nom']);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        if ($request->hasFile('hero_image')) {
            $data['hero_image'] = ImageUploadService::store($request->file('hero_image'), 'services');
        }
        $service = Service::create($data);
        return redirect()->route('admin.services.edit', $service)->with('success', 'Service créé. Ajoutez maintenant des blocs de contenu.');
    }

    public function edit(Service $service)
    {
        $service->load('sections');
        return view('admin.services.form', compact('service'));
    }

    public function update(Request $request, Service $service)
    {
        $data = $this->validateData($request, $service->id);
        $data['slug'] = $data['slug'] ?: Str::slug($data['nom']);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        if ($request->hasFile('hero_image')) {
            if ($service->hero_image) Storage::disk('public')->delete($service->hero_image);
            $data['hero_image'] = ImageUploadService::store($request->file('hero_image'), 'services');
        }
        $service->update($data);
        return back()->with('success', 'Service mis à jour.');
    }

    public function destroy(Service $service)
    {
        if ($service->hero_image) Storage::disk('public')->delete($service->hero_image);
        $service->delete();
        return redirect()->route('admin.services.index')->with('success', 'Service supprimé.');
    }

    public function toggle(Service $service)
    {
        $service->update(['actif' => !$service->actif]);
        return back()->with('success', 'Statut mis à jour.');
    }

    private function validateData(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'nom'              => 'required|string|max:255',
            'slug'             => 'nullable|string|max:255|alpha_dash',
            'icone'            => 'nullable|string|max:50',
            'resume'           => 'nullable|string|max:255',
            'hero_titre'       => 'nullable|string|max:255',
            'hero_sous_titre'  => 'nullable|string|max:255',
            'hero_image'       => 'nullable|image|max:20480',
            'meta_title'       => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'source'           => 'required|in:code,cms',
            'ordre'            => 'integer|min:0',
        ]);
    }
}
