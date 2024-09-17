<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfOrcamentoController extends Controller {
    public function print(Request $request) {
        try {
            $pdf = Pdf::loadView('pdf/orcamento-pdf', []);
            $pdf->save(storage_path('app/public/orcamento.pdf'));
            dd('PDF salvo com sucesso.');
        } catch (\Exception $e) {
            dd('Erro ao gerar PDF: ' . $e->getMessage());
        }
    }
}