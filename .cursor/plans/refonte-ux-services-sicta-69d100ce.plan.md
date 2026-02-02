---
name: Plan Complet - Backend PHP pour Espace PRO SICTA
overview: ""
todos:
  - id: 9f22417e-0c1d-4848-8402-2b5dfe616ab8
    content: Créer la structure du projet backend-php avec dossiers et fichiers de base
    status: pending
  - id: 150b043a-43bf-467b-90da-d71df0c2bba6
    content: Configurer composer.json avec toutes les dépendances nécessaires
    status: pending
  - id: ef16da5b-6c10-4f22-a132-8becce6e069f
    content: Créer les fichiers de configuration (Database.php, Config.php, Cors.php)
    status: pending
  - id: 7e822b2f-99ac-4e44-973d-17e5259d72df
    content: Implémenter les Utils (Response.php, Logger.php)
    status: pending
  - id: 63bb571a-3a64-4310-ab01-b8601ec91ea3
    content: Créer JWTService.php et AuthService.php pour authentification
    status: pending
  - id: 8932c005-ceef-4eb6-8f6b-ab59f3bfb2b0
    content: Implémenter AuthMiddleware.php et ErrorHandler.php
    status: pending
  - id: 4858f086-e912-4359-99f3-cb094ed36a19
    content: Créer les Models (User.php, Company.php, Vehicle.php, Alert.php, Request.php, Notification.php)
    status: pending
  - id: 3f47ca6e-a744-48f8-b242-1293b6a94802
    content: Implémenter AuthController.php avec tous les endpoints authentification
    status: pending
  - id: 390c5c7a-946c-4786-a12a-b90bb6c226df
    content: Implémenter VehiclesController.php avec CRUD complet et import CSV
    status: pending
  - id: e5b18492-6cf6-4514-9eac-6ced3252bcff
    content: Implémenter AlertsController.php et RequestsController.php
    status: pending
  - id: a8786748-3c65-4d99-aace-d38b7e1d0b99
    content: Implémenter NotificationsController.php et ReportsController.php
    status: pending
  - id: c9a304bc-c6d6-4fe1-9b99-df0c92c4d47a
    content: Créer index.php avec routing et gestion CORS
    status: pending
  - id: 943244df-a637-4e8e-9fd7-abfb056b3387
    content: Créer .htaccess pour Apache et configuration serveur
    status: pending
  - id: a0c359e2-4908-48ba-8d3f-b90b9ab47a47
    content: Créer documentation complète (README.md, API.md) et collection Postman
    status: pending
  - id: ad1b62fe-960e-4be6-931a-096216b5d1c7
    content: Mettre à jour les services frontend pour utiliser les vraies API
    status: pending
isProject: false
---

# Plan Complet - Backend PHP pour Espace PRO SICTA

## Objectif

Créer un backend PHP moderne avec API REST pour connecter le frontend React à la base de données MySQL `sicta_bd`. Architecture MVC avec authentification JWT, validation des données, gestion d'erreurs et documentation complète.

---

## 1. STRUCTURE DU PROJET

### 1.1 Architecture MVC

```
backend-php/
├── api/
│   ├── index.php                 # Point d'entrée principal
│   ├── .htaccess                 # Rewrite rules Apache
│   └── public/                   # Fichiers publics (si nécessaire)
├── src/
│   ├── Config/
│   │   ├── Database.php          # Connexion MySQL
│   │   ├── Config.php            # Configuration générale
│   │   └── Cors.php              # Gestion CORS
│   ├── Controllers/
│   │   ├── AuthController.php
│   │   ├── VehiclesController.php
│   │   ├── AlertsController.php
│   │   ├── RequestsController.php
│   │   ├── NotificationsController.php
│   │   └── ReportsController.php
│   ├── Models/
│   │   ├── Company.php
│   │   ├── User.php
│   │   ├── Vehicle.php
│   │   ├── Alert.php
│   │   ├── Request.php
│   │   └── Notification.php
│   ├── Services/
│   │   ├── AuthService.php       # Logique métier authentification
│   │   ├── JWTService.php        # Génération/validation tokens JWT
│   │   └── ValidationService.php # Validation des données
│   ├── Middleware/
│   │   ├── AuthMiddleware.php    # Vérification JWT
│   │   └── ErrorHandler.php      # Gestion erreurs
│   └── Utils/
│       ├── Response.php           # Formatage réponses JSON
│       └── Logger.php             # Logging
├── vendor/                        # Dépendances Composer
├── .env                          # Variables d'environnement
├── .env.example                  # Exemple de configuration
├── composer.json                 # Dépendances PHP
├── composer.lock
└── README.md
```

