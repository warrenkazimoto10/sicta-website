<?php

namespace App\Middleware;

use App\Utils\Logger;
use App\Utils\Response;
use Throwable;

class ErrorHandler
{
    public static function register(): void
    {
        set_exception_handler([self::class, 'handleException']);
        set_error_handler([self::class, 'handleError']);
    }

    public static function handleException(Throwable $exception): void
    {
        $code = $exception->getCode();
        if (!is_int($code) || $code < 400 || $code > 599) {
            $code = 500;
        }

        if ($code >= 500) {
            Logger::error($exception->getMessage(), [
                'exception' => $exception,
            ]);
            $message = 'Erreur interne du serveur';
        } else {
            $message = $exception->getMessage();
        }

        Response::error($message, $code);
    }

    public static function handleError(int $severity, string $message, string $file, int $line): bool
    {
        Logger::error('Erreur PHP', [
            'severity' => $severity,
            'message' => $message,
            'file' => $file,
            'line' => $line,
        ]);

        Response::error('Erreur interne du serveur', 500);
        return true;
    }
}
