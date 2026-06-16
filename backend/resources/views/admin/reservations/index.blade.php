@extends('admin.layouts.app')
@section('title', 'Réservations')
@section('page-title', 'Réservations')

@section('content')
<div class="space-y-4 pt-2">
    <!-- Stats badges -->
    <div class="flex flex-wrap gap-3">
        @foreach(['en_attente' => ['En attente', '#854d0e', '#fef9c3'], 'confirmee' => ['Confirmée', '#166534', '#dcfce7'], 'annulee' => ['Annulée', '#991b1b', '#fee2e2'], 'realisee' => ['Réalisée', '#1e40af', '#dbeafe']] as $key => $info)
        <div class="px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" style="background:{{ $info[0] === 'En attente' ? '#f59e0b' : ($info[0] === 'Confirmée' ? '#22c55e' : ($info[0] === 'Annulée' ? '#ef4444' : '#3b82f6')) }};"></span>
            <span class="text-sm font-medium text-gray-700">{{ $info[0] }}</span>
            <span class="text-lg font-black text-gray-800">{{ $counts[$key] }}</span>
        </div>
        @endforeach
        <a href="{{ route('admin.reservations.export') }}{{ request()->getQueryString() ? '?'.request()->getQueryString() : '' }}"
            class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 flex items-center gap-2 ml-auto">
            <i class="fas fa-download"></i> Exporter CSV
        </a>
    </div>

    <!-- Filtres -->
    <form method="GET" class="flex flex-wrap gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Nom, tél, immatriculation…"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none flex-1 min-w-48" />
        <select name="statut" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
            <option value="">Tous statuts</option>
            @foreach(['en_attente' => 'En attente', 'confirmee' => 'Confirmée', 'annulee' => 'Annulée', 'realisee' => 'Réalisée'] as $v => $l)
            <option value="{{ $v }}" {{ request('statut') === $v ? 'selected' : '' }}>{{ $l }}</option>
            @endforeach
        </select>
        <select name="station_id" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
            <option value="">Toutes stations</option>
            @foreach($stations as $s)
            <option value="{{ $s->id }}" {{ request('station_id') == $s->id ? 'selected' : '' }}>{{ $s->nom }}</option>
            @endforeach
        </select>
        <input type="date" name="date_debut" value="{{ request('date_debut') }}" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
        <input type="date" name="date_fin" value="{{ request('date_fin') }}" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
        <button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">Filtrer</button>
        @if(request()->hasAny(['search','statut','station_id','date_debut','date_fin']))
        <a href="{{ route('admin.reservations.index') }}" class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">Réinitialiser</a>
        @endif
    </form>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 border-b border-gray-100">
            <span class="text-sm text-gray-500">{{ $reservations->total() }} réservation(s)</span>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr>
                        <th class="px-4 py-3 text-left">N° Réservation</th>
                        <th class="px-4 py-3 text-left">Client</th>
                        <th class="px-4 py-3 text-left">Station</th>
                        <th class="px-4 py-3 text-left">Véhicule</th>
                        <th class="px-4 py-3 text-left">Date RDV</th>
                        <th class="px-4 py-3 text-center">Statut</th>
                        <th class="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    @forelse($reservations as $r)
                    <tr class="hover:bg-gray-50/50">
                        <td class="px-4 py-3 font-mono text-xs font-bold text-gray-800">{{ $r->numero_reservation }}</td>
                        <td class="px-4 py-3">
                            <div class="font-medium text-gray-800">{{ $r->prenom }} {{ $r->nom }}</div>
                            <div class="text-xs text-gray-500">{{ $r->telephone }}</div>
                        </td>
                        <td class="px-4 py-3 text-gray-600 text-xs">{{ $r->station ? $r->station->nom : 'N/A' }}</td>
                        <td class="px-4 py-3">
                            <span class="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{{ $r->immatriculation }}</span>
                            <div class="text-xs text-gray-500 mt-0.5">{{ $r->categorie_vehicule }}</div>
                        </td>
                        <td class="px-4 py-3">
                            <div class="text-gray-800">{{ $r->date_rdv ? $r->date_rdv->format('d/m/Y') : '' }}</div>
                            <div class="text-xs text-gray-500">{{ $r->heure_rdv }}</div>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="badge-status-{{ $r->statut }}">{{ str_replace('_', ' ', $r->statut) }}</span>
                        </td>
                        <td class="px-4 py-3 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <a href="{{ route('admin.reservations.show', $r) }}" class="text-blue-500 hover:text-blue-700 p-1.5 rounded hover:bg-blue-50" title="Voir">
                                    <i class="fas fa-eye text-xs"></i>
                                </a>
                                <form method="POST" action="{{ route('admin.reservations.destroy', $r) }}" onsubmit="return confirm('Supprimer cette réservation ?')">
                                    @csrf @method('DELETE')
                                    <button type="submit" class="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50" title="Supprimer">
                                        <i class="fas fa-trash text-xs"></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr><td colspan="7" class="px-4 py-10 text-center text-gray-400">Aucune réservation.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        <div class="p-4 border-t border-gray-100">{{ $reservations->links() }}</div>
    </div>
</div>
@endsection
