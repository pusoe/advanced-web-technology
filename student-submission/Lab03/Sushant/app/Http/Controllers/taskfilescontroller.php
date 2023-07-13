<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\taskfilescontroller;

class taskfilescontroller extends Controller
{
    public function FileUpload(Request $request)
        {
        $uploaded_files = $request->file->store('public/uploads/files');
        $taskfiles = new tasksfiles;
        $taskfiles->id = $request->id;
        $taskfiles->files = $request->file->hashName();
        $results = $taskfiles->save();
        if ($results)
        {
            return ["Result"=> "File uploaded successfully."];
        }
        else{
            return ["Result"=>"File is not uploaded"];
        }
     }
}
