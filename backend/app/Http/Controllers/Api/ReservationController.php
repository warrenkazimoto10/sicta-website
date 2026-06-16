<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Station;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReservationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'station_nom'        => 'nullable|string|max:255',
            'categorie_vehicule' => 'required|in:moto,auto,pl',
            'puissance_cv'       => 'nullable|string|max:50',
            'immatriculation'    => 'required|string|max:20',
            'prenom'             => 'required|string|max:100',
            'nom'                => 'required|string|max:100',
            'telephone'          => 'required|string|max:20',
            'date_rdv'           => 'required|date|after:today',
            'heure_rdv'          => 'required|string|max:10',
        ]);

        // Résoudre le nom de station vers un ID en base
        $stationId = null;
        if (!empty($data['station_nom'])) {
            $station = Station::where('nom', 'like', '%' . $data['station_nom'] . '%')
                ->orWhereRaw('LOWER(nom) LIKE ?', ['%' . strtolower($data['station_nom']) . '%'])
                ->first();
            $stationId = $station?->id;
        }

        $reservation = Reservation::create([
            'station_id'         => $stationId,
            'categorie_vehicule' => $data['categorie_vehicule'],
            'puissance_cv'       => $data['puissance_cv'] ?? null,
            'immatriculation'    => $data['immatriculation'],
            'prenom'             => $data['prenom'],
            'nom'                => $data['nom'],
            'telephone'          => $data['telephone'],
            'date_rdv'           => $data['date_rdv'],
            'heure_rdv'          => $data['heure_rdv'],
            'numero_reservation' => $this->generateRef(),
            'statut'             => 'en_attente',
        ]);

        return response()->json([
            'success'            => true,
            'numero_reservation' => $reservation->numero_reservation,
            'message'            => 'Réservation enregistrée avec succès.',
        ], 201);
    }

    private function generateRef(): string
    {
        do {
            $ref = 'SICTA-' . strtoupper(Str::random(8));
        } while (Reservation::where('numero_reservation', $ref)->exists());

        return $ref;
    }
}
