<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Station;
use Illuminate\Http\Request;

class ReservationController extends Controller {
    public function index(Request $request) {
        $query = Reservation::with('station:id,nom')->latest();
        if ($request->filled('statut')) $query->where('statut', $request->statut);
        if ($request->filled('station_id')) $query->where('station_id', $request->station_id);
        if ($request->filled('categorie')) $query->where('categorie_vehicule', $request->categorie);
        if ($request->filled('date_debut')) $query->whereDate('date_rdv', '>=', $request->date_debut);
        if ($request->filled('date_fin')) $query->whereDate('date_rdv', '<=', $request->date_fin);
        if ($request->filled('search')) {
            $s = '%'.$request->search.'%';
            $query->where(function($q) use ($s) {
                $q->where('nom', 'like', $s)->orWhere('telephone', 'like', $s)->orWhere('immatriculation', 'like', $s);
            });
        }
        $reservations = $query->paginate($request->input('per_page', 20))->withQueryString();
        $stations = Station::where('actif', true)->select('id', 'nom')->get();
        $counts = [
            'en_attente' => Reservation::where('statut', 'en_attente')->count(),
            'confirmee' => Reservation::where('statut', 'confirmee')->count(),
            'annulee' => Reservation::where('statut', 'annulee')->count(),
            'realisee' => Reservation::where('statut', 'realisee')->count(),
        ];
        return view('admin.reservations.index', compact('reservations', 'stations', 'counts'));
    }

    public function show(Reservation $reservation) {
        $reservation->load('station');
        return view('admin.reservations.show', compact('reservation'));
    }

    public function updateStatut(Request $request, Reservation $reservation) {
        $request->validate(['statut' => 'required|in:en_attente,confirmee,annulee,realisee']);
        $reservation->update(['statut' => $request->statut]);
        if ($request->filled('note_interne')) $reservation->update(['note_interne' => $request->note_interne]);
        return back()->with('success', 'Statut mis à jour.');
    }

    public function destroy(Reservation $reservation) {
        $reservation->delete();
        return back()->with('success', 'Réservation supprimée.');
    }

    public function exportCsv(Request $request) {
        $reservations = Reservation::with('station:id,nom')
            ->when($request->filled('statut'), function($q) use ($request) { return $q->where('statut', $request->statut); })
            ->latest()->get();

        $headers = ['Content-Type' => 'text/csv; charset=UTF-8', 'Content-Disposition' => 'attachment; filename="reservations.csv"'];
        $callback = function () use ($reservations) {
            $file = fopen('php://output', 'w');
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));
            fputcsv($file, ['N° Réservation', 'Nom', 'Prénom', 'Téléphone', 'Station', 'Catégorie', 'Immatriculation', 'Date RDV', 'Heure', 'Statut', 'Créé le'], ';');
            foreach ($reservations as $r) {
                fputcsv($file, [$r->numero_reservation, $r->nom, $r->prenom, $r->telephone, $r->station ? $r->station->nom : 'N/A', $r->categorie_vehicule, $r->immatriculation, $r->date_rdv ? $r->date_rdv->format('d/m/Y') : '', $r->heure_rdv, $r->statut, $r->created_at->format('d/m/Y H:i')], ';');
            }
            fclose($file);
        };
        return response()->stream($callback, 200, $headers);
    }
}
