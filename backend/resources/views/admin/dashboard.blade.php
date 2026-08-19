@extends('admin.layouts.app')
@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')
<div class="space-y-6 pt-2">

    {{-- ===== Bienvenue ===== --}}
    <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div>
            <p class="text-orange-100 text-sm font-medium mb-1">Bienvenue 👋</p>
            <h2 class="text-white text-2xl font-bold">{{ auth()->user()->name }}</h2>
            <p class="text-orange-200 text-sm mt-1">{{ now()->isoFormat('dddd D MMMM YYYY') }} — Backoffice SICTA</p>
        </div>
        <div class="hidden md:block text-orange-200 opacity-30">
            <i class="fas fa-car text-8xl"></i>
        </div>
    </div>

    {{-- ===== Stats Cards ===== --}}
    @php
    $cards = [
        [
            'label'    => 'Réservations ce mois',
            'value'    => $stats['reservations_mois'],
            'icon'     => 'fa-calendar-check',
            'gradient' => 'from-orange-400 to-orange-600',
            'bg'       => 'bg-orange-50',
            'text'     => 'text-orange-600',
            'route'    => route('admin.reservations.index'),
            'hint'     => 'ce mois',
        ],
        [
            'label'    => 'En attente',
            'value'    => $stats['reservations_en_attente'],
            'icon'     => 'fa-hourglass-half',
            'gradient' => 'from-amber-400 to-yellow-600',
            'bg'       => 'bg-amber-50',
            'text'     => 'text-amber-600',
            'route'    => route('admin.reservations.index'),
            'hint'     => 'à traiter',
        ],
        [
            'label'    => 'Réservations total',
            'value'    => $stats['reservations_total'],
            'icon'     => 'fa-chart-bar',
            'gradient' => 'from-indigo-400 to-indigo-600',
            'bg'       => 'bg-indigo-50',
            'text'     => 'text-indigo-600',
            'route'    => route('admin.reservations.index'),
            'hint'     => 'toutes périodes',
        ],
        [
            'label'    => 'Articles publiés',
            'value'    => $stats['articles_publies'],
            'icon'     => 'fa-newspaper',
            'gradient' => 'from-blue-400 to-blue-600',
            'bg'       => 'bg-blue-50',
            'text'     => 'text-blue-600',
            'route'    => route('admin.articles.index'),
            'hint'     => 'en ligne',
        ],
        [
            'label'    => 'Messages non lus',
            'value'    => $stats['messages_non_lus'],
            'icon'     => 'fa-envelope',
            'gradient' => 'from-red-400 to-red-600',
            'bg'       => 'bg-red-50',
            'text'     => 'text-red-600',
            'route'    => route('admin.messages.index'),
            'hint'     => 'à lire',
        ],
        [
            'label'    => 'Stations actives',
            'value'    => $stats['stations_actives'],
            'icon'     => 'fa-map-marker-alt',
            'gradient' => 'from-green-400 to-emerald-600',
            'bg'       => 'bg-green-50',
            'text'     => 'text-green-600',
            'route'    => route('admin.stations.index'),
            'hint'     => 'en service',
        ],
        [
            'label'    => 'Médias galerie',
            'value'    => $stats['medias_total'],
            'icon'     => 'fa-photo-film',
            'gradient' => 'from-purple-400 to-purple-600',
            'bg'       => 'bg-purple-50',
            'text'     => 'text-purple-600',
            'route'    => route('admin.galerie.index'),
            'hint'     => 'fichiers',
        ],
        [
            'label'    => 'Membres équipe',
            'value'    => $stats['membres_equipe'],
            'icon'     => 'fa-users',
            'gradient' => 'from-teal-400 to-teal-600',
            'bg'       => 'bg-teal-50',
            'text'     => 'text-teal-600',
            'route'    => route('admin.team.index'),
            'hint'     => 'actifs',
        ],
        [
            'label'    => 'Étapes histoire',
            'value'    => $stats['etapes_histoire'],
            'icon'     => 'fa-timeline',
            'gradient' => 'from-rose-400 to-rose-600',
            'bg'       => 'bg-rose-50',
            'text'     => 'text-rose-600',
            'route'    => route('admin.history.index'),
            'hint'     => 'visibles',
        ],
    ];
    @endphp

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        @foreach($cards as $card)
        <a href="{{ $card['route'] }}" class="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3">
            <div class="flex items-center justify-between">
                <div class="w-11 h-11 rounded-xl bg-gradient-to-br {{ $card['gradient'] }} flex items-center justify-center shadow-md">
                    <i class="fas {{ $card['icon'] }} text-white text-base"></i>
                </div>
                <span class="text-xs {{ $card['bg'] }} {{ $card['text'] }} px-2 py-0.5 rounded-full font-medium">{{ $card['hint'] }}</span>
            </div>
            <div>
                <div class="text-3xl font-black text-gray-800 leading-none">{{ $card['value'] }}</div>
                <div class="text-xs text-gray-500 mt-1 font-medium">{{ $card['label'] }}</div>
            </div>
        </a>
        @endforeach
    </div>

    {{-- ===== Graphique + Top stations ===== --}}
    <div class="grid lg:grid-cols-3 gap-6">

        {{-- Activité 7 derniers jours --}}
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h3 class="font-bold text-gray-800">Activité — 7 derniers jours</h3>
                    <p class="text-xs text-gray-400 mt-0.5">Réservations reçues par jour</p>
                </div>
                <span class="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-semibold">
                    {{ $reservations_semaine->sum('total') }} total
                </span>
            </div>

            @php
                $maxVal = $reservations_semaine->max('total') ?: 1;
                $days = collect();
                for ($i = 6; $i >= 0; $i--) {
                    $date = now()->subDays($i)->format('Y-m-d');
                    $found = $reservations_semaine->firstWhere('date', $date);
                    $days->push(['label' => now()->subDays($i)->format('D'), 'total' => $found ? $found->total : 0, 'date' => $date]);
                }
            @endphp

            <div class="flex items-end gap-2 h-32">
                @foreach($days as $day)
                @php $pct = $maxVal > 0 ? max(4, round(($day['total'] / $maxVal) * 100)) : 4; @endphp
                <div class="flex-1 flex flex-col items-center gap-1">
                    <span class="text-xs font-bold text-gray-600">{{ $day['total'] ?: '' }}</span>
                    <div class="w-full rounded-t-lg transition-all duration-500 {{ $day['total'] > 0 ? 'bg-gradient-to-t from-orange-500 to-orange-400' : 'bg-gray-100' }}"
                         style="height: {{ $pct }}%"></div>
                    <span class="text-xs text-gray-400">{{ $day['label'] }}</span>
                </div>
                @endforeach
            </div>
        </div>

        {{-- Top Stations --}}
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-5">
                <h3 class="font-bold text-gray-800">Top Stations</h3>
                <a href="{{ route('admin.stations.index') }}" class="text-xs text-orange-500 hover:underline">Voir tout →</a>
            </div>

            @if($top_stations->isEmpty())
                <div class="flex flex-col items-center justify-center h-28 text-gray-300">
                    <i class="fas fa-map-marker-alt text-3xl mb-2"></i>
                    <p class="text-sm">Aucune donnée</p>
                </div>
            @else
                <div class="space-y-3">
                    @foreach($top_stations as $i => $ts)
                    @php $pct = $top_stations->first()->total > 0 ? round($ts->total / $top_stations->first()->total * 100) : 0; @endphp
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-sm font-medium text-gray-700 truncate flex items-center gap-2">
                                <span class="w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{{ $i+1 }}</span>
                                {{ $ts->station ? $ts->station->nom : 'N/A' }}
                            </span>
                            <span class="text-xs font-bold text-gray-500 ml-2">{{ $ts->total }}</span>
                        </div>
                        <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style="width: {{ $pct }}%"></div>
                        </div>
                    </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>

    {{-- ===== Dernières réservations + Derniers messages ===== --}}
    <div class="grid md:grid-cols-2 gap-6">

        {{-- Réservations --}}
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-calendar-check text-orange-500 text-sm"></i>
                    </div>
                    <h3 class="font-bold text-gray-800">Dernières réservations</h3>
                </div>
                <a href="{{ route('admin.reservations.index') }}" class="text-orange-500 text-xs font-medium hover:underline">Voir tout →</a>
            </div>
            <div class="divide-y divide-gray-50">
                @forelse($dernieres_reservations as $r)
                <a href="{{ route('admin.reservations.show', $r) }}" class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0">
                            <span class="text-orange-600 font-bold text-sm">{{ strtoupper(substr($r->prenom ?? 'R', 0, 1)) }}</span>
                        </div>
                        <div>
                            <div class="font-semibold text-sm text-gray-800">{{ $r->prenom }} {{ $r->nom }}</div>
                            <div class="text-xs text-gray-400">{{ $r->immatriculation }} • {{ $r->station ? $r->station->nom : 'N/A' }}</div>
                        </div>
                    </div>
                    <div class="text-right flex-shrink-0 ml-3">
                        <span class="badge-status-{{ $r->statut }}">{{ ucfirst(str_replace('_', ' ', $r->statut)) }}</span>
                        <div class="text-xs text-gray-400 mt-1">{{ $r->date_rdv ? $r->date_rdv->format('d/m/Y') : '' }}</div>
                    </div>
                </a>
                @empty
                <div class="py-10 flex flex-col items-center justify-center text-gray-300">
                    <i class="fas fa-calendar-times text-3xl mb-2"></i>
                    <p class="text-sm">Aucune réservation.</p>
                </div>
                @endforelse
            </div>
        </div>

        {{-- Messages --}}
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-envelope text-red-500 text-sm"></i>
                    </div>
                    <h3 class="font-bold text-gray-800">Derniers messages</h3>
                </div>
                <a href="{{ route('admin.messages.index') }}" class="text-orange-500 text-xs font-medium hover:underline">Voir tout →</a>
            </div>
            <div class="divide-y divide-gray-50">
                @forelse($derniers_messages as $m)
                <a href="{{ route('admin.messages.show', $m) }}" class="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-br {{ $m->lu ? 'from-gray-100 to-gray-200' : 'from-red-100 to-red-200' }} flex items-center justify-center flex-shrink-0">
                        <span class="{{ $m->lu ? 'text-gray-500' : 'text-red-600' }} font-bold text-sm">{{ strtoupper(substr($m->nom_complet, 0, 1)) }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-sm text-gray-800 truncate">{{ $m->nom_complet }}</span>
                            @if(!$m->lu)
                                <span class="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            @endif
                        </div>
                        <div class="text-xs text-gray-400 truncate">{{ $m->sujet }}</div>
                    </div>
                    <div class="text-xs text-gray-400 flex-shrink-0">{{ $m->created_at->diffForHumans() }}</div>
                </a>
                @empty
                <div class="py-10 flex flex-col items-center justify-center text-gray-300">
                    <i class="fas fa-inbox text-3xl mb-2"></i>
                    <p class="text-sm">Aucun message.</p>
                </div>
                @endforelse
            </div>
        </div>
    </div>

    {{-- ===== Raccourcis rapides ===== --}}
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-800 mb-4">Actions rapides</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a href="{{ route('admin.articles.create') }}" class="flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                <i class="fas fa-plus-circle text-blue-500 text-lg group-hover:scale-110 transition-transform"></i>
                <span class="text-sm font-medium text-blue-700">Nouvel article</span>
            </a>
            <a href="{{ route('admin.slides.create') }}" class="flex items-center gap-3 px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group">
                <i class="fas fa-images text-purple-500 text-lg group-hover:scale-110 transition-transform"></i>
                <span class="text-sm font-medium text-purple-700">Nouveau slide</span>
            </a>
            <a href="{{ route('admin.team.create') }}" class="flex items-center gap-3 px-4 py-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                <i class="fas fa-user-plus text-green-500 text-lg group-hover:scale-110 transition-transform"></i>
                <span class="text-sm font-medium text-green-700">Ajouter membre</span>
            </a>
            <a href="{{ route('admin.stations.create') }}" class="flex items-center gap-3 px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group">
                <i class="fas fa-map-pin text-orange-500 text-lg group-hover:scale-110 transition-transform"></i>
                <span class="text-sm font-medium text-orange-700">Nouvelle station</span>
            </a>
        </div>
    </div>

</div>
@endsection
