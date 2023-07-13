<?php

namespace App\Models;

use App\Models\tasks;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class tasks extends Model
{
    use HasFactory;

    protected $table="tasks";
    protected $fillable=[
        "title",
        "description",
        "status",
    ];
}
