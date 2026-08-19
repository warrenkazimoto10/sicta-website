<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Fix LWS : Apache ne préserve pas REQUEST_URI après mod_rewrite
if (isset($_SERVER['REDIRECT_URL'])) {
    $_SERVER['REQUEST_URI'] = $_SERVER['REDIRECT_URL'];
    if (!empty($_SERVER['REDIRECT_QUERY_STRING'])) {
        $_SERVER['REQUEST_URI'] .= '?' . $_SERVER['REDIRECT_QUERY_STRING'];
    }
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

// Public path = racine du site (deux niveaux au-dessus de backend/public/)
$app->usePublicPath(dirname(__DIR__, 2));

$app->handleRequest(Request::capture());
