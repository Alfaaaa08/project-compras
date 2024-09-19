<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Orçamento</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 5px;
            text-align: left;
        }

        .header {
            text-align: center;
        }

        .header img {
            width: 100px;
        }

        .header h2 {
            margin: 5px 0;
        }

        .header table tr td p {
            margin: 0px
        }

        #nome-cliente {
            margin: 0px
        }

        .number-data {
            font-size: 20px;
        }


        .no-border {
            border: none;
        }

        .total-section {
            text-align: right;
            margin-top: 20px;
        }

        .signature {
            margin-top: 40px;
            text-align: center;
        }

        .signature-observacao {
            text-align: left;
        }

        .orcamento-header {
            font-size: 30px;
            margin: 0px;
        }
    </style>
</head>

<body>
    <div class="header">
        <table class="no-border">
            <tr class="no-border">
                <td class="no-border" width="10%">
                    <img src="/images/example-logo.png" alt="Logo" class="brand-image img-circle">
                </td>
                <td class="no-border" width="50%">
                    <h2 id="nome-cliente">MAQPARTS PECAS LTDA</h2>
                    <p>CNPJ: 17.537.631/0001-47</p>
                    <p>IE 257958819</p>
                    <p>RUA MATHIAS GLS SENS Nº20, Ituporanga - SC</p>
                    <p>(47) 997350067 | marcos.maqparts@gmail.com</p>
                </td>
                <td class="number-data no-border" width="40%" style="text-align: right;">
                    <p><strong>N: 2869</strong></p>
                    <p><strong>DATA: 16/11/2023</strong></p>
                </td>
            </tr>
        </table>
    </div>

    <h3 class="orcamento-header" style="text-align: center;">Orçamento</h3>

    <hr>
    <table class="details-table">
        <tr>
            <td style="width: 33%;">Cliente: {{ $cliente->nome }}</td>
            <td style="width: 33%;">Fantasia: {{ $cliente->nome_fantasia }}</td>
        </tr>
        <tr>
            <td style="width: 33%;">Endereço: {{ $cliente->endereco }} </td>
            <td style="width: 33%;">Inscrição/RG: {{ $cliente->rg }} </td>
            <td style="width: 33%;">CNPJ / CPF: {{ $cliente->cpf_cnpj }} </td>
        </tr>
        <tr>
            <td style="width: 25%;">Cidade: {{ $cliente->cidade }} </td>
            <td style="width: 8%;">UF: {{ $cliente->uf }} </td>
            <td style="width: 33%;">Bairro: {{ $cliente->bairro }} </td>
            <td style="width: 33%;">Complemento: {{ $cliente->complemento }} </td>
        </tr>
        <tr>
            <td style="width: 20%;">CEP: {{ $cliente->cep }} </td>
            <td style="width: 13%;">Telefone: {{ $cliente->telefone }} </td>
            <td style="width: 33%;">Celular: {{ $cliente->celular }} </td>
            <td style="width: 33%;">Vendedor: {{ $cliente->vendedor }} </td>
        </tr>
    </table>
    <hr>
    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Valor Unit</th>
                <th>Desconto</th>
                <th>Acréscimo</th>
                <th>Valor Total</th>
            </tr>
        </thead>
        <tbody>
            {{ $valor_total = 0 }}
            {{ $itens_total = 0 }}
            {{ $desconto_total = 0 }}
            {{ $total_produtos = 0 }}
        @foreach($produtos as $produto)
            {{ $valor_total += $produto->valor }}
            {{ $itens_total++ }}
            {{ $desconto_total += $produto->desconto * $produto->quantidade }}
            {{ $total_produtos += $produto->quantidade }}
            <tr>
                <td>{{ $produto->produto }}</td>
                <td>{{ $produto->descricao }}</td>
                <td>{{ $produto->valor }}</td>
                <td>{{ number_format($produto->valor, 2, ',', '.') }}</td>
                <td>{{ number_format($produto->desconto, 2, ',', '.') }}</td>
                <td>{{ number_format($produto->acrescimo, 2, ',', '.') }}</td>
                <td>{{ number_format(($produto->valor - $produto->desconto + $produto->acrescimo) * $produto->quantidade, 2, ',', '.') }}</td>
            </tr>
        @endforeach
    </table>
    <hr>

    <div class="total-section">
        <table>
            <tr>
                <td style="width: 53%;"> 
                    <p>Total de itens</p>
                    <p style="padding-left: 30px;"> {{ $itens_total }} </p>
                </td>
                <td>
                    <p>Total de produtos</p>
                    <p style="padding-left: 40px;"> {{ $total_produtos }} </p>
                </td>
            </tr>
            <tr>
                <td style="width: 54.5%;"></td>
                <td>
                    <p>Desconto</p>
                    <p style="padding-left: 15px;">R$ {{ $desconto_total }} </p>
                </td>
            </tr>
        </table>
        <h3>TOTAL: {{ $valor_total }}</h3>
    </div>

    <div class="signature">
        <p class="signature-observacao">Observação:</p>
        <p class="signature-observacao">ESTE DOCUMENTO NÃO É VÁLIDO COMO UM DOCUMENTO FISCAL.</p>
        <p>____________________________________</p>
        <p>Assinatura</p>
    </div>
</body>

</html>