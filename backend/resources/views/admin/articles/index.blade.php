@extends('admin.layouts.app')
@section('title', 'Actualités')
@section('page-title', 'Actualités')

@section('content')
<div class="space-y-4 pt-2" x-data="articlesList">

    {{-- Barre d'actions --}}
    <div class="flex flex-wrap items-center justify-between gap-3">
        <form method="GET" id="filterForm" class="flex flex-wrap gap-2 flex-1">
            {{-- Recherche --}}
            <input type="text" name="search" value="{{ request('search') }}"
                placeholder="Titre, extrait…"
                class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none w-52" />

            {{-- Statut --}}
            <select name="statut" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="">Tous statuts</option>
                <option value="brouillon" {{ request('statut') === 'brouillon' ? 'selected' : '' }}>Brouillon</option>
                <option value="publie"    {{ request('statut') === 'publie'    ? 'selected' : '' }}>Publié</option>
                <option value="archive"   {{ request('statut') === 'archive'   ? 'selected' : '' }}>Archivé</option>
            </select>

            {{-- Catégorie --}}
            <select name="categorie_id" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                <option value="">Toutes catégories</option>
                @foreach($categories as $cat)
                <option value="{{ $cat->id }}" {{ request('categorie_id') == $cat->id ? 'selected' : '' }}>{{ $cat->nom }}</option>
                @endforeach
            </select>

            {{-- Auteur --}}
            <input type="text" name="auteur" value="{{ request('auteur') }}"
                placeholder="Auteur…"
                class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none w-36" />

            {{-- Dates --}}
            <input type="date" name="date_debut" value="{{ request('date_debut') }}"
                class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            <input type="date" name="date_fin" value="{{ request('date_fin') }}"
                class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />

            <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700">
                <i class="fas fa-search mr-1"></i> Filtrer
            </button>
            @if(request()->hasAny(['search','statut','categorie_id','auteur','date_debut','date_fin']))
            <a href="{{ route('admin.articles.index') }}"
               class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
                Réinitialiser
            </a>
            @endif
        </form>

        <div class="flex items-center gap-2 flex-shrink-0">
            {{-- Toggle vue --}}
            <div class="flex border border-gray-200 rounded-lg overflow-hidden">
                <button @click="view='list'"
                    :class="view==='list' ? 'bg-orange-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'"
                    class="px-3 py-2 text-sm transition-colors" title="Liste">
                    <i class="fas fa-list"></i>
                </button>
                <button @click="view='grid'"
                    :class="view==='grid' ? 'bg-orange-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'"
                    class="px-3 py-2 text-sm transition-colors" title="Grille">
                    <i class="fas fa-th-large"></i>
                </button>
            </div>

            <a href="{{ route('admin.articles.create') }}"
               class="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
                <i class="fas fa-plus"></i> Nouvel article
            </a>
        </div>
    </div>

    {{-- Header compteur + per page --}}
    <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">
            {{ $articles->total() }} article{{ $articles->total() > 1 ? 's' : '' }}
            @if($articles->total() > 0) — page {{ $articles->currentPage() }}/{{ $articles->lastPage() }} @endif
        </span>
        <form method="GET" class="flex items-center gap-2">
            @foreach(request()->except('per_page','page') as $k => $v)
                <input type="hidden" name="{{ $k }}" value="{{ $v }}">
            @endforeach
            <label class="text-xs text-gray-500">Par page :</label>
            <select name="per_page" onchange="this.form.submit()"
                class="text-sm border border-gray-200 rounded px-2 py-1 focus:ring-2 focus:ring-orange-500 outline-none">
                @foreach([10, 20, 50] as $n)
                <option value="{{ $n }}" {{ request('per_page', 10) == $n ? 'selected' : '' }}>{{ $n }}</option>
                @endforeach
            </select>
        </form>
    </div>

    {{-- VUE LISTE --}}
    <div x-show="view==='list'" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                    <th class="px-5 py-3 text-left">Article</th>
                    <th class="px-4 py-3 text-left">Catégorie</th>
                    <th class="px-4 py-3 text-left hidden md:table-cell">Auteur</th>
                    <th class="px-4 py-3 text-center">Statut</th>
                    <th class="px-4 py-3 text-left hidden lg:table-cell">Date</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                @forelse($articles as $article)
                <tr class="hover:bg-gray-50/50 group">
                    <td class="px-5 py-3 max-w-xs">
                        <div class="flex items-start gap-3">
                            @if($article->image_principale)
                            <div class="w-12 h-8 rounded overflow-hidden bg-gray-100 flex-shrink-0 hidden sm:block">
                                <img src="{{ asset('storage/' . $article->image_principale) }}"
                                     class="w-full h-full object-cover"
                                     onerror="this.style.display='none'" />
                            </div>
                            @endif
                            <div class="min-w-0">
                                <div class="font-medium text-gray-800 truncate">{{ $article->titre }}</div>
                                <div class="flex gap-1 mt-0.5">
                                    @if($article->a_la_une)
                                    <span class="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">Une</span>
                                    @endif
                                    @if($article->tendance)
                                    <span class="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">Tendance</span>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="px-4 py-3 text-gray-500 text-xs">{{ $article->categorie?->nom ?? '—' }}</td>
                    <td class="px-4 py-3 text-gray-600 text-xs hidden md:table-cell">{{ $article->auteur ?? '—' }}</td>
                    <td class="px-4 py-3 text-center">
                        @php
                            $sc = ['brouillon' => 'bg-gray-100 text-gray-600', 'publie' => 'bg-green-100 text-green-700', 'archive' => 'bg-red-100 text-red-600'];
                        @endphp
                        <span class="px-2 py-1 rounded-full text-xs font-medium {{ $sc[$article->statut] ?? '' }}">
                            {{ ucfirst($article->statut) }}
                        </span>
                    </td>
                    <td class="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">
                        {{ $article->date_publication?->format('d/m/Y') ?? '—' }}
                    </td>
                    <td class="px-4 py-3 text-right">
                        <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a href="{{ route('admin.articles.show', $article) }}"
                               class="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded" title="Voir">
                                <i class="fas fa-eye text-xs"></i>
                            </a>
                            <a href="{{ route('admin.articles.edit', $article) }}"
                               class="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded" title="Modifier">
                                <i class="fas fa-edit text-xs"></i>
                            </a>
                            <form method="POST" action="{{ route('admin.articles.duplicate', $article) }}" class="inline">
                                @csrf
                                <button type="submit" class="p-1.5 text-green-500 hover:text-green-700 hover:bg-green-50 rounded" title="Dupliquer">
                                    <i class="fas fa-copy text-xs"></i>
                                </button>
                            </form>
                            <button type="button"
                                @click="openDeleteModal({{ $article->id }}, '{{ addslashes($article->titre) }}')"
                                class="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded" title="Supprimer">
                                <i class="fas fa-trash text-xs"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" class="px-5 py-14 text-center text-gray-400">
                        <i class="fas fa-newspaper text-3xl mb-3 block opacity-30"></i>
                        Aucun article trouvé.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{-- VUE GRILLE --}}
    <div x-show="view==='grid'" x-cloak>
        @if($articles->count() > 0)
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            @foreach($articles as $article)
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                {{-- Image --}}
                @if($article->image_principale)
                <div class="aspect-[16/9] overflow-hidden bg-gray-100">
                    <img src="{{ asset('storage/' . $article->image_principale) }}"
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                         onerror="this.style.display='none'" />
                </div>
                @else
                <div class="aspect-[16/9] bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                    <i class="fas fa-newspaper text-orange-300 text-3xl"></i>
                </div>
                @endif

                <div class="p-4">
                    <div class="flex items-center justify-between mb-2 gap-2">
                        @php $sc = ['brouillon' => 'bg-gray-100 text-gray-600', 'publie' => 'bg-green-100 text-green-700', 'archive' => 'bg-red-100 text-red-600']; @endphp
                        <span class="px-2 py-0.5 rounded-full text-xs font-medium {{ $sc[$article->statut] ?? '' }}">
                            {{ ucfirst($article->statut) }}
                        </span>
                        <span class="text-xs text-gray-400 truncate">{{ $article->categorie?->nom ?? '—' }}</span>
                    </div>

                    <h3 class="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">{{ $article->titre }}</h3>

                    @if($article->extrait)
                    <p class="text-xs text-gray-500 line-clamp-2 mb-3">{{ $article->extrait }}</p>
                    @endif

                    <div class="flex items-center justify-between text-xs text-gray-400">
                        <span>{{ $article->date_publication?->format('d/m/Y') ?? '—' }}</span>
                        <div class="flex gap-1">
                            @if($article->a_la_une) <span class="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">Une</span> @endif
                            @if($article->tendance) <span class="bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">Tendance</span> @endif
                        </div>
                    </div>

                    <div class="flex gap-1.5 mt-3 pt-3 border-t border-gray-50">
                        <a href="{{ route('admin.articles.edit', $article) }}"
                           class="flex-1 text-center py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded font-medium transition-colors">
                            <i class="fas fa-edit mr-1"></i>Modifier
                        </a>
                        <form method="POST" action="{{ route('admin.articles.duplicate', $article) }}" class="inline">
                            @csrf
                            <button type="submit"
                                class="px-3 py-1.5 text-xs text-green-600 bg-green-50 hover:bg-green-100 rounded font-medium transition-colors">
                                <i class="fas fa-copy"></i>
                            </button>
                        </form>
                        <button type="button"
                            @click="openDeleteModal({{ $article->id }}, '{{ addslashes($article->titre) }}')"
                            class="px-3 py-1.5 text-xs text-red-500 bg-red-50 hover:bg-red-100 rounded font-medium transition-colors">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        @else
        <div class="text-center py-16 text-gray-400">
            <i class="fas fa-newspaper text-4xl mb-3 block opacity-30"></i>
            <p>Aucun article. <a href="{{ route('admin.articles.create') }}" class="text-orange-500 hover:underline">Créer le premier</a></p>
        </div>
        @endif
    </div>

    {{-- Pagination --}}
    <div>{{ $articles->withQueryString()->links() }}</div>

    {{-- Modal suppression --}}
    <div x-show="deleteModal.open" x-cloak
         class="fixed inset-0 z-50 flex items-center justify-center p-4"
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0">
        <div class="absolute inset-0 bg-black/50" @click="deleteModal.open=false"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
             x-transition:enter="transition ease-out duration-200"
             x-transition:enter-start="opacity-0 scale-95"
             x-transition:enter-end="opacity-100 scale-100">
            <div class="flex items-center gap-4 mb-5">
                <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-trash text-red-500 text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-gray-800">Supprimer l'article</h3>
                    <p class="text-sm text-gray-500 mt-0.5">Cette action est irréversible.</p>
                </div>
            </div>
            <p class="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3 mb-6 line-clamp-2">
                « <span x-text="deleteModal.titre" class="font-medium"></span> »
            </p>
            <div class="flex gap-3">
                <button @click="deleteModal.open=false"
                    class="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 font-medium">
                    Annuler
                </button>
                <form :action="deleteModal.action" method="POST" class="flex-1">
                    @csrf @method('DELETE')
                    <button type="submit"
                        class="w-full px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors">
                        <i class="fas fa-trash mr-2"></i>Supprimer
                    </button>
                </form>
            </div>
        </div>
    </div>

</div>
@endsection

@push('scripts')
<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('articlesList', () => ({
        view: localStorage.getItem('articles_view') || 'list',
        deleteModal: { open: false, id: null, titre: '', action: '' },

        init() {
            this.$watch('view', val => localStorage.setItem('articles_view', val));
        },

        openDeleteModal(id, titre) {
            this.deleteModal = {
                open: true,
                id,
                titre,
                action: `/admin/articles/${id}`
            };
        },
    }));
});
</script>
@endpush
