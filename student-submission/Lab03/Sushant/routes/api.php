<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\tasksController;
use App\Http\Controllers\taskfilescontroller;
use App\Http\Controllers\taskcategoriesController;

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

Route::get("tasks",[tasksController::class,"index"]);
Route::post("tasks",[tasksController::class,"store"]);
Route::get("tasks/{id}",[tasksController::class,"show"]);
Route::get("tasks/{id}/edit",[tasksController::class,"edit"]);
Route::put("tasks/{id}/update",[tasksController::class,"update"]);
Route::delete("tasks/{id}/delete",[tasksController::class,"delete"]);

Route::get("taskcategories",[taskcategoriesController::class,"index"]);
Route::post("taskcategories",[taskcategoriesController::class,"store"]);
Route::get("taskcategories/{id}",[taskcategoriesController::class,"show"]);
Route::get("taskcategories/{id}/edit",[taskcategoriesController::class,"edit"]);
Route::put("taskcategories/{id}/update",[taskcategoriesController::class,"update"]);
Route::delete("taskcategories/{id}/delete",[taskcategoriesController::class,"delete"]);

Route::post("fileupload",[taskfilescontroller::class,"FileUpload"]);

















