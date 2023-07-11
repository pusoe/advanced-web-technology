<?php

namespace App\Http\Controllers\Api;


use Carbon\Carbon;
use index;
use App\Models\tasks;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class tasksController extends Controller
{
    public function index(Request $request)
    
    {
        try{
        $tasks = new tasks ;
        $tasks->id = $request->id;
        $tasks->title = $request->title;
        $tasks->description = $request->description;
        $tasks->status = $request->status;
        $tasks->created_at = Carbon::now();
        $tasks->updated_at = Carbon::now();
        $tasks->save();

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
    public function index1()
    {
        $tasks = tasks::all();
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
    public function show ($id)
    {
        $tasks = tasks::find($id);
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
    public function update(Request $request,$id)
    {
        $request->validate([
            'id'=>'required|max:100',
            'title'=>'required|max:100',
            'description'=>'required|max:100',
            'status'=>'required|max:100',
        ]);
        $tasks = tasks::find($id);
        if($tasks)
        {
            $tasks->id = $request->id;
            $tasks->title = $request->title;
            $tasks->description = $request->description;
            $tasks->status = $request->status;
            $tasks->update();    

            return response()->json([
                'status' => 200,
                'message' => 'tasks updated successfully'
            ],200);
        }
        else{
            
            return response()->json([
                'status' => 404,
                'message' => 'No such tasks found'
            ],404);
        }
    }

    public function delete($id)
    {
        $tasks = tasks::find($id);
        if($tasks)
        {
            $tasks->delete();
            return response()->json([
                'status' => 200,
                'message' => 'tasks deleted successfully'
            ],200);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => 'No such tasks found'
            ],404);
        }      
    }
}


