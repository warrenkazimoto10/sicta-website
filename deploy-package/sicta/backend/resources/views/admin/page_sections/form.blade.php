@extends('admin.layouts.app')
@section('title', $page === 'home' ? "Page d'accueil" : "Page À propos")
@section('page-title', $page === 'home' ? "Contenu — Page d'accueil" : "Contenu — Page À propos")

@section('content')
@php
    $groups = collect($fields)->groupBy('group');
    $intro = $page === 'home'
        ? "Modifiez ici la grande section « Nouvelle Ère » qui apparaît sur la page d'accueil du site, juste après le carrousel."
        : "Modifiez ici les contenus de la page « À propos » du site public.";
@endphp

<div class="max-w-5xl pt-2 pb-28">
    {{-- En-tête explicatif --}}
    <div class="mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-sm">
        <div class="flex items-start gap-4">
            <div class="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-{{ $page === 'home' ? 'house-chimney' : 'circle-info' }} text-lg"></i>
            </div>
            <div>
                <h2 class="text-lg font-bold">{{ $page === 'home' ? "Contenu de la page d'accueil" : "Contenu de la page À propos" }}</h2>
                <p class="text-sm text-white/90 mt-1 leading-relaxed">{{ $intro }}</p>
            </div>
        </div>
    </div>

    <form method="POST" action="{{ route('admin.page-sections.update', $page) }}" enctype="multipart/form-data" x-data="{ dirty: false }" @change="dirty = true" @input="dirty = true">
        @csrf
        @method('PUT')

        <div class="space-y-7">
            @foreach($groups as $groupName => $groupFields)
            <section>
                {{-- Titre du groupe --}}
                <div class="flex items-center gap-2 mb-3">
                    <span class="w-1.5 h-5 rounded-full bg-orange-500"></span>
                    <h3 class="text-sm font-bold text-gray-800 uppercase tracking-wide">{{ $groupName }}</h3>
                </div>

                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                    @foreach($groupFields as $field)
                    @php $val = $sections[$field['key']] ?? ''; @endphp
                    <div class="p-5">
                        <label class="block text-sm font-semibold text-gray-800 mb-1" for="f_{{ $field['key'] }}">
                            {{ $field['label'] }}
                        </label>
                        @if(!empty($field['help']))
                        <p class="text-xs text-gray-500 mb-2.5 leading-relaxed">
                            <i class="fas fa-circle-info text-gray-300 mr-1"></i>{{ $field['help'] }}
                        </p>
                        @endif

                        @switch($field['type'])
                            @case('toggle')
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="{{ $field['key'] }}" value="1" {{ ($val === '1') ? 'checked' : '' }} style="accent-color:#F97316; width:1.1rem; height:1.1rem;" />
                                    <span class="text-sm text-gray-600">Section visible sur le site</span>
                                </label>
                                @break

                            @case('image')
                                <div class="flex flex-col sm:flex-row gap-4 items-start">
                                    <div class="w-40 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 flex items-center justify-center">
                                        @if($val)
                                            <img src="{{ Storage::url($val) }}" class="w-full h-full object-cover" alt="Aperçu" />
                                        @else
                                            <i class="fas fa-image text-gray-300 text-2xl"></i>
                                        @endif
                                    </div>
                                    <div class="flex-1">
                                        <input id="f_{{ $field['key'] }}" type="file" name="{{ $field['key'] }}" accept="image/*"
                                            class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" />
                                        <p class="text-xs text-gray-400 mt-2">Laisser vide pour conserver l'image actuelle. JPG ou PNG, 4 Mo max.</p>
                                    </div>
                                </div>
                                @break

                            @case('richtext')
                                <textarea id="f_{{ $field['key'] }}" name="{{ $field['key'] }}" rows="4"
                                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-y">{{ $val }}</textarea>
                                @break

                            @case('repeater')
                                @php $items = trim($val) !== '' ? array_values(array_filter(array_map('trim', explode("\n", $val)), fn($x) => $x !== '')) : []; @endphp
                                <div x-data="{ items: {{ Illuminate\Support\Js::from($items) }} }" x-init="if (items.length === 0) items.push('')">
                                    <input type="hidden" name="{{ $field['key'] }}" :value="items.map(s => (s || '').trim()).filter(Boolean).join('\n')" />
                                    <div class="space-y-2">
                                        <template x-for="(item, i) in items" :key="i">
                                            <div class="flex items-center gap-2">
                                                <span class="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-[10px]"></i></span>
                                                <input type="text" x-model="items[i]" placeholder="Saisissez un point clé…"
                                                    class="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
                                                <button type="button" @click="items.splice(i, 1); if (items.length === 0) items.push('')"
                                                    class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 flex-shrink-0" title="Supprimer ce point">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </div>
                                        </template>
                                    </div>
                                    <button type="button" @click="items.push('')"
                                        class="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-50 text-orange-700 text-sm font-medium hover:bg-orange-100">
                                        <i class="fas fa-plus"></i> Ajouter un point clé
                                    </button>
                                </div>
                                @break

                            @case('lines')
                                <textarea id="f_{{ $field['key'] }}" name="{{ $field['key'] }}" rows="5"
                                    placeholder="Un élément par ligne&#10;Un autre élément&#10;Encore un"
                                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-y">{{ $val }}</textarea>
                                <p class="text-xs text-gray-400 mt-1.5"><i class="fas fa-list-ul mr-1"></i>Un élément par ligne — chacun devient un point de la liste.</p>
                                @break

                            @case('keyvalue')
                                <textarea id="f_{{ $field['key'] }}" name="{{ $field['key'] }}" rows="5"
                                    placeholder="Valeur | Libellé&#10;50+ | ans d'expérience"
                                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-y font-mono">{{ $val }}</textarea>
                                <p class="text-xs text-gray-400 mt-1.5"><i class="fas fa-table-columns mr-1"></i>Une ligne par entrée, avec une barre verticale <code class="px-1 bg-gray-100 rounded">|</code> entre les deux parties.</p>
                                @break

                            @case('json')
                                <textarea id="f_{{ $field['key'] }}" name="{{ $field['key'] }}" rows="6"
                                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-y font-mono">{{ $val }}</textarea>
                                @break

                            @default
                                <input id="f_{{ $field['key'] }}" type="text" name="{{ $field['key'] }}" value="{{ $val }}"
                                    placeholder="{{ $field['placeholder'] ?? '' }}"
                                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none" />
                        @endswitch
                    </div>
                    @endforeach
                </div>
            </section>
            @endforeach
        </div>

        {{-- Barre d'enregistrement fixe --}}
        <div class="fixed bottom-0 left-64 right-0 bg-white/90 backdrop-blur border-t border-gray-200 px-6 py-3.5 z-30">
            <div class="max-w-5xl flex items-center gap-3">
                <button type="submit"
                    class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm">
                    <i class="fas fa-save mr-2"></i>Enregistrer les modifications
                </button>
                <a href="{{ route('admin.dashboard') }}"
                    class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Annuler
                </a>
                <span x-show="dirty" x-cloak class="text-xs text-amber-600 ml-1">
                    <i class="fas fa-circle-exclamation mr-1"></i>Modifications non enregistrées
                </span>
            </div>
        </div>
    </form>
</div>
@endsection
