@extends('admin.layouts.app')
@section('title', 'Réglages Généraux')
@section('page-title', 'Réglages Généraux')

@section('content')
<div class="max-w-3xl pt-2">
    @if(session('success'))
        <div class="mb-5 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
            <i class="fas fa-check-circle"></i>
            <span>{{ session('success') }}</span>
        </div>
    @endif

    <form method="POST" action="{{ route('admin.settings.update') }}">
        @csrf
        @method('PUT')

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div class="border-b border-gray-100 pb-4">
                <h3 class="font-bold text-gray-800 text-lg">Coordonnées de l'entreprise</h3>
                <p class="text-xs text-gray-400 mt-1">Ces informations s'affichent dans l'en-tête (Header), le pied de page (Footer) et la page de contact.</p>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone de contact *</label>
                    <input type="text" name="settings_phone" value="{{ old('settings_phone', $settings['settings_phone'] ?? '') }}" required 
                        placeholder="27 21 21 29 90"
                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Adresse E-mail de contact *</label>
                    <input type="email" name="settings_email" value="{{ old('settings_email', $settings['settings_email'] ?? '') }}" required 
                        placeholder="infos@sicta.ci"
                        class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Adresse physique (Siège Social) *</label>
                <textarea name="settings_address" rows="3" required placeholder="Rue Abli Mathieu, Zone 4C, Marcory..." 
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">{{ old('settings_address', $settings['settings_address'] ?? '') }}</textarea>
            </div>

            <div class="border-b border-gray-100 pt-4 pb-4">
                <h3 class="font-bold text-gray-800 text-lg">Réseaux Sociaux</h3>
                <p class="text-xs text-gray-400 mt-1">Liens affichés en bas de page pour rediriger les visiteurs vers vos comptes officiels.</p>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Lien Facebook</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">
                            <i class="fab fa-facebook"></i>
                        </span>
                        <input type="url" name="settings_facebook" value="{{ old('settings_facebook', $settings['settings_facebook'] ?? '') }}" 
                            placeholder="https://facebook.com/..."
                            class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Lien LinkedIn</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">
                            <i class="fab fa-linkedin"></i>
                        </span>
                        <input type="url" name="settings_linkedin" value="{{ old('settings_linkedin', $settings['settings_linkedin'] ?? '') }}" 
                            placeholder="https://linkedin.com/company/..."
                            class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Lien site web Mayelia PARTICIPATIONS</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">
                            <i class="fas fa-globe"></i>
                        </span>
                        <input type="url" name="settings_mayelia_url" value="{{ old('settings_mayelia_url', $settings['settings_mayelia_url'] ?? '') }}" 
                            placeholder="https://mayeliaparticipations.com"
                            class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                    <p class="text-xs text-gray-400 mt-1">Lien vers la maison mère affiché sur la Section 2 et le Footer.</p>
                </div>
            </div>
        </div>

        <div class="flex gap-3 mt-5">
            <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600">
                <i class="fas fa-save mr-2"></i>Enregistrer les modifications
            </button>
        </div>
    </form>
</div>
@endsection
