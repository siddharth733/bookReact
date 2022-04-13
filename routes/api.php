<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\FaviourateController;
use App\Http\Controllers\Api\FrontendController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('faviourate/{book}', [FaviourateController::class, 'store']);
Route::get('get-faviourate', [FaviourateController::class, 'view']);
Route::get('get-profile', [AuthController::class, 'profile']);
Route::get('get-dashboard', [AuthController::class, 'dashboard']);
Route::get('cheack-faviourate/{book}', [FaviourateController::class, 'cheack']);
Route::get('get-category', [FrontendController::class, 'index']);
Route::get('get-books/{slug}', [FrontendController::class, 'view']);
Route::get('get-booksdetail/{book}', [FrontendController::class, 'detail']);
Route::get('get-bookread/{book}/read', [FrontendController::class, 'read']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum', 'isApiAdmin'])->group(function () {
    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message' => "You are in", 'status' => 200], 200);
    });

    Route::post('store-category', [CategoryController::class, 'store']);

    Route::get('view-category', [CategoryController::class, 'view']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'delete']);
    Route::post('register-salesmanager', [AuthController::class, 'salesmanager']);
    Route::get('view-salemanager', [AuthController::class, 'viewsale']);
    Route::delete('delete-salemanager/{id}', [AuthController::class, 'deletesale']);
    Route::get('edit-salemanager/{id}', [AuthController::class, 'editsale']);
    Route::put('update-salemanager/{id}', [AuthController::class, 'updatesale']);
    Route::get('get-allwork', [AuthController::class, 'allwork']);
});

Route::middleware(['auth:sanctum', 'isApiAuthor'])->group(function () {
    Route::get('/authorCheckingAuthenticated', function () {
        return response()->json(['message' => "You are in", 'status' => 200], 200);
    });
    Route::get('all-category', [CategoryController::class, 'allcategory']);
    Route::post('store-books', [BookController::class, 'store']);
    Route::get('view-books', [BookController::class, 'view']);
    Route::get('edit-books/{id}', [BookController::class, 'edit']);
    Route::put('update-books/{id}', [BookController::class, 'update']);
    Route::delete('delete-book/{id}', [BookController::class, 'delete']);
});

Route::middleware(['auth:sanctum', 'isApiManager'])->group(function () {
    Route::get('/managerCheckingAuthenticated', function () {
        return response()->json(['message' => "You are in", 'status' => 200], 200);
    });
    Route::post('register-author', [AuthController::class, 'addauthor']);
    Route::get('view-author', [AuthController::class, 'viewauthor']);
    Route::delete('delete-author/{id}', [AuthController::class, 'deleteauthor']);
    Route::get('edit-author/{id}', [AuthController::class, 'editauthor']);
    Route::put('update-author/{id}', [AuthController::class, 'updateauthor']);
    Route::get('get-authorwork', [AuthController::class, 'viewauthorwork']);
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
