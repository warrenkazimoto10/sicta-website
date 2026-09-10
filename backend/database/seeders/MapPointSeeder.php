<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MapPoint;
use App\Models\PageSection;
use App\Models\Station;

class MapPointSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Définir l'image de la carte par défaut si elle n'est pas déjà configurée
        // On utilise l'image publique /CARTE_SICTA.png copiée lors du déploiement
        PageSection::updateOrCreate(
            ['page' => 'reseau', 'section_key' => 'reseau_map_image'],
            ['value' => 'map/CARTE_SICTA.png', 'type' => 'image']
        );

        // Assurer que le dossier map existe et contient l'image dans le storage public
        $storageMapDir = storage_path('app/public/map');
        if (!is_dir($storageMapDir)) {
            @mkdir($storageMapDir, 0755, true);
        }
        $publicMapSource = public_path('CARTE_SICTA.png');
        if (file_exists($publicMapSource)) {
            @copy($publicMapSource, $storageMapDir . '/CARTE_SICTA.png');
        }

        // 2. Supprimer les points existants pour éviter les doublons
        MapPoint::truncate();

        // 3. Récupérer les stations correspondantes pour lier les points de type 'station'
        $stations = Station::pluck('id', 'nom')->toArray();

        // Points par défaut (positionnés en % sur la carte de la Côte d'Ivoire)
        $defaultPoints = [
            // Abidjan et sa zone
            [
                'type' => 'station',
                'station_nom' => 'SICTA Plateau',
                'label' => 'Abidjan - Plateau',
                'x' => 77.2,
                'y' => 84.8,
                'taille' => 'grand',
                'icone' => 'Building2'
            ],
            [
                'type' => 'station',
                'station_nom' => 'SICTA Angré',
                'label' => 'Abidjan - Angré',
                'x' => 78.5,
                'y' => 83.2,
                'taille' => 'moyen',
                'icone' => 'Building2'
            ],
            // Grandes villes de l'intérieur
            [
                'type' => 'ville',
                'ville' => 'Yamoussoukro',
                'label' => 'Yamoussoukro',
                'x' => 54.8,
                'y' => 61.5,
                'taille' => 'grand',
                'icone' => 'MapPin'
            ],
            [
                'type' => 'ville',
                'ville' => 'Bouaké',
                'label' => 'Bouaké',
                'x' => 59.2,
                'y' => 49.3,
                'taille' => 'grand',
                'icone' => 'MapPin'
            ],
            [
                'type' => 'ville',
                'ville' => 'San Pédro',
                'label' => 'San Pédro',
                'x' => 31.8,
                'y' => 87.2,
                'taille' => 'grand',
                'icone' => 'MapPin'
            ],
            [
                'type' => 'ville',
                'ville' => 'Daloa',
                'label' => 'Daloa',
                'x' => 28.5,
                'y' => 60.2,
                'taille' => 'grand',
                'icone' => 'MapPin'
            ],
            [
                'type' => 'ville',
                'ville' => 'Korhogo',
                'label' => 'Korhogo',
                'x' => 48.8,
                'y' => 24.5,
                'taille' => 'grand',
                'icone' => 'MapPin'
            ],
            [
                'type' => 'ville',
                'ville' => 'Man',
                'label' => 'Man',
                'x' => 12.2,
                'y' => 53.8,
                'taille' => 'grand',
                'icone' => 'MapPin'
            ],
            [
                'type' => 'ville',
                'ville' => 'Abengourou',
                'label' => 'Abengourou',
                'x' => 88.5,
                'y' => 62.8,
                'taille' => 'grand',
                'icone' => 'MapPin'
            ],
            [
                'type' => 'ville',
                'ville' => 'Aboisso',
                'label' => 'Aboisso',
                'x' => 91.2,
                'y' => 81.5,
                'taille' => 'grand',
                'icone' => 'MapPin'
            ],
            [
                'type' => 'ville',
                'ville' => 'Gagnoa',
                'label' => 'Gagnoa',
                'x' => 43.8,
                'y' => 70.8,
                'taille' => 'moyen',
                'icone' => 'MapPin'
            ],
            [
                'type' => 'ville',
                'ville' => 'Divo',
                'label' => 'Divo',
                'x' => 53.2,
                'y' => 75.2,
                'taille' => 'moyen',
                'icone' => 'MapPin'
            ]
        ];

        $ordre = 10;
        foreach ($defaultPoints as $dp) {
            $stationId = null;
            if ($dp['type'] === 'station' && isset($dp['station_nom'])) {
                $stationId = $stations[$dp['station_nom']] ?? null;
            }

            MapPoint::create([
                'type'       => $dp['type'],
                'ville'      => $dp['type'] === 'ville' ? $dp['ville'] : null,
                'station_id' => $stationId,
                'label'      => $dp['label'],
                'icone'      => $dp['icone'],
                'taille'     => $dp['taille'],
                'x'          => $dp['x'],
                'y'          => $dp['y'],
                'ordre'      => $ordre,
            ]);
            $ordre += 10;
        }
    }
}
