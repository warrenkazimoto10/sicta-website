@extends('admin.layouts.app')
@section('title', 'Messages contact')
@section('page-title', 'Messages contact')

@section('content')
<div class="space-y-4 pt-2">
    @if($non_lus > 0)
    <div class="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-lg flex items-center gap-2">
        <i class="fas fa-envelope"></i>
        <span class="font-medium">{{ $non_lus }} message(s) non lu(s)</span>
    </div>
    @endif

    <form method="GET" class="flex flex-wrap gap-3">
        <input type="text" name="search" value="{{ request('search') }}" placeholder="Nom, email, sujet…"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none flex-1 min-w-48" />
        <select name="lu" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none">
            <option value="">Tous</option>
            <option value="0" {{ request('lu') === '0' ? 'selected' : '' }}>Non lus</option>
            <option value="1" {{ request('lu') === '1' ? 'selected' : '' }}>Lus</option>
        </select>
        <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700">Filtrer</button>
    </form>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                    <th class="px-4 py-3 text-left w-2"></th>
                    <th class="px-4 py-3 text-left">Nom</th>
                    <th class="px-4 py-3 text-left">Email</th>
                    <th class="px-4 py-3 text-left">Sujet</th>
                    <th class="px-4 py-3 text-left">Date</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                @forelse($messages as $m)
                <tr class="hover:bg-gray-50/50 {{ !$m->lu ? 'font-semibold' : '' }}" style="{{ !$m->lu ? 'background:rgba(251,146,60,0.05);' : '' }}">
                    <td class="px-4 py-3">
                        <div class="w-2 h-2 rounded-full {{ !$m->lu ? 'bg-orange-400' : 'bg-gray-200' }}"></div>
                    </td>
                    <td class="px-4 py-3">
                        <div class="text-gray-800">{{ $m->nom_complet }}</div>
                        <div class="text-xs text-gray-500">{{ $m->telephone }}</div>
                    </td>
                    <td class="px-4 py-3 text-gray-600">{{ $m->email }}</td>
                    <td class="px-4 py-3 text-gray-700" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ $m->sujet }}</td>
                    <td class="px-4 py-3 text-gray-400 text-xs">{{ $m->created_at->format('d/m/Y H:i') }}</td>
                    <td class="px-4 py-3 text-right">
                        <div class="flex items-center justify-end gap-2">
                            <a href="{{ route('admin.messages.show', $m) }}" class="text-blue-500 hover:text-blue-700 p-1.5 rounded hover:bg-blue-50">
                                <i class="fas fa-eye text-xs"></i>
                            </a>
                            <form method="POST" action="{{ route('admin.messages.toggle-lu', $m) }}">
                                @csrf @method('PATCH')
                                <button type="submit" class="text-gray-400 hover:text-gray-600 p-1.5 rounded hover:bg-gray-50" title="{{ $m->lu ? 'Marquer non lu' : 'Marquer lu' }}">
                                    <i class="fas {{ $m->lu ? 'fa-envelope' : 'fa-envelope-open' }} text-xs"></i>
                                </button>
                            </form>
                            <form method="POST" action="{{ route('admin.messages.destroy', $m) }}" onsubmit="return confirm('Supprimer ce message ?')">
                                @csrf @method('DELETE')
                                <button type="submit" class="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50">
                                    <i class="fas fa-trash text-xs"></i>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @empty
                <tr><td colspan="6" class="px-4 py-10 text-center text-gray-400">Aucun message.</td></tr>
                @endforelse
            </tbody>
        </table>
        <div class="p-4 border-t border-gray-100">{{ $messages->links() }}</div>
    </div>
</div>
@endsection
