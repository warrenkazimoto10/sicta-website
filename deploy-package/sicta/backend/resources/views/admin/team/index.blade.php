@extends('admin.layouts.app')
@section('title', 'Équipe')
@section('page-title', 'Notre Équipe')

@section('content')
<div class="space-y-5 pt-2">
    <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">Membres affichés dans la section « Notre Équipe » de la page À propos.</p>
        <a href="{{ route('admin.team.create') }}" class="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center gap-2">
            <i class="fas fa-plus"></i> Nouveau membre
        </a>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        @forelse($members as $member)
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="aspect-square bg-gray-100">
                @if($member->photo)
                    <img src="{{ Storage::url($member->photo) }}" alt="{{ $member->nom }}" class="w-full h-full object-cover" />
                @else
                    <img src="https://cdn.vectorstock.com/i/1000v/38/71/avatar-man-in-modern-flat-design-vector-15133871.jpg" alt="{{ $member->nom }}" class="w-full h-full object-cover" />
                @endif
            </div>
            <div class="p-4">
                <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0">
                        <h3 class="font-bold text-gray-800 truncate">{{ $member->nom }}</h3>
                        <p class="text-xs text-gray-500 truncate">{{ $member->role }}</p>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 {{ $member->actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' }}">{{ $member->actif ? 'Actif' : 'Masqué' }}</span>
                </div>
                <div class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                    <a href="{{ route('admin.team.edit', $member) }}" class="flex-1 text-center px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm hover:bg-orange-100"><i class="fas fa-pen mr-1"></i>Éditer</a>
                    <form method="POST" action="{{ route('admin.team.toggle', $member) }}">@csrf @method('PATCH')
                        <button class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50" title="Activer/désactiver"><i class="fas fa-power-off"></i></button>
                    </form>
                    <form method="POST" action="{{ route('admin.team.destroy', $member) }}" onsubmit="return confirm('Supprimer ce membre ?')">@csrf @method('DELETE')
                        <button class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-red-400 hover:bg-red-50 hover:text-red-600"><i class="fas fa-trash"></i></button>
                    </form>
                </div>
            </div>
        </div>
        @empty
        <div class="col-span-4 text-center py-16 text-gray-400">
            <i class="fas fa-users text-4xl mb-3 block"></i>
            <p>Aucun membre. <a href="{{ route('admin.team.create') }}" class="text-orange-500 hover:underline">Ajouter le premier</a></p>
        </div>
        @endforelse
    </div>
</div>
@endsection
