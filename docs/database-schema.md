# Schéma de Base de Données MySQL - Espace PRO SICTA

Ce document décrit la structure de la base de données MySQL pour l'espace professionnel SICTA.

## Fichiers SQL

- **`database-schema-mysql.sql`** : Script complet de création de la base de données `sicta_bd` avec toutes les tables, triggers, procédures stockées et vues
- **`INSTALLATION.md`** : Guide d'installation rapide

## Structure

### Tables Principales

1. **companies** - Entreprises clientes
2. **users** - Utilisateurs de l'espace PRO
3. **fleet_vehicles** - Véhicules de flotte
4. **control_history** - Historique des contrôles techniques
5. **alerts** - Alertes automatiques et manuelles
6. **notifications** - Notifications système
7. **requests** - Demandes de services
8. **request_comments** - Commentaires sur les demandes
9. **documents** - Documents associés
10. **alert_settings** - Paramètres d'alertes par entreprise

## Caractéristiques MySQL

- **Charset**: `utf8mb4` pour support Unicode complet
- **Engine**: `InnoDB` pour transactions et clés étrangères
- **UUID**: Utilisation de `CHAR(36)` pour les IDs (UUID v4)
- **JSON**: Type JSON natif pour métadonnées flexibles
- **Triggers**: Calcul automatique des statuts et dates
- **Events**: Tâches planifiées pour maintenance automatique
- **Views**: Vues optimisées pour statistiques et rapports

## Installation

```bash
# Se connecter à MySQL
mysql -u root -p

# Exécuter le script
source docs/database-schema-mysql.sql
```

Ou directement :

```bash
mysql -u root -p < docs/database-schema-mysql.sql
```

## Migration depuis un autre système

Si vous migrez depuis PostgreSQL ou un autre système, consultez le fichier `database-schema.md` pour la documentation complète des champs et relations.

## Maintenance

- Les triggers mettent à jour automatiquement les statuts des véhicules
- Un événement MySQL met à jour quotidiennement les jours restants
- Les procédures stockées permettent de générer des alertes automatiques

## Sécurité

- Créer un utilisateur MySQL dédié avec privilèges limités
- Utiliser des mots de passe forts
- Activer SSL pour les connexions distantes
- Limiter les accès réseau si possible
