<?php

namespace App\Utils;

use App\Config\Config;
use Monolog\Handler\StreamHandler;
use Monolog\Logger as MonoLogger;
use Monolog\Processor\UidProcessor;

class Logger
{
    private static ?MonoLogger $logger = null;

    public static function getLogger(): MonoLogger
    {
        if (self::$logger instanceof MonoLogger) {
            return self::$logger;
        }

        Config::init();

        $channel = Config::get('LOG_CHANNEL', 'sicta');
        $logPath = Config::get('LOG_PATH', __DIR__ . '/../../../storage/logs/app.log');
        $logLevel = Config::get('LOG_LEVEL', 'debug');

        $logger = new MonoLogger($channel);
        $logger->pushProcessor(new UidProcessor());
        $logger->pushHandler(new StreamHandler($logPath, MonoLogger::toMonologLevel($logLevel)));

        self::$logger = $logger;

        return self::$logger;
    }

    public static function info(string $message, array $context = []): void
    {
        self::getLogger()->info($message, $context);
    }

    public static function warning(string $message, array $context = []): void
    {
        self::getLogger()->warning($message, $context);
    }

    public static function error(string $message, array $context = []): void
    {
        self::getLogger()->error($message, $context);
    }
}
