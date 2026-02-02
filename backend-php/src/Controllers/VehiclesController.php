<?php

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Models\Vehicle;
use App\Utils\Response;
use RuntimeException;

class VehiclesController
{
    public function __construct(private readonly Vehicle $vehicles = new Vehicle())
    {
    }

    public function index(): void
    {
        $claims = AuthMiddleware::authenticate();
        $companyId = $claims['company_id'];

        $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
        $filters = [
            'statut' => $_GET['statut'] ?? null,
            'agence' => $_GET['agence'] ?? null,
            'search' => $_GET['search'] ?? null,
        ];

        $result = $this->vehicles->getPaginated($companyId, $page, $limit, $filters);

        Response::paginated(
            $result['items'],
            $result['total'],
            $result['page'],
            $result['limit']
        );
    }

    public function show(string $vehicleId): void
    {
        $claims = AuthMiddleware::authenticate();
        $vehicle = $this->vehicles->findById($claims['company_id'], $vehicleId);

        if (!$vehicle) {
            Response::error('Véhicule introuvable', 404);
        }

        Response::success(['vehicle' => $vehicle]);
    }

    public function store(): void
    {
        $claims = AuthMiddleware::authenticate();

        $data = $this->getJsonPayload();
        $this->validateVehiclePayload($data);

        try {
            $vehicle = $this->vehicles->create($claims['company_id'], $data);
            Response::success(['vehicle' => $vehicle], 201);
        } catch (RuntimeException $exception) {
            Response::error($exception->getMessage(), 400);
        }
    }

    public function update(string $vehicleId): void
    {
        $claims = AuthMiddleware::authenticate();
        $existing = $this->vehicles->findById($claims['company_id'], $vehicleId);

        if (!$existing) {
            Response::error('Véhicule introuvable', 404);
        }

        $data = $this->getJsonPayload();
        $this->validateVehiclePayload($data, false);

        $updated = $this->vehicles->update($claims['company_id'], $vehicleId, $data);
        Response::success(['vehicle' => $updated ?? $existing]);
    }

    public function destroy(string $vehicleId): void
    {
        $claims = AuthMiddleware::authenticate();
        $deleted = $this->vehicles->delete($claims['company_id'], $vehicleId);

        if (!$deleted) {
            Response::error('Véhicule introuvable ou suppression impossible', 404);
        }

        Response::success(['message' => 'Véhicule supprimé']);
    }

    public function import(): void
    {
        $claims = AuthMiddleware::authenticate();

        if (empty($_FILES['file'])) {
            Response::error('Fichier CSV manquant', 400);
        }

        $file = $_FILES['file'];
        if ($file['error'] !== UPLOAD_ERR_OK) {
            Response::error('Erreur lors du téléversement du fichier', 400);
        }

        $tmpPath = $file['tmp_name'];
        $handle = fopen($tmpPath, 'r');

        if (!$handle) {
            Response::error('Impossible de lire le fichier CSV', 400);
        }

        $header = fgetcsv($handle, 0, ';');
        if (!$header) {
            fclose($handle);
            Response::error('Fichier CSV vide', 400);
        }

        $created = 0;
        $errors = [];
        $line = 1;

        while (($row = fgetcsv($handle, 0, ';')) !== false) {
            $line++;
            $data = array_combine($header, $row);
            if ($data === false) {
                $errors[] = "Ligne {$line}: format invalide";
                continue;
            }

            try {
                $vehicleData = [
                    'immatriculation' => $data['immatriculation'] ?? null,
                    'marque' => $data['marque'] ?? null,
                    'modele' => $data['modele'] ?? null,
                    'type' => $data['type'] ?? null,
                    'numeroSerie' => $data['numero_serie'] ?? null,
                    'anneeFabrication' => $data['annee_fabrication'] ?? null,
                    'couleur' => $data['couleur'] ?? null,
                    'dernierControle' => $data['dernier_controle'] ?? null,
                    'agence' => $data['agence'] ?? null,
                    'kilometrage' => $data['kilometrage'] ?? null,
                    'notes' => $data['notes'] ?? null,
                ];

                $this->validateVehiclePayload($vehicleData);
                $this->vehicles->create($claims['company_id'], $vehicleData);
                $created++;
            } catch (RuntimeException $exception) {
                $errors[] = "Ligne {$line}: " . $exception->getMessage();
            }
        }

        fclose($handle);

        Response::success([
            'created' => $created,
            'errors' => $errors,
        ]);
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

    private function validateVehiclePayload(array $data, bool $requireAll = true): void
    {
        $required = ['immatriculation', 'marque', 'modele', 'type', 'dernierControle', 'agence'];

        foreach ($required as $field) {
            if ($requireAll && empty($data[$field])) {
                Response::error("Le champ {$field} est obligatoire", 422);
            }
        }

        if (!empty($data['type']) && !in_array($data['type'], ['particulier', 'transport', 'utilitaire', 'poids-lourd'], true)) {
            Response::error('Type de véhicule invalide', 422);
        }

        if (!empty($data['dernierControle']) && !strtotime($data['dernierControle'])) {
            Response::error('Date de dernier contrôle invalide', 422);
        }
    }
}
