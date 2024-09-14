<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Clientes;
use App\Models\Fabricantes;
use App\Models\Produto;
use App\Models\Orcamentos;
use App\Models\Produtos_Orcamento;

class OrcamentoRoutineController extends Controller {
    public function store(Request $request) {
        $id_cliente = $this->addOrUpdateCliente($request);

        $id_fabricante = $this->addOrUpdateFabricante($request);

        $ids_produtos = $this->iterateProducts($request);

        $id_orcamento = $this->addOrcamento($id_cliente, $id_fabricante);

        $this->addProdutosOrcamento($id_orcamento, $ids_produtos);
    }

    /**
     * Inserts or updates a cliente on the 'clientes' table.
     * 
     * @param object $request
     * @return integer
     */    
    private function addOrUpdateCliente($request) {
        $client_data = $request->cliente;
        
        if(Clientes::select('id')->where("nome", '=', $client_data['nome'])->exists()) {
            Clientes::where("nome", '=', $client_data['nome'])->update([
                'nome_fantasia' => $client_data['fantasia'],
                'endereco'      => $client_data['endereco'],
                'rg'            => $client_data['rg'],
                'cpf_cnpj'      => $client_data['cpf_cnpj'],
                'cidade'        => $client_data['cidade'],
                'cep'           => $client_data['cep'],
                'uf'            => $client_data['uf'],
                'bairro'        => $client_data['bairro'],
                'complemento'   => $client_data['complemento'],
                'telefone'      => $client_data['telefone'],
                'celular'       => $client_data['celular'],
                'vendedor'      => $client_data['vendedor']
            ]);


            return Clientes::where("nome", '=', $client_data['nome'])->get()->first()->id;
        }

        $result = Clientes::create([
            'nome'          => $client_data['nome'],
            'nome_fantasia' => $client_data['fantasia'],
            'endereco'      => $client_data['endereco'],
            'rg'            => $client_data['rg'],
            'cpf_cnpj'      => $client_data['cpf_cnpj'],
            'cidade'        => $client_data['cidade'],
            'cep'           => $client_data['cep'],
            'uf'            => $client_data['uf'],
            'bairro'        => $client_data['bairro'],
            'complemento'   => $client_data['complemento'],
            'telefone'      => $client_data['telefone'],
            'celular'       => $client_data['celular'],
            'vendedor'      => $client_data['vendedor']
        ]); 

        return $result['id'];
    }

    /**
     * Inserts or updates a fabricante on the 'fabricantes' table.
     * 
     * @param object $request
     * @return integer | null
     */
    private function addOrUpdateFabricante($request) {
        $fabricante_data = $request->fabricante;

        if(!$fabricante_data['nome']) {
            return null;
        }

        if(Fabricantes::select('id')->where('nome', '=', $fabricante_data['nome'])->exists()) {
            Fabricantes::where("nome", "=", $fabricante_data['nome'])->update([
                'cnpj' => $fabricante_data['cnpj']
            ]);

            return Fabricantes::where("nome", "=", $fabricante_data['nome'])->get()->first()->id;
        }

        $result = Fabricantes::create([
            'nome' => $fabricante_data['nome'],
            'cnpj' => $fabricante_data['cnpj']
        ]);

        return $result['id'];
    }

    private function iterateProducts($request) {
        $addedProducts = [];

        foreach($request->produtos as $produto) {
            $addedProducts[] = $this->addProduto($produto);
        }

        return $addedProducts;
    }

    private function addProduto($produto) {
        $result = Produto::create([
            'descricao'  => $produto['nome'],
            'valor'      => $produto['valor_unitario'],
            'quantidade' => $produto['quantidade'],
            'desconto'   => $produto['desconto'],
            'acrescimo' => $produto['acrescimo'],
        ]);

        return $result->id;
    }

    private function addOrcamento($id_cliente, $id_fabricante) {
        $result = Orcamentos::create([
            'id_cliente' => $id_cliente,
            'id_fabricante' => $id_fabricante
        ]);

        return $result->id;
    }

    private function addProdutosOrcamento($id_orcamento, $ids_produtos) {
        foreach($ids_produtos as $id_produto) {
            Produtos_Orcamento::create([
                'id_produto' => $id_produto,
                'id_orcamento' => $id_orcamento
            ]);
        } 
    }
}
 