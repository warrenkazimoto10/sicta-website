<?php

namespace App\Models;

use App\Config\Database;
use PDO;

abstract class BaseModel
{
    protected PDO $db;

    public function __construct()
    {
        $this->db = Database::getConnection();
    }

    protected function generateUuid(): string
    {
        $stmt = $this->db->query('SELECT UUID() AS uuid');
        $uuid = $stmt->fetchColumn();

        return $uuid ?: bin2hex(random_bytes(16));
    }
}
