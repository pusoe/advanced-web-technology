<?php

use App\Http\Controllers\FileUploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('tasks1/add', [TestController::class, 'addtasks1']);

Route::get('tasks1/show', [TestController::class, 'showtasks1']);

Route::get('tasks1/show/{id}', [TestController::class, 'showtasks1byid']);

/*Route::post('tasksfiles/add', [TestController::class, 'addtasksfiles']);*/

Route::get('tasksfiles/show', [TestController::class, 'showtasksfiles']);

Route::get('tasksfiles/show/{id}', [TestController::class, 'tasksfilesbyid']);

Route::post('tasksfiles/{id}/update', [TestController::class, 'updatetasksfiles']);

Route::delete('tasksfiles/{id}/delete', [TestController::class, 'deletetasksfiles']);


Route::post('/file-upload',[TestController::class,'FileUpload']);