@extends('admin.layouts.app')
@section('title', $event->id ? 'Modifier étape' : 'Nouvelle étape')
@section('page-title', $event->id ? 'Modifier l\'étape' : 'Nouvelle étape')

@section('content')
<div class="max-w-2xl pt-2">
    <a href="{{ route('admin.history.index') }}" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 mb-4"><i class="fas fa-arrow-left"></i> Retour à l'histoire</a>

    <form method="POST" action="{{ $event->id ? route('admin.history.update', $event) : route('admin.history.store') }}" enctype="multipart/form-data">
        @csrf @if($event->id) @method('PUT') @endif
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            @if($event->image)
            <div class="aspect-video max-w-sm rounded-lg overflow-hidden bg-gray-100"><img src="{{ Storage::url($event->image) }}" class="w-full h-full object-cover" /></div>
            @endif
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image (facultatif)</label>
                <input type="file" name="image" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Année *</label>
                    <input type="text" name="annee" value="{{ old('annee', $event->annee) }}" required placeholder="1974" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ordre d'affichage</label>
                    <input type="number" name="ordre" value="{{ old('ordre', $event->ordre ?? 0) }}" min="0" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                <input type="text" name="titre" value="{{ old('titre', $event->titre) }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-y">{{ old('description', $event->description) }}</textarea>
            </div>
            <div class="flex flex-col gap-3">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="highlight" value="1" {{ old('highlight', $event->highlight ?? false) ? 'checked' : '' }} style="accent-color:#F97316;" />
                    <span class="text-sm font-medium text-gray-700">Mettre en avant (bordure orange)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="actif" value="1" {{ old('actif', $event->actif ?? true) ? 'checked' : '' }} style="accent-color:#F97316;" />
                    <span class="text-sm font-medium text-gray-700">Étape visible</span>
                </label>
            </div>
        </div>
        <div class="flex gap-3 mt-5">
            <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600"><i class="fas fa-save mr-2"></i>{{ $event->id ? 'Enregistrer' : 'Ajouter' }}</button>
            <a href="{{ route('admin.history.index') }}" class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Annuler</a>
        </div>
    </form>
</div>
@endsection
