<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class taskfiles extends Model
{
    use HasFactory;
    protected $table = "taskfiles";
    protected $fillable = [
        'id',
        'files',
    ];
    
    public function tasks()
    {
        return $this->hasMany(tasks::class, 'files_id');
    }


}
