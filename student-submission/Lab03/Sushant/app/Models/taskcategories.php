<?php

namespace App\Models;

use App\Models\taskcategories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class taskcategories extends Model
{
    use HasFactory;

    protected $table="taskcategories";
    protected $fillable=[
       "name",
    ];
}
