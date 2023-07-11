<?php

namespace App\Models;
use App\Http\Controllers;
namespace App\Http\Controllers;

use Illuminate\View\View;
use Illuminate\Http\Request;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class tasksfiles extends Model
{
    use HasFactory;

    protected $table = "tasksfiles";
    protected $fillable = [
        'id',
        'files',
    ];
    
    public function tasks1()
    {
        return $this->hasMany(tasks1::class, 'files_id');
    }
}
/*
class TestController extends Controller
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



