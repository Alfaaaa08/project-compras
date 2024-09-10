<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('nome_fantasia');
            $table->string('endereco', 100);
            $table->string('rg', 9);
            $table->string('cpf_cnpj', 14);
            $table->string('cep', 15);
            $table->string('cidade', 100);
            $table->string('uf', 2);
            $table->string('bairro', 50);
            $table->string('complemento', 100);
            $table->string('telefone', 11);
            $table->string('celular', 11);
            $table->string('vendedor');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('clientes');
    }
};
