# Guide de Connexion Backend - MySQL

## Option 1 : Backend Node.js/Express (Recommandé)

### Installation des dépendances

```bash
npm install mysql2 express cors dotenv jsonwebtoken bcrypt
npm install --save-dev @types/node @types/express @types/jsonwebtoken @types/bcrypt
```

### Structure du Backend

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Configuration MySQL
│   ├── routes/
│   │   ├── auth.routes.ts       # Routes authentification
│   │   ├── vehicles.routes.ts   # Routes véhicules
│   │   ├── alerts.routes.ts      # Routes alertes
│   │   └── ...
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── vehicles.controller.ts
│   │   └── ...
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── vehicles.service.ts
│   │   └── ...
│   ├── middleware/
│   │   └── auth.middleware.ts   # Vérification JWT
│   └── app.ts                   # Point d'entrée
├── .env
└── package.json
```

### Configuration MySQL (database.ts)

```typescript
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sicta_bd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// Test de connexion
pool.getConnection()
  .then(connection => {
    console.log('✅ Connexion MySQL réussie');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erreur de connexion MySQL:', err);
  });

export default pool;
```

### Exemple de Route (vehicles.routes.ts)

```typescript
import express from 'express';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicles.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authenticateToken, getVehicles);
router.post('/', authenticateToken, createVehicle);
router.put('/:id', authenticateToken, updateVehicle);
router.delete('/:id', authenticateToken, deleteVehicle);

export default router;
```

### Exemple de Controller (vehicles.controller.ts)

```typescript
import { Request, Response } from 'express';
import pool from '../config/database';

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const { companyId } = (req as any).user; // Depuis le token JWT
    const { page = 1, limit = 10, statut, agence, search } = req.query;
    
    const offset = (Number(page) - 1) * Number(limit);
    let query = 'SELECT * FROM fleet_vehicles WHERE company_id = ?';
    const params: any[] = [companyId];
    
    if (statut) {
      query += ' AND statut = ?';
      params.push(statut);
    }
    
    if (agence) {
      query += ' AND agence = ?';
      params.push(agence);
    }
    
    if (search) {
      query += ' AND (immatriculation LIKE ? OR marque LIKE ? OR modele LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    query += ' LIMIT ? OFFSET ?';
    params.push(Number(limit), offset);
    
    const [vehicles] = await pool.execute(query, params);
    
    // Compter le total
    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM fleet_vehicles WHERE company_id = ?',
      [companyId]
    );
    const total = (countResult as any[])[0].total;
    
    res.json({
      data: vehicles,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Erreur getVehicles:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { companyId } = (req as any).user;
    const vehicleData = req.body;
    
    const id = require('crypto').randomUUID();
    
    const query = `
      INSERT INTO fleet_vehicles (
        id, company_id, immatriculation, marque, modele, type,
        dernier_controle, agence, numero_serie, annee_fabrication,
        couleur, kilometrage, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.execute(query, [
      id,
      companyId,
      vehicleData.immatriculation,
      vehicleData.marque,
      vehicleData.modele,
      vehicleData.type,
      vehicleData.dernierControle,
      vehicleData.agence,
      vehicleData.numeroSerie || null,
      vehicleData.anneeFabrication || null,
      vehicleData.couleur || null,
      vehicleData.kilometrage || null,
      vehicleData.notes || null
    ]);
    
    // Récupérer le véhicule créé (les triggers auront calculé les champs)
    const [result] = await pool.execute(
      'SELECT * FROM fleet_vehicles WHERE id = ?',
      [id]
    );
    
    res.status(201).json(result[0]);
  } catch (error: any) {
    console.error('Erreur createVehicle:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Immatriculation déjà existante' });
    } else {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};
```

---

## Option 2 : Backend PHP/Laravel

### Configuration (.env)

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sicta_bd
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
```

### Migration Laravel

```php
// database/migrations/create_fleet_vehicles_table.php
Schema::create('fleet_vehicles', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->uuid('company_id');
    $table->string('immatriculation')->unique();
    // ... autres colonnes
    $table->timestamps();
    
    $table->foreign('company_id')->references('id')->on('companies');
});
```

---

## Option 3 : Backend Python/FastAPI

### Configuration

```python
# config/database.py
import mysql.connector
from mysql.connector import pooling

db_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'votre_mot_de_passe',
    'database': 'sicta_bd',
    'charset': 'utf8mb4'
}

connection_pool = pooling.MySQLConnectionPool(
    pool_name="sicta_pool",
    pool_size=10,
    **db_config
)
```

---

## Connexion depuis le Frontend React

### Mise à jour des Services API

Modifiez `src/services/api/vehicles.service.ts` pour utiliser de vraies API calls :

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const vehiclesService = {
  async getAll(companyId: string, page = 1, limit = 10, filters?: Record<string, any>) {
    const token = localStorage.getItem('espacePro_token');
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    const response = await fetch(`${API_BASE_URL}/vehicles?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des véhicules');
    }
    
    return response.json();
  },
  
  async create(companyId: string, data: VehicleFormData) {
    const token = localStorage.getItem('espacePro_token');
    const response = await fetch(`${API_BASE_URL}/vehicles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la création');
    }
    
    return response.json();
  },
  
  // ... autres méthodes
};
```

### Variables d'environnement Frontend

Créez `.env` à la racine du projet React :

```env
VITE_API_URL=http://localhost:3001/api
```

---

## Test de Connexion

### Script de test simple (Node.js)

```javascript
// test-connection.js
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'votre_mot_de_passe',
      database: 'sicta_bd'
    });
    
    console.log('✅ Connexion réussie !');
    
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM companies');
    console.log('Nombre de companies:', rows[0].count);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testConnection();
```

Exécutez : `node test-connection.js`

---

## Prochaines Étapes

1. ✅ Base de données créée
2. ⏭️ Créer le backend (Node.js/PHP/Python)
3. ⏭️ Configurer les routes API
4. ⏭️ Mettre à jour les services frontend
5. ⏭️ Tester la connexion complète