---

## 2. CONFIGURATION ET DÉPENDANCES

### 2.1 Fichier composer.json

- **firebase/php-jwt** : Génération et validation de tokens JWT
- **vlucas/phpdotenv** : Gestion des variables d'environnement
- **monolog/monolog** : Logging avancé
- **respect/validation** : Validation des données

### 2.2 Configuration MySQL (.env)

- Variables d'environnement pour connexion DB
- Clés secrètes JWT
- Configuration CORS
- Paramètres serveur

### 2.3 Configuration Apache (.htaccess)

- Rewrite rules pour routing
- Headers CORS
- Gestion des erreurs

---

## 3. MODULES À IMPLÉMENTER

### 3.1 Authentification (AuthController)

**Endpoints:**

- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/refresh` - Rafraîchir le token
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/forgot-password` - Mot de passe oublié
- `GET /api/auth/me` - Informations utilisateur connecté

**Fonctionnalités:**

- Validation email/mot de passe
- Hashage bcrypt des mots de passe
- Génération tokens JWT (access + refresh)
- Vérification des credentials MySQL
- Retour des données user + company

### 3.2 Véhicules (VehiclesController)

**Endpoints:**

- `GET /api/vehicles` - Liste paginée avec filtres
- `GET /api/vehicles/:id` - Détails d'un véhicule
- `POST /api/vehicles` - Créer un véhicule
- `PUT /api/vehicles/:id` - Modifier un véhicule
- `DELETE /api/vehicles/:id` - Supprimer un véhicule
- `POST /api/vehicles/import` - Import CSV

**Fonctionnalités:**

- Pagination (page, limit)
- Filtres (statut, agence, recherche)
- Validation des données (Zod équivalent PHP)
- Calcul automatique prochain_controle via triggers MySQL
- Gestion des erreurs (immatriculation dupliquée, etc.)
- Import CSV avec validation

### 3.3 Alertes (AlertsController)

**Endpoints:**

- `GET /api/alerts` - Liste paginée avec filtres
- `GET /api/alerts/:id` - Détails d'une alerte
- `PUT /api/alerts/:id/read` - Marquer comme lu
- `PUT /api/alerts/read-all` - Marquer toutes comme lues
- `DELETE /api/alerts/:id` - Supprimer une alerte
- `GET /api/alerts/settings` - Paramètres d'alertes
- `PUT /api/alerts/settings` - Mettre à jour paramètres

**Fonctionnalités:**

- Filtrage par priorité, type, statut lu
- Mise à jour des paramètres d'alertes
- Génération automatique d'alertes (via procédure MySQL)

### 3.4 Demandes (RequestsController)

**Endpoints:**

- `GET /api/requests` - Liste paginée avec filtres
- `GET /api/requests/:id` - Détails d'une demande
- `POST /api/requests` - Créer une demande
- `PUT /api/requests/:id` - Modifier une demande
- `PUT /api/requests/:id/cancel` - Annuler une demande
- `GET /api/requests/:id/comments` - Commentaires d'une demande
- `POST /api/requests/:id/comments` - Ajouter un commentaire

**Fonctionnalités:**

- Gestion du cycle de vie des demandes
- Commentaires et historique
- Upload de documents associés
- Validation des statuts (ne pas annuler une demande traitée)

### 3.5 Notifications (NotificationsController)

**Endpoints:**

- `GET /api/notifications` - Liste paginée
- `GET /api/notifications/unread-count` - Compteur non lus
- `PUT /api/notifications/:id/read` - Marquer comme lu
- `PUT /api/notifications/read-all` - Marquer toutes comme lues
- `DELETE /api/notifications/:id` - Supprimer

**Fonctionnalités:**

- Filtrage par type et statut lu
- Compteur en temps réel
- Tri par date décroissante

### 3.6 Rapports (ReportsController)

**Endpoints:**

