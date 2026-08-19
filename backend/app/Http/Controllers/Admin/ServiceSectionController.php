<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceSection;
use Illuminate\Http\Request;

class ServiceSectionController extends Controller
{
    public function create(Service $service, Request $request)
    {
        $type = $request->query('type', 'intro');
        abort_unless(array_key_exists($type, ServiceSection::TYPES), 404);
        $section = new ServiceSection(['type' => $type, 'actif' => true, 'service_id' => $service->id]);
        return view('admin.service_sections.form', compact('service', 'section'));
    }

    public function store(Service $service, Request $request)
    {
        $data = $this->validated($request);
        $data['ordre'] = ($service->sections()->max('ordre') ?? 0) + 1;
        $service->sections()->create($data);
        return redirect()->route('admin.services.edit', $service)->with('success', 'Bloc ajouté.');
    }

    public function edit(ServiceSection $section)
    {
        $service = $section->service;
        return view('admin.service_sections.form', compact('service', 'section'));
    }

    public function update(ServiceSection $section, Request $request)
    {
        $data = $this->validated($request);
        $section->update($data);
        return redirect()->route('admin.services.edit', $section->service)->with('success', 'Bloc mis à jour.');
    }

    public function destroy(ServiceSection $section)
    {
        $service = $section->service;
        $section->delete();
        return redirect()->route('admin.services.edit', $service)->with('success', 'Bloc supprimé.');
    }

    public function move(ServiceSection $section, string $dir)
    {
        $service = $section->service;
        $neighbor = $service->sections()
            ->where('ordre', $dir === 'up' ? '<' : '>', $section->ordre)
            ->orderBy('ordre', $dir === 'up' ? 'desc' : 'asc')
            ->first();

        if ($neighbor) {
            $tmp = $section->ordre;
            $section->update(['ordre' => $neighbor->ordre]);
            $neighbor->update(['ordre' => $tmp]);
        }
        return back();
    }

    private function validated(Request $request): array
    {
        $validated = $request->validate([
            'type'       => 'required|string|in:' . implode(',', array_keys(ServiceSection::TYPES)),
            'titre'      => 'nullable|string|max:255',
            'sous_titre' => 'nullable|string|max:255',
            'contenu'    => 'nullable|string',
            'actif'      => 'nullable',
        ]);

        $contenu = null;
        if (!empty($validated['contenu'])) {
            $decoded = json_decode($validated['contenu'], true);
            $contenu = json_last_error() === JSON_ERROR_NONE ? $decoded : null;
        }

        return [
            'type'       => $validated['type'],
            'titre'      => $validated['titre'] ?? null,
            'sous_titre' => $validated['sous_titre'] ?? null,
            'contenu'    => $contenu,
            'actif'      => $request->has('actif') ? 1 : 0,
        ];
    }
}
