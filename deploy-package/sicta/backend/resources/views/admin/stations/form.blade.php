@extends('admin.layouts.app')
@section('title', isset($station->id) ? 'Modifier station' : 'Nouvelle station')
@section('page-title', isset($station->id) ? 'Modifier la station' : 'Nouvelle station')

@section('content')
<div class="max-w-4xl pt-2">
    <form method="POST" action="{{ isset($station->id) ? route('admin.stations.update', $station) : route('admin.stations.store') }}">
        @csrf
        @if(isset($station->id)) @method('PUT') @endif

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
            <div class="grid md:grid-cols-2 gap-5">
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input type="text" name="nom" value="{{ old('nom', $station->nom) }}" required
                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Zone *</label>
                    <select name="zone" required class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                        <option value="abidjan" {{ old('zone', $station->zone) === 'abidjan' ? 'selected' : '' }}>Abidjan</option>
                        <option value="interieur" {{ old('zone', $station->zone) === 'interieur' ? 'selected' : '' }}>Intérieur du Pays</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                    <input type="text" name="ville" value="{{ old('ville', $station->ville) }}" required
                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                    <input type="text" name="telephone" value="{{ old('telephone', $station->telephone) }}" required
                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Horaires</label>
                    <textarea name="horaires" rows="3" placeholder="Lun-Ven: 7h30 - 17h00&#10;Dim: 8h00 - 13h00"
                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">{{ old('horaires', $station->horaires) }}</textarea>
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Lien Google Maps</label>
                    <input type="url" name="maps_url" value="{{ old('maps_url', $station->maps_url) }}"
                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Services disponibles</label>
                    @php
                        $existingServices = old('services_disponibles', is_array($station->services_disponibles) ? $station->services_disponibles : json_decode($station->services_disponibles ?? '[]', true) ?? []);
                        $dbServicesList = \App\Models\Service::pluck('nom')->toArray();
                        $servicesToShow = !empty($dbServicesList) ? $dbServicesList : ['Contrôle technique', 'CIVIO', 'IVN', 'Pesée', 'Jaugeage', 'PPAD', 'Station Mobile'];
                    @endphp
                    <div class="flex flex-wrap gap-3">
                        @foreach($servicesToShow as $service)
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="services_disponibles[]" value="{{ $service }}"
                                {{ in_array($service, $existingServices) ? 'checked' : '' }}
                                class="rounded" style="accent-color: #F97316;" />
                            <span class="text-sm text-gray-700">{{ $service }}</span>
                        </label>
                        @endforeach
                    </div>
                </div>
                <div class="md:col-span-2">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="actif" value="1" {{ old('actif', isset($station->id) ? $station->actif : true) ? 'checked' : '' }}
                            class="rounded" style="accent-color: #F97316;" />
                        <span class="text-sm font-medium text-gray-700">Station active</span>
                    </label>
                </div>
            </div>
        </div>

        <div class="flex gap-3 mt-5">
            <a href="{{ route('admin.stations.index') }}" class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Annuler</a>
            <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
                {{ isset($station->id) ? 'Mettre à jour' : 'Créer la station' }}
            </button>
        </div>
    </form>
</div>
@endsection
