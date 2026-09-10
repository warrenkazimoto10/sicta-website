@extends('admin.layouts.app')
@section('title', isset($article->id) ? 'Modifier article' : 'Nouvel article')
@section('page-title', isset($article->id) ? 'Modifier l\'article' : 'Nouvel article')

@section('content')
<div class="max-w-6xl pt-2">
    <form method="POST"
          action="{{ isset($article->id) ? route('admin.articles.update', $article) : route('admin.articles.store') }}"
          enctype="multipart/form-data"
          id="articleForm">
        @csrf
        @if(isset($article->id)) @method('PUT') @endif

        <div class="grid lg:grid-cols-3 gap-6">

            {{-- Colonne principale --}}
            <div class="lg:col-span-2 space-y-5">

                {{-- Titre --}}
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                    <input type="text" name="titre" id="titreInput"
                           value="{{ old('titre', $article->titre ?? '') }}" required
                           class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none text-base font-medium"
                           placeholder="Titre de l'article…" />
                    <p class="text-xs text-gray-400 mt-1">
                        Slug : <code class="bg-gray-100 px-1 rounded" id="slugPreview">{{ $article->slug ?? '' }}</code>
                    </p>
                </div>

                {{-- Extrait --}}
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Extrait</label>
                    <textarea name="extrait" rows="3"
                              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                              placeholder="Résumé court affiché dans la liste d'articles…"
                              maxlength="500">{{ old('extrait', $article->extrait ?? '') }}</textarea>
                    <p class="text-xs text-gray-400 mt-1">Max. 500 caractères</p>
                </div>

                {{-- Contenu WYSIWYG --}}
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Contenu</label>
                    <textarea name="contenu" id="contenuEditor">{{ old('contenu', $article->contenu ?? '') }}</textarea>
                </div>

            </div>

            {{-- Colonne sidebar --}}
            <div class="space-y-5">

                {{-- Publication --}}
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h3 class="text-sm font-semibold text-gray-700 mb-4">Publication</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-600 mb-1.5">Statut *</label>
                            <select name="statut" required
                                class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                                <option value="brouillon" {{ old('statut', $article->statut ?? 'brouillon') === 'brouillon' ? 'selected' : '' }}>🔘 Brouillon</option>
                                <option value="publie"    {{ old('statut', $article->statut ?? '') === 'publie'    ? 'selected' : '' }}>✅ Publié</option>
                                <option value="archive"   {{ old('statut', $article->statut ?? '') === 'archive'   ? 'selected' : '' }}>📦 Archivé</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-600 mb-1.5">Date de publication</label>
                            <input type="date" name="date_publication"
                                   value="{{ old('date_publication', isset($article->date_publication) ? $article->date_publication->format('Y-m-d') : '') }}"
                                   class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 mt-5 pt-4 border-t border-gray-100">
                        <label class="flex items-center gap-2.5 cursor-pointer group">
                            <div class="relative">
                                <input type="checkbox" name="a_la_une" value="1"
                                       {{ old('a_la_une', $article->a_la_une ?? false) ? 'checked' : '' }}
                                       class="sr-only peer" />
                                <div class="w-10 h-6 bg-gray-200 peer-checked:bg-orange-500 rounded-full transition-colors"></div>
                                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
                            </div>
                            <div>
                                <span class="text-sm font-medium text-gray-700">À la une</span>
                                <p class="text-xs text-gray-400">Affiché en vedette sur la liste</p>
                            </div>
                        </label>
                        <label class="flex items-center gap-2.5 cursor-pointer group">
                            <div class="relative">
                                <input type="checkbox" name="tendance" value="1"
                                       {{ old('tendance', $article->tendance ?? false) ? 'checked' : '' }}
                                       class="sr-only peer" />
                                <div class="w-10 h-6 bg-gray-200 peer-checked:bg-purple-500 rounded-full transition-colors"></div>
                                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
                            </div>
                            <div>
                                <span class="text-sm font-medium text-gray-700">Tendance</span>
                                <p class="text-xs text-gray-400">Badge tendance sur la carte</p>
                            </div>
                        </label>
                    </div>

                    <div class="flex gap-2 mt-5 pt-4 border-t border-gray-100">
                        <a href="{{ route('admin.articles.index') }}"
                           class="flex-1 text-center px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
                            Annuler
                        </a>
                        <button type="submit"
                            class="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                            {{ isset($article->id) ? 'Enregistrer' : 'Créer' }}
                        </button>
                    </div>
                </div>

                {{-- Image --}}
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h3 class="text-sm font-semibold text-gray-700 mb-3">Image principale</h3>
                    @if(isset($article->id) && $article->image_principale)
                    <div class="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-3">
                        <img src="{{ asset('storage/' . $article->image_principale) }}"
                             class="w-full h-full object-cover" id="imagePreview"
                             onerror="this.parentElement.innerHTML='<div class=\'w-full h-full flex items-center justify-center text-gray-400 text-xs\'>Image introuvable</div>'" />
                    </div>
                    @else
                    <div class="aspect-video rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center mb-3" id="imagePlaceholder">
                        <div class="text-center text-gray-400">
                            <i class="fas fa-image text-2xl mb-1"></i>
                            <p class="text-xs">Aperçu</p>
                        </div>
                    </div>
                    <img src="" class="aspect-video rounded-lg overflow-hidden w-full object-cover mb-3 hidden" id="imagePreview" />
                    @endif
                    <input type="file" name="image_principale" accept="image/*" id="imageInput"
                           class="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" />
                </div>

                {{-- Métadonnées --}}
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
                    <h3 class="text-sm font-semibold text-gray-700">Métadonnées</h3>
                    <div>
                        <label class="block text-xs font-medium text-gray-600 mb-1.5">Catégorie</label>
                        <select name="categorie_id"
                            class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                            <option value="">— Sans catégorie —</option>
                            @foreach($categories as $cat)
                            <option value="{{ $cat->id }}"
                                {{ old('categorie_id', $article->categorie_id ?? '') == $cat->id ? 'selected' : '' }}>
                                {{ $cat->nom }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-600 mb-1.5">Auteur</label>
                        <input type="text" name="auteur"
                               value="{{ old('auteur', $article->auteur ?? '') }}"
                               class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                               placeholder="Nom de l'auteur" />
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-gray-600 mb-1.5">Temps de lecture (min)</label>
                        <input type="number" name="temps_lecture" min="1"
                               value="{{ old('temps_lecture', $article->temps_lecture ?? '') }}"
                               class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                               placeholder="ex: 5" />
                    </div>
                </div>

            </div>
        </div>
    </form>
</div>
@endsection

@push('scripts')
{{-- EasyMDE WYSIWYG --}}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css" />
<script src="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js"></script>

<script>
// WYSIWYG
const easyMDE = new EasyMDE({
    element: document.getElementById('contenuEditor'),
    spellChecker: false,
    autosave: { enabled: false },
    placeholder: 'Rédigez le contenu de l\'article en Markdown…\n\n## Titre de section\n\nParagraphe de texte…',
    uploadImage: true,
    imageUploadEndpoint: '{{ route("admin.upload.image") }}',
    imageCSRFToken: '{{ csrf_token() }}',
    imageCSRFName: '_token',
    toolbar: [
        'bold', 'italic', 'heading', '|',
        'quote', 'unordered-list', 'ordered-list', '|',
        'link', 'image', '|',
        'preview', 'side-by-side', 'fullscreen', '|',
        'guide'
    ],
    status: ['lines', 'words'],
    minHeight: '280px',
});

// Slug auto depuis le titre
const titreInput = document.getElementById('titreInput');
const slugPreview = document.getElementById('slugPreview');
function slugify(s) {
    return s.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim().replace(/\s+/g, '-');
}
@if(!isset($article->id))
titreInput.addEventListener('input', () => {
    slugPreview.textContent = slugify(titreInput.value) || '—';
});
@endif

// Aperçu image
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const imagePlaceholder = document.getElementById('imagePlaceholder');
imageInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (imagePreview) {
        imagePreview.src = url;
        imagePreview.classList.remove('hidden');
    }
    if (imagePlaceholder) imagePlaceholder.classList.add('hidden');
});
</script>
@endpush
