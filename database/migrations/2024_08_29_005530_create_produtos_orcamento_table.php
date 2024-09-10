<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produtos_orcamento', function (Blueprint $table) {
            $table->foreignId('id_produto')->constrained('produtos');
            $table->foreignId('id_orcamento')->constrained('orcamentos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos_orcamento');
    }
};
