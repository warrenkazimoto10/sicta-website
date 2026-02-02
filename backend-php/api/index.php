<?php

use App\Config\Config;
use App\Config\Cors;
use App\Middleware\ErrorHandler;
use App\Controllers\AuthController;
use App\Controllers\VehiclesController;
use App\Controllers\AlertsController;
use App\Controllers\RequestsController;
use App\Controllers\NotificationsController;
use App\Controllers\ReportsController;
use App\Utils\Response;

require dirname(__DIR__) . '/vendor/autoload.php';

Config::init(dirname(__DIR__));
ErrorHandler::register();
Cors::handle();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$basePath = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
$path = '/' . ltrim(str_replace($basePath, '', $uri), '/');

$routes = [
    ['POST', '#^/auth/login$#', [AuthController::class, 'login']],
    ['POST', '#^/auth/refresh$#', [AuthController::class, 'refresh']],
    ['GET', '#^/auth/me$#', [AuthController::class, 'me']],
    ['POST', '#^/auth/logout$#', [AuthController::class, 'logout']],
    ['POST', '#^/auth/forgot-password$#', [AuthController::class, 'forgotPassword']],

    ['GET', '#^/vehicles$#', [VehiclesController::class, 'index']],
    ['POST', '#^/vehicles$#', [VehiclesController::class, 'store']],
    ['GET', '#^/vehicles/([^/]+)$#', [VehiclesController::class, 'show']],
    ['PUT', '#^/vehicles/([^/]+)$#', [VehiclesController::class, 'update']],
    ['DELETE', '#^/vehicles/([^/]+)$#', [VehiclesController::class, 'destroy']],
    ['POST', '#^/vehicles/import$#', [VehiclesController::class, 'import']],

    ['GET', '#^/alerts$#', [AlertsController::class, 'index']],
    ['GET', '#^/alerts/([^/]+)$#', [AlertsController::class, 'show']],
    ['PUT', '#^/alerts/([^/]+)/read$#', [AlertsController::class, 'markAsRead']],
    ['PUT', '#^/alerts/read-all$#', [AlertsController::class, 'markAllAsRead']],
    ['DELETE', '#^/alerts/([^/]+)$#', [AlertsController::class, 'destroy']],
    ['GET', '#^/alerts/settings$#', [AlertsController::class, 'getSettings']],
    ['PUT', '#^/alerts/settings$#', [AlertsController::class, 'updateSettings']],

    ['GET', '#^/requests$#', [RequestsController::class, 'index']],
    ['POST', '#^/requests$#', [RequestsController::class, 'store']],
    ['GET', '#^/requests/([^/]+)$#', [RequestsController::class, 'show']],
    ['PUT', '#^/requests/([^/]+)$#', [RequestsController::class, 'update']],
    ['PUT', '#^/requests/([^/]+)/cancel$#', [RequestsController::class, 'cancel']],
    ['POST', '#^/requests/([^/]+)/comments$#', [RequestsController::class, 'addComment']],

    ['GET', '#^/notifications$#', [NotificationsController::class, 'index']],
    ['GET', '#^/notifications/unread-count$#', [NotificationsController::class, 'unreadCount']],
    ['PUT', '#^/notifications/([^/]+)/read$#', [NotificationsController::class, 'markAsRead']],
    ['PUT', '#^/notifications/read-all$#', [NotificationsController::class, 'markAllAsRead']],
    ['DELETE', '#^/notifications/([^/]+)$#', [NotificationsController::class, 'destroy']],

    ['GET', '#^/reports/monthly$#', [ReportsController::class, 'monthly']],
    ['GET', '#^/reports/annual$#', [ReportsController::class, 'annual']],
    ['GET', '#^/reports/export-vehicles$#', [ReportsController::class, 'exportVehicles']],
    ['GET', '#^/reports/export-history$#', [ReportsController::class, 'exportHistory']],
];

foreach ($routes as [$routeMethod, $pattern, $handler]) {
    if ($method !== $routeMethod) {
        continue;
    }

    if (preg_match($pattern, $path, $matches)) {
        array_shift($matches);
        $controller = new $handler[0]();
        $response = $controller->{$handler[1]}(...$matches);
        if ($response !== null) {
            Response::success(['data' => $response]);
        }
        return;
    }
}

Response::error('Route non trouvée', 404);
