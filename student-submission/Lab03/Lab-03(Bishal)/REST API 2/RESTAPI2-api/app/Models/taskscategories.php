<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\tasks;
class taskscategories extends Model
{
    
    protected $table = "taskscategories";

    protected $primaryKey = 'category_id';
    protected $fillable = [
        'category_id',
        'name',
    ];
    
    public function tasks()
    {
        return $this->hasMany(tasks::class, 'category_id');
    }
}
