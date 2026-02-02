<?php

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Models\Notification;
use App\Utils\Response;

class NotificationsController
{
    public function __construct(private readonly Notification $notifications = new Notification())
    {
    }

    public function index(): void
    {
        $claims = AuthMiddleware::authenticate();
        $companyId = $claims['company_id'];

        $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
        $filters = [
            'type' => $_GET['type'] ?? null,
        ];
        if (isset($_GET['lu'])) {
            $filters['lu'] = $_GET['lu'] === 'true' || $_GET['lu'] === '1';
        }

        $result = $this->notifications->getPaginated($companyId, $page, $limit, $filters);
        Response::paginated($result['items'], $result['total'], $result['page'], $result['limit']);
    }

    public function unreadCount(): void
    {
        $claims = AuthMiddleware::authenticate();
        $count = $this->notifications->getUnreadCount($claims['company_id']);

        Response::success(['count' => $count]);
    }

    public function markAsRead(string $notificationId): void
    {
        $claims = AuthMiddleware::authenticate();
        $updated = $this->notifications->markAsRead($claims['company_id'], $notificationId);

        if (!$updated) {
            Response::error('Notification introuvable', 404);
        }

        Response::success(['message' => 'Notification marquée comme lue']);
    }

    public function markAllAsRead(): void
    {
        $claims = AuthMiddleware::authenticate();
        $count = $this->notifications->markAllAsRead($claims['company_id']);

        Response::success(['message' => 'Notifications mises à jour', 'count' => $count]);
    }

    public function destroy(string $notificationId): void
    {
        $claims = AuthMiddleware::authenticate();
        $deleted = $this->notifications->delete($claims['company_id'], $notificationId);

        if (!$deleted) {
            Response::error('Notification introuvable', 404);
        }

        Response::success(['message' => 'Notification supprimée']);
    }
}
