<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faviourate extends Model
{
    use HasFactory;
    protected $table = 'faviourate';
    protected $fillable = [
        'books_id',
        'user_id',
    ];
}
