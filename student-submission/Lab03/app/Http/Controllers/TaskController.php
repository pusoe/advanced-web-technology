<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;
use App\Models\TaskCategories;

class TaskController extends Controller
{
    public function index(){
        $tasks = Tasks::all();
        return response()->json($tasks);
    }

    public function store(Request $request){
        $task = new Tasks;
        $task->title = $request->title;
        $task->description = $request->description;
        $task->status = $request->status;
        if(is_null($request->task_categories_ids) || gettype($request->task_categories_ids) != 'array'){
            $request->task_categories_ids = [];
        }

        foreach($request->task_categories_ids as $task_category_id){
            if(!TaskCategories::where('id',$task_category_id)->exists()){
                return response()->json([
                    "message" => "Task Category not found"
                ], 404);
            }
        }
        $task->task_categories_ids = $request->task_categories_ids;
        $task->file_path = $request->file_path;
        $task->save();
        return response()->json([
            "message"=>"Task Added."
        ], 201);
    }

    public function show($id) {
        $task = Tasks::find($id);
        if(!empty($task)){
            return response()->json($task);
        }else{
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }


    public function update(Request $request, $id) {

        if(Tasks::where('id',$id)->exists()){
            $task = Tasks::find($id);
            $task->title = is_null($request->title) ? $task->title : $request->title;
            $task->description = is_null($request->description) ? $task->description : $request->description;
            $task->status = is_null($request->status) ? $task->status : $request->status;

            if(!is_null($request->task_categories_ids) && gettype($request->task_categories_ids) == 'array'){
                foreach($request->task_categories_ids as $task_category_id){
                    if(!TaskCategories::where('id',$task_category_id)->exists()){
                        return response()->json([
                            "message" => "Task Category not found"
                        ], 404);
                    }
                }
                $task->task_categories_ids = $request->task_categories_ids;
            } else{
                $task->task_categories_ids = $task->task_categories_ids;
            }

            $task->save();
            return response()->json([
                "message"=>"Task Updated."
            ], 202);
        }else{
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }

    public function getTasksByTaskCategory($task_category_id){
        $tasks = Tasks::where('task_categories_ids', 'like', '%'.$task_category_id.'%')->get();
        if(!empty($tasks)){
            return response()->json($tasks);
        }else{
            return response()->json([
                "message" => "Tasks not found"
            ], 404);
        }
    }

    public function destroy(Request $request, $id) {

        if(Tasks::where('id',$id)->exists()){
            $task = Tasks::find($id);
            $task->delete();
            
            return response()->json([
                "message"=>"Task Deleted."
            ], 202);
        }else{
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }

    public function storeFile(Request $request, $id){
        
        if(Tasks::where('id',$id)->exists()){

            $this->validate($request, [
                'task_file' => 'required|mimes:jpg,png,jpeg,gif,svg|max:2048',
            ]);

            $file_path = $request->file('task_file')->store('task_file/'.$id, 'public');

            $task = Tasks::find($id);
            $task->file_path = $file_path;
            $task->save();
            return response()->json([
                "message"=>"File Uploaded."
            ], 202);
        }else{
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }

    public function downloadFile(Request $request, $id){
        
        if(Tasks::where('id',$id)->exists()){

            $task = Tasks::find($id);
            $file_path = $task->file_path;
            $file_path = str_replace('task_file/'.$id.'/', '', $file_path);
            $file_path = storage_path('app/public/task_file/'.$id.'/'.$file_path);
            return response()->download($file_path);
        }else{
            return response()->json([
                "message" => "Task not found"
            ], 404);
        }
    }
}
