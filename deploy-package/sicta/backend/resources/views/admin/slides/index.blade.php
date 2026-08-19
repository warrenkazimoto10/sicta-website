@extends('admin.layouts.app')
@section('title', 'Slider accueil')
@section('page-title', "Slider — Page d'accueil")

@section('content')
<div class="space-y-4 pt-2">
    <div class="flex justify-end">
        <a href="{{ route('admin.slides.create') }}" class="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
            <i class="fas fa-plus"></i> Nouveau slide
        </a>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        @forelse($slides as $slide)
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            @if($slide->image)
            <div class="aspect-video bg-gray-100 overflow-hidden">
                <img src="{{ Storage::url($slide->image) }}" alt="{{ $slide->titre }}" class="w-full h-full object-cover" />
            </div>
            @else
            <div class="aspect-video bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                <i class="fas fa-image text-orange-300 text-3xl"></i>
            </div>
            @endif
            <div class="p-4">
                <div class="flex items-start justify-between gap-2 mb-2">
                    <h3 class="font-semibold text-gray-800 text-sm" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;">{{ $slide->titre }}</h3>
                    <span class="px-2 py-0.5 rounded-full text-xs font-medium {{ $slide->actif ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' }} flex-shrink-0">{{ $slide->actif ? 'Actif' : 'Inactif' }}</span>
                </div>
                <p class="text-xs text-gray-500 mb-3" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">{{ $slide->sous_titre }}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 text-xs text-gray-400">
                        <span>Ordre: {{ $slide->ordre }}</span>
                        <span class="inline-flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full font-medium">
                            <i class="fas fa-clock"></i>{{ $slide->duree ?? 6 }}s
                        </span>
                    </div>
                    <div class="flex gap-2">
                        <form method="POST" action="{{ route('admin.slides.toggle', $slide) }}">
                            @csrf @method('PATCH')
                            <button type="submit" class="text-xs text-gray-500 hover:text-orange-500 px-2 py-1 rounded hover:bg-orange-50">Toggle</button>
                        </form>
                        <a href="{{ route('admin.slides.edit', $slide) }}" class="text-blue-500 hover:text-blue-700 p-1.5 rounded hover:bg-blue-50">
                            <i class="fas fa-edit text-xs"></i>
                        </a>
                        <form method="POST" action="{{ route('admin.slides.destroy', $slide) }}" onsubmit="return confirm('Supprimer ce slide ?')">
                            @csrf @method('DELETE')
                            <button type="submit" class="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50"><i class="fas fa-trash text-xs"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        @empty
        <div class="col-span-3 text-center py-16 text-gray-400">
            <i class="fas fa-images text-4xl mb-3 block"></i>
            <p>Aucun slide. <a href="{{ route('admin.slides.create') }}" class="text-orange-500 hover:underline">Créer le premier</a></p>
        </div>
        @endforelse
    </div>
    <div>{{ $slides->links() }}</div>
</div>
@endsection
