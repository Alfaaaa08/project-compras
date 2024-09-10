<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\OrcamentoRoutineController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/register', function () {
    return Inertia::render('Register');
});

Route::get('/', function () {
    return Inertia::render('/', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/routine', [RoutineController::class, 'index'])->name('routine');

Route::get('/includeRoutine', function () {
    return Inertia::render('IncludeRoutine');
});

Route::post('/orcamento/routine/include', [OrcamentoRoutineController::class, 'store'])->name('/orcamento/routine/include');

Route::post('/save/register', [RegisterController::class, 'store'])->name('/save/register');

Route::post('/save/login', [LoginController::class, 'store'])->name('/save/login');

require __DIR__.'/auth.php';

