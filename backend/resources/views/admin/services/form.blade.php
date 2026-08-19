@extends('admin.layouts.app')
@section('title', $service->id ? 'Modifier service' : 'Nouveau service')
@section('page-title', $service->id ? 'Service — ' . $service->nom : 'Nouveau service')

@section('content')
<div class="max-w-5xl pt-2 pb-10">
    <a href="{{ route('admin.services.index') }}" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 mb-4">
        <i class="fas fa-arrow-left"></i> Retour aux services
    </a>

    {{-- Formulaire méta --}}
    <form method="POST" action="{{ $service->id ? route('admin.services.update', $service) : route('admin.services.store') }}" enctype="multipart/form-data">
        @csrf @if($service->id) @method('PUT') @endif

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div class="flex items-center gap-2 mb-1">
                <span class="w-1.5 h-5 rounded-full bg-orange-500"></span>
                <h3 class="text-sm font-bold text-gray-800 uppercase tracking-wide">Informations générales</h3>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nom du service *</label>
                    <input type="text" name="nom" value="{{ old('nom', $service->nom) }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                    <input type="text" name="slug" value="{{ old('slug', $service->slug) }}" placeholder="auto depuis le nom" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none font-mono" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Icône</label>
                    @include('admin.partials.icon-picker', ['name' => 'icone', 'value' => old('icone', $service->icone)])
                    <p class="text-xs text-gray-400 mt-1">Choisissez une icône dans la liste.</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ordre d'affichage</label>
                    <input type="number" name="ordre" value="{{ old('ordre', $service->ordre ?? 0) }}" min="0" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Résumé (carte de la liste des services)</label>
                <input type="text" name="resume" value="{{ old('resume', $service->resume) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
        </div>

        {{-- Hero --}}
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 mt-5">
            <div class="flex items-center gap-2 mb-1">
                <span class="w-1.5 h-5 rounded-full bg-orange-500"></span>
                <h3 class="text-sm font-bold text-gray-800 uppercase tracking-wide">Bannière (hero)</h3>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 items-start">
                <div class="w-40 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 flex items-center justify-center">
                    @if($service->hero_image)
                        <img src="{{ Storage::url($service->hero_image) }}" class="w-full h-full object-cover" />
                    @else
                        <i class="fas fa-image text-gray-300 text-2xl"></i>
                    @endif
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Image de bannière</label>
                    <input type="file" name="hero_image" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                    <p class="text-xs text-gray-400 mt-1">Laisser vide pour conserver l'image actuelle.</p>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Titre de la bannière</label>
                <input type="text" name="hero_titre" value="{{ old('hero_titre', $service->hero_titre) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Sous-titre de la bannière</label>
                <input type="text" name="hero_sous_titre" value="{{ old('hero_sous_titre', $service->hero_sous_titre) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
        </div>

        {{-- SEO + affichage --}}
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 mt-5">
            <div class="flex items-center gap-2 mb-1">
                <span class="w-1.5 h-5 rounded-full bg-orange-500"></span>
                <h3 class="text-sm font-bold text-gray-800 uppercase tracking-wide">Référencement & affichage</h3>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Titre SEO</label>
                <input type="text" name="meta_title" value="{{ old('meta_title', $service->meta_title) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description SEO</label>
                <textarea name="meta_description" rows="2" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-y">{{ old('meta_description', $service->meta_description) }}</textarea>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Source d'affichage du site</label>
                    <select name="source" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                        <option value="code" {{ old('source', $service->source) === 'code' ? 'selected' : '' }}>Page codée (design actuel)</option>
                        <option value="cms" {{ old('source', $service->source) === 'cms' ? 'selected' : '' }}>Blocs gérés ici (CMS)</option>
                    </select>
                    <p class="text-xs text-gray-400 mt-1">« CMS » = le site affiche les blocs ci-dessous.</p>
                </div>
                <label class="flex items-center gap-2 cursor-pointer mt-7">
                    <input type="checkbox" name="actif" value="1" {{ old('actif', $service->actif ?? true) ? 'checked' : '' }} style="accent-color:#F97316;" />
                    <span class="text-sm font-medium text-gray-700">Service actif</span>
                </label>
            </div>
        </div>

        <div class="flex gap-3 mt-5">
            <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600">
                <i class="fas fa-save mr-2"></i>{{ $service->id ? 'Enregistrer' : 'Créer le service' }}
            </button>
            <a href="{{ route('admin.services.index') }}" class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Annuler</a>
        </div>
    </form>

    {{-- Blocs de contenu --}}
    @if($service->id)
    <div class="mt-10" x-data="{ addOpen: false }">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
                <span class="w-1.5 h-5 rounded-full bg-orange-500"></span>
                <h3 class="text-sm font-bold text-gray-800 uppercase tracking-wide">Blocs de contenu</h3>
            </div>
            <div class="relative">
                <button type="button" @click="addOpen = !addOpen" class="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
                    <i class="fas fa-plus"></i> Ajouter un bloc
                </button>
                <div x-show="addOpen" x-cloak @click.outside="addOpen = false" class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-40">
                    @foreach(\App\Models\ServiceSection::TYPES as $key => $label)
                    <a href="{{ route('admin.services.sections.create', [$service, 'type' => $key]) }}" class="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-700">
                        {{ $label }}
                    </a>
                    @endforeach
                </div>
            </div>
        </div>

        <div class="space-y-3">
            @forelse($service->sections as $section)
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                <div class="flex flex-col gap-1">
                    <form method="POST" action="{{ route('admin.services.sections.move', [$section, 'up']) }}">
                        @csrf @method('PATCH')
                        <button class="w-7 h-7 rounded-lg border border-gray-200 text-gray-400 hover:text-orange-600 hover:border-orange-300 flex items-center justify-center" {{ $loop->first ? 'disabled' : '' }}><i class="fas fa-chevron-up text-xs"></i></button>
                    </form>
                    <form method="POST" action="{{ route('admin.services.sections.move', [$section, 'down']) }}">
                        @csrf @method('PATCH')
                        <button class="w-7 h-7 rounded-lg border border-gray-200 text-gray-400 hover:text-orange-600 hover:border-orange-300 flex items-center justify-center" {{ $loop->last ? 'disabled' : '' }}><i class="fas fa-chevron-down text-xs"></i></button>
                    </form>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">{{ \App\Models\ServiceSection::TYPES[$section->type] ?? $section->type }}</span>
                        @unless($section->actif)<span class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs">Masqué</span>@endunless
                    </div>
                    <p class="text-sm font-medium text-gray-800 mt-1 truncate">{{ $section->titre ?: '(sans titre)' }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <a href="{{ route('admin.services.sections.edit', $section) }}" class="px-3 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm hover:bg-orange-100"><i class="fas fa-pen"></i></a>
                    <form method="POST" action="{{ route('admin.services.sections.destroy', $section) }}" onsubmit="return confirm('Supprimer ce bloc ?')">
                        @csrf @method('DELETE')
                        <button class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-red-400 hover:bg-red-50 hover:text-red-600"><i class="fas fa-trash"></i></button>
                    </form>
                </div>
            </div>
            @empty
            <div class="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200 text-gray-400">
                <i class="fas fa-layer-group text-3xl mb-2 block"></i>
                Aucun bloc pour l'instant. Cliquez sur « Ajouter un bloc ».
            </div>
            @endforelse
        </div>
    </div>
    @endif
</div>
@endsection
