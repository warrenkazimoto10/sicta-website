# Schéma de Base de Données MySQL - Espace PRO SICTA

## Vue d'ensemble

Ce document décrit la structure de la base de données MySQL pour l'espace professionnel SICTA. La base de données est conçue pour gérer les entreprises, leurs utilisateurs, leurs flottes de véhicules, les alertes, notifications, demandes et documents.

---

## Script de Création de la Base de Données

```sql
-- Créer la base de données
CREATE DATABASE IF NOT EXISTS sicta_bd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sicta_bd;

-- Désactiver temporairement les vérifications de clés étrangères
SET FOREIGN_KEY_CHECKS = 0;
```

---

## Tables Principales

### 1. `companies` (Entreprises)

```sql
CREATE TABLE companies (
    id CHAR(36) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telephone VARCHAR(50) NOT NULL,
    adresse TEXT,
    ville VARCHAR(100),
    code_postal VARCHAR(20),
    siret VARCHAR(50) UNIQUE,
    nombre_vehicules INT DEFAULT 0,
    date_creation DATE NOT NULL,
    actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_companies_email (email),
    INDEX idx_companies_actif (actif)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 2. `users` (Utilisateurs PRO)

```sql
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    company_id CHAR(36) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    telephone VARCHAR(50),
    role ENUM('admin', 'gestionnaire', 'viewer') NOT NULL DEFAULT 'viewer',
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    derniere_connexion TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_company_id (company_id),
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 3. `fleet_vehicles` (Véhicules de Flotte)

