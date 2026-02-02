# API Reference – Espace PRO SICTA

Cette API suit une architecture REST. Toutes les réponses sont renvoyées au format JSON.

## Authentification

| Méthode | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/login` | Connexion et obtention des tokens |
| POST | `/auth/refresh` | Rafraîchir les tokens |
| GET  | `/auth/me` | Informations sur l\'utilisateur connecté |
| POST | `/auth/logout` | Déconnexion |

## Véhicules

| Méthode | Endpoint | Description |
| --- | --- | --- |
| GET | `/vehicles` | Liste paginée des véhicules |
| POST | `/vehicles` | Créer un véhicule |
| GET | `/vehicles/{id}` | Détails d\'un véhicule |
| PUT | `/vehicles/{id}` | Mettre à jour un véhicule |
| DELETE | `/vehicles/{id}` | Supprimer un véhicule |
| POST | `/vehicles/import` | Importer un CSV de véhicules |

## Alertes

| Méthode | Endpoint | Description |
| --- | --- | --- |
| GET | `/alerts` | Liste paginée des alertes |
| GET | `/alerts/{id}` | Détails d\'une alerte |
| PUT | `/alerts/{id}/read` | Marquer une alerte comme lue |
| PUT | `/alerts/read-all` | Marquer toutes les alertes comme lues |
| DELETE | `/alerts/{id}` | Supprimer une alerte |
| GET | `/alerts/settings` | Obtenir les paramètres |
| PUT | `/alerts/settings` | Mettre à jour les paramètres |

## Demandes

| Méthode | Endpoint | Description |
| --- | --- | --- |
| GET | `/requests` | Liste paginée |
| POST | `/requests` | Créer une demande |
| GET | `/requests/{id}` | Détails + commentaires |
| PUT | `/requests/{id}` | Mettre à jour une demande |
| PUT | `/requests/{id}/cancel` | Annuler une demande |
| POST | `/requests/{id}/comments` | Ajouter un commentaire |

## Notifications

| Méthode | Endpoint | Description |
| --- | --- | --- |
| GET | `/notifications` | Liste paginée |
| GET | `/notifications/unread-count` | Compteur non lus |
| PUT | `/notifications/{id}/read` | Marquer comme lue |
| PUT | `/notifications/read-all` | Marquer toutes comme lues |
| DELETE | `/notifications/{id}` | Supprimer |

## Rapports

| Méthode | Endpoint | Description |
| --- | --- | --- |
| GET | `/reports/monthly` | Rapport mensuel (à implémenter) |
| GET | `/reports/annual` | Rapport annuel (à implémenter) |
| GET | `/reports/export-vehicles` | Export véhicules (à implémenter) |
| GET | `/reports/export-history` | Export historique (à implémenter) |

## Codes d\'erreur

| Code | Signification |
| --- | --- |
| 200 | Succès |
| 201 | Ressource créée |
| 400 | Requête invalide |
| 401 | Authentification requise/invalide |
| 403 | Accès interdit |
| 404 | Ressource non trouvée |
| 409 | Conflit (doublon) |
| 422 | Erreur de validation |
| 500 | Erreur interne |

## Réponses Types

### Succès
```json
{
  "status": "success",
  "data": {}
}
```

### Erreur
```json
{
  "status": "error",
  "message": "Description"
}
```
