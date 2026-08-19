@extends('admin.layouts.app')
@section('title', $dossier->nom)
@section('page-title', 'Dossier : ' . $dossier->nom)

@section('content')
<div class="space-y-5 pt-2" x-data="dossierGallery({{ $dossier->id }})">

    {{-- En-tête --}}
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 flex-wrap">
            <span class="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full capitalize">{{ $dossier->categorie }}</span>
            <span class="text-sm text-gray-500"><span x-text="medias.length"></span> média(s)</span>
            @if($dossier->date) <span class="text-sm text-gray-500">{{ $dossier->date->format('d/m/Y') }}</span> @endif
            <span class="px-2 py-0.5 rounded-full text-xs font-medium {{ $dossier->public ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' }}">
                {{ $dossier->public ? 'Public' : 'Privé' }}
            </span>
        </div>
        <div class="flex gap-2">
            <a href="{{ route('admin.galerie.edit', $dossier) }}" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Modifier</a>
            <a href="{{ route('admin.galerie.index') }}" class="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Retour</a>
        </div>
    </div>

    {{-- Zone d'upload --}}
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 class="text-sm font-semibold text-gray-800 mb-4">
            <i class="fas fa-cloud-upload-alt text-orange-500 mr-2"></i>Ajouter des médias
        </h3>

        <div class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-orange-300 transition-colors"
             @click="$refs.fileInput.click()"
             @dragover.prevent
             @drop.prevent="handleDrop($event)">
            <i class="fas fa-images text-3xl text-gray-300 mb-2 block"></i>
            <p class="text-sm text-gray-500">Glissez des images/vidéos ici ou <span class="text-orange-500 font-medium">cliquez pour sélectionner</span></p>
            <p class="text-xs text-gray-400 mt-1">JPEG, PNG, WebP, GIF, MP4, MOV — max 50 Mo</p>
            <input type="file" x-ref="fileInput" multiple accept="image/*,video/*" class="hidden"
                   @change="handleFiles($event.target.files)" />
        </div>

        {{-- Aperçu fichiers en attente --}}
        <div x-show="pendingFiles.length > 0" class="mt-4" x-cloak>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Fichiers sélectionnés (<span x-text="pendingFiles.length"></span>)</p>
            <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-3">
                <template x-for="(f, i) in pendingFiles" :key="i">
                    <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img :src="f.preview" x-show="f.isImage" class="w-full h-full object-cover" />
                        <div x-show="!f.isImage" class="w-full h-full flex items-center justify-center">
                            <i class="fas fa-video text-gray-400 text-xl"></i>
                        </div>
                        <button type="button" @click="removePending(i)"
                                class="absolute top-1 right-1 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </template>
            </div>
            <button type="button" @click="uploadPending()" :disabled="uploading"
                    class="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-60">
                <i class="fas fa-upload" x-show="!uploading"></i>
                <i class="fas fa-spinner fa-spin" x-show="uploading"></i>
                <span x-text="uploading ? 'Envoi en cours…' : 'Envoyer (' + pendingFiles.length + ' fichier(s))'"></span>
            </button>
        </div>

        <p x-show="message" x-text="message" class="mt-3 text-sm text-green-600 font-medium" x-cloak></p>
        <p x-show="errorMsg" x-text="errorMsg" class="mt-3 text-sm text-red-500 font-medium" x-cloak></p>
    </div>

    {{-- Grille des médias existants --}}
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 class="text-sm font-semibold text-gray-800 mb-4">
            <i class="fas fa-photo-film text-orange-500 mr-2"></i>Médias du dossier
        </h3>

        <div x-show="medias.length === 0" class="text-center py-12 text-gray-400" x-cloak>
            <i class="fas fa-images text-4xl mb-3 block text-gray-200"></i>
            <p class="text-sm">Aucun média. Ajoutez des photos ou vidéos ci-dessus.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3" x-show="medias.length > 0">
            <template x-for="media in medias" :key="media.id">
                <div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group border border-gray-100 shadow-sm">
                    <img :src="media.url" x-show="media.type === 'image'" class="w-full h-full object-cover" />
                    <div x-show="media.type === 'video'" class="w-full h-full flex items-center justify-center bg-gray-900">
                        <i class="fas fa-play-circle text-white text-2xl"></i>
                    </div>
                    <button type="button" @click="deleteMedia(media.id)"
                            class="absolute top-1.5 right-1.5 h-7 w-7 bg-red-500 text-white rounded-full text-xs items-center justify-center hidden group-hover:flex transition-all shadow-md">
                        <i class="fas fa-trash text-xs"></i>
                    </button>
                </div>
            </template>
        </div>
    </div>
</div>
@endsection

@php
    $mediasJson = $dossier->medias->map(function($m) {
        return [
            'id'   => $m->id,
            'type' => $m->type,
            'url'  => asset('storage/' . $m->fichier),
        ];
    })->values()->toJson();
@endphp

@push('scripts')
<script>
document.addEventListener('alpine:init', () => {
    Alpine.data('dossierGallery', (dossierId) => ({
        dossierId,
        medias: {!! $mediasJson !!},
        pendingFiles: [],
        uploading: false,
        message: '',
        errorMsg: '',

        handleFiles(files) {
            for (const file of files) {
                const isImage = file.type.startsWith('image');
                if (isImage) {
                    const reader = new FileReader();
                    reader.onload = (e) => this.pendingFiles.push({ file, isImage, preview: e.target.result });
                    reader.readAsDataURL(file);
                } else {
                    this.pendingFiles.push({ file, isImage, preview: null });
                }
            }
        },

        handleDrop(event) { this.handleFiles(event.dataTransfer.files); },
        removePending(i) { this.pendingFiles.splice(i, 1); },

        async uploadPending() {
            if (this.uploading || this.pendingFiles.length === 0) return;
            this.uploading = true;
            this.message = '';
            this.errorMsg = '';
            const formData = new FormData();
            this.pendingFiles.forEach(f => formData.append('files[]', f.file));

            try {
                const res = await fetch(`/api/v1/galerie/${this.dossierId}/media`, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData,
                });
                const json = await res.json();
                if (json.success) {
                    this.medias.push(...json.data);
                    this.pendingFiles = [];
                    this.message = `${json.data.length} média(s) ajouté(s) avec succès.`;
                    setTimeout(() => this.message = '', 4000);
                }
            } catch {
                this.errorMsg = 'Erreur lors de l\'envoi. Vérifiez la taille des fichiers.';
            } finally {
                this.uploading = false;
            }
        },

        async deleteMedia(id) {
            if (!confirm('Supprimer ce média définitivement ?')) return;
            try {
                const res = await fetch(`/api/v1/galerie/${this.dossierId}/media/${id}`, {
                    method: 'DELETE',
                    headers: { 'Accept': 'application/json' },
                });
                const json = await res.json();
                if (json.success) {
                    this.medias = this.medias.filter(m => m.id !== id);
                    this.message = 'Média supprimé.';
                    setTimeout(() => this.message = '', 3000);
                }
            } catch {
                this.errorMsg = 'Erreur lors de la suppression.';
            }
        },
    }));
});
</script>
@endpush
