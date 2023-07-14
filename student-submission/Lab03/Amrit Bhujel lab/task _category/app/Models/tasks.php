<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tasks extends Model
{
    use HasFactory;

    protected $table = "tasks";
    protected $fillable = [
        'id',
        'title',
        'description',
        'status',
        'cat_id',
    ];

    public function taskscategories()
    {
        return $this->belongsTo(taskscategories::class, 'cat_id');//many to one relationship
    }
}
