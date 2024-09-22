<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

use Illuminate\Support\Facades\DB;

class PdfOrcamentoController extends Controller {
    public function print(Request $request) {
        $orcamento = $request['item'];

        $cliente_fabricante_query = DB::table('orcamentos')
            ->join('clientes', 'clientes.id', '=', 'orcamentos.id_cliente')
            ->leftJoin('fabricantes', 'fabricantes.id', '=', 'orcamentos.id_fabricante')
            ->select([
                'clientes.id AS cliente',
                'clientes.nome AS nome_cliente',
                'clientes.nome_fantasia AS nome_fantasia_cliente',
                'clientes.endereco AS endereco_cliente',
                'clientes.rg AS rg_cliente',
                'clientes.cpf_cnpj AS cpf_cnpj_cliente',
                'clientes.cep AS cep_cliente',
                'clientes.uf AS uf_cliente',
                'clientes.bairro AS bairro_cliente',
                'clientes.complemento AS complemento_cliente',
                'clientes.telefone AS telefone_cliente',
                'clientes.celular AS celular_cliente',
                'clientes.vendedor AS vendedor_cliente',
                'clientes.cidade AS cidade_cliente',
                'fabricantes.id as fabricante',
                'fabricantes.nome as nome_fabricante',
                'fabricantes.cnpj as cnpj_fabricante',
                DB::raw("DATE_FORMAT(data_hora_cadastro, '%d/%m/%y') AS data_cadastro")
            ]);

        $cliente_fabricante_data = $cliente_fabricante_query->where('orcamentos.id', '=', $orcamento)->get()->toArray();
        
        $produtos_query = DB::table('orcamentos')
            ->join('produtos_orcamento', 'orcamentos.id', '=', 'produtos_orcamento.id_orcamento')
            ->join('produtos', 'produtos_orcamento.id_produto', '=', 'produtos.id')
            ->select([
                'produtos.id AS produto',
                'produtos.descricao AS descricao',
                'produtos.valor AS valor',
                'produtos.quantidade AS quantidade',
                'produtos.desconto AS desconto',
                'produtos.acrescimo AS acrescimo'
            ]);

        $produtos_data = $produtos_query->where('orcamentos.id', '=', $orcamento)->get()->toArray();

        $logo_path = public_path('images/example-logo.png');

        $data = [
            'cliente' => (object) [
                'id'            => $cliente_fabricante_data[0]->cliente,
                'nome'          => $cliente_fabricante_data[0]->nome_cliente,  
                'nome_fantasia' => $cliente_fabricante_data[0]->nome_fantasia_cliente,
                'endereco'      => $cliente_fabricante_data[0]->endereco_cliente,
                'rg'            => $cliente_fabricante_data[0]->rg_cliente,
                'cpf_cnpj'      => $cliente_fabricante_data[0]->cpf_cnpj_cliente,
                'cep'           => $cliente_fabricante_data[0]->cep_cliente,
                'uf'            => $cliente_fabricante_data[0]->uf_cliente,
                'bairro'        => $cliente_fabricante_data[0]->bairro_cliente,
                'complemento'   => $cliente_fabricante_data[0]->complemento_cliente,
                'telefone'      => $cliente_fabricante_data[0]->telefone_cliente,
                'celular'       => $cliente_fabricante_data[0]->celular_cliente,
                'vendedor'      => $cliente_fabricante_data[0]->vendedor_cliente,
                'cidade'        => $cliente_fabricante_data[0]->cidade_cliente,
            ],
            'fabricante' => (object) [
                'nome_fabricante' => $cliente_fabricante_data[0]->nome_fabricante,
                'cnpj_fabricante' => $cliente_fabricante_data[0]->cnpj_fabricante,
            ],
            'produtos' => $produtos_data,
            'logo_img' => $logo_path
        ];

        $pdf = Pdf::loadView('pdf/orcamento-pdf', $data);
        $pdf->save(storage_path('app/public/orcamento.pdf'));
    }
}