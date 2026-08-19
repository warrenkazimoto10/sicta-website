<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Stockage centralisé des fichiers uploadés depuis l'admin.
 * Les images sont redimensionnées et recompressées avant stockage (l'hébergeur
 * LWS ne supporte pas les liens symboliques : le disque 'public' pointe
 * directement dans le dossier servi par Apache, voir config/filesystems.php).
 * Les fichiers non-image (vidéos, etc.) sont stockés tels quels.
 */
class ImageUploadService
{
    private const MAX_DIMENSION = 1920;
    private const JPEG_QUALITY = 82;
    private const WEBP_QUALITY = 82;
    private const PNG_COMPRESSION = 6;

    public static function store(UploadedFile $file, string $folder): string
    {
        $extension = strtolower($file->getClientOriginalExtension() ?: $file->extension() ?: 'bin');
        $filename = Str::random(40) . '.' . $extension;
        $path = trim($folder, '/') . '/' . $filename;

        $isImage = str_starts_with($file->getMimeType() ?? '', 'image/');
        $processed = $isImage ? self::resizeAndCompress($file->getRealPath()) : null;
        $contents = $processed ?? file_get_contents($file->getRealPath());

        Storage::disk('public')->put($path, $contents);

        return $path;
    }

    /**
     * Renvoie null (fichier original conservé tel quel) si GD est indisponible,
     * si le format n'est pas géré, ou pour les GIF (pour ne pas casser une animation).
     */
    private static function resizeAndCompress(string $filePath): ?string
    {
        if (! extension_loaded('gd')) {
            return null;
        }

        $info = @getimagesize($filePath);
        if (! $info) {
            return null;
        }

        [$width, $height, $type] = $info;

        $source = match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($filePath),
            IMAGETYPE_PNG => @imagecreatefrompng($filePath),
            IMAGETYPE_WEBP => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($filePath) : false,
            default => false,
        };

        if (! $source) {
            return null;
        }

        $scale = min(1, self::MAX_DIMENSION / max($width, $height));
        $targetWidth = max(1, (int) round($width * $scale));
        $targetHeight = max(1, (int) round($height * $scale));

        $target = imagecreatetruecolor($targetWidth, $targetHeight);

        if ($type === IMAGETYPE_PNG) {
            imagealphablending($target, false);
            imagesavealpha($target, true);
        }

        imagecopyresampled($target, $source, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);

        ob_start();
        $ok = match ($type) {
            IMAGETYPE_JPEG => imagejpeg($target, null, self::JPEG_QUALITY),
            IMAGETYPE_PNG => imagepng($target, null, self::PNG_COMPRESSION),
            IMAGETYPE_WEBP => imagewebp($target, null, self::WEBP_QUALITY),
            default => false,
        };
        $data = ob_get_clean();

        imagedestroy($source);
        imagedestroy($target);

        return $ok && $data ? $data : null;
    }
}
