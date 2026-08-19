<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\CategorieArticle;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Actualités'   => 'actualites',
            'Innovation'   => 'innovation',
            'Réglementation' => 'reglementation',
        ];
        $catIds = [];
        foreach ($categories as $nom => $slug) {
            $cat = CategorieArticle::updateOrCreate(['slug' => $slug], ['nom' => $nom]);
            $catIds[$slug] = $cat->id;
        }

        $articles = [
            [
                'titre'        => 'SICTA rejoint le groupe Mayelia Participations',
                'categorie_id' => $catIds['actualites'],
                'image_principale' => 'articles/actu-1.jpg',
                'extrait'      => "Depuis avril 2025, SICTA entre dans une nouvelle ère de développement sous l'impulsion de Mayelia Participations.",
                'contenu'      => "<p>Depuis avril 2025, SICTA est officiellement une filiale de Mayelia Participations. Cette acquisition stratégique marque le début d'une nouvelle phase de modernisation et de digitalisation des services de contrôle technique en Côte d'Ivoire.</p><p>L'objectif : renforcer la position de leader de SICTA en Afrique de l'Ouest tout en améliorant l'expérience client.</p>",
                'auteur'       => 'Rédaction SICTA',
                'temps_lecture'=> '3',
                'date_publication' => now()->subDays(4)->toDateString(),
                'statut'       => 'publie',
                'a_la_une'     => true,
                'tendance'     => true,
            ],
            [
                'titre'        => 'Nos bancs mobiles nouvelle génération sillonnent le pays',
                'categorie_id' => $catIds['innovation'],
                'image_principale' => 'articles/actu-3.jpg',
                'extrait'      => "Le contrôle technique se rapproche des usagers grâce à nos stations mobiles certifiées ISO 9001:2015.",
                'contenu'      => "<p>Nos bancs mobiles de nouvelle génération permettent un contrôle technique complet, même dans les zones les plus reculées du pays. Une innovation au service de la sécurité routière pour tous.</p>",
                'auteur'       => 'Rédaction SICTA',
                'temps_lecture'=> '2',
                'date_publication' => now()->subDays(10)->toDateString(),
                'statut'       => 'publie',
                'a_la_une'     => false,
                'tendance'     => true,
            ],
            [
                'titre'        => 'Contrôle technique : ce qui change en 2025',
                'categorie_id' => $catIds['reglementation'],
                'image_principale' => 'articles/actu-2.jpg',
                'extrait'      => "Tarifs officiels, périodicité, documents requis : tout ce que vous devez savoir pour votre prochaine visite technique.",
                'contenu'      => "<p>Retrouvez l'ensemble des nouveautés réglementaires de l'année 2025 concernant le contrôle technique automobile en Côte d'Ivoire : tarifs, périodicité et documents à présenter.</p>",
                'auteur'       => 'Rédaction SICTA',
                'temps_lecture'=> '4',
                'date_publication' => now()->subDays(18)->toDateString(),
                'statut'       => 'publie',
                'a_la_une'     => false,
                'tendance'     => false,
            ],
        ];

        foreach ($articles as $a) {
            $a['slug'] = Str::slug($a['titre']);
            Article::updateOrCreate(['slug' => $a['slug']], $a);
        }
    }
}
