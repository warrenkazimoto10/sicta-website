@extends('admin.layouts.app')
@section('title', $member->id ? 'Modifier membre' : 'Nouveau membre')
@section('page-title', $member->id ? 'Modifier le membre' : 'Nouveau membre')

@section('content')
<div class="max-w-2xl pt-2">
    <a href="{{ route('admin.team.index') }}" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 mb-4"><i class="fas fa-arrow-left"></i> Retour à l'équipe</a>

    <form method="POST" action="{{ $member->id ? route('admin.team.update', $member) : route('admin.team.store') }}" enctype="multipart/form-data">
        @csrf @if($member->id) @method('PUT') @endif
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div class="flex flex-col sm:flex-row gap-4 items-start">
                <div class="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 flex items-center justify-center">
                    @if($member->photo)
                        <img src="{{ Storage::url($member->photo) }}" class="w-full h-full object-cover" />
                    @else
                        <img src="https://cdn.vectorstock.com/i/1000v/38/71/avatar-man-in-modern-flat-design-vector-15133871.jpg" class="w-full h-full object-cover" />
                    @endif
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                    <input type="file" name="photo" accept="image/*" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                    <p class="text-xs text-gray-400 mt-1">Photo carrée conseillée. Laisser vide pour conserver l'actuelle.</p>
                </div>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                    <input type="text" name="nom" value="{{ old('nom', $member->nom) }}" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Fonction / rôle</label>
                    <input type="text" name="role" value="{{ old('role', $member->role) }}" placeholder="Directeur Général…" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email (facultatif)</label>
                    <input type="email" name="email" value="{{ old('email', $member->email) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn (URL, facultatif)</label>
                    <input type="text" name="linkedin" value="{{ old('linkedin', $member->linkedin) }}" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ordre d'affichage</label>
                    <input type="number" name="ordre" value="{{ old('ordre', $member->ordre ?? 0) }}" min="0" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description / Biographie (s'affiche au survol)</label>
                <textarea name="description" rows="4" placeholder="Doté d'une maîtrise des enjeux liés..." class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">{{ old('description', $member->description) }}</textarea>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="actif" value="1" {{ old('actif', $member->actif ?? true) ? 'checked' : '' }} style="accent-color:#F97316;" />
                <span class="text-sm font-medium text-gray-700">Membre visible</span>
            </label>
        </div>
        <div class="flex gap-3 mt-5">
            <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600"><i class="fas fa-save mr-2"></i>{{ $member->id ? 'Enregistrer' : 'Ajouter' }}</button>
            <a href="{{ route('admin.team.index') }}" class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Annuler</a>
        </div>
    </form>
</div>
@endsection
