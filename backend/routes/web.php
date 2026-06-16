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

// Auth
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Zone protégée
    Route::middleware('admin.auth')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Stations
        Route::resource('stations', StationController::class);
        Route::patch('stations/{station}/toggle', [StationController::class, 'toggle'])->name('stations.toggle');

        // Slider
        Route::resource('slides', SlideController::class);
        Route::patch('slides/{slide}/toggle', [SlideController::class, 'toggle'])->name('slides.toggle');

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
