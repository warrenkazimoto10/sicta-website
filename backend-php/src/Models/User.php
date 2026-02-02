<?php

namespace App\Models;

use PDO;

class User extends BaseModel
{
    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user ?: null;
    }

    public function findById(string $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM users WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user ?: null;
    }

    public function findWithCompanyByEmail(string $email): ?array
    {
        $sql = 'SELECT u.*, c.id AS company_id, c.nom AS company_name, c.email AS company_email
                FROM users u
                JOIN companies c ON c.id = u.company_id
                WHERE u.email = :email LIMIT 1';
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user ?: null;
    }

    public function findWithCompanyById(string $id): ?array
    {
        $sql = 'SELECT u.*, c.id AS company_id, c.nom AS company_name, c.email AS company_email
                FROM users u
                JOIN companies c ON c.id = u.company_id
                WHERE u.id = :id LIMIT 1';
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user ?: null;
    }

    public function updateLastLogin(string $id): void
    {
        $stmt = $this->db->prepare('UPDATE users SET derniere_connexion = NOW() WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }

    public function toPublicArray(array $user): array
    {
        return [
            'id' => $user['id'],
            'email' => $user['email'],
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'role' => $user['role'],
            'companyId' => $user['company_id'] ?? null,
            'companyName' => $user['company_name'] ?? null,
            'companyEmail' => $user['company_email'] ?? null,
        ];
    }
}
