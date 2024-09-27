<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CustomPasswordResetController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\OrcamentoRoutineController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\PdfOrcamentoController;

#region Home
Route::get('/', function () {
    return Inertia::render('/', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

#endregion

#region Register
Route::get('/register', function () {
    return Inertia::render('Register');
});

Route::post('/save/register', [RegisterController::class, 'store'])->name('/save/register');

Route::post('/register/verifyEmailRegistered', [RegisterController::class, 'verifyEmailRegistered'])->name('/register/verifyEmailRegistered');

#endregion

#region Login 
Route::post('/save/login', [LoginController::class, 'store'])->name('/save/login');

Route::post('/login/verifylogin', [LoginController::class, 'verifyLogin'])->name('/login/verifylogin');

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::post('login/resetPassword', [CustomPasswordResetController::class, 'resetPassword'])->name('login/resetPassword');
#endregion

#region Orçamento
Route::get('/routine', [RoutineController::class, 'index'])->name('routine');

Route::get('/includeRoutine', function () {
    return Inertia::render('IncludeRoutine');
});

Route::post('/orcamento/routine/include', [OrcamentoRoutineController::class, 'store'])->name('/orcamento/routine/include');

Route::post('/orcamento/routine/delete', [RoutineController::class, 'delete'])->name('/orcamento/routine/delete');

Route::post('/orcamento/routine/print', [PdfOrcamentoController::class, 'print'])->name('/orcamento/routine/print');

#endregion

#region Entidade
Route::get('/entidade-routine', function () {
    return Inertia::render('EntidadeRoutine');
});

#endregion

require __DIR__.'/auth.php';

