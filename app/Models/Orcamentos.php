<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orcamentos extends Model {
    use HasFactory;

    protected $table = 'orcamentos';

    protected $fillable = [
        'id_cliente',
        'id_fabricante'
    ];

    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;

    public function cliente() {
        return $this->hasOne(Clientes::class, 'id_cliente');
    }

    public function fabricante() {
        return $this->hasOne(Fabricantes::class, 'id_fabricante');
    }
}
