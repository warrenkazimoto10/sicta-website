@extends('admin.layouts.app')
@section('title', 'Stations')
@section('page-title', 'Réseau SICTA — Stations')

@section('content')
<div class="space-y-4 pt-2">
    <!-- Actions bar -->
    <div class="flex flex-wrap items-center justify-between gap-4">
        <form method="GET" class="flex flex-wrap gap-3">
            <input type="text" name="search" value="{{ request('search') }}" placeholder="Rechercher…"
                class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            <select name="zone" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="">Toutes les zones</option>
                <option value="abidjan" {{ request('zone') === 'abidjan' ? 'selected' : '' }}>Abidjan</option>
                <option value="interieur" {{ request('zone') === 'interieur' ? 'selected' : '' }}>Intérieur</option>
            </select>
            <select name="statut" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="">Tous statuts</option>
                <option value="actif" {{ request('statut') === 'actif' ? 'selected' : '' }}>Actif</option>
                <option value="inactif" {{ request('statut') === 'inactif' ? 'selected' : '' }}>Inactif</option>
            </select>
            <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700">Filtrer</button>
            @if(request()->hasAny(['search','zone','statut']))
                <a href="{{ route('admin.stations.index') }}" class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">Réinitialiser</a>
            @endif
        </form>
        <a href="{{ route('admin.stations.create') }}" class="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
            <i class="fas fa-plus"></i> Nouvelle station
        </a>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-4 border-b border-gray-100 flex items-center justify-between">
            <span class="text-sm text-gray-500">{{ $stations->total() }} station(s)</span>
            <form method="GET" class="flex items-center gap-2">
                @foreach(request()->except('per_page') as $k => $v)
                    <input type="hidden" name="{{ $k }}" value="{{ $v }}">
                @endforeach
                <select name="per_page" onchange="this.form.submit()" class="text-sm border border-gray-200 rounded px-2 py-1">
                    @foreach([10, 20, 50] as $n)
                        <option value="{{ $n }}" {{ request('per_page', 10) == $n ? 'selected' : '' }}>{{ $n }} / page</option>
                    @endforeach
                </select>
            </form>
        </div>
        <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                    <th class="px-5 py-3 text-left">Station</th>
                    <th class="px-4 py-3 text-left">Zone</th>
                    <th class="px-4 py-3 text-left">Téléphone</th>
                    <th class="px-4 py-3 text-left">Horaires</th>
                    <th class="px-4 py-3 text-center">Statut</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                @forelse($stations as $station)
                <tr class="hover:bg-gray-50/50 {{ $station->deleted_at ? 'opacity-50' : '' }}">
                    <td class="px-5 py-3">
                        <div class="font-medium text-gray-800">{{ $station->nom }}</div>
                        <div class="text-xs text-gray-500">{{ $station->ville }}</div>
                    </td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs font-medium {{ $station->zone === 'abidjan' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700' }}">
                            {{ ucfirst($station->zone) }}
                        </span>
                    </td>
                    <td class="px-4 py-3 text-gray-600">{{ $station->telephone }}</td>
                    <td class="px-4 py-3 text-gray-500 text-xs">{{ $station->horaires }}</td>
                    <td class="px-4 py-3 text-center">
                        <form method="POST" action="{{ route('admin.stations.toggle', $station) }}">
                            @csrf @method('PATCH')
                            <button type="submit" class="px-2 py-1 rounded-full text-xs font-medium {{ $station->actif ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' }}">
                                {{ $station->actif ? 'Actif' : 'Inactif' }}
                            </button>
                        </form>
                    </td>
                    <td class="px-4 py-3 text-right">
                        <div class="flex items-center justify-end gap-2">
                            <a href="{{ route('admin.stations.edit', $station) }}" class="text-blue-500 hover:text-blue-700 p-1.5 rounded hover:bg-blue-50" title="Modifier">
                                <i class="fas fa-edit text-xs"></i>
                            </a>
                            <form method="POST" action="{{ route('admin.stations.destroy', $station) }}" onsubmit="return confirm('Supprimer cette station ?')">
                                @csrf @method('DELETE')
                                <button type="submit" class="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50" title="Supprimer">
                                    <i class="fas fa-trash text-xs"></i>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @empty
                <tr><td colspan="6" class="px-5 py-10 text-center text-gray-400">Aucune station trouvée.</td></tr>
                @endforelse
            </tbody>
        </table>
        <div class="p-4 border-t border-gray-100">
            {{ $stations->links() }}
        </div>
    </div>
</div>
@endsection
