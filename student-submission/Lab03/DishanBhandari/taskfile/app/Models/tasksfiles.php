<?php

namespace App\Models;
use App\Models\tasks;
namespace App\Http\Controllers;

use App\Http\Controllers;
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
    
    public function tasks()
    {
        return $this->hasMany(tasks::class, 'files_id');//one to many relationship
    }
}


