<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MapPoint;
use App\Models\PageSection;
use App\Models\Station;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MapEditorController extends Controller
{
    private const PAGE = 'reseau';
    private const KEY  = 'reseau_map_image';

    public function index()
    {
        $imagePath = PageSection::get(self::PAGE, self::KEY);
        $imageUrl  = $imagePath ? Storage::url($imagePath) : null;

        // Points déjà placés
        $points = MapPoint::with('station:id,nom,ville,type')
            ->orderBy('ordre')
            ->get()
            ->map(fn($p) => [
                'type'       => $p->type,
                'ville'      => $p->ville,
                'station_id' => $p->station_id,
                'nom'        => $p->type === 'ville' ? $p->ville : ($p->station->nom ?? 'Station'),
                'sous'       => $p->type === 'ville' ? 'Ville' : (($p->station->type ?? '') === 'mobile' ? 'Banc mobile' : 'Station fixe'),
                'label'      => $p->label ?? '',
                'icone'      => $p->icone ?: 'MapPin',
                'taille'     => $p->taille ?: 'moyen',
                'x'          => (float) $p->x,
                'y'          => (float) $p->y,
            ])->values();

        // Toutes les villes distinctes des stations actives (+ nombre de stations)
        $villes = Station::where('actif', true)
            ->whereNotNull('ville')->where('ville', '!=', '')
            ->selectRaw('ville, COUNT(*) as nb')
            ->groupBy('ville')
            ->orderBy('ville')
            ->get()
            ->map(fn($v) => ['ville' => $v->ville, 'nb' => (int) $v->nb])
            ->values();

        // Toutes les stations actives (pour placer une station précise)
        $stations = Station::where('actif', true)
            ->orderBy('nom')
            ->get(['id', 'nom', 'ville', 'type'])
            ->map(fn($s) => [
                'id'    => $s->id,
                'nom'   => $s->nom,
                'ville' => $s->ville,
                'type'  => $s->type ?? 'permanent',
            ])->values();

        return view('admin.reseau_carte.index', compact('imageUrl', 'points', 'villes', 'stations'));
    }

    public function uploadImage(Request $request)
    {
        $request->validate(['image' => 'required|image|max:20480']);

        $existing = PageSection::where('page', self::PAGE)->where('section_key', self::KEY)->value('value');
        if ($existing) {
            Storage::disk('public')->delete($existing);
        }

        $path = ImageUploadService::store($request->file('image'), 'map');
        PageSection::updateOrCreate(
            ['page' => self::PAGE, 'section_key' => self::KEY],
            ['value' => $path, 'type' => 'image']
        );

        return back()->with('success', 'Carte enregistrée. Placez maintenant vos points.');
    }

    public function save(Request $request)
    {
        $points = json_decode($request->input('points', '[]'), true) ?: [];

        // Remplacement complet de l'ensemble des points
        MapPoint::query()->delete();

        $ordre = 0;
        foreach ($points as $p) {
            $type = ($p['type'] ?? 'ville') === 'station' ? 'station' : 'ville';
            $x = max(0, min(100, (float) ($p['x'] ?? 0)));
            $y = max(0, min(100, (float) ($p['y'] ?? 0)));
            $label = trim((string) ($p['label'] ?? ''));
            $taille = in_array($p['taille'] ?? '', MapPoint::TAILLES, true) ? $p['taille'] : 'moyen';
            $ordre += 10;

            MapPoint::create([
                'type'       => $type,
                'ville'      => $type === 'ville' ? (trim((string) ($p['ville'] ?? '')) ?: null) : null,
                'station_id' => $type === 'station' ? (int) ($p['station_id'] ?? 0) ?: null : null,
                'label'      => $label !== '' ? $label : null,
                'icone'      => trim((string) ($p['icone'] ?? 'MapPin')) ?: 'MapPin',
                'taille'     => $taille,
                'x'          => round($x, 3),
                'y'          => round($y, 3),
                'ordre'      => $ordre,
            ]);
        }

        return back()->with('success', 'Carte du réseau enregistrée.');
    }
}
