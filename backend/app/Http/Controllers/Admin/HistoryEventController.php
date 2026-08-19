<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HistoryEvent;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HistoryEventController extends Controller
{
    public function index()
    {
        $events = HistoryEvent::orderBy('ordre')->get();
        return view('admin.history.index', compact('events'));
    }

    public function create() { return view('admin.history.form', ['event' => new HistoryEvent(['actif' => true])]); }

    public function store(Request $request)
    {
        $data = $this->validateData($request);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        $data['highlight'] = $request->has('highlight') ? 1 : 0;
        if ($request->hasFile('image')) {
            $data['image'] = ImageUploadService::store($request->file('image'), 'history');
        }
        HistoryEvent::create($data);
        return redirect()->route('admin.history.index')->with('success', 'Étape ajoutée.');
    }

    public function edit(HistoryEvent $history) { return view('admin.history.form', ['event' => $history]); }

    public function update(Request $request, HistoryEvent $history)
    {
        $data = $this->validateData($request);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        $data['highlight'] = $request->has('highlight') ? 1 : 0;
        if ($request->hasFile('image')) {
            if ($history->image) Storage::disk('public')->delete($history->image);
            $data['image'] = ImageUploadService::store($request->file('image'), 'history');
        }
        $history->update($data);
        return redirect()->route('admin.history.index')->with('success', 'Étape mise à jour.');
    }

    public function destroy(HistoryEvent $history)
    {
        if ($history->image) Storage::disk('public')->delete($history->image);
        $history->delete();
        return back()->with('success', 'Étape supprimée.');
    }

    public function toggle(HistoryEvent $history)
    {
        $history->update(['actif' => !$history->actif]);
        return back()->with('success', 'Statut mis à jour.');
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'annee'       => 'required|string|max:20',
            'titre'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'ordre'       => 'integer|min:0',
            'image'       => 'nullable|image|max:20480',
        ]);
    }
}
