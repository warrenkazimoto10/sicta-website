<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Station;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StationController extends Controller
{
    public function index(): JsonResponse
    {
        $stations = Station::where('actif', true)
            ->orderBy('type')
            ->orderBy('nom')
            ->get();

        return response()->json([
            'data' => $stations->map(fn($s) => $this->format($s)),
        ]);
    }

    /**
     * Trouve les N stations les plus proches via formule Haversine (MySQL).
     * GET /api/v1/stations/nearest?lat=X&lon=Y&limit=3
     */
    public function nearest(Request $request): JsonResponse
    {
        $lat   = (float) $request->input('lat', 0);
        $lon   = (float) $request->input('lon', 0);
        $limit = (int)   $request->input('limit', 3);

        if ($lat === 0.0 && $lon === 0.0) {
            return response()->json(['success' => false, 'message' => 'Coordonnées manquantes.'], 422);
        }

        $stations = Station::selectRaw("
            *,
            (6371 * acos(
                cos(radians(?)) * cos(radians(latitude)) *
                cos(radians(longitude) - radians(?)) +
                sin(radians(?)) * sin(radians(latitude))
            )) AS distance
        ", [$lat, $lon, $lat])
            ->where('actif', true)
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->orderBy('distance')
            ->limit($limit)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $stations->map(fn($s) => array_merge($this->format($s), [
                'distance_km' => round($s->distance, 1),
            ])),
        ]);
    }

    /**
     * Compteur de stations par type pour l'affichage dynamique.
     * GET /api/v1/stats
     */
    public function stats(): JsonResponse
    {
        $permanent  = Station::where('actif', true)->where('type', 'permanent')->count();
        $periodique = Station::where('actif', true)->where('type', 'periodique')->count();
        $mobile     = Station::where('actif', true)->where('type', 'mobile')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'permanent'  => $permanent,
                'periodique' => $periodique,
                'mobile'     => $mobile,
                'total'      => $permanent + $periodique + $mobile,
            ],
        ]);
    }

    private function format(Station $s): array
    {
        return [
            'id'                  => $s->id,
            'nom'                 => $s->nom,
            'zone'                => $s->zone,
            'ville'               => $s->ville,
            'telephone'           => $s->telephone,
            'horaires'            => $s->horaires,
            'region'              => $s->region,
            'type'                => $s->type ?? 'permanent',
            'latitude'            => $s->latitude,
            'longitude'           => $s->longitude,
            'services'            => is_array($s->services_disponibles)
                                       ? $s->services_disponibles
                                       : (json_decode($s->services_disponibles ?? '[]', true) ?? []),
            'maps_url'            => $s->maps_url,
            'texte_disponibilite' => $s->texte_disponibilite,
        ];
    }
}
