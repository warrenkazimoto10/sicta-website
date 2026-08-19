@extends('admin.layouts.app')
@section('title', 'Catégories')
@section('page-title', "Catégories d'articles")

@section('content')
<div class="grid md:grid-cols-2 gap-6 pt-2">
    <!-- Liste -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-5 border-b border-gray-100">
            <h3 class="font-bold text-gray-800">Catégories existantes ({{ $categories->count() }})</h3>
        </div>
        <div class="divide-y divide-gray-50">
            @forelse($categories as $cat)
            <div class="p-4 flex items-center justify-between">
                <div>
                    <div class="font-medium text-gray-800">{{ $cat->nom }}</div>
                    <div class="text-xs text-gray-500">{{ $cat->articles_count }} article(s) · slug: {{ $cat->slug }}</div>
                </div>
                <div class="flex gap-2">
                    <form method="POST" action="{{ route('admin.categories.destroy', $cat) }}" onsubmit="return confirm('Supprimer cette catégorie ?')">
                        @csrf @method('DELETE')
                        <button type="submit" class="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50">
                            <i class="fas fa-trash text-xs"></i>
                        </button>
                    </form>
                </div>
            </div>
            @empty
            <p class="p-4 text-sm text-gray-500 text-center">Aucune catégorie.</p>
            @endforelse
        </div>
    </div>

    <!-- Formulaire création -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-800 mb-4">Nouvelle catégorie</h3>
        <form method="POST" action="{{ route('admin.categories.store') }}" class="space-y-4">
            @csrf
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input type="text" name="nom" value="{{ old('nom') }}" required
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Ex: Actualités, Réglementation..." />
            </div>
            <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
                Créer la catégorie
            </button>
        </form>
    </div>
</div>
@endsection
