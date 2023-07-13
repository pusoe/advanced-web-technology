<?php

use App\Http\Controllers\FileUploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\indexcontroller;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('tasksfiles/show', [indexcontroller::class, 'showtasksfiles']);
Route::get('tasksfiles/show/{id}', [indexcontroller::class, 'tasksfilesbyid']);
Route::post('tasksfiles/{id}/update', [indexcontroller::class, 'updatetasksfiles']);
Route::delete('tasksfiles/{id}/delete', [indexcontroller::class, 'deletetasksfiles']);
Route::post('/file-upload',[indexcontroller::class,'FileUpload']);