<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use App\Models\Orcamentos;
use App\Models\Produtos_Orcamento;

class RoutineController extends Controller {
    public function delete(Request $request) {
        Produtos_Orcamento::where('id_orcamento', '=', $request->item)->delete();

        Orcamentos::where('id', '=', $request->item)->delete();
    }

    public function index(Request $request) {
        $filterValue    = $request->filterValue;
        $columnFiltered = $this->getColumnFiltered($request->selectedFilter);
        $orcamentos     = $this->getQueryOrcamentosRoutine($columnFiltered, $filterValue)->get();
        
        return Inertia::render('Routine', [
            'orcamentos' => $orcamentos
        ]);
    }

    private function getColumnFiltered($selectedFilter) {
        if(!$selectedFilter) {
            return null;
        }

        $columns = [
            1 => 'clientes.id',
            2 => 'clientes.nome',
            3 => 'orcamentos.id',
            4 => 'produtos.id'
        ];

        return $columns[$selectedFilter];
    }

    private function getQueryOrcamentosRoutine($columnFiltered, $filterValue) {
        $query = DB::table('orcamentos')
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

        if(!$filterValue || !$columnFiltered) {
            return $query;
        }

        return $query->where($columnFiltered, '=', $filterValue);
    }}