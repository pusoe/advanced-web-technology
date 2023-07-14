<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;
    protected $table = 'tasks';
    protected $fillable = ['id','title','description','status', 'task_categories_ids', 'file_path'];
    protected $casts = [
        'task_categories_ids' => 'array'
    ];
        
}
