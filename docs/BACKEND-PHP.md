# Backend PHP – Architecture & Notes

## Architecture générale

- **Framework** : maison (routing minimaliste dans `api/index.php`)
- **Pattern** : MVC léger
- **Base de données** : MySQL (`sicta_bd`)
- **Authentification** : JWT (access + refresh)
- **Gestion d\'erreurs** : `ErrorHandler` convertit les exceptions en JSON

## Flux d\'une requête

1. `api/index.php` charge l\'autoloader, configure CORS et l\'ErrorHandler
2. Le routeur associe la méthode + le chemin à un contrôleur
3. Le contrôleur utilise les middlewares (`AuthMiddleware`) et les services
4. Les modèles accèdent à MySQL via PDO (`Database`)
5. Les réponses sont renvoyées avec `Response::success` ou `Response::error`

## Modules principaux

- **Auth** : connexion, rafraîchissement, profil
- **Vehicles** : CRUD + import CSV
- **Alerts** : lecture, paramètres
- **Requests** : création, commentaires, annulation
- **Notifications** : compteur, statut lu
- **Reports** : stubs pour export (à implémenter)

## Sécurité

- Vérification des tokens JWT sur toutes les routes (sauf `/auth/*` publiques)
- Hashage `bcrypt` des mots de passe (validation login)
- Anti injection SQL via requêtes préparées PDO

## À faire

- Implémenter la gestion réelle des refresh tokens (révocation)
- Finaliser les exports PDF/Excel/CSV
- Ajouter des tests automatisés (PHPUnit)
- Intégrer un système d\'e-mails pour `forgot-password`
