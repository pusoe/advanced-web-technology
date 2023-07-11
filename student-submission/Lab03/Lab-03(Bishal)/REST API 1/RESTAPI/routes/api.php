<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\tasksController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('tasks', [tasksController::class, 'index']);
Route::get('tasks', [tasksController::class, 'index1']);
Route::get('tasks/{id}', [tasksController::class, 'show']);
Route::post('tasks/{id}/update', [tasksController::class, 'update']);
//Route::put('tasks/{id}/update', [tasksController::class, 'update']);  (Can be done by this as well)
Route::delete('tasks/{id}/delete', [tasksController::class, 'delete']);