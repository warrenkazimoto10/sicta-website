<?php

namespace App\Models;

use PDO;

class Alert extends BaseModel
{
    public function getPaginated(string $companyId, int $page = 1, int $limit = 10, array $filters = []): array
    {
        $page = max($page, 1);
        $limit = max($limit, 1);
        $offset = ($page - 1) * $limit;

        $conditions = ['company_id = :companyId'];
        $params = ['companyId' => $companyId];

        if (!empty($filters['priorite'])) {
            $conditions[] = 'priorite = :priorite';
            $params['priorite'] = $filters['priorite'];
        }

        if (!empty($filters['type'])) {
            $conditions[] = 'type = :type';
            $params['type'] = $filters['type'];
        }

        if (isset($filters['lu'])) {
            $conditions[] = 'lu = :lu';
            $params['lu'] = (bool) $filters['lu'];
        }

        $where = 'WHERE ' . implode(' AND ', $conditions);

        $countStmt = $this->db->prepare("SELECT COUNT(*) FROM alerts {$where}");
        $countStmt->execute($params);
        $total = (int) $countStmt->fetchColumn();

        $sql = "SELECT * FROM alerts {$where} ORDER BY date DESC LIMIT :limit OFFSET :offset";
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

    public function findById(string $companyId, string $alertId): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM alerts WHERE company_id = :companyId AND id = :id LIMIT 1');
        $stmt->execute([
            'companyId' => $companyId,
            'id' => $alertId,
        ]);

        $alert = $stmt->fetch(PDO::FETCH_ASSOC);
        return $alert ?: null;
    }

    public function markAsRead(string $companyId, string $alertId): bool
    {
        $stmt = $this->db->prepare('UPDATE alerts SET lu = TRUE WHERE company_id = :companyId AND id = :id');
        return $stmt->execute([
            'companyId' => $companyId,
            'id' => $alertId,
        ]);
    }

    public function markAllAsRead(string $companyId): int
    {
        $stmt = $this->db->prepare('UPDATE alerts SET lu = TRUE WHERE company_id = :companyId AND lu = FALSE');
        $stmt->execute(['companyId' => $companyId]);
        return $stmt->rowCount();
    }

    public function delete(string $companyId, string $alertId): bool
    {
        $stmt = $this->db->prepare('DELETE FROM alerts WHERE company_id = :companyId AND id = :id');
        return $stmt->execute([
            'companyId' => $companyId,
            'id' => $alertId,
        ]);
    }

    public function getSettings(string $companyId): array
    {
        $stmt = $this->db->prepare('SELECT * FROM alert_settings WHERE company_id = :companyId LIMIT 1');
        $stmt->execute(['companyId' => $companyId]);
        $settings = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$settings) {
            return [
                'seuil_jours' => 30,
                'email_actif' => true,
                'sms_actif' => false,
                'push_actif' => true,
                'email_destinataires' => [],
                'sms_destinataires' => [],
                'alertes_automatiques' => true,
                'heures_envoi' => ['09:00', '17:00'],
            ];
        }

        $settings['email_destinataires'] = $settings['email_destinataires'] ? json_decode($settings['email_destinataires'], true) : [];
        $settings['sms_destinataires'] = $settings['sms_destinataires'] ? json_decode($settings['sms_destinataires'], true) : [];
        $settings['heures_envoi'] = $settings['heures_envoi'] ? json_decode($settings['heures_envoi'], true) : [];

        return $settings;
    }

    public function updateSettings(string $companyId, array $data): void
    {
        $existingStmt = $this->db->prepare('SELECT id FROM alert_settings WHERE company_id = :companyId LIMIT 1');
        $existingStmt->execute(['companyId' => $companyId]);
        $existingId = $existingStmt->fetchColumn();

        $payload = [
            'companyId' => $companyId,
            'seuilJours' => $data['seuil_jours'] ?? $data['seuilJours'] ?? 30,
            'emailActif' => $data['email_actif'] ?? $data['emailActif'] ?? true,
            'smsActif' => $data['sms_actif'] ?? $data['smsActif'] ?? false,
            'pushActif' => $data['push_actif'] ?? $data['pushActif'] ?? true,
            'emailDestinataires' => json_encode($data['email_destinataires'] ?? $data['emailDestinataires'] ?? []),
            'smsDestinataires' => json_encode($data['sms_destinataires'] ?? $data['smsDestinataires'] ?? []),
            'alertesAutomatiques' => $data['alertes_automatiques'] ?? $data['alertesAutomatiques'] ?? true,
            'heuresEnvoi' => json_encode($data['heures_envoi'] ?? $data['heuresEnvoi'] ?? ['09:00', '17:00']),
        ];

        if ($existingId) {
            $sql = 'UPDATE alert_settings SET
                seuil_jours = :seuilJours,
                email_actif = :emailActif,
                sms_actif = :smsActif,
                push_actif = :pushActif,
                email_destinataires = :emailDestinataires,
                sms_destinataires = :smsDestinataires,
                alertes_automatiques = :alertesAutomatiques,
                heures_envoi = :heuresEnvoi,
                updated_at = NOW()
            WHERE id = :id';

            $payload['id'] = $existingId;
            $stmt = $this->db->prepare($sql);
            $stmt->execute($payload);
        } else {
            $sql = 'INSERT INTO alert_settings (
                id, company_id, seuil_jours, email_actif, sms_actif, push_actif,
                email_destinataires, sms_destinataires, alertes_automatiques, heures_envoi, created_at, updated_at
            ) VALUES (
                :id, :companyId, :seuilJours, :emailActif, :smsActif, :pushActif,
                :emailDestinataires, :smsDestinataires, :alertesAutomatiques, :heuresEnvoi, NOW(), NOW()
            )';

            $payload['id'] = $this->generateUuid();
            $stmt = $this->db->prepare($sql);
            $stmt->execute($payload);
        }
    }
}
