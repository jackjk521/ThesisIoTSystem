<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

class Thing extends Model
{
    use HasFactory;

    public $timestamps = ['created_at'];
    const UPDATED_AT = null;

    protected $table = 'things';

    protected $fillable = [
        'name',
        'topic',
        'value',
        'user_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
}
