<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword;

class Usuarios extends Model implements CanResetPassword{
    use Notifiable, \Illuminate\Auth\Passwords\CanResetPassword;
    protected $table = 'usuarios';

    protected $fillable = [
        'id',
        'nome',
        'email',
        'senha'
    ];

    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;
}
