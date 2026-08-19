<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Article;
use App\Models\MessageContact;
use App\Models\Station;
use App\Models\MediaGalerie;
use App\Models\TeamMember;
use App\Models\HistoryEvent;

class DashboardController extends Controller {
    public function index() {
        $stats = [
            'reservations_total'    => Reservation::count(),
            'reservations_en_attente' => Reservation::where('statut', 'en_attente')->count(),
            'reservations_mois'     => Reservation::whereMonth('created_at', now()->month)->count(),
            'articles_publies'      => Article::where('statut', 'publie')->count(),
            'messages_non_lus'      => MessageContact::where('lu', false)->count(),
            'stations_actives'      => Station::where('actif', true)->count(),
            'medias_total'          => MediaGalerie::count(),
            'membres_equipe'        => TeamMember::where('actif', true)->count(),
            'etapes_histoire'       => HistoryEvent::where('actif', true)->count(),
        ];

        $reservations_semaine = Reservation::selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $top_stations = Reservation::selectRaw('station_id, COUNT(*) as total')
            ->with('station:id,nom')
            ->whereNotNull('station_id')
            ->groupBy('station_id')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        $dernieres_reservations = Reservation::with('station:id,nom')
            ->latest()
            ->limit(5)
            ->get();

        $derniers_messages = MessageContact::latest()->limit(5)->get();

        return view('admin.dashboard', compact('stats', 'reservations_semaine', 'top_stations', 'dernieres_reservations', 'derniers_messages'));
    }
}
