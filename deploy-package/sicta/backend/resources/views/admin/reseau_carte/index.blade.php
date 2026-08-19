@extends('admin.layouts.app')
@section('title', 'Carte du réseau')
@section('page-title', 'Carte du réseau — placement des points')

@section('content')
@if(!$imageUrl)
    {{-- ── Aucune carte : upload ── --}}
    <div class="max-w-xl pt-2">
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div class="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-map-location-dot text-2xl"></i>
            </div>
            <h2 class="text-lg font-bold text-gray-800">Importez votre carte</h2>
            <p class="text-sm text-gray-500 mt-1 mb-6">Une image de la Côte d'Ivoire <strong>sans les points</strong>. Vous placerez ensuite chaque ville et station dessus.</p>
            <form method="POST" action="{{ route('admin.reseau-carte.image') }}" enctype="multipart/form-data">
                @csrf
                <input type="file" name="image" accept="image/*" required
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer mb-4" />
                <button type="submit" class="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600">
                    <i class="fas fa-upload mr-2"></i>Importer la carte
                </button>
            </form>
        </div>
    </div>
@else
    {{-- ── Éditeur ── --}}
    <div class="pt-2" x-data="mapEditor({{ Illuminate\Support\Js::from($points) }}, {{ Illuminate\Support\Js::from($villes) }}, {{ Illuminate\Support\Js::from($stations) }})"
         @pointerup.window="endDrag()" @pointermove.window="onMove($event)" @keydown.window="onKey($event)">

        <div class="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <p class="text-sm text-gray-500 max-w-2xl">
                Ajoutez une <strong>ville</strong> (survol public → toutes ses stations) ou une <strong>station</strong> précise, puis <strong>cliquez sur la carte</strong> pour la placer.
                Chaque point a une icône et une taille. Faites glisser pour déplacer, flèches pour ajuster.
            </p>
            <div class="flex items-center gap-3">
                <span class="text-xs text-gray-400" x-text="placed.length + ' point(s) placé(s)'"></span>
                <form method="POST" action="{{ route('admin.reseau-carte.save') }}" @submit="prepareSubmit()">
                    @csrf
                    <input type="hidden" name="points" :value="pointsJson" />
                    <button type="submit" class="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600">
                        <i class="fas fa-save mr-2"></i>Enregistrer la carte
                    </button>
                </form>
            </div>
        </div>

        <div class="grid xl:grid-cols-4 gap-5">
            {{-- Zone carte --}}
            <div class="xl:col-span-3">
                <div class="relative select-none rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white"
                     x-ref="map" @click="onMapClick($event)" :style="placingUid ? 'cursor: crosshair' : ''">
                    <img src="{{ $imageUrl }}" alt="Carte du réseau" class="w-full h-auto block pointer-events-none" draggable="false" />

                    {{-- Marqueurs placés --}}
                    <template x-for="p in placed" :key="p.uid">
                        <div class="absolute" :style="`left:${p.x}%; top:${p.y}%; transform:translate(-50%,-50%)`" :class="selectedUid === p.uid ? 'z-30' : 'z-10'">
                            <button type="button"
                                @pointerdown.prevent.stop="startDrag(p.uid, $event)" @click.stop="select(p.uid)"
                                :title="p.label || p.nom"
                                class="flex items-center justify-center leading-none transition-transform"
                                :class="selectedUid === p.uid ? 'scale-125 drop-shadow-lg' : 'hover:scale-110 drop-shadow'"
                                :style="`cursor:${draggingUid===p.uid ? 'grabbing':'grab'}`">
                                <img src="/iconeMap.png" alt="" draggable="false"
                                    class="object-contain pointer-events-none select-none"
                                    :style="`width:${px(p.taille)}px; height:${px(p.taille)}px`" />
                            </button>
                            <button type="button" x-show="selectedUid === p.uid" @click.stop="removePoint(p.uid)"
                                title="Supprimer ce point"
                                class="absolute -top-2 -right-3 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center shadow hover:bg-red-600">
                                <i class="fas fa-times"></i>
                            </button>
                            <span x-show="p.label || selectedUid === p.uid" x-cloak
                                class="absolute left-1/2 -translate-x-1/2 top-full mt-0.5 px-1.5 py-0.5 rounded bg-white/90 border border-gray-200 text-[10px] text-gray-700 whitespace-nowrap shadow-sm"
                                x-text="p.label || p.nom"></span>
                        </div>
                    </template>

                    {{-- Bandeau mode placement --}}
                    <div x-show="placingUid" x-cloak class="absolute top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg">
                        <i class="fas fa-crosshairs mr-1"></i> Cliquez sur la carte pour placer « <span x-text="placingName"></span> »
                        <button type="button" @click.stop="cancelPlacing()" class="ml-2 underline">annuler</button>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-5 mt-3 text-xs text-gray-500">
                    <span class="flex items-center gap-1.5"><img src="/iconeMap.png" class="w-6 h-6 object-contain" alt=""> Grand</span>
                    <span class="flex items-center gap-1.5"><img src="/iconeMap.png" class="w-4 h-4 object-contain" alt=""> Moyen</span>
                    <span class="flex items-center gap-1.5"><img src="/iconeMap.png" class="w-3 h-3 object-contain" alt=""> Petit</span>
                    <span class="text-gray-400">— l'emblème SICTA marque chaque point ; la taille est réglable.</span>
                </div>
            </div>

            {{-- Colonne latérale --}}
            <div class="space-y-4">
                {{-- Point sélectionné --}}
                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4" x-show="selected" x-cloak>
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="text-sm font-bold text-gray-800">Point sélectionné</h3>
                        <button type="button" @click="removePoint(selectedUid)" class="text-xs text-red-500 hover:text-red-700"><i class="fas fa-trash mr-1"></i>Retirer</button>
                    </div>
                    <p class="text-sm font-medium text-gray-700 truncate" x-text="selected?.nom"></p>
                    <p class="text-xs text-gray-400 mb-3" x-text="selected?.sous"></p>

                    {{-- Nom affiché --}}
                    <label class="text-xs text-gray-500">Nom affiché</label>
                    <input type="text" :value="selected?.label ?? ''" @input="selected.label = $event.target.value" :placeholder="selected?.nom"
                        class="w-full mt-1 mb-3 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />

                    {{-- Taille --}}
                    <label class="text-xs text-gray-500">Taille</label>
                    <div class="grid grid-cols-3 gap-1.5 mt-1 mb-3">
                        <template x-for="t in ['grand','moyen','petit']" :key="t">
                            <button type="button" @click="selected.taille = t"
                                :class="selected?.taille === t ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-500 border-gray-200 hover:border-orange-300'"
                                class="py-1.5 rounded-lg border text-xs capitalize" x-text="t"></button>
                        </template>
                    </div>

                    {{-- Coordonnées --}}
                    <div class="grid grid-cols-2 gap-2">
                        <label class="text-xs text-gray-500">X (%)
                            <input type="number" step="0.1" min="0" max="100" :value="selected ? selected.x?.toFixed(2) : ''" @input="setCoord('x', $event.target.value)"
                                class="w-full mt-1 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                        </label>
                        <label class="text-xs text-gray-500">Y (%)
                            <input type="number" step="0.1" min="0" max="100" :value="selected ? selected.y?.toFixed(2) : ''" @input="setCoord('y', $event.target.value)"
                                class="w-full mt-1 px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                        </label>
                    </div>
                    <p class="text-[11px] text-gray-400 mt-2">Flèches = ±0,1 % · Maj = ±0,5 % · Suppr = retirer</p>
                </div>

                {{-- Ajouter des points --}}
                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4" x-data="{ tab: 'ville' }">
                    <div class="flex gap-1 p-1 bg-gray-100 rounded-lg mb-3">
                        <button type="button" @click="tab='ville'" :class="tab==='ville' ? 'bg-white shadow text-orange-600' : 'text-gray-500'" class="flex-1 py-1.5 rounded-md text-sm font-medium">Villes</button>
                        <button type="button" @click="tab='station'" :class="tab==='station' ? 'bg-white shadow text-orange-600' : 'text-gray-500'" class="flex-1 py-1.5 rounded-md text-sm font-medium">Stations</button>
                    </div>

                    {{-- Recherche --}}
                    <div class="relative mb-2">
                        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
                        <input type="text" x-model="search" placeholder="Rechercher…"
                            class="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>

                    {{-- Liste villes --}}
                    <div x-show="tab==='ville'" class="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                        <template x-for="v in filteredVilles" :key="v.ville">
                            <button type="button" @click="addVille(v)"
                                class="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50/40 text-left text-sm text-gray-600">
                                <i class="fas fa-location-dot text-orange-400"></i>
                                <span class="truncate flex-1" x-text="v.ville"></span>
                                <span class="text-xs text-gray-300" x-text="v.nb + ' stn'"></span>
                            </button>
                        </template>
                        <p class="text-center text-xs text-gray-300 py-6" x-show="filteredVilles.length === 0">Aucune ville à ajouter.</p>
                    </div>

                    {{-- Liste stations --}}
                    <div x-show="tab==='station'" x-cloak class="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                        <template x-for="s in filteredStations" :key="s.id">
                            <button type="button" @click="addStation(s)"
                                class="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50/40 text-left text-sm text-gray-600">
                                <i class="fas" :class="s.type === 'mobile' ? 'fa-location-arrow text-slate-400' : 'fa-building text-orange-300'"></i>
                                <span class="truncate flex-1" x-text="s.nom"></span>
                                <span class="text-xs text-gray-300" x-text="s.ville"></span>
                            </button>
                        </template>
                        <p class="text-center text-xs text-gray-300 py-6" x-show="filteredStations.length === 0">Aucune station à ajouter.</p>
                    </div>
                </div>

                {{-- Remplacer la carte --}}
                <form method="POST" action="{{ route('admin.reseau-carte.image') }}" enctype="multipart/form-data" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    @csrf
                    <h3 class="text-sm font-bold text-gray-800 mb-2">Remplacer la carte</h3>
                    <input type="file" name="image" accept="image/*" required
                        class="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-600 mb-2" />
                    <button type="submit" class="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Mettre à jour l'image</button>
                </form>
            </div>
        </div>
    </div>

    @push('scripts')
    <script>
    function mapEditor(initialPoints, villes, stations) {
        let uid = 0;
        const points = (initialPoints || []).map(p => ({
            uid: ++uid,
            type: p.type,
            ville: p.ville,
            station_id: p.station_id,
            stype: p.sous === 'Banc mobile' ? 'mobile' : (p.type === 'station' ? 'fixe' : null),
            nom: p.nom,
            sous: p.sous,
            label: p.label || '',
            icone: p.icone || 'MapPin',
            taille: p.taille || 'moyen',
            x: p.x, y: p.y,
        }));

        return {
            points,
            villes: villes || [],
            stations: stations || [],
            search: '',
            selectedUid: null,
            draggingUid: null,
            placingUid: null,
            pointsJson: '[]',

            get placed() { return this.points.filter(p => p.x !== null && p.y !== null); },
            get selected() { return this.points.find(p => p.uid === this.selectedUid) || null; },
            get placingName() { const p = this.points.find(p => p.uid === this.placingUid); return p ? (p.label || p.nom) : ''; },
            get placedVilles() { return this.points.filter(p => p.type === 'ville').map(p => p.ville); },
            get placedStationIds() { return this.points.filter(p => p.type === 'station').map(p => p.station_id); },
            get filteredVilles() {
                const q = this.search.trim().toLowerCase();
                return this.villes.filter(v => !this.placedVilles.includes(v.ville) && (!q || v.ville.toLowerCase().includes(q)));
            },
            get filteredStations() {
                const q = this.search.trim().toLowerCase();
                return this.stations.filter(s => !this.placedStationIds.includes(s.id) && (!q || s.nom.toLowerCase().includes(q) || (s.ville || '').toLowerCase().includes(q)));
            },

            color(p) { return p.type === 'ville' ? '#E87722' : (p.stype === 'mobile' ? '#94a3b8' : '#F5A867'); },
            px(t) { return t === 'grand' ? 36 : (t === 'petit' ? 18 : 26); },

            addVille(v) {
                const p = { uid: ++uid, type: 'ville', ville: v.ville, station_id: null, stype: null, nom: v.ville, sous: 'Ville', label: '', icone: 'SICTA', taille: 'moyen', x: null, y: null };
                this.points.push(p); this.startPlacing(p.uid);
            },
            addStation(s) {
                const p = { uid: ++uid, type: 'station', ville: s.ville, station_id: s.id, stype: s.type === 'mobile' ? 'mobile' : 'fixe', nom: s.nom, sous: s.type === 'mobile' ? 'Banc mobile' : 'Station fixe', label: '', icone: s.type === 'mobile' ? 'Navigation' : 'Building2', taille: 'moyen', x: null, y: null };
                this.points.push(p); this.startPlacing(p.uid);
            },
            startPlacing(u) { this.placingUid = u; this.selectedUid = u; },
            cancelPlacing() {
                if (!this.placingUid) return;
                this.points = this.points.filter(p => p.uid !== this.placingUid || (p.x !== null));
                this.placingUid = null;
            },

            _coords(e) {
                const r = this.$refs.map.getBoundingClientRect();
                let x = ((e.clientX - r.left) / r.width) * 100;
                let y = ((e.clientY - r.top) / r.height) * 100;
                x = Math.round(Math.max(0, Math.min(100, x)) * 1000) / 1000;
                y = Math.round(Math.max(0, Math.min(100, y)) * 1000) / 1000;
                return { x, y };
            },
            onMapClick(e) {
                if (!this.placingUid) return;
                const { x, y } = this._coords(e);
                const p = this.points.find(p => p.uid === this.placingUid);
                if (p) { p.x = x; p.y = y; this.selectedUid = p.uid; }
                this.placingUid = null;
            },
            startDrag(u, e) { this.draggingUid = u; this.selectedUid = u; e.target.setPointerCapture?.(e.pointerId); },
            onMove(e) {
                if (this.draggingUid === null) return;
                const { x, y } = this._coords(e);
                const p = this.points.find(p => p.uid === this.draggingUid);
                if (p) { p.x = x; p.y = y; }
            },
            endDrag() { this.draggingUid = null; },
            select(u) { this.selectedUid = u; },
            setCoord(axis, val) { const s = this.selected; if (!s) return; let v = parseFloat(val); if (isNaN(v)) return; s[axis] = Math.round(Math.max(0, Math.min(100, v)) * 1000) / 1000; },
            nudge(dx, dy) { const s = this.selected; if (!s || s.x === null) return; s.x = Math.round(Math.max(0, Math.min(100, s.x + dx)) * 1000) / 1000; s.y = Math.round(Math.max(0, Math.min(100, s.y + dy)) * 1000) / 1000; },
            onKey(e) {
                if (!this.selectedUid) return;
                const tag = (e.target.tagName || '').toLowerCase();
                if ((e.key === 'Delete' || e.key === 'Backspace') && tag !== 'input') { e.preventDefault(); this.removePoint(this.selectedUid); return; }
                if (tag === 'input') return;
                const step = e.shiftKey ? 0.5 : 0.1;
                const m = { ArrowUp: [0, -step], ArrowDown: [0, step], ArrowLeft: [-step, 0], ArrowRight: [step, 0] };
                if (m[e.key]) { e.preventDefault(); this.nudge(m[e.key][0], m[e.key][1]); }
            },
            removePoint(u) {
                this.points = this.points.filter(p => p.uid !== u);
                if (this.selectedUid === u) this.selectedUid = null;
                if (this.placingUid === u) this.placingUid = null;
            },
            prepareSubmit() {
                this.pointsJson = JSON.stringify(this.placed.map(p => ({
                    type: p.type, ville: p.ville, station_id: p.station_id,
                    label: (p.label || '').trim(), icone: p.icone, taille: p.taille,
                    x: p.x, y: p.y,
                })));
            },
        };
    }
    </script>
    @endpush
@endif
@endsection
