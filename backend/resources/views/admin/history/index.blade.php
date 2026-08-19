@extends('admin.layouts.app')
@section('title', 'Histoire')
@section('page-title', 'Notre Histoire et Évolution')

@section('content')
<div class="space-y-5 pt-2">
    <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">Étapes affichées dans la section « Notre Histoire » de la page À propos.</p>
        <a href="{{ route('admin.history.create') }}" class="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 flex items-center gap-2">
            <i class="fas fa-plus"></i> Nouvelle étape
        </a>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @forelse($events as $event)
        <div class="bg-white rounded-2xl border {{ $event->highlight ? 'border-orange-300' : 'border-gray-100' }} shadow-sm overflow-hidden">
            @if($event->image)
            <div class="aspect-video bg-gray-100"><img src="{{ Storage::url($event->image) }}" class="w-full h-full object-cover" alt=""></div>
            @endif
            <div class="p-4">
                <div class="flex items-start justify-between gap-2">
                    <div class="text-3xl font-bold text-primary/30">{{ $event->annee }}</div>
                    <div class="flex flex-col items-end gap-1">
                        <span class="px-2 py-0.5 rounded-full text-xs font-medium {{ $event->actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' }}">{{ $event->actif ? 'Actif' : 'Masqué' }}</span>
                        @if($event->highlight)<span class="px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700">Mis en avant</span>@endif
                    </div>
                </div>
                <h3 class="font-bold text-gray-800 mt-1">{{ $event->titre }}</h3>
                <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ $event->description }}</p>
                <div class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                    <a href="{{ route('admin.history.edit', $event) }}" class="flex-1 text-center px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm hover:bg-orange-100"><i class="fas fa-pen mr-1"></i>Éditer</a>
                    <form method="POST" action="{{ route('admin.history.toggle', $event) }}">@csrf @method('PATCH')
                        <button class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50" title="Activer/désactiver"><i class="fas fa-power-off"></i></button>
                    </form>
                    <form method="POST" action="{{ route('admin.history.destroy', $event) }}" onsubmit="return confirm('Supprimer cette étape ?')">@csrf @method('DELETE')
                        <button class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-red-400 hover:bg-red-50 hover:text-red-600"><i class="fas fa-trash"></i></button>
                    </form>
                </div>
            </div>
        </div>
        @empty
        <div class="col-span-3 text-center py-16 text-gray-400">
            <i class="fas fa-timeline text-4xl mb-3 block"></i>
            <p>Aucune étape. <a href="{{ route('admin.history.create') }}" class="text-orange-500 hover:underline">Ajouter la première</a></p>
        </div>
        @endforelse
    </div>
</div>
@endsection
