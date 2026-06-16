@extends('admin.layouts.app')
@section('title', isset($dossier->id) ? 'Modifier dossier' : 'Nouveau dossier')
@section('page-title', isset($dossier->id) ? 'Modifier le dossier' : 'Nouveau dossier galerie')

@section('content')
<div class="max-w-2xl pt-2">
    <form method="POST" action="{{ isset($dossier->id) ? route('admin.galerie.update', $dossier) : route('admin.galerie.store') }}" enctype="multipart/form-data">
        @csrf @if(isset($dossier->id)) @method('PUT') @endif

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom du dossier *</label>
                <input type="text" name="nom" value="{{ old('nom', $dossier->nom ?? '') }}" required
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                    <select name="categorie" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                        @foreach(['agences' => 'Agences', 'equipements' => 'Équipements', 'evenements' => 'Événements', 'vehicules' => 'Véhicules', 'autre' => 'Autre'] as $v => $l)
                        <option value="{{ $v }}" {{ old('categorie', $dossier->categorie ?? 'autre') === $v ? 'selected' : '' }}>{{ $l }}</option>
                        @endforeach
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" name="date" value="{{ old('date', isset($dossier->date) ? $dossier->date->format('Y-m-d') : '') }}"
                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Article lié</label>
                <select name="article_id" id="article-select" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                    <option value="">— Aucun —</option>
                    @foreach($articles as $art)
                    <option value="{{ $art->id }}" {{ old('article_id', $dossier->article_id ?? '') == $art->id ? 'selected' : '' }}>{{ $art->titre }}</option>
                    @endforeach
                </select>
            </div>
            <div id="cover-upload-wrapper">
                <label class="block text-sm font-medium text-gray-700 mb-1">Image de couverture</label>
                @if(isset($dossier->id) && $dossier->image_couverture)
                <div class="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <img src="{{ Storage::url($dossier->image_couverture) }}" class="w-full h-full object-cover" />
                </div>
                @endif
                <input type="file" name="image_couverture" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
            </div>
            <div id="article-cover-preview" style="display:none;">
                <p class="block text-sm font-medium text-gray-700 mb-2">Image de couverture <span class="text-orange-500">(depuis l'article lié)</span></p>
                <div class="w-40 h-24 rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <img id="article-cover-img" src="" alt="" class="w-full h-full object-cover" />
                </div>
                <p id="article-cover-label" class="text-xs text-gray-400 italic"></p>
            </div>
            @if(!isset($dossier->id))
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Médias (photos/vidéos)</label>
                <input type="file" name="medias[]" accept="image/*,video/*" multiple class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                <p class="text-xs text-gray-400 mt-1">Formats : JPG, PNG, WebP, MP4, MOV · Max 4 Mo par fichier · 10 fichiers maximum</p>
            </div>
            @endif
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="public" value="1" {{ old('public', isset($dossier->id) ? $dossier->public : true) ? 'checked' : '' }} class="rounded" style="accent-color: #F97316;" />
                <span class="text-sm font-medium text-gray-700">Dossier public</span>
            </label>
        </div>

        <div class="flex gap-3 mt-5">
            <a href="{{ route('admin.galerie.index') }}" class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Annuler</a>
            <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
                {{ isset($dossier->id) ? 'Mettre à jour' : 'Créer le dossier' }}
            </button>
        </div>
    </form>
</div>

<script>
(function () {
    const ARTICLES_MAP    = @json($articlesMap);
    const HAS_COVER       = {{ (isset($dossier->id) && $dossier->image_couverture) ? 'true' : 'false' }};

    const articleSelect   = document.getElementById('article-select');
    const coverWrapper    = document.getElementById('cover-upload-wrapper');
    const previewWrapper  = document.getElementById('article-cover-preview');
    const previewImg      = document.getElementById('article-cover-img');
    const previewLabel    = document.getElementById('article-cover-label');

    function applyArticleImage(isInitial) {
        const id      = articleSelect.value;
        const article = ARTICLES_MAP[id];

        // En mode édition avec une couverture existante, ne pas remplacer au chargement initial
        if (isInitial && HAS_COVER) return;

        if (id && article && article.image_url) {
            coverWrapper.style.display  = 'none';
            previewImg.src              = article.image_url;
            previewImg.alt              = article.titre;
            previewLabel.textContent    = article.titre;
            previewWrapper.style.display = '';
        } else {
            coverWrapper.style.display  = '';
            previewWrapper.style.display = 'none';
            previewImg.src              = '';
        }
    }

    articleSelect.addEventListener('change', function () { applyArticleImage(false); });
    applyArticleImage(true);
})();
</script>
@endsection
