<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Orçamento</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.5;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 5px;
            text-align: left;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            width: 100px;
        }
        .header h2 {
            margin: 5px 0;
        }
        .details-table {
            margin-bottom: 20px;
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
        .text-right {
            text-align: right;
        }
        .bold {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <table class="no-border">
            <tr class="no-border">
                <td class="no-border" width="20%">
                    <img src="/images/example-logo.png" alt="Logo" class="brand-image img-circle">
                </td>
                <td class="no-border" width="60%" style="text-align: center;">
                    <h2>MAQPARTS PECAS LTDA</h2>
                    <p>CNPJ: 17.537.631/0001-47</p>
                    <p>IE 257958819</p>
                    <p>RUA MATHIAS GLS SENS Nº20, Ituporanga - SC</p>
                    <p>(47) 997350067 | marcos.maqparts@gmail.com</p>
                </td>
                <td class="no-border text-right" width="20%">
                    <p><strong>N: 2869</strong></p>
                    <p><strong>DATA: 16/11/2023</strong></p>
                </td>
            </tr>
        </table>
    </div>

    <h3 style="text-align: center;">Orçamento</h3>

    <table class="details-table">
        <tr>
            <td><strong>Cliente:</strong> 1066 - IVAIPORÃ PR</td>
            <td><strong>Fantasia:</strong></td>
            <td><strong>CNPJ / CPF:</strong> 75.741.330/0001-37</td>
        </tr>
        <tr>
            <td><strong>Endereço:</strong> , 1006</td>
            <td><strong>Inscrição/RG:</strong></td>
            <td><strong>Complemento:</strong></td>
        </tr>
        <tr>
            <td><strong>Cidade:</strong> Ivaiporã</td>
            <td><strong>UF:</strong> PR</td>
            <td><strong>Bairro:</strong> CENTRO</td>
        </tr>
        <tr>
            <td><strong>CEP:</strong></td>
            <td><strong>Telefone:</strong> 4334711950</td>
            <td><strong>Vendedor:</strong></td>
        </tr>
        <tr>
            <td><strong>Celular:</strong></td>
            <td><strong>Espécie:</strong></td>
            <td></td>
        </tr>
    </table>

    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Produto</th>
                <th>UN</th>
                <th>Qtd</th>
                <th>Valor Unit</th>
                <th>Desconto</th>
                <th>Acréscimo</th>
                <th>Valor Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>8187</td>
                <td>Kit Reparo DX 180 LC ESTICADOR</td>
                <td>UN</td>
                <td>2</td>
                <td>1.455,00</td>
                <td>0,00</td>
                <td>0,00</td>
                <td>2.910,00</td>
            </tr>
        </tbody>
    </table>

    <div class="total-section">
        <p><strong>Total de produtos:</strong> 2</p>
        <p><strong>Desconto:</strong> R$ 1.290,00</p>
        <h3>TOTAL: R$ 1.620,00</h3>
    </div>

    <div class="signature">
        <p>Observação: ESTE DOCUMENTO NÃO É VÁLIDO COMO UM DOCUMENTO FISCAL.</p>
        <p>____________________________________</p>
        <p>Assinatura</p>
    </div>
</body>
</html>