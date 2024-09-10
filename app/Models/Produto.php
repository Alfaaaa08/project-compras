<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model {
    protected $table = 'produtos';

    protected $fillable = [
        'descricao',
        'valor',
        'quantidade',
        'desconto',
        'acrescimo'
    ];

    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;
}