```sql
CREATE TABLE fleet_vehicles (
    id CHAR(36) PRIMARY KEY,
    company_id CHAR(36) NOT NULL,
    immatriculation VARCHAR(50) NOT NULL UNIQUE,
    marque VARCHAR(100) NOT NULL,
    modele VARCHAR(100) NOT NULL,
    type ENUM('particulier', 'transport', 'utilitaire', 'poids-lourd') NOT NULL,
    numero_serie VARCHAR(100),
    annee_fabrication INT,
    couleur VARCHAR(50),
    dernier_controle DATE NOT NULL,
    prochain_controle DATE NOT NULL,
    statut ENUM('valide', 'expire', 'bientot-du') NOT NULL,
    jours_restants INT NOT NULL,
    agence VARCHAR(100) NOT NULL,
    agence_id CHAR(36),
    kilometrage INT,
    date_ajout DATE NOT NULL DEFAULT (CURRENT_DATE),
    date_modification DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_fleet_vehicles_company_id (company_id),
    INDEX idx_fleet_vehicles_immatriculation (immatriculation),
    INDEX idx_fleet_vehicles_statut (statut),
    INDEX idx_fleet_vehicles_agence (agence),
    INDEX idx_fleet_vehicles_prochain_controle (prochain_controle),
    INDEX idx_fleet_vehicles_company_statut (company_id, statut),
    
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 4. `control_history` (Historique des Contrôles)

```sql
CREATE TABLE control_history (
    id CHAR(36) PRIMARY KEY,
    vehicle_id CHAR(36) NOT NULL,
    date_controle DATE NOT NULL,
    agence VARCHAR(100) NOT NULL,
    agence_id CHAR(36),
    resultat ENUM('favorable', 'defavorable', 'contre-visite') NOT NULL,
    observations TEXT,
    documents JSON,
    kilometrage INT,
    technicien VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_control_history_vehicle_id (vehicle_id),
    INDEX idx_control_history_date_controle (date_controle),
    
    FOREIGN KEY (vehicle_id) REFERENCES fleet_vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 5. `alerts` (Alertes)

```sql
CREATE TABLE alerts (
    id CHAR(36) PRIMARY KEY,
    company_id CHAR(36) NOT NULL,
    vehicle_id CHAR(36) NOT NULL,
    type ENUM('controle', 'document', 'rappel', 'maintenance') NOT NULL,
    message TEXT NOT NULL,
    date DATE NOT NULL,
    priorite ENUM('haute', 'moyenne', 'basse') NOT NULL DEFAULT 'moyenne',
    lu BOOLEAN DEFAULT FALSE,
    action_requise BOOLEAN DEFAULT FALSE,
    date_echeance DATE,
    configurable BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_alerts_company_id (company_id),
    INDEX idx_alerts_vehicle_id (vehicle_id),
    INDEX idx_alerts_lu (lu),
    INDEX idx_alerts_priorite (priorite),
    INDEX idx_alerts_date (date),
    INDEX idx_alerts_company_lu_priorite (company_id, lu, priorite),
    
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES fleet_vehicles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 6. `notifications` (Notifications)

```sql
CREATE TABLE notifications (
    id CHAR(36) PRIMARY KEY,
    company_id CHAR(36) NOT NULL,
    user_id CHAR(36),
    type ENUM('alerte', 'document', 'demande', 'systeme', 'rappel') NOT NULL,
    titre VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lu BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_notifications_company_id (company_id),
    INDEX idx_notifications_user_id (user_id),
    INDEX idx_notifications_lu (lu),
    INDEX idx_notifications_date (date),
    INDEX idx_notifications_company_lu_date (company_id, lu, date DESC),
    
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 7. `requests` (Demandes)

```sql
CREATE TABLE requests (
    id CHAR(36) PRIMARY KEY,
    company_id CHAR(36) NOT NULL,
    vehicle_id CHAR(36) NOT NULL,
    type ENUM('transfert-plaque', 'civio', 'ivn', 'jaugeage', 'immatriculation', 'ppad', 'autre') NOT NULL,
    date_creation DATE NOT NULL DEFAULT (CURRENT_DATE),
    date_modification DATE,
    statut ENUM('en-attente', 'en-cours', 'traite', 'refuse', 'annule') NOT NULL DEFAULT 'en-attente',
    description TEXT NOT NULL,
    documents JSON,
    priorite ENUM('haute', 'moyenne', 'basse'),
    assigne_a CHAR(36),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_requests_company_id (company_id),
    INDEX idx_requests_vehicle_id (vehicle_id),
    INDEX idx_requests_statut (statut),
    INDEX idx_requests_type (type),
    INDEX idx_requests_date_creation (date_creation),
    INDEX idx_requests_company_statut (company_id, statut),
    
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES fleet_vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigne_a) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 8. `request_comments` (Commentaires sur Demandes)

```sql
CREATE TABLE request_comments (
    id CHAR(36) PRIMARY KEY,
    request_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    commentaire TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    interne BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_request_comments_request_id (request_id),
    INDEX idx_request_comments_date (date),
    
    FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 9. `documents` (Documents)

```sql
CREATE TABLE documents (
    id CHAR(36) PRIMARY KEY,
    company_id CHAR(36) NOT NULL,
    vehicle_id CHAR(36),
    request_id CHAR(36),
    nom VARCHAR(255) NOT NULL,
    type ENUM('certificat', 'rapport', 'facture', 'autre') NOT NULL,
    statut ENUM('valide', 'expire', 'disponible', 'archive') NOT NULL,
    taille BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    date_upload TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_expiration DATE,
    uploaded_by CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_documents_company_id (company_id),
    INDEX idx_documents_vehicle_id (vehicle_id),
    INDEX idx_documents_request_id (request_id),
    INDEX idx_documents_type (type),
    INDEX idx_documents_statut (statut),
    
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES fleet_vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### 10. `alert_settings` (Paramètres d'Alertes)

```sql
CREATE TABLE alert_settings (
    id CHAR(36) PRIMARY KEY,
    company_id CHAR(36) NOT NULL UNIQUE,
    seuil_jours INT NOT NULL DEFAULT 30,
    email_actif BOOLEAN DEFAULT TRUE,
    sms_actif BOOLEAN DEFAULT FALSE,
    push_actif BOOLEAN DEFAULT TRUE,
    email_destinataires JSON DEFAULT (JSON_ARRAY()),
    sms_destinataires JSON DEFAULT (JSON_ARRAY()),
    alertes_automatiques BOOLEAN DEFAULT TRUE,
    heures_envoi JSON DEFAULT (JSON_ARRAY('09:00', '17:00')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_alert_settings_company_id (company_id),
    
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## Triggers MySQL

### Trigger pour calculer prochain_controle et statut

```sql
DELIMITER $$

CREATE TRIGGER calculate_vehicle_status
BEFORE INSERT ON fleet_vehicles
FOR EACH ROW
BEGIN
    DECLARE months_to_add INT;
    
    -- Déterminer le nombre de mois selon le type
    IF NEW.type = 'particulier' OR NEW.type = 'utilitaire' THEN
        SET months_to_add = 24;
    ELSE
        SET months_to_add = 12;
    END IF;
    
    -- Calculer la prochaine date de contrôle
    SET NEW.prochain_controle = DATE_ADD(NEW.dernier_controle, INTERVAL months_to_add MONTH);
    
    -- Calculer les jours restants
    SET NEW.jours_restants = DATEDIFF(NEW.prochain_controle, CURDATE());
    
    -- Déterminer le statut
    IF NEW.jours_restants < 0 THEN
        SET NEW.statut = 'expire';
    ELSEIF NEW.jours_restants <= 30 THEN
        SET NEW.statut = 'bientot-du';
    ELSE
        SET NEW.statut = 'valide';
    END IF;
END$$

CREATE TRIGGER update_vehicle_status
BEFORE UPDATE ON fleet_vehicles
FOR EACH ROW
BEGIN
    DECLARE months_to_add INT;
    DECLARE seuil_jours INT DEFAULT 30;
    
    -- Si la date de contrôle ou le type change, recalculer
    IF NEW.dernier_controle != OLD.dernier_controle OR NEW.type != OLD.type THEN
        -- Déterminer le nombre de mois selon le type
        IF NEW.type = 'particulier' OR NEW.type = 'utilitaire' THEN
            SET months_to_add = 24;
        ELSE
            SET months_to_add = 12;
        END IF;
        
        -- Calculer la prochaine date de contrôle
        SET NEW.prochain_controle = DATE_ADD(NEW.dernier_controle, INTERVAL months_to_add MONTH);
        
        -- Récupérer le seuil depuis alert_settings si disponible
        SELECT COALESCE(seuil_jours, 30) INTO seuil_jours
        FROM alert_settings
        WHERE company_id = NEW.company_id
        LIMIT 1;
        
        -- Calculer les jours restants
        SET NEW.jours_restants = DATEDIFF(NEW.prochain_controle, CURDATE());
        
        -- Déterminer le statut
        IF NEW.jours_restants < 0 THEN
            SET NEW.statut = 'expire';
        ELSEIF NEW.jours_restants <= seuil_jours THEN
            SET NEW.statut = 'bientot-du';
        ELSE
            SET NEW.statut = 'valide';
        END IF;
    END IF;
END$$

DELIMITER ;
```

---

### Trigger pour mettre à jour nombre_vehicules

```sql
DELIMITER $$

CREATE TRIGGER update_company_vehicle_count_insert
AFTER INSERT ON fleet_vehicles
FOR EACH ROW
BEGIN
    UPDATE companies
    SET nombre_vehicules = nombre_vehicules + 1
    WHERE id = NEW.company_id;
END$$

CREATE TRIGGER update_company_vehicle_count_delete
AFTER DELETE ON fleet_vehicles
FOR EACH ROW
BEGIN
    UPDATE companies
    SET nombre_vehicules = nombre_vehicules - 1
    WHERE id = OLD.company_id;
END$$

DELIMITER ;
```

---

## Procédures Stockées

### Procédure pour générer des alertes automatiques

```sql
DELIMITER $$

CREATE PROCEDURE generate_automatic_alerts(IN p_company_id CHAR(36))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_vehicle_id CHAR(36);
    DECLARE v_immatriculation VARCHAR(50);
    DECLARE v_jours_restants INT;
    DECLARE v_seuil_jours INT;
    DECLARE v_message TEXT;
    
    DECLARE vehicle_cursor CURSOR FOR
        SELECT id, immatriculation, jours_restants
        FROM fleet_vehicles
        WHERE company_id = p_company_id
        AND statut IN ('expire', 'bientot-du');
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Récupérer le seuil d'alerte
    SELECT COALESCE(seuil_jours, 30) INTO v_seuil_jours
    FROM alert_settings
    WHERE company_id = p_company_id;
    
    OPEN vehicle_cursor;
    
    read_loop: LOOP
        FETCH vehicle_cursor INTO v_vehicle_id, v_immatriculation, v_jours_restants;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Générer l'alerte selon le statut
        IF v_jours_restants < 0 THEN
            SET v_message = CONCAT('Contrôle expiré depuis ', ABS(v_jours_restants), ' jours pour le véhicule ', v_immatriculation);
            
            INSERT INTO alerts (id, company_id, vehicle_id, type, message, date, priorite, lu, action_requise, date_echeance)
            VALUES (
                UUID(),
                p_company_id,
                v_vehicle_id,
                'controle',
                v_message,
                CURDATE(),
                'haute',
                FALSE,
                TRUE,
                CURDATE()
            );
        ELSEIF v_jours_restants <= v_seuil_jours THEN
            SET v_message = CONCAT('Contrôle bientôt dû dans ', v_jours_restants, ' jours pour le véhicule ', v_immatriculation);
            
            INSERT INTO alerts (id, company_id, vehicle_id, type, message, date, priorite, lu, action_requise, date_echeance)
            VALUES (
                UUID(),
                p_company_id,
                v_vehicle_id,
                'controle',
                v_message,
                CURDATE(),
                CASE 
                    WHEN v_jours_restants <= 7 THEN 'haute'
                    WHEN v_jours_restants <= 15 THEN 'moyenne'
                    ELSE 'basse'
                END,
                FALSE,
                TRUE,
                DATE_ADD(CURDATE(), INTERVAL v_jours_restants DAY)
            );
        END IF;
    END LOOP;
    
    CLOSE vehicle_cursor;
END$$

DELIMITER ;
```

---

## Vues Utiles

### Vue pour statistiques de flotte par entreprise

```sql
CREATE VIEW v_fleet_stats AS
SELECT 
    c.id AS company_id,
    c.nom AS company_name,
    COUNT(fv.id) AS total_vehicles,
    SUM(CASE WHEN fv.statut = 'valide' THEN 1 ELSE 0 END) AS vehicles_valid,
    SUM(CASE WHEN fv.statut = 'bientot-du' THEN 1 ELSE 0 END) AS vehicles_due_soon,
    SUM(CASE WHEN fv.statut = 'expire' THEN 1 ELSE 0 END) AS vehicles_expired,
    COUNT(DISTINCT a.id) AS total_alerts,
    SUM(CASE WHEN a.lu = FALSE THEN 1 ELSE 0 END) AS unread_alerts
FROM companies c
LEFT JOIN fleet_vehicles fv ON c.id = fv.company_id
LEFT JOIN alerts a ON c.id = a.company_id
GROUP BY c.id, c.nom;
```

---

### Vue pour véhicules nécessitant une attention

```sql
CREATE VIEW v_vehicles_attention AS
SELECT 
    fv.id,
    fv.company_id,
    fv.immatriculation,
    fv.marque,
    fv.modele,
    fv.statut,
    fv.jours_restants,
    fv.prochain_controle,
    c.nom AS company_name
FROM fleet_vehicles fv
JOIN companies c ON fv.company_id = c.id
WHERE fv.statut IN ('expire', 'bientot-du')
ORDER BY fv.jours_restants ASC;
```

---

## Données de Test (Optionnel)

```sql
-- Insérer une entreprise de test
INSERT INTO companies (id, nom, email, telephone, date_creation, actif)
VALUES (
    UUID(),
    'Entreprise Test',
    'contact@entreprise.com',
    '+225 XX XX XX XX XX',
    CURDATE(),
    TRUE
);

-- Insérer un utilisateur de test (mot de passe: password123 hashé avec bcrypt)
INSERT INTO users (id, company_id, email, password_hash, nom, prenom, role, actif)
SELECT 
    UUID(),
    c.id,
    'contact@entreprise.com',
    '$2b$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', -- À remplacer par un vrai hash
    'Dupont',
    'Jean',
    'admin',
    TRUE
FROM companies c
WHERE c.email = 'contact@entreprise.com'
LIMIT 1;

-- Insérer des paramètres d'alertes par défaut
INSERT INTO alert_settings (id, company_id, seuil_jours, email_actif, push_actif, alertes_automatiques)
SELECT 
    UUID(),
    c.id,
    30,
    TRUE,
    TRUE,
    TRUE
FROM companies c
WHERE c.email = 'contact@entreprise.com'
LIMIT 1;
```

---

## Index Recommandés Additionnels

```sql
-- Index pour optimiser les requêtes fréquentes
CREATE INDEX idx_fleet_vehicles_search ON fleet_vehicles(immatriculation, marque, modele);
-- Note: MySQL ne supporte pas les index partiels avec WHERE
-- Ces index couvrent tous les cas, MySQL optimisera automatiquement les requêtes filtrées
CREATE INDEX idx_alerts_urgent ON alerts(company_id, lu, priorite, date);
CREATE INDEX idx_notifications_recent ON notifications(company_id, date DESC, lu);
```

---

## Maintenance

### Script de mise à jour quotidienne des statuts

```sql
DELIMITER $$

CREATE EVENT update_vehicle_statuses
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
BEGIN
    UPDATE fleet_vehicles fv
    JOIN alert_settings als ON fv.company_id = als.company_id
    SET 
        fv.jours_restants = DATEDIFF(fv.prochain_controle, CURDATE()),
        fv.statut = CASE
            WHEN DATEDIFF(fv.prochain_controle, CURDATE()) < 0 THEN 'expire'
            WHEN DATEDIFF(fv.prochain_controle, CURDATE()) <= als.seuil_jours THEN 'bientot-du'
            ELSE 'valide'
        END
    WHERE fv.statut != CASE
        WHEN DATEDIFF(fv.prochain_controle, CURDATE()) < 0 THEN 'expire'
        WHEN DATEDIFF(fv.prochain_controle, CURDATE()) <= als.seuil_jours THEN 'bientot-du'
        ELSE 'valide'
    END;
END$$

DELIMITER ;

-- Activer le planificateur d'événements
SET GLOBAL event_scheduler = ON;
```

---

## Sécurité

### Créer un utilisateur MySQL dédié

```sql
-- Créer un utilisateur avec privilèges limités
CREATE USER 'sicta_app'@'localhost' IDENTIFIED BY 'mot_de_passe_securise';
GRANT SELECT, INSERT, UPDATE, DELETE ON sicta_bd.* TO 'sicta_app'@'localhost';
FLUSH PRIVILEGES;
```

---

## Réactiver les vérifications de clés étrangères

```sql
SET FOREIGN_KEY_CHECKS = 1;
```

---

## Notes Importantes

1. **UUID**: Utiliser `UUID()` MySQL pour générer les IDs ou utiliser un générateur UUID côté application
2. **Charset**: `utf8mb4` pour supporter les emojis et caractères spéciaux
3. **Engine**: `InnoDB` pour le support des transactions et clés étrangères
4. **JSON**: MySQL 5.7+ supporte le type JSON natif
5. **Triggers**: Les triggers calculent automatiquement les statuts et dates
6. **Events**: Utiliser les événements MySQL pour les tâches planifiées (nécessite activation)

