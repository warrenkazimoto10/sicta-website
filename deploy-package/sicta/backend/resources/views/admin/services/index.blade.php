@extends('admin.layouts.app')
@section('title', 'Services')
@section('page-title', 'Services')

@section('content')
<div class="space-y-5 pt-2">
    <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">Gérez les pages de services : contenu, blocs, tarifs, image et référencement.</p>
        <a href="{{ route('admin.services.create') }}" class="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center gap-2">
            <i class="fas fa-plus"></i> Nouveau service
        </a>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @forelse($services as $service)
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div class="aspect-[16/9] bg-gray-100 relative">
                @if($service->hero_image)
                    <img src="{{ Storage::url($service->hero_image) }}" alt="{{ $service->nom }}" class="w-full h-full object-cover" />
                @else
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50">
                        <i class="fas fa-briefcase text-orange-300 text-3xl"></i>
                    </div>
                @endif
                <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold {{ $service->actif ? 'bg-green-500 text-white' : 'bg-gray-400 text-white' }}">
                    {{ $service->actif ? 'Actif' : 'Inactif' }}
                </span>
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold {{ $service->source === 'cms' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white' }}">
                    {{ $service->source === 'cms' ? 'Géré ici (CMS)' : 'Page codée' }}
                </span>
            </div>
            <div class="p-4 flex flex-col flex-1">
                <h3 class="font-bold text-gray-800">{{ $service->nom }}</h3>
                <p class="text-xs text-gray-500 mt-1 font-mono">/services/{{ $service->slug }}</p>
                <p class="text-sm text-gray-500 mt-2 line-clamp-2 flex-1">{{ $service->resume }}</p>
                <div class="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
                    <i class="fas fa-layer-group"></i> {{ $service->sections_count }} bloc(s)
                </div>
                <div class="flex items-center gap-2 mt-4 pt-3 border-t border-gray-50">
                    <a href="{{ route('admin.services.edit', $service) }}" class="flex-1 text-center px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100">
                        <i class="fas fa-pen mr-1"></i> Éditer
                    </a>
                    <form method="POST" action="{{ route('admin.services.toggle', $service) }}">
                        @csrf @method('PATCH')
                        <button type="submit" class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50" title="Activer / désactiver">
                            <i class="fas fa-power-off"></i>
                        </button>
                    </form>
                    <form method="POST" action="{{ route('admin.services.destroy', $service) }}" onsubmit="return confirm('Supprimer ce service et tous ses blocs ?')">
                        @csrf @method('DELETE')
                        <button type="submit" class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-red-400 hover:bg-red-50 hover:text-red-600"><i class="fas fa-trash"></i></button>
                    </form>
                </div>
            </div>
        </div>
        @empty
        <div class="col-span-3 text-center py-16 text-gray-400">
            <i class="fas fa-briefcase text-4xl mb-3 block"></i>
            <p>Aucun service. <a href="{{ route('admin.services.create') }}" class="text-orange-500 hover:underline">Créer le premier</a></p>
        </div>
        @endforelse
    </div>
</div>
@endsection
