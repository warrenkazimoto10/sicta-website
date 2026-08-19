<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'SICTA Admin') — Backoffice</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: { DEFAULT: '#F97316', dark: '#ea580c', light: '#fed7aa' }
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <style>
        .sidebar-link { display: flex; align-items: center; gap: 0.75rem; padding: 0.625rem 1rem; border-radius: 0.5rem; color: #d1d5db; font-size: 0.875rem; transition: all 0.15s; }
        .sidebar-link:hover { background: rgba(255,255,255,0.1); color: white; }
        .sidebar-link.active { background: #F97316; color: white; }
        .badge-status-en_attente { background: #fef9c3; color: #854d0e; padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .badge-status-confirmee { background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .badge-status-annulee { background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
        .badge-status-realisee { background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
    </style>
</head>
<body class="bg-gray-50 font-sans">
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-900 flex flex-col flex-shrink-0 overflow-y-auto">
            <!-- Logo -->
            <div class="p-6 border-b border-white/10">
                <div class="flex items-center gap-3">
                    <div class="bg-white rounded-lg px-2.5 py-1.5 flex items-center justify-center">
                        <img src="{{ asset('logo-sicta.png') }}" alt="SICTA" class="h-7 w-auto" />
                    </div>
                    <div>
                        <div class="text-white font-bold text-sm">SICTA</div>
                        <div class="text-gray-400 text-xs">Backoffice Admin</div>
                    </div>
                </div>
            </div>

            <!-- Nav -->
            <nav class="flex-1 px-3 py-4 space-y-1">
                <a href="{{ route('admin.dashboard') }}" class="sidebar-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-chart-pie w-4"></i> Dashboard
                </a>

                <div class="pt-3 pb-1">
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider px-4">Site public</p>
                </div>
                <a href="{{ route('admin.slides.index') }}" class="sidebar-link {{ request()->routeIs('admin.slides.*') ? 'active' : '' }}">
                    <i class="fas fa-images w-4"></i> Slider accueil
                </a>
                <a href="{{ route('admin.services.index') }}" class="sidebar-link {{ request()->routeIs('admin.services.*') ? 'active' : '' }}">
                    <i class="fas fa-briefcase w-4"></i> Services
                </a>
                <a href="{{ route('admin.stations.index') }}" class="sidebar-link {{ request()->routeIs('admin.stations.*') ? 'active' : '' }}">
                    <i class="fas fa-map-marker-alt w-4"></i> Réseau / Stations
                </a>
                <a href="{{ route('admin.reseau-carte.index') }}" class="sidebar-link {{ request()->routeIs('admin.reseau-carte.*') ? 'active' : '' }}">
                    <i class="fas fa-map-location-dot w-4"></i> Carte du réseau
                </a>
                <a href="{{ route('admin.articles.index') }}" class="sidebar-link {{ request()->routeIs('admin.articles.*') ? 'active' : '' }}">
                    <i class="fas fa-newspaper w-4"></i> Actualités
                </a>
                <a href="{{ route('admin.categories.index') }}" class="sidebar-link {{ request()->routeIs('admin.categories.*') ? 'active' : '' }}">
                    <i class="fas fa-tags w-4"></i> Catégories
                </a>
                <a href="{{ route('admin.galerie.index') }}" class="sidebar-link {{ request()->routeIs('admin.galerie.*') ? 'active' : '' }}">
                    <i class="fas fa-photo-film w-4"></i> Galerie
                </a>

                <div class="pt-3 pb-1">
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider px-4">Contenu</p>
                </div>
                <a href="{{ route('admin.page-sections.home') }}" class="sidebar-link {{ request()->routeIs('admin.page-sections.home') ? 'active' : '' }}">
                    <i class="fas fa-home w-4"></i> Page d'accueil
                </a>
                <a href="{{ route('admin.page-sections.about') }}" class="sidebar-link {{ request()->routeIs('admin.page-sections.about') ? 'active' : '' }}">
                    <i class="fas fa-info-circle w-4"></i> À propos
                </a>
                <a href="{{ route('admin.history.index') }}" class="sidebar-link {{ request()->routeIs('admin.history.*') ? 'active' : '' }}">
                    <i class="fas fa-timeline w-4"></i> Histoire
                </a>
                <a href="{{ route('admin.team.index') }}" class="sidebar-link {{ request()->routeIs('admin.team.*') ? 'active' : '' }}">
                    <i class="fas fa-users-gear w-4"></i> Équipe
                </a>

                <div class="pt-3 pb-1">
                    <p class="text-gray-500 text-xs font-semibold uppercase tracking-wider px-4">Gestion</p>
                </div>
                <a href="{{ route('admin.reservations.index') }}" class="sidebar-link {{ request()->routeIs('admin.reservations.*') ? 'active' : '' }}">
                    <i class="fas fa-calendar-check w-4"></i> Réservations
                </a>
                <a href="{{ route('admin.messages.index') }}" class="sidebar-link {{ request()->routeIs('admin.messages.*') ? 'active' : '' }}">
                    <i class="fas fa-envelope w-4"></i> Messages
                    @php $non_lus_count = \App\Models\MessageContact::where('lu', false)->count(); @endphp
                    @if($non_lus_count > 0)
                        <span class="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{{ $non_lus_count }}</span>
                    @endif
                </a>
            </nav>

            <!-- User -->
            <div class="p-4 border-t border-white/10">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-orange-400 text-xs"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="text-white text-sm font-medium truncate">{{ auth()->user()->name }}</div>
                        <div class="text-gray-400 text-xs truncate">{{ auth()->user()->role }}</div>
                    </div>
                    <form method="POST" action="{{ route('admin.logout') }}">
                        @csrf
                        <button type="submit" class="text-gray-400 hover:text-white transition-colors" title="Déconnexion">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </form>
                </div>
            </div>
        </aside>

        <!-- Main -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top bar -->
            <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <h1 class="text-xl font-bold text-gray-800">@yield('page-title', 'Dashboard')</h1>
                <div class="text-sm text-gray-500">
                    <i class="fas fa-clock mr-1"></i> {{ now()->format('d/m/Y H:i') }}
                </div>
            </header>

            <!-- Alerts flash -->
            <div class="px-6 pt-4">
                @if(session('success'))
                    <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
                        <i class="fas fa-check-circle"></i>
                        {{ session('success') }}
                    </div>
                @endif
                @if(session('error'))
                    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
                        <i class="fas fa-exclamation-circle"></i>
                        {{ session('error') }}
                    </div>
                @endif
                @if($errors->any())
                    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        <ul class="list-disc list-inside text-sm">
                            @foreach($errors->all() as $error) <li>{{ $error }}</li> @endforeach
                        </ul>
                    </div>
                @endif
            </div>

            <!-- Content -->
            <main class="flex-1 overflow-y-auto px-6 pb-6">
                @yield('content')
            </main>
        </div>
    </div>

    {{-- Icônes disponibles (partagées par tous les sélecteurs d'icônes) --}}
    @php
        $iconsForJs = collect(\App\Models\Service::ICON_CHOICES)
            ->map(fn($v, $k) => ['name' => $k, 'fa' => $v['fa'], 'label' => $v['label']])
            ->values();
    @endphp
    <script>
        window.SICTA_ICONS = @json($iconsForJs);
        window.iconFa = (name) => (window.SICTA_ICONS.find(i => i.name === name) || {}).fa || 'fa-icons';
        window.iconLabel = (name) => (window.SICTA_ICONS.find(i => i.name === name) || {}).label || '';
        function iconPicker(initial) {
            return {
                value: initial || '',
                open: false,
                icons: window.SICTA_ICONS,
                faOf(n) { return window.iconFa(n); },
                labelOf(n) { return window.iconLabel(n); },
            };
        }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <style>[x-cloak]{display:none!important}</style>
    @stack('scripts')
</body>
</html>
