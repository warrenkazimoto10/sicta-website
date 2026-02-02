<?php

namespace App\Models;

use PDO;
use RuntimeException;

class Request extends BaseModel
{
    public function getPaginated(string $companyId, int $page = 1, int $limit = 10, array $filters = []): array
    {
        $page = max($page, 1);
        $limit = max($limit, 1);
        $offset = ($page - 1) * $limit;

        $conditions = ['company_id = :companyId'];
        $params = ['companyId' => $companyId];

        if (!empty($filters['type'])) {
            $conditions[] = 'type = :type';
            $params['type'] = $filters['type'];
        }

        if (!empty($filters['statut'])) {
            $conditions[] = 'statut = :statut';
            $params['statut'] = $filters['statut'];
        }

        if (!empty($filters['vehicleId'])) {
            $conditions[] = 'vehicle_id = :vehicleId';
            $params['vehicleId'] = $filters['vehicleId'];
        }

        $where = 'WHERE ' . implode(' AND ', $conditions);

        $countStmt = $this->db->prepare("SELECT COUNT(*) FROM requests {$where}");
        $countStmt->execute($params);
        $total = (int) $countStmt->fetchColumn();

        $sql = "SELECT * FROM requests {$where} ORDER BY date_creation DESC LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'items' => $items,
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
        ];
    }

    public function findById(string $companyId, string $requestId): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM requests WHERE company_id = :companyId AND id = :id LIMIT 1');
        $stmt->execute([
            'companyId' => $companyId,
            'id' => $requestId,
        ]);

        $request = $stmt->fetch(PDO::FETCH_ASSOC);
        return $request ?: null;
    }

    public function create(string $companyId, array $data): array
    {
        $id = $this->generateUuid();

        $sql = 'INSERT INTO requests (
            id, company_id, vehicle_id, type, description, statut, priorite, date_creation
        ) VALUES (
            :id, :companyId, :vehicleId, :type, :description, :statut, :priorite, NOW()
        )';

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'companyId' => $companyId,
            'vehicleId' => $data['vehicle_id'],
            'type' => $data['type'],
            'description' => $data['description'],
            'statut' => $data['statut'] ?? 'en-attente',
            'priorite' => $data['priorite'] ?? 'moyenne',
        ]);

        return $this->findById($companyId, $id) ?? [];
    }

    public function update(string $companyId, string $requestId, array $data): ?array
    {
        $sql = 'UPDATE requests SET
            description = :description,
            statut = :statut,
            priorite = :priorite,
            date_modification = NOW()
        WHERE company_id = :companyId AND id = :id';

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'companyId' => $companyId,
            'id' => $requestId,
            'description' => $data['description'],
            'statut' => $data['statut'],
            'priorite' => $data['priorite'] ?? 'moyenne',
        ]);

        return $this->findById($companyId, $requestId);
    }

    public function cancel(string $companyId, string $requestId): void
    {
        $request = $this->findById($companyId, $requestId);
        if (!$request) {
            throw new RuntimeException('Demande introuvable', 404);
        }

        if ($request['statut'] === 'traite') {
            throw new RuntimeException('Impossible d\'annuler une demande traitée', 400);
        }

        $stmt = $this->db->prepare('UPDATE requests SET statut = "annule", date_modification = NOW() WHERE company_id = :companyId AND id = :id');
        $stmt->execute([
            'companyId' => $companyId,
            'id' => $requestId,
        ]);
    }

    public function getComments(string $requestId): array
    {
        $stmt = $this->db->prepare('SELECT * FROM request_comments WHERE request_id = :requestId ORDER BY date DESC');
        $stmt->execute(['requestId' => $requestId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addComment(string $requestId, string $userId, string $userName, string $comment, bool $interne = false): void
    {
        $sql = 'INSERT INTO request_comments (id, request_id, user_id, user_name, commentaire, date, interne)
                VALUES (:id, :requestId, :userId, :userName, :commentaire, NOW(), :interne)';

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'id' => $this->generateUuid(),
            'requestId' => $requestId,
            'userId' => $userId,
            'userName' => $userName,
            'commentaire' => $comment,
            'interne' => $interne,
        ]);
    }
}
