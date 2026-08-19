@extends('admin.layouts.app')
@section('title', isset($slide->id) ? 'Modifier slide' : 'Nouveau slide')
@section('page-title', isset($slide->id) ? 'Modifier le slide' : 'Nouveau slide')

@section('content')
<div class="max-w-4xl pt-2">
    <form method="POST" action="{{ isset($slide->id) ? route('admin.slides.update', $slide) : route('admin.slides.store') }}" enctype="multipart/form-data">
        @csrf @if(isset($slide->id)) @method('PUT') @endif
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
            @if(isset($slide->id) && $slide->image)
            <div class="aspect-video max-w-sm rounded-lg overflow-hidden bg-gray-100">
                <img src="{{ Storage::url($slide->image) }}" class="w-full h-full object-cover" />
            </div>
            @endif
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input type="file" name="image" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                <input type="text" name="titre" value="{{ old('titre', $slide->titre ?? '') }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
                <input type="text" name="sous_titre" value="{{ old('sous_titre', $slide->sous_titre ?? '') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">{{ old('description', $slide->description ?? '') }}</textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Texte bouton CTA</label>
                    <input type="text" name="bouton_texte" value="{{ old('bouton_texte', $slide->bouton_texte ?? '') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Lien bouton CTA</label>
                    <input type="text" name="bouton_lien" value="{{ old('bouton_lien', $slide->bouton_lien ?? '') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Badge texte</label>
                    <input type="text" name="badge_texte" value="{{ old('badge_texte', $slide->badge_texte ?? '') }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ordre</label>
                    <input type="number" name="ordre" value="{{ old('ordre', $slide->ordre ?? 0) }}" min="0" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        <i class="fas fa-clock text-orange-500 mr-1"></i>Vitesse — durée d'affichage (secondes)
                    </label>
                    <input type="number" name="duree" value="{{ old('duree', $slide->duree ?? 6) }}" min="1" max="60" step="1" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                    <p class="text-xs text-gray-400 mt-1">Temps avant de passer au slide suivant (1 à 60 s).</p>
                </div>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="actif" value="1" {{ old('actif', isset($slide->id) ? $slide->actif : true) ? 'checked' : '' }} class="rounded" style="accent-color: #F97316;" />
                <span class="text-sm font-medium text-gray-700">Slide actif</span>
            </label>
        </div>
        <div class="flex gap-3 mt-5">
            <a href="{{ route('admin.slides.index') }}" class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Annuler</a>
            <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
                {{ isset($slide->id) ? 'Mettre à jour' : 'Créer le slide' }}
            </button>
        </div>
    </form>
</div>
@endsection
