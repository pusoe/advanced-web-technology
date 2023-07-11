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
        'category_id',
    ];

    public function taskscategories()
    {
        return $this->belongsTo(taskscategories::class, 'category_id');
    }
}
