<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Station;

class StationSeeder extends Seeder {
    public function run(): void {
        // Abidjan — 7 agences permanentes + 2 mobiles
        $abidjan = [
            ['nom' => 'SICTA Angré',                    'ville' => 'Abidjan - Angré',      'telephone' => '07 67 11 04 85', 'services_disponibles' => ['Contrôle technique', 'CIVIO'],         'latitude' => 5.3730, 'longitude' => -3.9406, 'region' => 'Abidjan'],
            ['nom' => 'SICTA Guichet Unique',           'ville' => 'Abidjan - GUA',        'telephone' => '07 09 52 08 09', 'services_disponibles' => ['Contrôle technique', 'CIVIO', 'Pesée'],'latitude' => 5.2630, 'longitude' => -4.0033, 'region' => 'Abidjan'],
            ['nom' => 'SICTA Marcory',                  'ville' => 'Abidjan - Marcory',    'telephone' => '27 21 21 29 90', 'services_disponibles' => ['Contrôle technique', 'CIVIO'],         'latitude' => 5.3010, 'longitude' => -4.0110, 'region' => 'Abidjan'],
            ['nom' => 'SICTA Plateau',                  'ville' => 'Abidjan - Plateau',    'telephone' => '07 00 25 88 93', 'services_disponibles' => ['Contrôle technique', 'CIVIO', 'Pesée'],'latitude' => 5.3261, 'longitude' => -4.0259, 'region' => 'Abidjan'],
            ['nom' => 'SICTA Vridi',                    'ville' => 'Abidjan - Vridi',      'telephone' => '07 47 59 63 00', 'services_disponibles' => ['Contrôle technique', 'CIVIO'],         'latitude' => 5.2615, 'longitude' => -4.0006, 'region' => 'Abidjan'],
            ['nom' => 'SICTA Yopougon Zone Industrielle','ville' => 'Abidjan - Yopougon ZI','telephone' => '07 07 62 28 48', 'services_disponibles' => ['Contrôle technique', 'CIVIO'],        'latitude' => 5.3727, 'longitude' => -4.0800, 'region' => 'Abidjan'],
            ['nom' => 'SICTA Yopougon Niangon',         'ville' => 'Abidjan - Niangon',    'telephone' => '07 09 71 82 77', 'services_disponibles' => ['Contrôle technique', 'CIVIO'],         'latitude' => 5.3215, 'longitude' => -4.0907, 'region' => 'Abidjan'],
            ['nom' => 'Banc Mobile Abidjan',            'ville' => 'Abidjan (rayon 50km)', 'telephone' => '07 07 74 80 79', 'services_disponibles' => ['Contrôle technique'],                   'latitude' => 5.3500, 'longitude' => -4.0200, 'region' => 'Abidjan', 'type' => 'mobile'],
            ['nom' => 'Fourgon Intervention',           'ville' => 'Abidjan & Zone Ind.',  'telephone' => '07 57 25 31 23', 'services_disponibles' => ['Contrôle technique'],                   'latitude' => 5.3400, 'longitude' => -4.0100, 'region' => 'Abidjan', 'type' => 'mobile'],
        ];

        // Intérieur du pays — 21 agences permanentes
        $interieur = [
            ['nom' => 'SICTA Abengourou',   'ville' => 'Abengourou',   'telephone' => '07 47 04 91 40', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 6.7333, 'longitude' => -3.4833, 'region' => 'Est'],
            ['nom' => 'SICTA Aboisso',      'ville' => 'Aboisso',      'telephone' => '07 57 20 90 77', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 5.4700, 'longitude' => -3.2100, 'region' => 'Sud'],
            ['nom' => 'SICTA Adzopé',       'ville' => 'Adzopé',       'telephone' => '07 69 88 40 84', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 6.1100, 'longitude' => -3.8700, 'region' => 'Sud'],
            ['nom' => 'SICTA Agnibilékro',  'ville' => 'Agnibilékro',  'telephone' => '07 47 58 37 41', 'services_disponibles' => ['Contrôle technique'],          'latitude' => 7.1333, 'longitude' => -3.1833, 'region' => 'Est'],
            ['nom' => 'SICTA Agboville',    'ville' => 'Agboville',    'telephone' => '07 68 31 15 89', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 5.9300, 'longitude' => -4.2200, 'region' => 'Sud'],
            ['nom' => 'SICTA Bondoukou',    'ville' => 'Bondoukou',    'telephone' => '07 09 66 57 63', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 8.0333, 'longitude' => -2.8000, 'region' => 'Est'],
            ['nom' => 'SICTA Bouaké',       'ville' => 'Bouaké',       'telephone' => '07 59 39 93 07', 'services_disponibles' => ['Contrôle technique', 'CIVIO', 'Pesée'], 'latitude' => 7.6833, 'longitude' => -5.0333, 'region' => 'Centre'],
            ['nom' => 'SICTA Bouaflé',      'ville' => 'Bouaflé',      'telephone' => '07 59 08 11 83', 'services_disponibles' => ['Contrôle technique'],          'latitude' => 6.9900, 'longitude' => -5.7400, 'region' => 'Ouest'],
            ['nom' => 'SICTA Dabou',        'ville' => 'Dabou',        'telephone' => '07 68 62 84 35', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 5.3200, 'longitude' => -4.3800, 'region' => 'Sud'],
            ['nom' => 'SICTA Daloa',        'ville' => 'Daloa',        'telephone' => '07 67 45 90 93', 'services_disponibles' => ['Contrôle technique', 'CIVIO', 'Pesée'], 'latitude' => 6.8833, 'longitude' => -6.8833, 'region' => 'Ouest'],
            ['nom' => 'SICTA Daoukro',      'ville' => 'Daoukro',      'telephone' => '07 08 26 46 19', 'services_disponibles' => ['Contrôle technique'],          'latitude' => 7.0600, 'longitude' => -3.9700, 'region' => 'Centre'],
            ['nom' => 'SICTA Divo',         'ville' => 'Divo',         'telephone' => '07 59 39 93 04', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 5.8333, 'longitude' => -5.3667, 'region' => 'Sud'],
            ['nom' => 'SICTA Gagnoa',       'ville' => 'Gagnoa',       'telephone' => '07 07 00 92 12', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 6.1333, 'longitude' => -5.9500, 'region' => 'Ouest'],
            ['nom' => 'SICTA Guiglo',       'ville' => 'Guiglo',       'telephone' => '07 57 44 02 69', 'services_disponibles' => ['Contrôle technique'],          'latitude' => 6.5333, 'longitude' => -7.5333, 'region' => 'Ouest'],
            ['nom' => 'SICTA Korhogo',      'ville' => 'Korhogo',      'telephone' => '07 59 08 11 79', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 9.4500, 'longitude' => -5.6333, 'region' => 'Nord'],
            ['nom' => 'SICTA Man',          'ville' => 'Man',          'telephone' => '07 07 70 53 07', 'services_disponibles' => ['Contrôle technique'],          'latitude' => 7.4000, 'longitude' => -7.5500, 'region' => 'Ouest'],
            ['nom' => 'SICTA Odienné',      'ville' => 'Odienné',      'telephone' => '07 57 43 83 68', 'services_disponibles' => ['Contrôle technique'],          'latitude' => 9.5000, 'longitude' => -7.5667, 'region' => 'Nord'],
            ['nom' => 'SICTA San Pédro',    'ville' => 'San Pédro',    'telephone' => '07 59 39 93 03', 'services_disponibles' => ['Contrôle technique', 'CIVIO', 'Pesée'], 'latitude' => 4.7500, 'longitude' => -6.6500, 'region' => 'Sud'],
            ['nom' => 'SICTA Soubré',       'ville' => 'Soubré',       'telephone' => '07 59 39 93 05', 'services_disponibles' => ['Contrôle technique', 'CIVIO'], 'latitude' => 5.7833, 'longitude' => -6.5833, 'region' => 'Sud'],
            ['nom' => 'SICTA Yamoussoukro', 'ville' => 'Yamoussoukro', 'telephone' => '07 48 48 16 66', 'services_disponibles' => ['Contrôle technique', 'CIVIO', 'Pesée'], 'latitude' => 6.8206, 'longitude' => -5.2756, 'region' => 'Centre'],
            ['nom' => 'SICTA Yaou',         'ville' => 'Yaou',         'telephone' => '07 59 39 93 06', 'services_disponibles' => ['Contrôle technique'],          'latitude' => 5.2400, 'longitude' => -3.6400, 'region' => 'Sud'],
        ];

        // Stations périodiques — 22 stations
        $periodiques = [
            ['nom' => 'SICTA Bongouanou',       'ville' => 'Bongouanou',       'telephone' => '', 'latitude' => 6.6500,  'longitude' => -4.2000,  'region' => 'Centre'],
            ['nom' => 'SICTA Boundiali',         'ville' => 'Boundiali',        'telephone' => '', 'latitude' => 9.5333,  'longitude' => -6.4833,  'region' => 'Nord'],
            ['nom' => 'SICTA Bouna',             'ville' => 'Bouna',            'telephone' => '', 'latitude' => 9.2667,  'longitude' => -3.0000,  'region' => 'Nord'],
            ['nom' => 'SICTA Danané',            'ville' => 'Danané',           'telephone' => '', 'latitude' => 7.2667,  'longitude' => -8.1500,  'region' => 'Ouest'],
            ['nom' => 'SICTA Dimbokro',          'ville' => 'Dimbokro',         'telephone' => '', 'latitude' => 6.6500,  'longitude' => -4.7000,  'region' => 'Centre'],
            ['nom' => 'SICTA Duékoué',           'ville' => 'Duékoué',          'telephone' => '', 'latitude' => 6.7400,  'longitude' => -7.3500,  'region' => 'Ouest'],
            ['nom' => 'SICTA Ferkessédougou',    'ville' => 'Ferkessédougou',   'telephone' => '', 'latitude' => 9.5833,  'longitude' => -5.1833,  'region' => 'Nord'],
            ['nom' => 'SICTA Fresco',            'ville' => 'Fresco',           'telephone' => '', 'latitude' => 5.0700,  'longitude' => -5.5500,  'region' => 'Sud'],
            ['nom' => 'SICTA Grand Lahou',       'ville' => 'Grand Lahou',      'telephone' => '', 'latitude' => 5.1400,  'longitude' => -5.0100,  'region' => 'Sud'],
            ['nom' => 'SICTA Issia',             'ville' => 'Issia',            'telephone' => '', 'latitude' => 6.4833,  'longitude' => -6.5833,  'region' => 'Ouest'],
            ['nom' => 'SICTA Katiola',           'ville' => 'Katiola',          'telephone' => '', 'latitude' => 8.1333,  'longitude' => -5.0833,  'region' => 'Centre'],
            ['nom' => "SICTA M'Bahiakro",        'ville' => "M'Bahiakro",       'telephone' => '', 'latitude' => 7.4500,  'longitude' => -4.3167,  'region' => 'Centre'],
            ['nom' => 'SICTA Méagui',            'ville' => 'Méagui',           'telephone' => '', 'latitude' => 5.1900,  'longitude' => -7.0000,  'region' => 'Sud'],
            ['nom' => 'SICTA Oumé',              'ville' => 'Oumé',             'telephone' => '', 'latitude' => 6.3800,  'longitude' => -5.4300,  'region' => 'Ouest'],
            ['nom' => 'SICTA Sassandra',         'ville' => 'Sassandra',        'telephone' => '', 'latitude' => 4.9500,  'longitude' => -6.0800,  'region' => 'Sud'],
            ['nom' => 'SICTA Séguéla',           'ville' => 'Séguéla',          'telephone' => '', 'latitude' => 7.9667,  'longitude' => -6.6667,  'region' => 'Ouest'],
            ['nom' => 'SICTA Tabou',             'ville' => 'Tabou',            'telephone' => '', 'latitude' => 4.4200,  'longitude' => -7.3500,  'region' => 'Sud'],
            ['nom' => 'SICTA Tiassalé',          'ville' => 'Tiassalé',         'telephone' => '', 'latitude' => 5.9000,  'longitude' => -4.8300,  'region' => 'Sud'],
            ['nom' => 'SICTA Tengrela',          'ville' => 'Tengrela',         'telephone' => '', 'latitude' => 10.4833, 'longitude' => -6.1500,  'region' => 'Nord'],
            ['nom' => 'SICTA Toumodi',           'ville' => 'Toumodi',          'telephone' => '', 'latitude' => 6.5500,  'longitude' => -5.0167,  'region' => 'Centre'],
            ['nom' => 'SICTA Touba',             'ville' => 'Touba',            'telephone' => '', 'latitude' => 8.2833,  'longitude' => -7.6833,  'region' => 'Ouest'],
            ['nom' => 'SICTA Zuénoula',          'ville' => 'Zuénoula',         'telephone' => '', 'latitude' => 7.4167,  'longitude' => -6.0500,  'region' => 'Ouest'],
        ];

        foreach ($abidjan as $s) {
            Station::updateOrCreate(
                ['nom' => $s['nom']],
                array_merge($s, [
                    'zone' => 'abidjan',
                    'horaires' => 'Lun-Ven: 7h-17h',
                    'services_disponibles' => json_encode($s['services_disponibles']),
                    'type' => $s['type'] ?? 'permanent',
                    'actif' => true,
                ])
            );
        }

        foreach ($interieur as $s) {
            Station::updateOrCreate(
                ['nom' => $s['nom']],
                array_merge($s, [
                    'zone' => 'interieur',
                    'horaires' => 'Lun-Ven: 7h-17h',
                    'services_disponibles' => json_encode($s['services_disponibles']),
                    'type' => 'permanent',
                    'actif' => true,
                ])
            );
        }

        foreach ($periodiques as $s) {
            Station::updateOrCreate(
                ['nom' => $s['nom']],
                array_merge($s, [
                    'zone' => 'interieur',
                    'horaires' => 'Périodique',
                    'services_disponibles' => json_encode(['Contrôle technique']),
                    'type' => 'periodique',
                    'actif' => true,
                ])
            );
        }
    }
}
