<?php

namespace App\Config;

use PDO;
use PDOException;
use RuntimeException;

class Database
{
    private static ?PDO $connection = null;

    public static function getConnection(): PDO
    {
        if (self::$connection instanceof PDO) {
            return self::$connection;
        }

        Config::init();

        $host = Config::get('DB_HOST', 'localhost');
        $port = Config::getInt('DB_PORT', 3306);
        $database = Config::get('DB_NAME', 'sicta_bd');
        $username = Config::get('DB_USER', 'root');
        $password = Config::get('DB_PASSWORD', '');

        $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $host, $port, $database);

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4'"
        ];

        try {
            self::$connection = new PDO($dsn, $username, $password, $options);
        } catch (PDOException $exception) {
            throw new RuntimeException('Erreur de connexion à la base de données: ' . $exception->getMessage(), 0, $exception);
        }

        return self::$connection;
    }

    public static function close(): void
    {
        self::$connection = null;
    }
}
