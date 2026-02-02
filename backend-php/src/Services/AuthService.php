<?php

namespace App\Services;

use App\Models\User;
use App\Models\Company;
use App\Config\Config;
use App\Utils\Logger;
use InvalidArgumentException;
use RuntimeException;

class AuthService
{
    private User $users;
    private Company $companies;

    public function __construct(?User $userModel = null, ?Company $companyModel = null)
    {
        $this->users = $userModel ?? new User();
        $this->companies = $companyModel ?? new Company();
    }

    public function attemptLogin(string $email, string $password): array
    {
        $user = $this->users->findWithCompanyByEmail($email);

        if (!$user || !password_verify($password, $user['password_hash'])) {
            Logger::warning('Tentative de connexion échouée', ['email' => $email]);
            throw new InvalidArgumentException('Identifiants invalides');
        }

        if (!(bool) $user['actif']) {
            throw new RuntimeException("Le compte est désactivé.", 403);
        }

        $company = $this->companies->findById($user['company_id']);
        if (!$company) {
            throw new RuntimeException('Entreprise introuvable', 404);
        }

        $claims = [
            'sub' => $user['id'],
            'company_id' => $user['company_id'],
            'role' => $user['role'],
        ];

        $accessToken = JWTService::createAccessToken($claims);
        $refreshToken = JWTService::createRefreshToken($claims);

        $this->users->updateLastLogin($user['id']);

        return [
            'user' => $this->users->toPublicArray($user),
            'company' => $company,
            'token' => $accessToken,
            'refreshToken' => $refreshToken,
            'expiresIn' => Config::getInt('JWT_EXPIRES_IN', 3600),
        ];
    }

    public function refreshTokens(string $refreshToken): array
    {
        $claims = JWTService::decodeRefreshToken($refreshToken);

        $newAccessToken = JWTService::createAccessToken($claims);
        $newRefreshToken = JWTService::createRefreshToken($claims);

        return [
            'token' => $newAccessToken,
            'refreshToken' => $newRefreshToken,
            'expiresIn' => Config::getInt('JWT_EXPIRES_IN', 3600),
        ];
    }

    public function getAuthenticatedUser(array $claims): array
    {
        $user = $this->users->findWithCompanyById($claims['sub']);
        if (!$user) {
            throw new RuntimeException('Utilisateur introuvable', 404);
        }

        $company = $this->companies->findById($user['company_id']);
        if (!$company) {
            throw new RuntimeException('Entreprise introuvable', 404);
        }

        return [
            'user' => $this->users->toPublicArray($user),
            'company' => $company,
        ];
    }

    public static function hashPassword(string $password): string
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }
}
