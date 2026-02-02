<?php

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Models\Request as RequestModel;
use App\Utils\Response;
use RuntimeException;

class RequestsController
{
    public function __construct(private readonly RequestModel $requests = new RequestModel())
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
            'statut' => $_GET['statut'] ?? null,
            'vehicleId' => $_GET['vehicleId'] ?? null,
        ];

        $result = $this->requests->getPaginated($companyId, $page, $limit, $filters);
        Response::paginated($result['items'], $result['total'], $result['page'], $result['limit']);
    }

    public function show(string $requestId): void
    {
        $claims = AuthMiddleware::authenticate();
        $request = $this->requests->findById($claims['company_id'], $requestId);

        if (!$request) {
            Response::error('Demande introuvable', 404);
        }

        $comments = $this->requests->getComments($requestId);
        Response::success(['request' => $request, 'comments' => $comments]);
    }

    public function store(): void
    {
        $claims = AuthMiddleware::authenticate();
        $data = $this->getJsonPayload();
        $this->validateRequestPayload($data);

        $request = $this->requests->create($claims['company_id'], $data);
        Response::success(['request' => $request], 201);
    }

    public function update(string $requestId): void
    {
        $claims = AuthMiddleware::authenticate();
        $existing = $this->requests->findById($claims['company_id'], $requestId);
        if (!$existing) {
            Response::error('Demande introuvable', 404);
        }

        $data = $this->getJsonPayload();
        if (!isset($data['description'], $data['statut'])) {
            Response::error('Les champs description et statut sont obligatoires', 422);
        }

        $updated = $this->requests->update($claims['company_id'], $requestId, $data);
        Response::success(['request' => $updated ?? $existing]);
    }

    public function cancel(string $requestId): void
    {
        $claims = AuthMiddleware::authenticate();
        try {
            $this->requests->cancel($claims['company_id'], $requestId);
            Response::success(['message' => 'Demande annulée']);
        } catch (RuntimeException $exception) {
            Response::error($exception->getMessage(), $exception->getCode() ?: 400);
        }
    }

    public function addComment(string $requestId): void
    {
        $claims = AuthMiddleware::authenticate();
        $data = $this->getJsonPayload();

        $comment = trim($data['commentaire'] ?? $data['comment'] ?? '');
        if ($comment === '') {
            Response::error('Le commentaire est obligatoire', 422);
        }

        $this->requests->addComment(
            $requestId,
            $claims['sub'],
            $data['user_name'] ?? ($claims['role'] . ' #' . substr($claims['sub'], 0, 6)),
            $comment,
            (bool) ($data['interne'] ?? false)
        );

        $comments = $this->requests->getComments($requestId);
        Response::success(['comments' => $comments]);
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

    private function validateRequestPayload(array $data): void
    {
        $required = ['vehicle_id', 'type', 'description'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                Response::error("Le champ {$field} est obligatoire", 422);
            }
        }

        $allowedTypes = ['transfert-plaque', 'civio', 'ivn', 'jaugeage', 'immatriculation', 'ppad', 'autre'];
        if (!in_array($data['type'], $allowedTypes, true)) {
            Response::error('Type de demande invalide', 422);
        }
    }
}
