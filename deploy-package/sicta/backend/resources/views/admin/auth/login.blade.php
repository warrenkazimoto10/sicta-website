<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion — SICTA Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center bg-white rounded-2xl px-6 py-4 mx-auto mb-5 shadow-lg">
                <img src="{{ asset('logo-sicta.png') }}" alt="SICTA" class="h-12 w-auto" />
            </div>
            <h1 class="text-white text-2xl font-bold">Backoffice</h1>
            <p class="text-gray-400 mt-1">Accès administrateur SICTA</p>
        </div>

        <div class="bg-white rounded-2xl shadow-2xl p-8">
            <form method="POST" action="{{ route('admin.login.post') }}">
                @csrf
                <div class="space-y-5">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" value="{{ old('email') }}" required
                            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none @error('email') border-red-400 @enderror"
                            placeholder="admin@sicta.ci" />
                        @error('email')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <input type="password" name="password" required
                            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            placeholder="••••••••" />
                    </div>

                    <div class="flex items-center gap-2">
                        <input type="checkbox" name="remember" id="remember" class="rounded">
                        <label for="remember" class="text-sm text-gray-600">Se souvenir de moi</label>
                    </div>

                    <button type="submit"
                        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
