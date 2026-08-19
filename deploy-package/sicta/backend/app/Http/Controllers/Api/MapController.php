<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MapPoint;
use App\Models\PageSection;
use App\Models\Station;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class MapController extends Controller
{
    public function index(): JsonResponse
    {
        $imagePath = PageSection::get('reseau', 'reseau_map_image');
        $image     = $imagePath ? asset('storage/' . $imagePath) : null;

        $points = MapPoint::with('station')
            ->orderBy('ordre')
            ->get()
            ->map(function (MapPoint $p) {
                $base = [
                    'id'     => $p->id,
                    'type'   => $p->type,
                    'icone'  => $p->icone ?: 'MapPin',
                    'taille' => $p->taille ?: 'moyen',
                    'x'      => (float) $p->x,
                    'y'      => (float) $p->y,
                ];

                if ($p->type === 'ville') {
                    $stations = Station::where('actif', true)
                        ->where('ville', $p->ville)
                        ->orderBy('nom')
                        ->get()
                        ->map(fn($s) => $this->formatStation($s));

                    return $base + [
                        'label'    => $p->label ?: $p->ville,
                        'ville'    => $p->ville,
                        'count'    => $stations->count(),
                        'stations' => $stations->values(),
                    ];
                }

                // type = station
                $s = $p->station;
                return $base + [
                    'label'   => $p->label ?: ($s->nom ?? 'Station'),
                    'ville'   => $s->ville ?? null,
                    'station' => $s ? $this->formatStation($s) : null,
                ];
            })
            ->filter(fn($p) => $p['type'] === 'ville' || $p['station'] !== null)
            ->values();

        return response()->json(['data' => ['image' => $image, 'points' => $points]]);
    }

    private function formatStation(Station $s): array
    {
        return [
            'id'          => $s->id,
            'nom'         => $s->nom,
            'ville'       => $s->ville,
            'zone'        => $s->zone,
            'type'        => $s->type,
            'telephone'   => $s->telephone,
            'horaires'    => $s->horaires,
            'services'    => is_array($s->services_disponibles) ? $s->services_disponibles : (json_decode($s->services_disponibles ?? '[]', true) ?: []),
            'maps_url'    => $s->maps_url,
        ];
    }
}
