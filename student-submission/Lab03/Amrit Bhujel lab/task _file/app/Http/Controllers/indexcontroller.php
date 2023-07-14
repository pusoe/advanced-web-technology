<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class indexcontroller extends Controller
{
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