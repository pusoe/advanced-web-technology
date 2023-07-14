<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\taskscontroller;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('tasks',[taskscontroller::class,'index']);
Route::post('tasks',[taskscontroller::class,'store']);
Route::get('tasks/{id}',[taskscontroller::class,'show']);
Route::get('tasks/{id}/edit',[taskscontroller::class,'edit']);
Route::put('tasks/{id}/update',[taskscontroller::class,'update']);
Route::delete('tasks/{id}/delete',[taskscontroller::class,'destroy']);