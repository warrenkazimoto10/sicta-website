{{-- Sélecteur d'icônes visuel réutilisable.
     Params : $name (nom du champ), $value (valeur actuelle) --}}
<div x-data="iconPicker(@js($value ?? ''))" class="relative">
    <input type="hidden" name="{{ $name }}" :value="value" />
    <button type="button" @click="open = !open"
        class="w-full flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white hover:border-orange-300 focus:ring-2 focus:ring-orange-500 outline-none">
        <span class="flex items-center gap-2 text-gray-700">
            <span class="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <i class="fas" :class="faOf(value)"></i>
            </span>
            <span x-text="value ? labelOf(value) : 'Choisir une icône…'" :class="value ? '' : 'text-gray-400'"></span>
        </span>
        <i class="fas fa-chevron-down text-gray-300 text-xs"></i>
    </button>

    <div x-show="open" x-cloak @click.outside="open = false"
        class="absolute z-40 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 p-3 max-h-72 overflow-y-auto">
        <div class="grid grid-cols-6 gap-2">
            <template x-for="ic in icons" :key="ic.name">
                <button type="button" @click="value = ic.name; open = false"
                    :title="ic.label"
                    :class="value === ic.name ? 'bg-orange-500 text-white ring-2 ring-orange-300' : 'bg-gray-50 text-gray-500 hover:bg-orange-50 hover:text-orange-600'"
                    class="aspect-square rounded-lg flex items-center justify-center transition-colors">
                    <i class="fas" :class="ic.fa"></i>
                </button>
            </template>
        </div>
        <button type="button" @click="value = ''; open = false" class="mt-2 w-full text-xs text-gray-400 hover:text-gray-600 py-1">Aucune icône</button>
    </div>
</div>
