@extends('admin.layouts.app')
@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')
<div class="space-y-6 pt-2">
    <!-- Stats cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        @php
        $cards = [
            ['label' => 'Réservations ce mois', 'value' => $stats['reservations_mois'], 'icon' => 'fa-calendar-check', 'color' => 'orange'],
            ['label' => 'En attente', 'value' => $stats['reservations_en_attente'], 'icon' => 'fa-clock', 'color' => 'yellow'],
            ['label' => 'Articles publiés', 'value' => $stats['articles_publies'], 'icon' => 'fa-newspaper', 'color' => 'blue'],
            ['label' => 'Messages non lus', 'value' => $stats['messages_non_lus'], 'icon' => 'fa-envelope', 'color' => 'red'],
            ['label' => 'Stations actives', 'value' => $stats['stations_actives'], 'icon' => 'fa-map-marker-alt', 'color' => 'green'],
            ['label' => 'Médias galerie', 'value' => $stats['medias_total'], 'icon' => 'fa-photo-film', 'color' => 'purple'],
            ['label' => 'Réservations total', 'value' => $stats['reservations_total'], 'icon' => 'fa-chart-bar', 'color' => 'indigo'],
        ];
        $colors = [
            'orange' => 'background:#fff7ed;color:#c2410c;',
            'yellow' => 'background:#fefce8;color:#854d0e;',
            'blue' => 'background:#eff6ff;color:#1d4ed8;',
            'red' => 'background:#fef2f2;color:#991b1b;',
            'green' => 'background:#f0fdf4;color:#166534;',
            'purple' => 'background:#faf5ff;color:#7e22ce;',
            'indigo' => 'background:#eef2ff;color:#3730a3;',
        ];
        @endphp

        @foreach($cards as $card)
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-3">
                <div style="{{ $colors[$card['color']] }}" class="w-10 h-10 rounded-lg flex items-center justify-center">
                    <i class="fas {{ $card['icon'] }} text-sm"></i>
                </div>
            </div>
            <div class="text-2xl font-black text-gray-800">{{ $card['value'] }}</div>
            <div class="text-xs text-gray-500 mt-1">{{ $card['label'] }}</div>
        </div>
        @endforeach
    </div>

    <div class="grid md:grid-cols-2 gap-6">
        <!-- Dernières réservations -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 class="font-bold text-gray-800">Dernières réservations</h3>
                <a href="{{ route('admin.reservations.index') }}" class="text-orange-500 text-sm hover:underline">Voir tout →</a>
            </div>
            <div class="divide-y divide-gray-50">
                @forelse($dernieres_reservations as $r)
                <div class="p-4 flex items-center justify-between">
                    <div>
                        <div class="font-medium text-sm text-gray-800">{{ $r->prenom }} {{ $r->nom }}</div>
                        <div class="text-xs text-gray-500">{{ $r->immatriculation }} • {{ $r->station ? $r->station->nom : 'N/A' }}</div>
                    </div>
                    <div class="text-right">
                        <span class="text-xs font-medium badge-status-{{ $r->statut }}">{{ $r->statut }}</span>
                        <div class="text-xs text-gray-400 mt-1">{{ $r->date_rdv ? $r->date_rdv->format('d/m/Y') : '' }}</div>
                    </div>
                </div>
                @empty
                <p class="p-4 text-sm text-gray-500 text-center">Aucune réservation.</p>
                @endforelse
            </div>
        </div>

        <!-- Derniers messages -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 class="font-bold text-gray-800">Derniers messages</h3>
                <a href="{{ route('admin.messages.index') }}" class="text-orange-500 text-sm hover:underline">Voir tout →</a>
            </div>
            <div class="divide-y divide-gray-50">
                @forelse($derniers_messages as $m)
                <div class="p-4 flex items-center gap-3">
                    <div class="w-2 h-2 rounded-full mt-1 flex-shrink-0 {{ $m->lu ? 'bg-gray-200' : 'bg-orange-400' }}"></div>
                    <div class="flex-1 min-w-0">
                        <div class="font-medium text-sm text-gray-800 truncate">{{ $m->nom_complet }}</div>
                        <div class="text-xs text-gray-500 truncate">{{ $m->sujet }}</div>
                    </div>
                    <div class="text-xs text-gray-400">{{ $m->created_at->diffForHumans() }}</div>
                </div>
                @empty
                <p class="p-4 text-sm text-gray-500 text-center">Aucun message.</p>
                @endforelse
            </div>
        </div>
    </div>
</div>
@endsection
