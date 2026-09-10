<?php
/**
 * SICTA — Script de maintenance Laravel (LWS)
 * ─────────────────────────────────────────────
 * Déposer dans : backend/public/clear-cache.php
 * Accès via    : https://sicta.cieria-app.com/clear-cache.php?secret=sicta-clear-2026
 *
 * ⚠️  SUPPRIMER CE FICHIER DÈS QUE LE PROBLÈME EST RÉSOLU.
 */

// ── Sécurité minimale ────────────────────────────────────────────────────────
define('SECRET', 'sicta-clear-2026');
if (($_GET['secret'] ?? '') !== SECRET) {
    http_response_code(403);
    die('<h2 style="font-family:sans-serif;color:red">403 — Accès refusé.<br><small>Ajouter ?secret=sicta-clear-2026 dans l\'URL</small></h2>');
}

// ── Bootstrap Laravel ────────────────────────────────────────────────────────
define('LARAVEL_START', microtime(true));

// Fix LWS : REQUEST_URI peut être perdu après mod_rewrite
if (isset($_SERVER['REDIRECT_URL'])) {
    $_SERVER['REQUEST_URI'] = $_SERVER['REDIRECT_URL'];
}

require __DIR__ . '/../vendor/autoload.php';

/** @var \Illuminate\Foundation\Application $app */
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->usePublicPath(dirname(__DIR__, 2));

// Boot sans gérer la requête — on a juste besoin des services
$app->boot();

// ── Utilitaires ──────────────────────────────────────────────────────────────
function clearDir(string $dir, string $keep = '.gitignore'): array
{
    $results = [];
    if (!is_dir($dir)) {
        return ["⚠️  Dossier introuvable : $dir"];
    }
    foreach (new \FilesystemIterator($dir) as $file) {
        if ($file->getFilename() === $keep) continue;
        if ($file->isDir()) {
            foreach (new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($file->getPathname(), \FilesystemIterator::SKIP_DOTS),
                \RecursiveIteratorIterator::CHILD_FIRST
            ) as $sub) {
                $sub->isDir() ? @rmdir($sub->getPathname()) : @unlink($sub->getPathname());
            }
            @rmdir($file->getPathname());
            $results[] = "🗑️  Supprimé : " . $file->getPathname();
        } else {
            @unlink($file->getPathname());
            $results[] = "🗑️  Supprimé : " . $file->getPathname();
        }
    }
    return $results ?: ["✅  Dossier déjà vide"];
}

// ── Chemins à vider ───────────────────────────────────────────────────────────
$basePath = $app->basePath();

$targets = [
    'Config cache'       => $basePath . '/bootstrap/cache',
    'Views compilées'    => $basePath . '/storage/framework/views',
    'Cache framework'    => $basePath . '/storage/framework/cache/data',
    'Sessions'           => $basePath . '/storage/framework/sessions',
];

// ── Exécution ─────────────────────────────────────────────────────────────────
$log = [];
foreach ($targets as $label => $path) {
    $log[$label] = clearDir($path);
}

// ── Artisan ───────────────────────────────────────────────────────────────────
$artisanResults = [];
$commands = ['cache:clear', 'view:clear', 'config:clear', 'route:clear'];
foreach ($commands as $cmd) {
    try {
        \Illuminate\Support\Facades\Artisan::call($cmd);
        $output = trim(\Illuminate\Support\Facades\Artisan::output());
        $artisanResults[] = "✅  $cmd → " . ($output ?: 'OK');
    } catch (\Throwable $e) {
        $artisanResults[] = "❌  $cmd → " . $e->getMessage();
    }
}

