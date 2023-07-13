<?php

namespace App\Http\Controllers;

use App\Models\tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class tasksController extends Controller
{
    public function index() {
        $tasks=tasks::all();
        if ($tasks->count()>0){

            return response()->json([
                "status"=>200,
                "tasks"=>$tasks
            ],200);
        } 
        else {
            return response()->json([
                "status"=>404,
                "message"=>"No Records Found"
            ],404);
        }
    }
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            "title"=>"required|string|max:191",
            "description"=>"required|string|max:191",
            "status"=>"required|string|max:191",


        ]);
        if($validator->fails()){
            return response()->json([
                'status'=> 422,
                'errors'=>$validator->messages()
            ], 422);
        }
        else {
            $tasks=tasks::create([
                "title"=>$request->title,
                "description"=>$request->description,
                "status"=>$request->status,

            ]);
            if ($tasks){
                return response()->json([
                    'status'=>200,
                    'message'=>"tasks Created Successfully"
                ],200);
            }
            else {
                return response()->json([
                    "status"=>500,
                    "message"=>"Something Went Wrong"
                ],500);
            }
        }
    }
    public function show($id)
    {
        $tasks=tasks::find($id);
        if ($tasks){
            return response()->json([
                "status"=>200,
                "tasks"=>$tasks
            ],200);
        }
        else {
            return response()->json([
                "status"=>404,
                "message"=>"No task found"
            ],404);
        }
    }
    public function edit($id){
        $tasks=tasks::find($id);
        if ($tasks){
            return response()->json([
                "status"=>200,
                "tasks"=>$tasks
            ],200);
        }
        else {
            return response()->json([
                "status"=>404,
                "message"=>"No task found"
            ],404);
        }
    }
    public function update(Request $request,int $id){
        $validator=Validator::make($request->all(),[
            "title"=>"required|string|max:191",
            "description"=>"required|string|max:191",
            "status"=>"required|string|max:191",


        ]);
        if($validator->fails()){
            return response()->json([
                'status'=> 422,
                'errors'=>$validator->messages()
            ], 422);
        }
        else {
            $tasks=tasks::find($id);
           
            if ($tasks){
                $tasks->update([
                    "title"=>$request->title,
                    "description"=>$request->description,
                    "status"=>$request->status,
    
                ]);
                return response()->json([
                    'status'=>200,
                    'message'=>"tasks Updated Successfully"
                ],200);
            }
            else {
                return response()->json([
                    "status"=>404,
                    "message"=>"No Such task Found"
                ],404);
            }
        }

    }
    public function delete($id)
    {
        $tasks=tasks::find($id);
        if ($tasks)
        {
            $tasks->delete();
            return response()->json([
                'status'=>200,
                "message"=>"task deleted successfully"
            ],200);
        }
        else {
            return response()->json([
                "status"=>404,
                "message"=>"No Such task Found"
            ],404);
        }
    }
}
