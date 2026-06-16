@extends('admin.layouts.app')
@section('title', $page === 'home' ? "Page d'accueil" : "Page À propos")
@section('page-title', $page === 'home' ? "Contenu — Page d'accueil" : "Contenu — Page À propos")

@section('content')
<div class="max-w-3xl pt-2">
    @if(session('success'))
    <div class="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
        <i class="fas fa-check-circle mr-2"></i>{{ session('success') }}
    </div>
    @endif

    <form method="POST" action="{{ route('admin.page-sections.update', $page) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div class="space-y-5">
            @foreach($fields as $field)
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    {{ $field['label'] }}
                    <span class="ml-2 text-xs font-normal text-gray-400 font-mono">{{ $field['key'] }}</span>
                </label>

                @php $val = $sections[$field['key']] ?? ''; @endphp

                @if($field['type'] === 'richtext')
                <textarea name="{{ $field['key'] }}" rows="5"
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-y font-mono">{{ $val }}</textarea>

                @elseif($field['type'] === 'json')
                <textarea name="{{ $field['key'] }}" rows="6"
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-y font-mono">{{ $val }}</textarea>
                <p class="text-xs text-gray-400 mt-1">Format JSON. Ex: <code>[{"label": "50+", "text": "ans d\'expérience"}]</code></p>

                @elseif($field['type'] === 'number')
                <input type="number" name="{{ $field['key'] }}" value="{{ $val }}"
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />

                @else
                <input type="text" name="{{ $field['key'] }}" value="{{ $val }}"
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Laisser vide pour utiliser la valeur par défaut" />
                @endif
            </div>
            @endforeach

            <div class="flex gap-3">
                <button type="submit"
                    class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                    <i class="fas fa-save mr-2"></i>Enregistrer
                </button>
                <a href="{{ route('admin.dashboard') }}"
                    class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
                    Annuler
                </a>
            </div>
        </div>
    </form>
</div>
@endsection
