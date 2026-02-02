<?php

namespace App\Utils;

class Response
{
    public static function json(array $data, int $status = 200, array $headers = []): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');

        foreach ($headers as $key => $value) {
            header($key . ': ' . $value);
        }

        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function success(array $data = [], int $status = 200, array $meta = []): void
    {
        $payload = ['status' => 'success'];

        if (!empty($data)) {
            $payload['data'] = $data;
        }

        if (!empty($meta)) {
            $payload['meta'] = $meta;
        }

        self::json($payload, $status);
    }

    public static function error(string $message, int $status = 400, array $errors = []): void
    {
        $payload = [
            'status' => 'error',
            'message' => $message,
        ];

        if (!empty($errors)) {
            $payload['errors'] = $errors;
        }

        self::json($payload, $status);
    }

    public static function paginated(array $items, int $total, int $page, int $limit, int $status = 200): void
    {
        $payload = [
            'status' => 'success',
            'data' => $items,
            'meta' => [
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'totalPages' => (int) ceil($total / max($limit, 1)),
            ],
        ];

        self::json($payload, $status);
    }
}
