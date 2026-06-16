@extends('admin.layouts.app')
@section('title', $article->titre)
@section('page-title', 'Article : ' . $article->titre)

@section('content')
<div class="max-w-4xl pt-2 space-y-5">
    {{-- Article principal --}}
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        @if($article->image_principale)
        <div class="aspect-video bg-gray-100 overflow-hidden">
            <img src="{{ asset('storage/' . $article->image_principale) }}"
                 alt="{{ $article->titre }}"
                 class="w-full h-full object-cover"
                 onerror="this.style.display='none'" />
        </div>
        @endif
        <div class="p-6 space-y-4">
            <div class="flex items-center gap-3 flex-wrap">
                <span class="px-2 py-1 rounded-full text-xs font-medium
                    {{ $article->statut === 'publie' ? 'bg-green-100 text-green-700' : ($article->statut === 'archive' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-700') }}">
                    {{ ucfirst($article->statut) }}
                </span>
                @if($article->a_la_une) <span class="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">À la une</span> @endif
                @if($article->tendance) <span class="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">Tendance</span> @endif
                @if($article->categorie) <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{{ $article->categorie->nom }}</span> @endif
            </div>
            <h2 class="text-2xl font-bold text-gray-800">{{ $article->titre }}</h2>
            <div class="grid grid-cols-3 gap-4 text-sm text-gray-500">
                <div><span class="text-gray-400 text-xs uppercase tracking-wider block">Auteur</span>{{ $article->auteur ?? 'N/A' }}</div>
                <div><span class="text-gray-400 text-xs uppercase tracking-wider block">Publication</span>{{ $article->date_publication?->format('d/m/Y') ?? 'N/A' }}</div>
                <div><span class="text-gray-400 text-xs uppercase tracking-wider block">Lecture</span>{{ $article->temps_lecture ? $article->temps_lecture . ' min' : 'N/A' }}</div>
            </div>
            @if($article->extrait)
            <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Extrait</p>
                <p class="text-gray-600 italic border-l-4 border-orange-300 pl-4">{{ $article->extrait }}</p>
            </div>
            @endif
            @if($article->contenu)
            <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Contenu</p>
                <div class="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">{{ $article->contenu }}</div>
            </div>
            @endif
        </div>
    </div>

    {{-- Galerie multi-photos --}}
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6" x-data="mediaGallery({{ $article->id }})">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-semibold text-gray-800">
                <i class="fas fa-images text-orange-500 mr-2"></i>
                Galerie de l'article
                <span class="ml-2 text-sm font-normal text-gray-400">(<span x-text="mediaCount"></span> média(s))</span>
            </h3>
            @if($article->statut === 'publie')
            <a href="/galerie/article/{{ $article->slug }}" target="_blank"
               class="text-xs text-orange-500 hover:underline flex items-center gap-1">
                <i class="fas fa-external-link-alt"></i> Voir la galerie publique →
            </a>
            @endif
        </div>

        {{-- Zone d'upload --}}
        <div class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center mb-4 cursor-pointer hover:border-orange-300 transition-colors"
             @click="$refs.fileInput.click()"
             @dragover.prevent
             @drop.prevent="handleDrop($event)">
            <i class="fas fa-cloud-upload-alt text-3xl text-gray-300 mb-2 block"></i>
            <p class="text-sm text-gray-500">Glissez des images/vidéos ici ou <span class="text-orange-500 font-medium">cliquez pour sélectionner</span></p>
            <p class="text-xs text-gray-400 mt-1">JPEG, PNG, GIF, WebP, MP4, MOV — max 50 Mo par fichier</p>
            <input type="file" x-ref="fileInput" multiple accept="image/*,video/*" class="hidden"
                   @change="handleFiles($event.target.files)" />
        </div>

        {{-- Aperçu des fichiers en attente d'upload --}}
        <div x-show="pendingFiles.length > 0" class="mb-4">
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Fichiers sélectionnés</p>
            <div class="grid grid-cols-4 gap-2">
                <template x-for="(f, i) in pendingFiles" :key="i">
                    <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img :src="f.preview" x-show="f.isImage" class="w-full h-full object-cover" />
                        <div x-show="!f.isImage" class="w-full h-full flex items-center justify-center">
                            <i class="fas fa-video text-gray-400 text-2xl"></i>
                        </div>
                        <button type="button" @click="removePending(i)"
                                class="absolute top-1 right-1 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                            <i class="fas fa-times"></i>
                        </button>
                        <p class="absolute bottom-0 left-0 right-0 text-xs text-white bg-black/60 px-1 py-0.5 truncate" x-text="f.name"></p>
                    </div>
                </template>
            </div>
            <button type="button" @click="uploadPending()"
                    class="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
                    :disabled="uploading">
                <i class="fas fa-upload" x-show="!uploading"></i>
                <i class="fas fa-spinner fa-spin" x-show="uploading"></i>
                <span x-text="uploading ? 'Envoi en cours…' : 'Envoyer (' + pendingFiles.length + ' fichier(s))'"></span>
            </button>
        </div>

        {{-- Grille des médias existants --}}
        <div x-show="medias.length === 0 && pendingFiles.length === 0" class="text-center py-8 text-gray-400 text-sm">
            <i class="fas fa-photo-film text-3xl mb-2 block text-gray-200"></i>
            Aucun média dans cet article. Ajoutez des photos ou vidéos ci-dessus.
        </div>

        <div class="grid grid-cols-3 md:grid-cols-4 gap-2" x-show="medias.length > 0">
            <template x-for="media in medias" :key="media.id">
                <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group border border-gray-100">
                    <img :src="media.url" x-show="media.type === 'image'" class="w-full h-full object-cover" />
                    <div x-show="media.type === 'video'" class="w-full h-full flex items-center justify-center bg-gray-900">
                        <i class="fas fa-play-circle text-white text-2xl"></i>
                    </div>
                    <button type="button" @click="deleteMedia(media.id)"
                            class="absolute top-1 right-1 h-6 w-6 bg-red-500 text-white rounded-full text-xs items-center justify-center hidden group-hover:flex transition-all shadow">
                        <i class="fas fa-trash text-xs"></i>
                    </button>
                </div>
            </template>
        </div>

        {{-- Message d'état --}}
        <p x-show="message" x-text="message"
           class="mt-3 text-sm text-green-600 font-medium"></p>
    </div>

    {{-- Actions --}}
    <div class="flex gap-3">
        <a href="{{ route('admin.articles.edit', $article) }}" class="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
            <i class="fas fa-edit"></i> Modifier
        </a>
        <a href="{{ route('admin.articles.index') }}" class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
            Retour
        </a>
    </div>
</div>
@endsection

@push('scripts')
<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('mediaGallery', (articleId) => ({
        articleId,
        medias: @json($article->medias->map(fn($m) => ['id' => $m->id, 'url' => asset('storage/' . $m->path), 'type' => $m->type, 'order' => $m->order])),
        pendingFiles: [],
        uploading: false,
        message: '',

        get mediaCount() { return this.medias.length; },

        handleFiles(files) {
            for (const file of files) {
                const isImage = file.type.startsWith('image');
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.pendingFiles.push({ file, name: file.name, isImage, preview: e.target.result });
                };
                reader.readAsDataURL(file);
            }
        },

        handleDrop(event) {
            this.handleFiles(event.dataTransfer.files);
        },

        removePending(index) {
            this.pendingFiles.splice(index, 1);
        },

        async uploadPending() {
            if (this.uploading || this.pendingFiles.length === 0) return;
            this.uploading = true;
            this.message = '';
            const formData = new FormData();
            this.pendingFiles.forEach(f => formData.append('files[]', f.file));

            try {
                const res = await fetch(`/api/v1/articles/${this.articleId}/media`, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData,
                });
                const json = await res.json();
                if (json.success) {
                    this.medias.push(...json.data);
                    this.pendingFiles = [];
                    this.message = `${json.data.length} média(s) ajouté(s) avec succès.`;
                }
            } catch (e) {
                this.message = 'Erreur lors de l\'envoi.';
            } finally {
                this.uploading = false;
            }
        },

        async deleteMedia(id) {
            if (!confirm('Supprimer ce média ?')) return;
            const res = await fetch(`/api/v1/articles/${this.articleId}/media/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' },
            });
            const json = await res.json();
            if (json.success) {
                this.medias = this.medias.filter(m => m.id !== id);
                this.message = 'Média supprimé.';
            }
        },
    }));
});
</script>
@endpush