- `GET /api/reports/monthly` - Rapport mensuel (PDF)
- `GET /api/reports/annual` - Rapport annuel (PDF)
- `GET /api/reports/export-vehicles` - Export véhicules (Excel/PDF/CSV)
- `GET /api/reports/export-history` - Export historique (CSV)

**Fonctionnalités:**

- Génération PDF avec données de flotte
- Export Excel avec formatage
- Export CSV pour import ultérieur
- Application des filtres aux exports

---

## 4. COMPOSANTS TECHNIQUES

### 4.1 Database.php (Connexion MySQL)

- Utiliser PDO avec MySQL
- Pool de connexions
- Gestion des erreurs
- Support UTF-8 (utf8mb4)
- Transactions

### 4.2 JWTService.php

- Génération tokens access (1h) et refresh (7j)
- Validation des tokens
- Extraction des claims (user_id, company_id, role)
- Gestion expiration et refresh

### 4.3 AuthMiddleware.php

- Vérification présence token dans header
- Validation du token JWT
- Extraction des informations utilisateur
- Vérification des permissions selon le rôle
- Injection des données user dans la requête

### 4.4 Response.php

- Format standardisé des réponses JSON
- Codes HTTP appropriés
- Messages d'erreur cohérents
- Format pagination uniforme

### 4.5 ValidationService.php

- Validation des données d'entrée
- Règles de validation (email, required, min/max, etc.)
- Messages d'erreur en français
- Validation selon les schémas Zod du frontend

---

## 5. SÉCURITÉ

### 5.1 Authentification

- Hashage bcrypt pour mots de passe
- Tokens JWT sécurisés
- Refresh tokens avec rotation
- Expiration des tokens

### 5.2 Autorisation

- Vérification des rôles (admin, gestionnaire, viewer)
- Filtrage des données par company_id
- Protection CSRF (si nécessaire)
- Rate limiting (si nécessaire)

### 5.3 Validation

- Validation stricte des entrées
- Protection contre injection SQL (PDO prepared statements)
- Sanitization des données
- Validation des types de fichiers uploadés

---

## 6. GESTION D'ERREURS

### 6.1 ErrorHandler.php

- Capture des exceptions
- Formatage des erreurs en JSON
- Logging des erreurs
- Codes HTTP appropriés
- Messages d'erreur utilisateur-friendly

### 6.2 Codes d'erreur standardisés

- 200 : Succès
- 201 : Créé
- 400 : Requête invalide
- 401 : Non authentifié
- 403 : Accès interdit
- 404 : Non trouvé
- 409 : Conflit (ex: immatriculation existante)
- 422 : Erreur de validation
- 500 : Erreur serveur

---

## 7. ROUTING

### 7.1 index.php (Point d'entrée)

- Parsing de l'URL
- Routing vers les controllers appropriés
- Gestion des méthodes HTTP (GET, POST, PUT, DELETE)
- Application des middlewares
- Gestion CORS

### 7.2 Structure des routes

```
/api/auth/*          → AuthController
/api/vehicles/*      → VehiclesController
/api/alerts/*        → AlertsController
/api/requests/*      → RequestsController
/api/notifications/* → NotificationsController
/api/reports/*       → ReportsController
```

---

## 8. MODELS (Accès Base de Données)

### 8.1 Vehicle.php

- Méthodes CRUD complètes
- Requêtes préparées PDO
- Gestion des relations (company_id)
- Calculs automatiques via triggers MySQL

### 8.2 User.php

- Authentification
- Gestion des rôles
- Mise à jour dernière connexion

### 8.3 Alert.php

- Récupération avec filtres
- Mise à jour statut lu
- Génération automatique

### 8.4 Request.php

- CRUD demandes
- Gestion commentaires
- Suivi des statuts

### 8.5 Notification.php

- Récupération paginée
- Compteur non lus
- Mise à jour statut lu

---

## 9. INTÉGRATION AVEC LE FRONTEND

### 9.1 CORS Configuration

