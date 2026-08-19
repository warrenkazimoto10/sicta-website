@extends('admin.layouts.app')
@section('title', 'Galerie')
@section('page-title', 'Galerie photo & vidéo')

@section('content')
<div class="space-y-4 pt-2">
    <div class="flex flex-wrap items-center justify-between gap-4">
        <form method="GET" class="flex flex-wrap gap-3">
            <select name="categorie" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="">Toutes catégories</option>
                @foreach(['agences' => 'Agences', 'equipements' => 'Équipements', 'evenements' => 'Événements', 'vehicules' => 'Véhicules', 'autre' => 'Autre'] as $v => $l)
                <option value="{{ $v }}" {{ request('categorie') === $v ? 'selected' : '' }}>{{ $l }}</option>
                @endforeach
            </select>
            <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700">Filtrer</button>
        </form>
        <a href="{{ route('admin.galerie.create') }}" class="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
            <i class="fas fa-plus"></i> Nouveau dossier
        </a>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        @forelse($dossiers as $dossier)
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            @if($dossier->image_couverture)
            <div class="aspect-video bg-gray-100 overflow-hidden">
                <img src="{{ asset('storage/' . $dossier->image_couverture) }}"
                     alt="{{ $dossier->nom }}"
                     class="w-full h-full object-cover"
                     onerror="this.style.display='none'" />
            </div>
            @else
            <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                <i class="fas fa-photo-film text-gray-300 text-3xl"></i>
            </div>
            @endif
            <div class="p-4">
                <div class="flex items-start justify-between gap-2 mb-2">
                    <h3 class="font-semibold text-gray-800 text-sm">{{ $dossier->nom }}</h3>
                    <span class="px-2 py-0.5 rounded-full text-xs font-medium {{ $dossier->public ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' }} flex-shrink-0">{{ $dossier->public ? 'Public' : 'Privé' }}</span>
                </div>
                <div class="text-xs text-gray-500 mb-3">
                    <span class="capitalize">{{ $dossier->categorie }}</span> • {{ $dossier->medias_count }} média(s)
                    @if($dossier->date) • {{ $dossier->date->format('d/m/Y') }} @endif
                </div>
                <div class="flex items-center justify-end gap-2">
                    <a href="{{ route('admin.galerie.show', $dossier) }}" class="text-gray-500 hover:text-gray-700 p-1.5 rounded hover:bg-gray-50">
                        <i class="fas fa-eye text-xs"></i>
                    </a>
                    <a href="{{ route('admin.galerie.edit', $dossier) }}" class="text-blue-500 hover:text-blue-700 p-1.5 rounded hover:bg-blue-50">
                        <i class="fas fa-edit text-xs"></i>
                    </a>
                    <form method="POST" action="{{ route('admin.galerie.destroy', $dossier) }}" onsubmit="return confirm('Supprimer ce dossier et tous ses médias ?')">
                        @csrf @method('DELETE')
                        <button type="submit" class="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50">
                            <i class="fas fa-trash text-xs"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        @empty
        <div class="col-span-3 text-center py-16 text-gray-400">
            <i class="fas fa-photo-film text-4xl mb-3 block"></i>
            <p>Aucun dossier. <a href="{{ route('admin.galerie.create') }}" class="text-orange-500 hover:underline">Créer le premier</a></p>
        </div>
        @endforelse
    </div>
    <div>{{ $dossiers->links() }}</div>
</div>
@endsection
