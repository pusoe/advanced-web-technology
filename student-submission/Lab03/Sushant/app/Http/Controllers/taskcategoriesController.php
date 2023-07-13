<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\taskcategoriesController;

class taskcategoriesController extends Controller
{
    public function index() {
        $category=taskcategories::all();
        if ($category->count()>0){

            return response()->json([
                "status"=>200,
                "category"=>$category
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
            "name"=>"required|string|max:191",


        ]);
        if($validator->fails()){
            return response()->json([
                'status'=> 422,
                'errors'=>$validator->messages()
            ], 422);
        }
        else {
            $category=taskcategories::create([
                "name"=>$request->name,
                

            ]);
            if ($category){
                return response()->json([
                    'status'=>200,
                    'message'=>"Category Created Successfully"
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
        $category=taskcategories::find($id);
        if ($category){
            return response()->json([
                "status"=>200,
                "category"=>$category
            ],200);
        }
        else {
            return response()->json([
                "status"=>404,
                "message"=>"No taskcategory found"
            ],404);
        }
    }
    public function edit($id){
        $category=taskcategories::find($id);
        if ($category){
            return response()->json([
                "status"=>200,
                "category"=>$category
            ],200);
        }
        else {
            return response()->json([
                "status"=>404,
                "message"=>"No task category found"
            ],404);
        }
    }
    public function update(Request $request,int $id){
        $validator=Validator::make($request->all(),[
            "name"=>"required|string|max:191",


        ]);
        if($validator->fails()){
            return response()->json([
                'status'=> 422,
                'errors'=>$validator->messages()
            ], 422);
        }
        else {
            $category=taskcategories::find($id);
           
            if ($category){
                $category->update([
                    "category"=>$request->category,
    
                ]);
                return response()->json([
                    'status'=>200,
                    'message'=>"task Category Updated Successfully"
                ],200);
            }
            else {
                return response()->json([
                    "status"=>404,
                    "message"=>"No Such task Category Found"
                ],404);
            }
        }

    }
    public function delete($id)
    {
        $category=taskcategories::find($id);
        if ($category)
        {
            $category->delete();
            return response()->json([
                'status'=>200,
                "message"=>"Category deleted successfully"
            ],200);
        }
        else {
            return response()->json([
                "status"=>404,
                "message"=>"No Such Category Found"
            ],404);
        }
    }
}
