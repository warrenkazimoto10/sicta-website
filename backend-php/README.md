# Backend PHP – Espace PRO SICTA

Backend RESTful en PHP 8 pour connecter le frontend React à la base de données MySQL `sicta_bd`.

## Prérequis

- PHP 8.1 ou supérieur avec extensions `pdo_mysql`, `openssl`
- Composer 2+
- MySQL 8+
- Apache ou Nginx (pour la production)

## Installation

```bash
cd backend-php
composer install
cp .env.example .env
```

Modifiez ensuite le fichier `.env` avec vos informations MySQL et vos clés JWT.

## Démarrage (développement)

```bash
composer start
```

Le serveur démarre sur `http://localhost:3001` et expose les routes sous `/auth`, `/vehicles`, `/alerts`, `/requests`, `/notifications`, `/reports`.

## Tests

```bash
composer test
```

## Structure principale

```
api/            # Point d'entrée de l'API (index.php, .htaccess)
src/
  Config/       # Configuration (connexion DB, CORS, ...)
  Controllers/  # Contrôleurs REST
  Middleware/   # AuthMiddleware, ErrorHandler
  Models/       # Accès base de données
  Services/     # Logique métier (JWT, Auth, ...)
  Utils/        # Réponses JSON, Logger
storage/logs/   # Fichiers journaux
```

## Variables d'environnement

| Clé | Description |
| --- | ----------- |
| DB_HOST | Hôte MySQL |
| DB_PORT | Port MySQL |
| DB_NAME | Nom de la base de données |
| DB_USER | Utilisateur MySQL |
| DB_PASSWORD | Mot de passe MySQL |
| JWT_SECRET | Clé secrète pour tokens d'accès |
| JWT_REFRESH_SECRET | Clé secrète pour tokens de rafraîchissement |
| JWT_EXPIRES_IN | Durée de vie (secondes) du token d'accès |
| JWT_REFRESH_EXPIRES_IN | Durée de vie (secondes) du token de rafraîchissement |
| CORS_ALLOWED_ORIGINS | Origines autorisées (séparées par des virgules) |

## Notes

- Le contrôleur `ReportsController` contient actuellement des stubs (`501 Not Implemented`).
- Les routes protégées exigent un header `Authorization: Bearer <token>`.
- Le middleware CORS peut être ajusté via les variables d'environnement.
