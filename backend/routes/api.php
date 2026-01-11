<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NivelController;
use App\Http\Controllers\DesenvolvedorController;

// Níveis
Route::apiResource('niveis', NivelController::class);
Route::get('niveis/{id}/desenvolvedores', [NivelController::class, 'desenvolvedores']);

// Desenvolvedores
Route::apiResource('desenvolvedores', DesenvolvedorController::class);
Route::get('desenvolvedores/{id}/nivel', [DesenvolvedorController::class, 'nivel']);
