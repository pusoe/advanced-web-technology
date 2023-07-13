<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\tasks;
class taskscategories extends Model
{
    
    protected $table = "taskscategories";

    protected $primaryKey = 'cat_id';
    protected $fillable = [
        'cat_id',
        'name',
    ];
    
    public function tasks()
    {
        return $this->hasMany(tasks::class, 'cat_id');//one to many relationship
    }
}
