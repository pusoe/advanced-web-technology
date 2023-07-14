<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TaskCategories;

class TaskCategoryController extends Controller
{
    public function index(){
        $taskCategories = TaskCategories::all();
        return response()->json($taskCategories);
    }

    public function store(Request $request){
        $taskCategory = new TaskCategories;
        $taskCategory->name = $request->name;
        $taskCategory->save();
        return response()->json([
            "message"=>"Task Category Added."
        ], 201);
    }

    public function show($id) {
        $taskCategory = TaskCategories::find($id);
        if(!empty($taskCategory)){
            return response()->json($taskCategory);
        }else{
            return response()->json([
                "message" => "Task Category not found"
            ], 404);
        }
    }


    public function update(Request $request, $id) {

        if(TaskCategories::where('id',$id)->exists()){
            $taskCategory = TaskCategories::find($id);
            $taskCategory->name = is_null($request->name) ? $taskCategory->name : $request->name;
            $taskCategory->save();
            return response()->json([
                "message"=>"Task Category Updated."
            ], 202);
        }else{
            return response()->json([
                "message" => "Task Category not found"
            ], 404);
        }
    }

    public function destroy(Request $request, $id) {

        if(TaskCategories::where('id',$id)->exists()){
            $taskCategory = TaskCategories::find($id);
            $taskCategory->delete();
            
            return response()->json([
                "message"=>"Task Category Deleted."
            ], 202);
        }else{
            return response()->json([
                "message" => "Task Category not found"
            ], 404);
        }
    }
}
