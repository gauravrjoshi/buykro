<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\AffiliateLinkController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [ProductController::class, 'index'])->name('home');
Route::get('/p/{slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/go/{id}', RedirectController::class)->name('links.go');

// Admin Routes (Protected by Auth and Verified)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('products', AdminProductController::class);
    Route::post('products/{product}/links', [AffiliateLinkController::class, 'store'])->name('links.store');
    Route::put('links/{affiliateLink}', [AffiliateLinkController::class, 'update'])->name('links.update');
    Route::delete('links/{affiliateLink}', [AffiliateLinkController::class, 'destroy'])->name('links.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
