<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\DesenvolvedorController;
use App\Http\Controllers\AuthController;

Route::post('/registrar', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Níveis
    Route::apiResource('niveis', NivelController::class);
    Route::get('niveis/{id}/desenvolvedores', [NivelController::class, 'desenvolvedores']);

    // Desenvolvedores
    Route::apiResource('desenvolvedores', DesenvolvedorController::class);
    Route::get('desenvolvedores/{id}/nivel', [DesenvolvedorController::class, 'nivel']);
});
