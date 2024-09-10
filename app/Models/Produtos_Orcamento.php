<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produtos_Orcamento extends Model {
    use HasFactory;

    protected $table = 'produtos_orcamento';

    protected $fillable = [
        'id_produto',
        'id_orcamento'
    ];

    protected $primaryKey = ['id_produto', 'id_orcamento'];
    public $incrementing = false;
    protected $keyType = 'int';

    public $timestamps = false;

    public function produto() {
        return $this->hasMany(Produto::class, 'id_produto');
    }

    public function orcamento() {
        return $this->hasOne(Orcamentos::class, 'id_orcamento');
    }
}
