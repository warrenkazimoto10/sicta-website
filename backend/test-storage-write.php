<?php
require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$app->boot();

try {
    \Illuminate\Support\Facades\Storage::disk('public')->put('history/test_write_check.txt', 'ok');
    $target = public_path('storage/history/test_write_check.txt');
    echo "Write OK\n";
    echo "File exists: " . (file_exists($target) ? 'YES' : 'NO') . "\n";
    echo "Path: $target\n";
} catch (\Exception $e) {
    echo "WRITE FAILED: " . $e->getMessage() . "\n";
}
