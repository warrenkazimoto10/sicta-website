<?php

namespace App\Models;

use PDO;

class Vehicle extends BaseModel
{
    public function getPaginated(string $companyId, int $page = 1, int $limit = 10, array $filters = []): array
    {
        $page = max($page, 1);
        $limit = max($limit, 1);
        $offset = ($page - 1) * $limit;

        $conditions = ['company_id = :companyId'];
        $params = ['companyId' => $companyId];

        if (!empty($filters['statut'])) {
            $conditions[] = 'statut = :statut';
            $params['statut'] = $filters['statut'];
        }

        if (!empty($filters['agence'])) {
            $conditions[] = 'agence = :agence';
            $params['agence'] = $filters['agence'];
        }

        if (!empty($filters['search'])) {
            $conditions[] = '(immatriculation LIKE :search OR marque LIKE :search OR modele LIKE :search)';
            $params['search'] = '%' . $filters['search'] . '%';
        }

        $where = 'WHERE ' . implode(' AND ', $conditions);

        $countStmt = $this->db->prepare("SELECT COUNT(*) FROM fleet_vehicles {$where}");
        $countStmt->execute($params);
        $total = (int) $countStmt->fetchColumn();

        $dataSql = "SELECT * FROM fleet_vehicles {$where} ORDER BY date_ajout DESC LIMIT :limit OFFSET :offset";
        $dataStmt = $this->db->prepare($dataSql);
        foreach ($params as $key => $value) {
            $paramType = is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR;
            $dataStmt->bindValue(':' . $key, $value, $paramType);
        }
        $dataStmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $dataStmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $dataStmt->execute();
        $items = $dataStmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'items' => $items,
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
        ];
    }

    public function findById(string $companyId, string $vehicleId): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM fleet_vehicles WHERE company_id = :companyId AND id = :id LIMIT 1');
        $stmt->execute([
            'companyId' => $companyId,
            'id' => $vehicleId,
        ]);
        $vehicle = $stmt->fetch(PDO::FETCH_ASSOC);

        return $vehicle ?: null;
    }

    public function create(string $companyId, array $data): array
    {
        $id = $data['id'] ?? $this->generateUuid();

        $sql = 'INSERT INTO fleet_vehicles (
            id, company_id, immatriculation, marque, modele, type,
            numero_serie, annee_fabrication, couleur, dernier_controle,
            agence, kilometrage, notes
        ) VALUES (
            :id, :companyId, :immatriculation, :marque, :modele, :type,
            :numeroSerie, :anneeFabrication, :couleur, :dernierControle,
            :agence, :kilometrage, :notes
        )';

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'companyId' => $companyId,
            'immatriculation' => $data['immatriculation'],
            'marque' => $data['marque'],
            'modele' => $data['modele'],
            'type' => $data['type'],
            'numeroSerie' => $data['numeroSerie'] ?? null,
            'anneeFabrication' => $data['anneeFabrication'] ?? null,
            'couleur' => $data['couleur'] ?? null,
            'dernierControle' => $data['dernierControle'],
            'agence' => $data['agence'],
            'kilometrage' => $data['kilometrage'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]);

        return $this->findById($companyId, $id) ?? [];
    }

    public function update(string $companyId, string $vehicleId, array $data): ?array
    {
        $sql = 'UPDATE fleet_vehicles SET
            immatriculation = :immatriculation,
            marque = :marque,
            modele = :modele,
            type = :type,
            numero_serie = :numeroSerie,
            annee_fabrication = :anneeFabrication,
            couleur = :couleur,
            dernier_controle = :dernierControle,
            agence = :agence,
            kilometrage = :kilometrage,
            notes = :notes,
            date_modification = NOW()
        WHERE company_id = :companyId AND id = :id';

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'companyId' => $companyId,
            'id' => $vehicleId,
            'immatriculation' => $data['immatriculation'],
            'marque' => $data['marque'],
            'modele' => $data['modele'],
            'type' => $data['type'],
            'numeroSerie' => $data['numeroSerie'] ?? null,
            'anneeFabrication' => $data['anneeFabrication'] ?? null,
            'couleur' => $data['couleur'] ?? null,
            'dernierControle' => $data['dernierControle'],
            'agence' => $data['agence'],
            'kilometrage' => $data['kilometrage'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]);

        return $this->findById($companyId, $vehicleId);
    }

    public function delete(string $companyId, string $vehicleId): bool
    {
        $stmt = $this->db->prepare('DELETE FROM fleet_vehicles WHERE company_id = :companyId AND id = :id');
        return $stmt->execute([
            'companyId' => $companyId,
            'id' => $vehicleId,
        ]);
    }
}
