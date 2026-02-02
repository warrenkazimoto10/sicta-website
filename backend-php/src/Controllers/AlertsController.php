<?php

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Models\Alert;
use App\Utils\Response;

class AlertsController
{
    public function __construct(private readonly Alert $alerts = new Alert())
    {
    }

    public function index(): void
    {
        $claims = AuthMiddleware::authenticate();
        $companyId = $claims['company_id'];

        $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
        $filters = [
            'priorite' => $_GET['priorite'] ?? null,
            'type' => $_GET['type'] ?? null,
        ];
        if (isset($_GET['lu'])) {
            $filters['lu'] = $_GET['lu'] === 'true' || $_GET['lu'] === '1';
        }

        $result = $this->alerts->getPaginated($companyId, $page, $limit, $filters);
        Response::paginated($result['items'], $result['total'], $result['page'], $result['limit']);
    }

    public function show(string $alertId): void
    {
        $claims = AuthMiddleware::authenticate();
        $alert = $this->alerts->findById($claims['company_id'], $alertId);

        if (!$alert) {
            Response::error('Alerte introuvable', 404);
        }

        Response::success(['alert' => $alert]);
    }

    public function markAsRead(string $alertId): void
    {
        $claims = AuthMiddleware::authenticate();
        $updated = $this->alerts->markAsRead($claims['company_id'], $alertId);

        if (!$updated) {
            Response::error('Alerte introuvable', 404);
        }

        Response::success(['message' => 'Alerte marquée comme lue']);
    }

    public function markAllAsRead(): void
    {
        $claims = AuthMiddleware::authenticate();
        $count = $this->alerts->markAllAsRead($claims['company_id']);

        Response::success(['message' => 'Alertes mises à jour', 'count' => $count]);
    }

    public function destroy(string $alertId): void
    {
        $claims = AuthMiddleware::authenticate();
        $deleted = $this->alerts->delete($claims['company_id'], $alertId);

        if (!$deleted) {
            Response::error('Alerte introuvable', 404);
        }

        Response::success(['message' => 'Alerte supprimée']);
    }

    public function getSettings(): void
    {
        $claims = AuthMiddleware::authenticate();
        $settings = $this->alerts->getSettings($claims['company_id']);

        Response::success(['settings' => $settings]);
    }

    public function updateSettings(): void
    {
        $claims = AuthMiddleware::authenticate();
        $data = $this->getJsonPayload();

        $this->alerts->updateSettings($claims['company_id'], $data);
        $settings = $this->alerts->getSettings($claims['company_id']);

        Response::success(['settings' => $settings]);
    }

    private function getJsonPayload(): array
    {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw ?? '', true);

        if (!is_array($data)) {
            Response::error('Corps de requête JSON invalide', 400);
        }

        return $data;
    }
}
