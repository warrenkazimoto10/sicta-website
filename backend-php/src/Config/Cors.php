<?php

namespace App\Config;

class Cors
{
    public static function handle(): void
    {
        Config::init();

        $allowedOrigins = array_map('trim', explode(',', Config::get('CORS_ALLOWED_ORIGINS', 'http://localhost:5173')));
        $allowedMethods = Config::get('CORS_ALLOWED_METHODS', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $allowedHeaders = Config::get('CORS_ALLOWED_HEADERS', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
        $exposedHeaders = Config::get('CORS_EXPOSED_HEADERS', 'Content-Length, X-Kuma-Revision');
        $allowCredentials = Config::getBool('CORS_ALLOW_CREDENTIALS', true);

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if ($origin && (in_array('*', $allowedOrigins, true) || in_array($origin, $allowedOrigins, true))) {
            header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
        } elseif (in_array('*', $allowedOrigins, true)) {
            header('Access-Control-Allow-Origin: *');
        }

        header('Access-Control-Allow-Methods: ' . $allowedMethods);
        header('Access-Control-Allow-Headers: ' . $allowedHeaders);
        header('Access-Control-Expose-Headers: ' . $exposedHeaders);

        if ($allowCredentials) {
            header('Access-Control-Allow-Credentials: true');
        }

        if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}
