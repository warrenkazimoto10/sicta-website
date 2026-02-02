<?php

namespace App\Models;

use PDO;

class Company extends BaseModel
{
    public function findById(string $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM companies WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $company = $stmt->fetch(PDO::FETCH_ASSOC);

        return $company ?: null;
    }
}
