<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('tasks/add', [TestController::class, 'addtasks']);

Route::post('taskscategories/add', [TestController::class, 'addtaskscategories']);

Route::get('tasks/show', [TestController::class, 'showtasks']);

Route::get('taskscategories/show', [TestController::class, 'showtaskscategories']);

Route::get('tasks/show/{id}', [TestController::class, 'showtasksbyid']);

Route::get('taskscategories/show/{category_id}', [TestController::class, 'taskscategoriesbyid']);

Route::post('taskscategories/{category_id}/update', [TestController::class, 'updatetaskscategories']);

Route::delete('taskscategories/{category_id}/delete', [TestController::class, 'deletetaskscategories']);