- Autoriser origine frontend (http://localhost:5173)
- Headers autorisés
- Méthodes HTTP autorisées
- Credentials si nécessaire

### 9.2 Format des Réponses

- Format JSON uniforme
- Structure pagination identique au frontend
- Codes d'erreur cohérents
- Format des dates ISO 8601

### 9.3 Mise à jour des Services Frontend

- Modifier `src/services/api/*.service.ts`
- Remplacer les mocks par de vrais appels fetch
- Utiliser `VITE_API_URL` depuis .env
- Gestion des tokens dans les headers

---

## 10. TESTS ET VALIDATION

### 10.1 Tests de Connexion

- Script de test MySQL
- Vérification des tables
- Test des triggers

### 10.2 Tests API

- Tests manuels avec Postman/Insomnia
- Collection Postman à créer
- Tests des endpoints principaux

### 10.3 Validation

- Tester tous les endpoints
- Vérifier la pagination
- Tester les filtres
- Valider les erreurs

---

## 11. DOCUMENTATION

### 11.1 README.md

- Instructions d'installation
- Configuration
- Démarrage
- Structure du projet

### 11.2 Documentation API

- Endpoints documentés
- Exemples de requêtes/réponses
- Codes d'erreur
- Authentification

### 11.3 Collection Postman

- Import/export de la collection
- Variables d'environnement
- Exemples de requêtes

---

## 12. DÉPLOIEMENT

### 12.1 Configuration Serveur

- Apache avec mod_rewrite
- PHP 8.0+ requis
- Extension MySQL PDO
- Permissions fichiers

### 12.2 Variables d'Environnement Production

- Configuration sécurisée
- Secrets JWT forts
- Connexion DB production
- CORS production

---

## FICHIERS À CRÉER

### Configuration

- `backend-php/.env.example`
- `backend-php/composer.json`
- `backend-php/.htaccess`
- `backend-php/api/index.php`

### Config

- `backend-php/src/Config/Database.php`
- `backend-php/src/Config/Config.php`
- `backend-php/src/Config/Cors.php`

### Controllers

- `backend-php/src/Controllers/AuthController.php`
- `backend-php/src/Controllers/VehiclesController.php`
- `backend-php/src/Controllers/AlertsController.php`
- `backend-php/src/Controllers/RequestsController.php`
- `backend-php/src/Controllers/NotificationsController.php`
- `backend-php/src/Controllers/ReportsController.php`

### Models

- `backend-php/src/Models/Vehicle.php`
- `backend-php/src/Models/User.php`
- `backend-php/src/Models/Alert.php`
- `backend-php/src/Models/Request.php`
- `backend-php/src/Models/Notification.php`
- `backend-php/src/Models/Company.php`

### Services

- `backend-php/src/Services/AuthService.php`
- `backend-php/src/Services/JWTService.php`
- `backend-php/src/Services/ValidationService.php`

### Middleware

- `backend-php/src/Middleware/AuthMiddleware.php`
- `backend-php/src/Middleware/ErrorHandler.php`

### Utils

- `backend-php/src/Utils/Response.php`
- `backend-php/src/Utils/Logger.php`

### Documentation

- `backend-php/README.md`
- `backend-php/API.md`
- `docs/BACKEND-PHP.md`

---

## ORDRE D'IMPLÉMENTATION RECOMMANDÉ

1. Configuration de base (Database, Config, CORS)
2. Utils (Response, Logger)
3. Services (JWT, Validation)
4. Middleware (Auth, ErrorHandler)
5. Models (User, Company, Vehicle)
6. Controllers (Auth, puis Vehicles)
7. Controllers restants (Alerts, Requests, Notifications, Reports)
8. Tests et validation
9. Documentation
10. Intégration frontend

---

## TECHNOLOGIES ET BIBLIOTHÈQUES

- **PHP 8.0+** : Langage principal
- **PDO** : Accès base de données MySQL
- **firebase/php-jwt** : Tokens JWT
- **vlucas/phpdotenv** : Variables d'environnement
- **monolog/monolog** : Logging
- **respect/validation** : Validation des données
- **Apache** : Serveur web avec mod_rewrite
- **Composer** : Gestionnaire de dépendances

---

## POINTS D'ATTENTION

1. **Sécurité** : Toujours utiliser prepared statements PDO
2. **Validation** : Valider toutes les entrées utilisateur
3. **Erreurs** : Ne jamais exposer les détails d'erreurs en production
4. **Performance** : Utiliser les index MySQL correctement
5. **CORS** : Configurer correctement pour le frontend
6. **Tokens** : Gérer correctement l'expiration et le refresh
7. **Permissions** : Vérifier les rôles et company_id à chaque requête