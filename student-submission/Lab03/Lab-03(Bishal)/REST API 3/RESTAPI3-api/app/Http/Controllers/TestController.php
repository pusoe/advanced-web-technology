<?php

namespace App\Http\Controllers;

use Illuminate\Support\Carbon;
use App\Models\tasksfiles ;
use App\Models\tasks1;
use Illuminate\Http\Request;
use Illuminate\View\View;


class TestController extends Controller
{
    public function addtasks1(Request $request)
    
    {
        try{
        $tasks1 = new tasks1 ;
        $tasks1->id = $request->id;
        $tasks1->title = $request->title;
        $tasks1->description = $request->description;
        $tasks1->status = $request->status;
        $tasks1->files_id = $request->files_id;
        $tasks1->created_at = Carbon::now();
        $tasks1->updated_at = Carbon::now();
        $tasks1->save();

        return response()->json([

            'message'=>'tasks created succesfully',
            'tasks1'=>$tasks1,
            'status'=>200,
        ]);
    }
    catch (\Exception $e){

        return response()->json([
            'message'=>'tasks not created',
            'tasks'=>$tasks1,
        ]);
    }
}
public function showtasks1()
    {
        $tasks1 = tasks1::with('tasksfiles')->get();
        
        if($tasks1->count()>0){

            return response()->json([
                'status' => 200,
                'tasks1' => $tasks1
            ],200);
        }
        else{
            
            return response()->json([
                'status' => 404,
                'tasks' => 'No Records Found'
            ],404);
        }
    }

    public function showtasks1byid ($id)
    {
        $tasks1 = tasks1::with('tasksfiles')->find($id);
        if($tasks1){

            return response()->json([
                'status' => 200,
                'tasks' => $tasks1
            ],200);
        }
        else{
            
            return response()->json([
                'status' => 404,
                'tasks' => 'No Such tasks Found'
            ],404);
        }
    }



/*public function addtasksfiles(Request $request)
{
    try{
    $tasksfiles = new tasksfiles ;
    $tasksfiles->id = $request->id;
    $tasksfiles->files = $request->files;
    $tasksfiles->created_at = Carbon::now();
    $tasksfiles->updated_at = Carbon::now();
    $tasksfiles->save();

    return response()->json([

        'message'=>'task file created succesfully',
        'tasksfiles'=> $tasksfiles ,
        'status'=>200,
    ]);
}
catch (\Exception $e){

    return response()->json([
        'message'=>'task file not created',
        'tasks'=>$tasksfiles,
    ]);
}
}
*/
public function showtasksfiles()
{
    $tasksfiles = tasksfiles::with('tasks1')->get();
    if($tasksfiles->count()>0){

        return response()->json([
            'status' => 200,
            'tasksfiles' => $tasksfiles
        ],200);
    }
    else{
        
        return response()->json([
            'status' => 404,
            'tasksfiles' => 'No Records Found'
        ],404);
    }
}

public function tasksfilesbyid ($id)
{
    $tasksfiles = tasksfiles::with('tasks1')->find($id);
    if($tasksfiles){

        return response()->json([
            'status' => 200,
            'tasks' => $tasksfiles
        ],200);
    }
    else{
        
        return response()->json([
            'status' => 404,
            'tasksfiles' => 'No Such task files Found'
        ],404);
    }
}

public function updatetasksfiles(Request $request,$id)
{
    $request->validate([
        'id'=>'required|max:100',
        'files'=>'required|file',
    ]);
    $tasksfiles = tasksfiles::find($id);
    if($tasksfiles)
    {
        $tasksfiles->id =$request->id;
        $tasksfiles->files = $request->files;
        $tasksfiles->update();    

        return response()->json([
            'status' => 200,
            'message' => 'task file updated successfully'
        ],200);
    }
    else{
        
        return response()->json([
            'status' => 404,
            'message' => 'No such task file found'
        ],404);
    }
}

public function deletetasksfiles($id)
{
    $tasksfiles = tasksfiles::find($id);
    if($tasksfiles)
    {
        $tasksfiles->delete();
        return response()->json([
            'status' => 200,
            'message' => 'task file deleted successfully'
        ],200);
    }
    else{
        return response()->json([
            'status' => 404,
            'message' => 'No such task file found'
        ],404);
    }      
}


/*public function FileUpload(Request $request)
{
    $uploaded_files = $request->file->store('public/uploads/');
    return ["result"=>$uploaded_files];
}*/
public function FileUpload(Request $request)
{
$uploaded_files = $request->file->store('public/uploads/');
$tasksfiles = new tasksfiles;
$tasksfiles->id = $request->id;
$tasksfiles->files = $request->file->hashName();
$results = $tasksfiles->save();
if ($results)
{
    return ["result"=> "File uploaded successfully."];
}
else{
    return ["result"=>"File is not uploaded"];
}
}
}