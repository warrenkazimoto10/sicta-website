@extends('admin.layouts.app')
@section('title', 'Message de ' . $message->nom_complet)
@section('page-title', 'Message contact')

@section('content')
<div class="max-w-xl pt-2 space-y-5">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div class="grid grid-cols-2 gap-4 text-sm">
            @foreach(['Nom' => $message->nom_complet, 'Email' => $message->email, 'Téléphone' => $message->telephone, 'Sujet' => $message->sujet, 'Date' => $message->created_at->format('d/m/Y H:i')] as $l => $v)
            <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">{{ $l }}</p>
                <p class="font-medium text-gray-800 mt-0.5">{{ $v }}</p>
            </div>
            @endforeach
        </div>
        <div>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">Message</p>
            <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">{{ $message->message }}</div>
        </div>
        <div class="flex gap-3 pt-2">
            <a href="mailto:{{ $message->email }}?subject=Re: {{ rawurlencode($message->sujet) }}"
                class="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center gap-2">
                <i class="fas fa-reply"></i> Répondre par email
            </a>
            <a href="{{ route('admin.messages.index') }}" class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
                Retour
            </a>
        </div>
    </div>
</div>
@endsection
