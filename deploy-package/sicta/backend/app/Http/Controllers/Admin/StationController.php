<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Station;
use Illuminate\Http\Request;

class StationController extends Controller {
    public function index(Request $request) {
        $query = Station::latest();
        if ($request->filled('zone')) $query->where('zone', $request->zone);
        if ($request->filled('statut')) $query->where('actif', $request->statut === 'actif');
        if ($request->filled('search')) $query->where(function($q) use ($request) {
            $q->where('nom', 'like', '%'.$request->search.'%')->orWhere('ville', 'like', '%'.$request->search.'%');
        });
        $stations = $query->paginate($request->input('per_page', 10))->withQueryString();
        return view('admin.stations.index', compact('stations'));
    }

    public function create() { return view('admin.stations.form', ['station' => new Station]); }

    public function store(Request $request) {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'zone' => 'required|in:abidjan,interieur',
            'ville' => 'required|string|max:255',
            'telephone' => 'required|string|max:50',
            'horaires' => 'nullable|string|max:255',
            'texte_disponibilite' => 'nullable|string',
            'maps_url' => 'nullable|url',
            'services_disponibles' => 'nullable|array',
            'actif' => 'boolean',
        ]);
        $data['services_disponibles'] = $request->input('services_disponibles', []);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        Station::create($data);
        return redirect()->route('admin.stations.index')->with('success', 'Station créée avec succès.');
    }

    public function edit(Station $station) { return view('admin.stations.form', compact('station')); }

    public function update(Request $request, Station $station) {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'zone' => 'required|in:abidjan,interieur',
            'ville' => 'required|string|max:255',
            'telephone' => 'required|string|max:50',
            'horaires' => 'nullable|string|max:255',
            'texte_disponibilite' => 'nullable|string',
            'maps_url' => 'nullable|url',
            'services_disponibles' => 'nullable|array',
            'actif' => 'boolean',
        ]);
        $data['services_disponibles'] = $request->input('services_disponibles', []);
        $data['actif'] = $request->has('actif') ? 1 : 0;
        $station->update($data);
        return redirect()->route('admin.stations.index')->with('success', 'Station mise à jour.');
    }

    public function destroy(Station $station) {
        $station->delete();
        return back()->with('success', 'Station supprimée.');
    }

    public function toggle(Station $station) {
        $station->update(['actif' => !$station->actif]);
        return back()->with('success', 'Statut mis à jour.');
    }
}
