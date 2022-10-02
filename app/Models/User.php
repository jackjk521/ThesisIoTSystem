<?php

namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

use Jenssegers\Mongodb\Eloquent\Model as Model;
use Jenssegers\Mongodb\Auth\User as Authenticatable;

// use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Model implements Authenticatable
{
    use Notifiable;
    
    protected $connection = 'mongodb';  // connection to mongo
    // protected $collection = "users_table";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name' => ['required'],
        'email'=> ['required', 'email', 'unique'],
        'password' => ['required'],
        'created_at'=> ['datetime'],
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

}
