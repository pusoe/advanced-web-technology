<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tasks1 extends Model
{
    use HasFactory;

    protected $table = "tasks1s";
    protected $fillable = [
        'id',
        'title',
        'description',
        'status',
        'files_id',
    ];

    public function tasksfiles()
    {
        return $this->belongsTo(tasksfiles::class, 'files_id');
    }
}
