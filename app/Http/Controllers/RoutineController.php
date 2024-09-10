<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RoutineController extends Controller {
    public function index() {

        $orcamentos = $this->getQueryOrcamentosRoutine()->get();
        
        return Inertia::render('Routine', [
            'orcamentos' => $orcamentos
        ]);
    }

    private function getQueryOrcamentosRoutine() {
        return DB::table('orcamentos')
            ->join('clientes', 'clientes.id', '=', 'orcamentos.id_cliente')
            ->leftJoin('fabricantes', 'fabricantes.id', '=', 'orcamentos.id_fabricante')
            ->select([
                'orcamentos.id AS id',
                'clientes.id AS cliente',
                'clientes.nome AS nome_cliente',
                'fabricantes.id as fabricante',
                'fabricantes.nome as nome_fabricante',
                DB::raw("DATE_FORMAT(data_hora_cadastro, '%d/%m/%y %H:%i') AS data_hora_cadastro")
            ]);
    }}