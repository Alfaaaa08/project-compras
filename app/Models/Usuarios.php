<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model {
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
