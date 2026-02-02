<?php

namespace App\Controllers;

use App\Services\AuthService;
use App\Utils\Response;
use App\Middleware\AuthMiddleware;
use InvalidArgumentException;
use RuntimeException;

class AuthController
{
    public function __construct(private readonly AuthService $authService = new AuthService())
    {
    }

    public function login(): void
    {
        $payload = $this->getJsonPayload();

        $email = trim($payload['email'] ?? '');
        $password = (string) ($payload['password'] ?? '');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
            Response::error('Email ou mot de passe invalide', 422);
        }

        try {
            $result = $this->authService->attemptLogin($email, $password);
            Response::success($result);
        } catch (InvalidArgumentException $exception) {
            Response::error($exception->getMessage(), 401);
        } catch (RuntimeException $exception) {
            Response::error($exception->getMessage(), $exception->getCode() ?: 500);
        }
    }

    public function refresh(): void
    {
        $payload = $this->getJsonPayload();
        $refreshToken = $payload['refreshToken'] ?? '';

        if (!$refreshToken) {
            Response::error('Token de rafraîchissement manquant', 422);
        }

        try {
            $tokens = $this->authService->refreshTokens($refreshToken);
            Response::success($tokens);
        } catch (RuntimeException $exception) {
            Response::error($exception->getMessage(), 401);
        }
    }

    public function me(): void
    {
        $claims = AuthMiddleware::authenticate();

        try {
            $data = $this->authService->getAuthenticatedUser($claims);
            Response::success($data);
        } catch (RuntimeException $exception) {
            Response::error($exception->getMessage(), $exception->getCode() ?: 500);
        }
    }

    public function logout(): void
    {
        AuthMiddleware::authenticate();
        Response::success(['message' => 'Déconnexion réussie']);
    }

    public function forgotPassword(): void
    {
        Response::error('Fonctionnalité non implémentée', 501);
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
