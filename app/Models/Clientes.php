<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model {
    use HasFactory;

    protected $table = 'clientes';

    protected $fillable = [
        'nome',
        'nome_fantasia',
        'endereco',
        'rg',
        'cpf_cnpj',
        'cep',
        'uf',
        'bairro',
        'complemento',
        'telefone',
        'celular',
        'vendedor'
    ];

    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;

}
