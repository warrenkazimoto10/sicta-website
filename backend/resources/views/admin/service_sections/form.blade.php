@extends('admin.layouts.app')
@php $typeLabel = \App\Models\ServiceSection::TYPES[$section->type] ?? $section->type; @endphp
@section('title', 'Bloc — ' . $typeLabel)
@section('page-title', ($section->id ? 'Modifier' : 'Ajouter') . ' un bloc — ' . $typeLabel)

@section('content')
<div class="max-w-4xl pt-2 pb-10"
     x-data="sectionForm('{{ $section->type }}', {{ Illuminate\Support\Js::from($section->contenu ?? new stdClass) }})">
    <a href="{{ route('admin.services.edit', $service) }}" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 mb-4">
        <i class="fas fa-arrow-left"></i> Retour au service « {{ $service->nom }} »
    </a>

    <form method="POST" action="{{ $section->id ? route('admin.services.sections.update', $section) : route('admin.services.sections.store', $service) }}">
        @csrf @if($section->id) @method('PUT') @endif
        <input type="hidden" name="type" value="{{ $section->type }}" />
        <input type="hidden" name="contenu" :value="JSON.stringify(d)" />

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">{{ $typeLabel }}</span>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Titre du bloc</label>
                    <input type="text" name="titre" value="{{ old('titre', $section->titre) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
                    <input type="text" name="sous_titre" value="{{ old('sous_titre', $section->sous_titre) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
            </div>

            {{-- ===================== CHAMPS SELON LE TYPE ===================== --}}

            @switch($section->type)

                @case('intro')
                @case('texte')
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Contenu</label>
                    <textarea x-model="d.html" rows="6" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-y"></textarea>
                    <p class="text-xs text-gray-400 mt-1">Vous pouvez utiliser du HTML simple (&lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;&lt;li&gt;…).</p>
                </div>
                @break

                @case('cta')
                <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Texte du bouton</label>
                        <input type="text" x-model="d.bouton_texte" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Lien du bouton</label>
                        <input type="text" x-model="d.bouton_lien" placeholder="/reservation" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                </div>
                @break

                @case('avantages')
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label class="block text-sm font-medium text-gray-700">Cartes d'avantages</label>
                        <button type="button" @click="d.items.push({icone:'', titre:'', description:''})" class="text-sm text-orange-600 hover:text-orange-700"><i class="fas fa-plus mr-1"></i>Ajouter une carte</button>
                    </div>
                    <div class="space-y-3">
                        <template x-for="(item, i) in d.items" :key="i">
                            <div class="border border-gray-200 rounded-xl p-3 space-y-2 relative">
                                <div class="grid sm:grid-cols-2 gap-2">
                                    {{-- Sélecteur d'icône visuel --}}
                                    <div class="relative" x-data="{ open: false }">
                                        <button type="button" @click="open = !open"
                                            class="w-full flex items-center justify-between gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-orange-300">
                                            <span class="flex items-center gap-2 text-gray-600">
                                                <span class="w-6 h-6 rounded bg-orange-50 text-orange-600 flex items-center justify-center"><i class="fas" :class="window.iconFa(item.icone)"></i></span>
                                                <span x-text="item.icone ? window.iconLabel(item.icone) : 'Icône…'" :class="item.icone ? '' : 'text-gray-400'"></span>
                                            </span>
                                            <i class="fas fa-chevron-down text-gray-300 text-xs"></i>
                                        </button>
                                        <div x-show="open" x-cloak @click.outside="open = false" class="absolute z-40 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 max-h-60 overflow-y-auto">
                                            <div class="grid grid-cols-6 gap-1.5">
                                                <template x-for="ic in window.SICTA_ICONS" :key="ic.name">
                                                    <button type="button" @click="item.icone = ic.name; open = false" :title="ic.label"
                                                        :class="item.icone === ic.name ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-500 hover:bg-orange-50 hover:text-orange-600'"
                                                        class="aspect-square rounded-lg flex items-center justify-center"><i class="fas" :class="ic.fa"></i></button>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <input x-model="item.titre" placeholder="Titre" class="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <textarea x-model="item.description" rows="2" placeholder="Description" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-y"></textarea>
                                <button type="button" @click="d.items.splice(i,1)" class="absolute top-2 right-2 text-gray-300 hover:text-red-500"><i class="fas fa-times"></i></button>
                            </div>
                        </template>
                    </div>
                </div>
                @break

                @case('etapes')
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label class="block text-sm font-medium text-gray-700">Étapes du processus</label>
                        <button type="button" @click="d.items.push({titre:'', description:''})" class="text-sm text-orange-600 hover:text-orange-700"><i class="fas fa-plus mr-1"></i>Ajouter une étape</button>
                    </div>
                    <div class="space-y-3">
                        <template x-for="(item, i) in d.items" :key="i">
                            <div class="border border-gray-200 rounded-xl p-3 flex gap-3 items-start relative">
                                <div class="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1" x-text="i + 1"></div>
                                <div class="flex-1 space-y-2">
                                    <input x-model="item.titre" placeholder="Titre de l'étape" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                                    <textarea x-model="item.description" rows="2" placeholder="Description" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-y"></textarea>
                                </div>
                                <button type="button" @click="d.items.splice(i,1)" class="text-gray-300 hover:text-red-500 mt-1"><i class="fas fa-times"></i></button>
                            </div>
                        </template>
                    </div>
                </div>
                @break

                @case('documents')
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label class="block text-sm font-medium text-gray-700">Documents requis</label>
                        <button type="button" @click="d.items.push({titre:'', description:''})" class="text-sm text-orange-600 hover:text-orange-700"><i class="fas fa-plus mr-1"></i>Ajouter un document</button>
                    </div>
                    <div class="space-y-3">
                        <template x-for="(item, i) in d.items" :key="i">
                            <div class="border border-gray-200 rounded-xl p-3 flex gap-2 items-start relative">
                                <div class="flex-1 space-y-2">
                                    <input x-model="item.titre" placeholder="Nom du document" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                                    <input x-model="item.description" placeholder="Précision (facultatif)" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>
                                <button type="button" @click="d.items.splice(i,1)" class="text-gray-300 hover:text-red-500 mt-1"><i class="fas fa-times"></i></button>
                            </div>
                        </template>
                    </div>
                </div>
                @break

                @case('faq')
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label class="block text-sm font-medium text-gray-700">Questions fréquentes</label>
                        <button type="button" @click="d.items.push({question:'', reponse:''})" class="text-sm text-orange-600 hover:text-orange-700"><i class="fas fa-plus mr-1"></i>Ajouter une question</button>
                    </div>
                    <div class="space-y-3">
                        <template x-for="(item, i) in d.items" :key="i">
                            <div class="border border-gray-200 rounded-xl p-3 space-y-2 relative">
                                <input x-model="item.question" placeholder="Question" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 font-medium" />
                                <textarea x-model="item.reponse" rows="2" placeholder="Réponse" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-y"></textarea>
                                <button type="button" @click="d.items.splice(i,1)" class="absolute top-2 right-2 text-gray-300 hover:text-red-500"><i class="fas fa-times"></i></button>
                            </div>
                        </template>
                    </div>
                </div>
                @break

                @case('tarifs')
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tableau de tarifs</label>
                    <p class="text-xs text-gray-400 mb-3">Définissez les colonnes puis remplissez les lignes. Idéal pour des tableaux qui n'ont pas la même structure d'un service à l'autre.</p>

                    {{-- En-têtes de colonnes --}}
                    <div class="flex items-center gap-2 mb-2 flex-wrap">
                        <template x-for="(col, ci) in d.colonnes" :key="ci">
                            <div class="flex items-center gap-1">
                                <input x-model="d.colonnes[ci]" placeholder="Colonne" class="w-36 px-2 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold bg-gray-50 outline-none focus:ring-2 focus:ring-orange-500" />
                                <button type="button" @click="removeCol(ci)" class="text-gray-300 hover:text-red-500" x-show="d.colonnes.length > 1"><i class="fas fa-times text-xs"></i></button>
                            </div>
                        </template>
                        <button type="button" @click="addCol()" class="text-xs text-orange-600 hover:text-orange-700 px-2 py-1"><i class="fas fa-plus mr-1"></i>Colonne</button>
                    </div>

                    {{-- Lignes --}}
                    <div class="space-y-2">
                        <template x-for="(ligne, ri) in d.lignes" :key="ri">
                            <div class="flex items-center gap-2">
                                <template x-for="(col, ci) in d.colonnes" :key="ci">
                                    <input x-model="d.lignes[ri][ci]" placeholder="…" class="w-36 px-2 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                                </template>
                                <button type="button" @click="d.lignes.splice(ri,1)" class="text-gray-300 hover:text-red-500"><i class="fas fa-times text-xs"></i></button>
                            </div>
                        </template>
                    </div>
                    <button type="button" @click="addRow()" class="mt-3 text-sm text-orange-600 hover:text-orange-700"><i class="fas fa-plus mr-1"></i>Ajouter une ligne</button>
                </div>
                @break

                @case('custom')
                <div class="space-y-3">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Clé du composant codé</label>
                        <input type="text" x-model="d.composant" placeholder="ex: TableJaugeage" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                        <p class="text-xs text-gray-400 mt-1">Réservé aux tableaux/widgets très spécifiques rendus par un composant React dédié.</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Données (JSON libre)</label>
                        <textarea x-model="d.json" rows="6" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono outline-none focus:ring-2 focus:ring-orange-500 resize-y"></textarea>
                    </div>
                </div>
                @break

            @endswitch

            <label class="flex items-center gap-2 cursor-pointer pt-2 border-t border-gray-50">
                <input type="checkbox" name="actif" value="1" {{ old('actif', $section->actif ?? true) ? 'checked' : '' }} style="accent-color:#F97316;" />
                <span class="text-sm font-medium text-gray-700">Bloc visible sur le site</span>
            </label>
        </div>

        <div class="flex gap-3 mt-5">
            <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600">
                <i class="fas fa-save mr-2"></i>{{ $section->id ? 'Enregistrer le bloc' : 'Ajouter le bloc' }}
            </button>
            <a href="{{ route('admin.services.edit', $service) }}" class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Annuler</a>
        </div>
    </form>
</div>

@push('scripts')
<script>
function sectionForm(type, contenu) {
    // Valeurs par défaut selon le type de bloc
    const defaults = {
        intro:     { html: '' },
        texte:     { html: '' },
        cta:       { bouton_texte: '', bouton_lien: '' },
        avantages: { items: [] },
        etapes:    { items: [] },
        documents: { items: [] },
        faq:       { items: [] },
        tarifs:    { colonnes: ['Type', 'Prix'], lignes: [['', '']] },
        custom:    { composant: '', json: '' },
    };
    const base = JSON.parse(JSON.stringify(defaults[type] || {}));
    const d = Object.assign(base, contenu || {});

    // Sécurise les tableaux attendus
    if ('items' in base && !Array.isArray(d.items)) d.items = [];
    if (type === 'tarifs') {
        if (!Array.isArray(d.colonnes) || d.colonnes.length === 0) d.colonnes = ['Type', 'Prix'];
        if (!Array.isArray(d.lignes)) d.lignes = [];
    }

    return {
        d,
        addCol() {
            this.d.colonnes.push('');
            this.d.lignes.forEach(l => l.push(''));
        },
        removeCol(ci) {
            this.d.colonnes.splice(ci, 1);
            this.d.lignes.forEach(l => l.splice(ci, 1));
        },
        addRow() {
            this.d.lignes.push(this.d.colonnes.map(() => ''));
        },
    };
}
</script>
@endpush
@endsection