// ── Dernières lignes du log Laravel ──────────────────────────────────────────
$logFile  = $basePath . '/storage/logs/laravel.log';
$lastLogs = [];
if (file_exists($logFile) && is_readable($logFile)) {
    // Lecture manuelle des N dernières lignes (sans shell_exec)
    $fp    = fopen($logFile, 'rb');
    $chunk = 8192;
    $lines = [];
    fseek($fp, 0, SEEK_END);
    $size = ftell($fp);
    $pos  = max(0, $size - $chunk * 10);
    fseek($fp, $pos);
    $content = fread($fp, $size - $pos);
    fclose($fp);
    $lines    = explode("\n", $content);
    $lastLogs = array_slice(array_filter($lines), -60);
} else {
    $lastLogs = ['(Aucun fichier de log trouvé — laravel.log manquant ou illisible)'];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SICTA — Clear Cache</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; }
  header { background: #1e293b; padding: 1.25rem 2rem; display: flex; align-items: center; gap: 1rem; border-bottom: 2px solid #f97316; }
  header h1 { margin: 0; font-size: 1.25rem; color: #f97316; }
  header .badge { font-size: .78rem; background: #dc2626; color: white; padding: 2px 10px; border-radius: 9999px; }
  main { max-width: 1000px; margin: 2rem auto; padding: 0 1rem 4rem; }
  section { background: #1e293b; border-radius: .75rem; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; }
  h2 { margin: 0 0 .75rem; font-size: .85rem; color: #94a3b8; text-transform: uppercase; letter-spacing: .08em; font-weight: 600; }
  ul { margin: 0; padding: 0; list-style: none; }
  ul li { padding: .3rem 0; font-size: .83rem; border-bottom: 1px solid #334155; }
  ul li:last-child { border: 0; }
  pre { background: #0f172a; border-radius: .5rem; padding: 1rem; font-size: .75rem; color: #a3e635; overflow-x: auto; max-height: 420px; overflow-y: auto; white-space: pre-wrap; word-break: break-all; margin: 0; }
  .ok   { color: #4ade80; }
  .warn { color: #facc15; }
  .err  { color: #f87171; }
  footer { text-align: center; padding: 2rem; color: #475569; font-size: .78rem; }
  .alert { background: #7f1d1d; border: 1px solid #dc2626; color: #fca5a5; border-radius: .5rem; padding: .75rem 1rem; margin-bottom: 1.5rem; font-size: .85rem; }
</style>
</head>
<body>
<header>
  <h1>🧹 SICTA — Clear Cache</h1>
  <span class="badge">MAINTENANCE</span>
  <small style="margin-left:auto;color:#64748b"><?= date('d/m/Y H:i:s') ?> UTC</small>
</header>
<main>

  <div class="alert">
    ⚠️ <strong>Fichier de maintenance</strong> — Supprimez <code>clear-cache.php</code> du serveur dès que le problème est résolu.
  </div>

  {{-- Artisan --}}
  <section>
    <h2>⚙️ Artisan Commands</h2>
    <ul>
      <?php foreach ($artisanResults as $r): ?>
        <li><?= htmlspecialchars($r) ?></li>
      <?php endforeach; ?>
    </ul>
  </section>

  {{-- Fichiers supprimés --}}
  <?php foreach ($log as $label => $items): ?>
  <section>
    <h2>📁 <?= htmlspecialchars($label) ?></h2>
    <ul>
      <?php foreach ($items as $item): ?>
        <li><?= htmlspecialchars($item) ?></li>
      <?php endforeach; ?>
    </ul>
  </section>
  <?php endforeach; ?>

  {{-- Log Laravel --}}
  <section>
    <h2>📋 Dernières lignes — laravel.log</h2>
    <pre><?php
      foreach ($lastLogs as $line) {
          echo htmlspecialchars($line) . "\n";
      }
    ?></pre>
  </section>

  {{-- Infos serveur --}}
  <section>
    <h2>ℹ️ Infos serveur</h2>
    <ul>
      <li><strong>PHP :</strong> <?= PHP_VERSION ?></li>
      <li><strong>APP_ENV :</strong> <?= htmlspecialchars(env('APP_ENV', '?')) ?></li>
      <li><strong>APP_DEBUG :</strong>
        <?= env('APP_DEBUG') ? '<span class="warn">true ⚠️</span>' : '<span class="ok">false ✅</span>' ?>
      </li>
      <li><strong>DB_DATABASE :</strong> <?= htmlspecialchars(env('DB_DATABASE', '?')) ?></li>
      <li><strong>DB_HOST :</strong> <?= htmlspecialchars(env('DB_HOST', '?')) ?></li>
      <li><strong>base_path :</strong> <?= htmlspecialchars($basePath) ?></li>
      <li><strong>public_path :</strong> <?= htmlspecialchars(public_path()) ?></li>
      <li><strong>storage/logs writable :</strong>
        <?= is_writable($basePath.'/storage/logs') ? '<span class="ok">oui ✅</span>' : '<span class="err">non ❌</span>' ?>
      </li>
      <li><strong>bootstrap/cache writable :</strong>
        <?= is_writable($basePath.'/bootstrap/cache') ? '<span class="ok">oui ✅</span>' : '<span class="err">non ❌</span>' ?>
      </li>
      <li><strong>storage/framework/views writable :</strong>
        <?= is_writable($basePath.'/storage/framework/views') ? '<span class="ok">oui ✅</span>' : '<span class="err">non ❌</span>' ?>
      </li>
      <li><strong>vendor/autoload.php présent :</strong>
        <?= file_exists($basePath.'/vendor/autoload.php') ? '<span class="ok">oui ✅</span>' : '<span class="err">non ❌</span>' ?>
      </li>
    </ul>
  </section>

</main>
<footer>⚠️ Supprimez ce fichier dès que le problème est résolu — il expose des informations sensibles.</footer>
</body>
</html>
