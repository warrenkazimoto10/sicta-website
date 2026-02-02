<?php

namespace App\Middleware;

use App\Services\JWTService;
use App\Utils\Response;
use RuntimeException;
use Throwable;

class AuthMiddleware
{
    public static function authenticate(): array
    {
        $headers = function_exists('getallheaders') ? getallheaders() : [];
        $authorization = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        if (!preg_match('/Bearer\s+(.*)$/i', $authorization, $matches)) {
            Response::error('Token d\'authentification manquant', 401);
        }

        $token = trim($matches[1]);

        try {
            $claims = JWTService::decodeAccessToken($token);
        } catch (RuntimeException $exception) {
            Response::error($exception->getMessage(), 401);
        } catch (Throwable $throwable) {
            Response::error('Token invalide', 401);
        }

        return $claims;
    }

    public static function ensureRole(array|string $roles, array $claims): void
    {
        $roles = (array) $roles;
        $userRole = $claims['role'] ?? null;

        if (!in_array($userRole, $roles, true)) {
            Response::error('Accès interdit', 403);
        }
    }
}
