<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    use HasFactory;
    protected $table = 'books';
    protected $fillable = [
        'category_id',
        'author_id',
        'meta_title',
        'meta_key',
        'meta_descrip',
        'slug',
        'name',
        'description',
        'image',
        'file',
    ];

    protected $with = ['category','user','sale'];
    public function category(){
        return $this->belongsTo(Category::class,'category_id','id');
    }

    public function user(){
        return $this->belongsTo(User::class,'author_id','id');
    }
    public function sale(){
        return $this->belongsTo(User::class,'meta_id','id');
    }
}
