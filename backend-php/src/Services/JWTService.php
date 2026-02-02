<?php

namespace App\Services;

use App\Config\Config;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use UnexpectedValueException;
use DateTimeImmutable;
use RuntimeException;

class JWTService
{
    private const DEFAULT_ALGO = 'HS256';

    private static function buildToken(array $claims, string $secret, int $ttl): string
    {
        $now = new DateTimeImmutable();
        $expiresAt = $now->modify('+' . $ttl . ' seconds');

        $payload = array_merge($claims, [
            'iat' => $now->getTimestamp(),
            'nbf' => $now->getTimestamp(),
            'exp' => $expiresAt->getTimestamp(),
        ]);

        return JWT::encode($payload, $secret, self::DEFAULT_ALGO);
    }

    public static function createAccessToken(array $claims, ?int $ttl = null): string
    {
        Config::init();
        $secret = Config::get('JWT_SECRET');
        if (!$secret) {
            throw new RuntimeException('JWT_SECRET est manquant dans le fichier .env');
        }
        $ttl ??= Config::getInt('JWT_EXPIRES_IN', 3600);

        return self::buildToken($claims, $secret, $ttl);
    }

    public static function createRefreshToken(array $claims, ?int $ttl = null): string
    {
        Config::init();
        $secret = Config::get('JWT_REFRESH_SECRET');
        if (!$secret) {
            throw new RuntimeException('JWT_REFRESH_SECRET est manquant dans le fichier .env');
        }
        $ttl ??= Config::getInt('JWT_REFRESH_EXPIRES_IN', 604800);

        return self::buildToken($claims, $secret, $ttl);
    }

    public static function decodeAccessToken(string $token): array
    {
        Config::init();
        $secret = Config::get('JWT_SECRET');
        if (!$secret) {
            throw new RuntimeException('JWT_SECRET est manquant dans le fichier .env');
        }

        return self::decode($token, $secret);
    }

    public static function decodeRefreshToken(string $token): array
    {
        Config::init();
        $secret = Config::get('JWT_REFRESH_SECRET');
        if (!$secret) {
            throw new RuntimeException('JWT_REFRESH_SECRET est manquant dans le fichier .env');
        }

        return self::decode($token, $secret);
    }

    private static function decode(string $token, string $secret): array
    {
        try {
            $decoded = JWT::decode($token, new Key($secret, self::DEFAULT_ALGO));
            return (array) $decoded;
        } catch (ExpiredException|SignatureInvalidException|UnexpectedValueException $exception) {
            throw new RuntimeException('Token JWT invalide: ' . $exception->getMessage(), 0, $exception);
        }
    }
}
