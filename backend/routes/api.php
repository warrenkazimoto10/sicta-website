<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StationController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\ArticleMediaController;
use App\Http\Controllers\Api\GalerieController;
use App\Http\Controllers\Api\GalerieMediaController;
use App\Http\Controllers\Api\SlideController;
use App\Http\Controllers\Api\PageSectionController as ApiPageSectionController;

Route::prefix('v1')->group(function () {
    Route::get('/stations', [StationController::class, 'index']);
    Route::get('/stations/nearest', [StationController::class, 'nearest']);
    Route::get('/stats', [StationController::class, 'stats']);
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::post('/contact', [ContactController::class, 'store']);

    Route::get('/articles', [ArticleController::class, 'index']);
    Route::get('/articles/{slug}', [ArticleController::class, 'show']);
    Route::post('/articles/{article}/media', [ArticleMediaController::class, 'store']);
    Route::delete('/articles/{article}/media/{media}', [ArticleMediaController::class, 'destroy']);

    Route::get('/galerie', [GalerieController::class, 'index']);
    Route::post('/galerie/{galerie}/media', [GalerieMediaController::class, 'store']);
    Route::delete('/galerie/{galerie}/media/{media}', [GalerieMediaController::class, 'destroy']);
    Route::get('/galerie/{galerie}', [GalerieController::class, 'show']);

    Route::get('/slides', [SlideController::class, 'index']);
    Route::get('/page-sections/{page}', [ApiPageSectionController::class, 'index']);
});
