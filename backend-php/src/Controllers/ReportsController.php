<?php

namespace App\Controllers;

use App\Middleware\AuthMiddleware;
use App\Utils\Response;

class ReportsController
{
    public function monthly(): void
    {
        AuthMiddleware::authenticate();
        Response::error('Génération de rapports non implémentée', 501);
    }

    public function annual(): void
    {
        AuthMiddleware::authenticate();
        Response::error('Génération de rapports non implémentée', 501);
    }

    public function exportVehicles(): void
    {
        AuthMiddleware::authenticate();
        Response::error('Export de véhicules non implémenté', 501);
    }

    public function exportHistory(): void
    {
        AuthMiddleware::authenticate();
        Response::error('Export de l\'historique non implémenté', 501);
    }
}
