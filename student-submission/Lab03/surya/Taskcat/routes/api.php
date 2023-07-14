<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\indexcontroller;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('tasks/add', [indexcontroller::class, 'addtasks']);
Route::post('taskscategories/add', [indexcontroller::class, 'addtaskscategories']);
Route::get('tasks/show', [indexcontroller::class, 'showtasks']);
Route::get('taskscategories/show', [indexcontroller::class, 'showtaskscategories']);
Route::get('tasks/show/{id}', [indexcontroller::class, 'showtasksbyid']);
Route::get('taskscategories/show/{cat_id}', [indexcontroller::class, 'taskscategoriesbyid']);
Route::post('taskscategories/{cat_id}/update', [indexcontroller::class, 'updatetaskscategories']);
Route::delete('taskscategories/{cat_id}/delete', [indexcontroller::class, 'deletetaskscategories']);