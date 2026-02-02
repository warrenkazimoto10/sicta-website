<?php

namespace App\Models;

use PDO;

class Notification extends BaseModel
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

        if (isset($filters['lu'])) {
            $conditions[] = 'lu = :lu';
            $params['lu'] = (bool) $filters['lu'];
        }

        $where = 'WHERE ' . implode(' AND ', $conditions);

        $countStmt = $this->db->prepare("SELECT COUNT(*) FROM notifications {$where}");
        $countStmt->execute($params);
        $total = (int) $countStmt->fetchColumn();

        $sql = "SELECT * FROM notifications {$where} ORDER BY date DESC LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($sql);
        foreach ($params as $key => $value) {
            $type = is_bool($value) ? PDO::PARAM_BOOL : PDO::PARAM_STR;
            $stmt->bindValue(':' . $key, $value, $type);
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

    public function getUnreadCount(string $companyId): int
    {
        $stmt = $this->db->prepare('SELECT COUNT(*) FROM notifications WHERE company_id = :companyId AND lu = FALSE');
        $stmt->execute(['companyId' => $companyId]);

        return (int) $stmt->fetchColumn();
    }

    public function markAsRead(string $companyId, string $notificationId): bool
    {
        $stmt = $this->db->prepare('UPDATE notifications SET lu = TRUE WHERE company_id = :companyId AND id = :id');
        return $stmt->execute([
            'companyId' => $companyId,
            'id' => $notificationId,
        ]);
    }

    public function markAllAsRead(string $companyId): int
    {
        $stmt = $this->db->prepare('UPDATE notifications SET lu = TRUE WHERE company_id = :companyId AND lu = FALSE');
        $stmt->execute(['companyId' => $companyId]);

        return $stmt->rowCount();
    }

    public function delete(string $companyId, string $notificationId): bool
    {
        $stmt = $this->db->prepare('DELETE FROM notifications WHERE company_id = :companyId AND id = :id');
        return $stmt->execute([
            'companyId' => $companyId,
            'id' => $notificationId,
        ]);
    }
}
