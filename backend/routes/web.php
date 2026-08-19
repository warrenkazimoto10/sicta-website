<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\StationController;
use App\Http\Controllers\Admin\SlideController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\CategorieArticleController;
use App\Http\Controllers\Admin\GalerieController;
use App\Http\Controllers\Admin\ReservationController;
use App\Http\Controllers\Admin\MessageContactController;
use App\Http\Controllers\Admin\PageSectionController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\ServiceSectionController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\HistoryEventController;
use App\Http\Controllers\Admin\MapEditorController;
use App\Http\Controllers\Admin\UploadController;

// Auth
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Zone protégée
    Route::middleware('admin.auth')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::post('/upload/image', [UploadController::class, 'image'])->name('upload.image');

        // Stations
        Route::resource('stations', StationController::class);
        Route::patch('stations/{station}/toggle', [StationController::class, 'toggle'])->name('stations.toggle');

        // Carte du réseau (éditeur de points par glisser-déposer)
        Route::get('reseau-carte', [MapEditorController::class, 'index'])->name('reseau-carte.index');
        Route::post('reseau-carte/image', [MapEditorController::class, 'uploadImage'])->name('reseau-carte.image');
        Route::post('reseau-carte', [MapEditorController::class, 'save'])->name('reseau-carte.save');

        // Slider
        Route::resource('slides', SlideController::class);
        Route::patch('slides/{slide}/toggle', [SlideController::class, 'toggle'])->name('slides.toggle');

        // Services (page builder)
        Route::resource('services', ServiceController::class);
        Route::patch('services/{service}/toggle', [ServiceController::class, 'toggle'])->name('services.toggle');
        Route::get('services/{service}/sections/create', [ServiceSectionController::class, 'create'])->name('services.sections.create');
        Route::post('services/{service}/sections', [ServiceSectionController::class, 'store'])->name('services.sections.store');
        Route::get('sections/{section}/edit', [ServiceSectionController::class, 'edit'])->name('services.sections.edit');
        Route::put('sections/{section}', [ServiceSectionController::class, 'update'])->name('services.sections.update');
        Route::delete('sections/{section}', [ServiceSectionController::class, 'destroy'])->name('services.sections.destroy');
        Route::patch('sections/{section}/move/{dir}', [ServiceSectionController::class, 'move'])->name('services.sections.move');

        // Actualités
        Route::resource('articles', ArticleController::class);
        Route::post('articles/{article}/duplicate', [ArticleController::class, 'duplicate'])->name('articles.duplicate');
        Route::resource('categories', CategorieArticleController::class)->only(['index', 'store', 'update', 'destroy']);

        // Galerie
        Route::resource('galerie', GalerieController::class);

        // Réservations
        Route::get('reservations/export/csv', [ReservationController::class, 'exportCsv'])->name('reservations.export');
        Route::resource('reservations', ReservationController::class)->only(['index', 'show', 'destroy']);
        Route::patch('reservations/{reservation}/statut', [ReservationController::class, 'updateStatut'])->name('reservations.statut');

        // Messages
        Route::resource('messages', MessageContactController::class)->only(['index', 'show', 'destroy']);

        // Équipe & Histoire (page À propos)
        Route::resource('team', TeamMemberController::class)->except(['show']);
        Route::patch('team/{team}/toggle', [TeamMemberController::class, 'toggle'])->name('team.toggle');
        Route::resource('history', HistoryEventController::class)->except(['show']);
        Route::patch('history/{history}/toggle', [HistoryEventController::class, 'toggle'])->name('history.toggle');

        // Contenu des pages (page sections)
        Route::get('page-sections/home',  [PageSectionController::class, 'home'])->name('page-sections.home');
        Route::get('page-sections/about', [PageSectionController::class, 'about'])->name('page-sections.about');
        Route::put('page-sections/{page}', [PageSectionController::class, 'update'])->name('page-sections.update');
        Route::patch('messages/{message}/toggle-lu', [MessageContactController::class, 'toggleLu'])->name('messages.toggle-lu');
    });
});

Route::get('/', function () {
    return redirect()->route('admin.login');
});
