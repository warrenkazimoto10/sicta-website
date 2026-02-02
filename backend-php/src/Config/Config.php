<?php

namespace App\Config;

use Dotenv\Dotenv;

class Config
{
    private static bool $initialized = false;

    public static function init(string $basePath = __DIR__ . '/../../..'): void
    {
        if (self::$initialized) {
            return;
        }

        if (file_exists($basePath . '/.env')) {
            $dotenv = Dotenv::createImmutable($basePath);
            $dotenv->safeLoad();
        }

        self::$initialized = true;
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        self::init();

        $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);

        if ($value === false || $value === null) {
            return $default;
        }

        return $value;
    }

    public static function getInt(string $key, int $default = 0): int
    {
        return (int) self::get($key, $default);
    }

    public static function getBool(string $key, bool $default = false): bool
    {
        $value = self::get($key);
        if ($value === null) {
            return $default;
        }

        return filter_var($value, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE) ?? $default;
    }
}
