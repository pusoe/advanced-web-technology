<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskCategoryController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {return "Welcome to task management service";});
Route::get('/tasks', [TaskController::class, 'index']);
Route::get('/tasks/{id}', [TaskController::class, 'show']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::put('/tasks/{id}', [TaskController::class, 'update']);
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
Route::get('/tasks-by-category-id/{task_category_id}', [TaskController::class, 'getTasksByTaskCategory']);
Route::post('/tasks-file-upload/{id}', [TaskController::class, 'storeFile']);
Route::get('/tasks-file-download/{id}', [TaskController::class, 'downloadFile']);

Route::get('/task-categories', [TaskCategoryController::class, 'index']);
Route::get('/task-categories/{id}', [TaskCategoryController::class, 'show']);
Route::post('/task-categories', [TaskCategoryController::class, 'store']);
Route::put('/task-categories/{id}', [TaskCategoryController::class, 'update']);
Route::delete('/task-categories/{id}', [TaskCategoryController::class, 'destroy']);
