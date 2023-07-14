<?php

namespace App\Http\Controllers;

use App\Models\task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class taskscontroller extends Controller
{
    public function index()
    {
        $tasks=task::all();
        if($tasks->count()>0){
        return response()->json([
            'status'=>200,
            'tasks'=>$tasks
        ],200);
    }else{
        return response()->json([
            'status'=>404,
            'status_message'=>'No tasks found'
        ],404);
    }}
    public function store(Request $request){
        $validator=Validator::make($request->all(),[
            'title'=>'required|max:50',
            'description'=>'required|max:150',
            'status'=>'required|max:10',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages()
            ],422);
        }else{
            $task=task::create([
                'title'=>$request->title,
                'description'=>$request->description,
                'status'=>$request->status,
            ]);
            if($task){
                return response()->json([
                    'status'=>200,
                    'message'=>"Task created successfully"
                ],200);
            }else{
                return response()->json([
                    'status'=>500,
                    'message'=>"Task couldn't be created"],500);
            }
        }
    }
    public function show($id){
        $task=task::find($id);
        if($task){
            return response()->json([
                'status'=>200,
                'message'=>$task],200);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>"Task not found"],404);
        }
    }
    public function edit($id){
        $task=task::find($id);
        if($task){
            return response()->json([
                'status'=>200,
                'message'=>$task],200);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>"Task not found"],404);
        }
    }
    public function update(Request $request,int $id){
        $validator=Validator::make($request->all(),[
            'title'=>'required|max:50',
            'description'=>'required|max:150',
            'status'=>'required|max:10',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages()
            ],422);
        }else{
            $task=task::find($id);
            if($task){
                $task->update([
                    'title'=>$request->title,
                    'description'=>$request->description,
                    'status'=>$request->status,
                ]);
                return response()->json([
                    'status'=>200,
                    'message'=>"Task updated successfully"
                ],200);
            }else{
                return response()->json([
                    'status'=>500,
                    'message'=>"Task not found"],500);
            }
        }
    }
    public function destroy($id){
        $task=task::find($id);
        if($task){
            $task->delete();
            return response()->json([
                'status'=>200,
                'message'=>"Task deleted successfully"],200);
        }else{
            return response()->json([
                'status'=>500,
                'message'=>"Task not found"],500);
        
        }
    }
}
