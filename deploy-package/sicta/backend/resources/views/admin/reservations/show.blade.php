@extends('admin.layouts.app')
@section('title', 'Réservation ' . $reservation->numero_reservation)
@section('page-title', 'Détail réservation')

@section('content')
<div class="max-w-2xl pt-2 space-y-5">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-5">
            <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">N° Réservation</p>
                <p class="text-2xl font-black font-mono text-orange-500">{{ $reservation->numero_reservation }}</p>
            </div>
            <span class="badge-status-{{ $reservation->statut }}">{{ str_replace('_', ' ', $reservation->statut) }}</span>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
            @php
            $infos = [
                'Client' => $reservation->prenom . ' ' . $reservation->nom,
                'Téléphone' => $reservation->telephone,
                'Station' => $reservation->station ? $reservation->station->nom : 'N/A',
                'Immatriculation' => $reservation->immatriculation,
                'Catégorie' => $reservation->categorie_vehicule,
                'Puissance' => $reservation->puissance_cv ?? 'N/A',
                'Date RDV' => $reservation->date_rdv ? $reservation->date_rdv->format('d/m/Y') : '',
                'Heure RDV' => $reservation->heure_rdv,
                'Créé le' => $reservation->created_at->format('d/m/Y H:i'),
            ];
            @endphp
            @foreach($infos as $label => $value)
            <div>
                <p class="text-gray-400 text-xs uppercase tracking-wider">{{ $label }}</p>
                <p class="font-medium text-gray-800 mt-0.5">{{ $value }}</p>
            </div>
            @endforeach
        </div>

        @if($reservation->note_interne)
        <div class="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p class="text-xs text-yellow-600 font-semibold uppercase tracking-wider mb-1">Note interne</p>
            <p class="text-sm text-yellow-800">{{ $reservation->note_interne }}</p>
        </div>
        @endif
    </div>

    <!-- Changer statut -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-800 mb-4">Mettre à jour</h3>
        <form method="POST" action="{{ route('admin.reservations.statut', $reservation) }}" class="space-y-4">
            @csrf @method('PATCH')
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select name="statut" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                    @foreach(['en_attente' => 'En attente', 'confirmee' => 'Confirmée', 'annulee' => 'Annulée', 'realisee' => 'Réalisée'] as $v => $l)
                    <option value="{{ $v }}" {{ $reservation->statut === $v ? 'selected' : '' }}>{{ $l }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Note interne</label>
                <textarea name="note_interne" rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">{{ $reservation->note_interne }}</textarea>
            </div>
            <button type="submit" class="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">Enregistrer</button>
        </form>
    </div>

    <a href="{{ route('admin.reservations.index') }}" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
        <i class="fas fa-arrow-left"></i> Retour à la liste
    </a>
</div>
@endsection
