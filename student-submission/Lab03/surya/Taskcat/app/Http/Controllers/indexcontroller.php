<?php

namespace App\Http\Controllers;

use Illuminate\Support\Carbon;
use App\Models\tasks;
use App\Models\taskscategories;
use Illuminate\Http\Request;
use Illuminate\View\View;


class indexcontroller extends Controller
{
    public function addtasks(Request $request)
    
    {
        try{
        $tasks = new tasks ;
        $tasks->id = $request->id;
        $tasks->title = $request->title;
        $tasks->description = $request->description;
        $tasks->status = $request->status;
        $tasks->cat_id = $request->cat_id;

        return response()->json([

            'message'=>'tasks created succesfully',
            'tasks'=>$tasks,
            'status'=>200,
        ]);
    }
    catch (\Exception $e){

        return response()->json([
            'message'=>'tasks not created',
            'tasks'=>$tasks
        ]);
    }
}
public function addtaskscategories(Request $request)
{
    try{
    $taskscategories = new taskscategories ;
    $taskscategories->cat_id = $request->cat_id;
    $taskscategories->name = $request->name;
    $taskscategories->created_at = Carbon::now();
    $taskscategories->updated_at = Carbon::now();
    $taskscategories->save();

    return response()->json([

        'message'=>'task category created succesfully',
        'taskscategories'=> $taskscategories ,
        'status'=>200,
    ]);
}
catch (\Exception $e){

    return response()->json([
        'message'=>'task category could not be created',
        'tasks'=>$taskscategories,
    ]);
}
}

public function showtasks()
    {
        $tasks = tasks::with('taskscategories')->get();
        
        if($tasks->count()>0){

            return response()->json([
                'status' => 200,
                'tasks' => $tasks
            ],200);
        }
        else{
            
            return response()->json([
                'status' => 404,
                'tasks' => 'No Records Found'
            ],404);
        }
    }
    public function showtaskscategories()
    {
        $taskscategories = taskscategories::with('tasks')->get();
        if($taskscategories->count()>0){

            return response()->json([
                'status' => 200,
                'taskscategories' => $taskscategories
            ],200);
        }
        else{
            
            return response()->json([
                'status' => 404,
                'taskscategories' => 'No Records Found'
            ],404);
        }
    }



    public function showtasksbyid ($id)
    {
        $tasks = tasks::with('taskscategories')->find($id);
        if($tasks){

            return response()->json([
                'status' => 200,
                'tasks' => $tasks
            ],200);
        }
        else{
            
            return response()->json([
                'status' => 404,
                'tasks' => 'No Such tasks Found'
            ],404);
        }
    }



    public function taskscategoriesbyid ($cat_id)
    {
        $taskscategories = taskscategories::with('tasks')->find($cat_id);
        if($taskscategories){

            return response()->json([
                'status' => 200,
                'tasks' => $taskscategories
            ],200);
        }
        else{
            
            return response()->json([
                'status' => 404,
                'taskscategories' => 'No Such task category Found'
            ],404);
        }
    }



    public function updatetaskscategories(Request $request,$cat_id)
    {
        $request->validate([
            'cat_id'=>'required|max:100',
            'name'=>'required|max:100',
        ]);
        $taskscategories = taskscategories::find($cat_id);
        if($taskscategories)
        {
            $taskscategories->cat_id =$request->cat_id;
            $taskscategories->name = $request->name;
            $taskscategories->update();    

            return response()->json([
                'status' => 200,
                'message' => 'task category updated successfully'
            ],200);
        }
        else{
            
            return response()->json([
                'status' => 404,
                'message' => 'No such task category found'
            ],404);
        }
    }

    public function deletetaskscategories($cat_id)
    {
        $taskscategories = taskscategories::find($cat_id);
        if($taskscategories)
        {
            $taskscategories->delete();
            return response()->json([
                'status' => 200,
                'message' => 'task category deleted successfully'
            ],200);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => 'No such task category found'
            ],404);
        }      
    }
}