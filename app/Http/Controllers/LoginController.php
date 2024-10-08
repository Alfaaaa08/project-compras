<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller {
    public function verifyLogin(Request $request) {
        $email    = $request->input('email');
        $password = $request->input('password');

        $usuario = Usuarios::where('email', $email)->first();

        if(!$usuario) {
            return response()->json([
                'success' => false,
                'message' => 'O e-mail informado não está cadastrado.'
            ]);
        }

        if(!Hash::check($password, $usuario->senha)) {
            return response()->json([
                'success' => false,
                'message' => 'Senha incorreta.'    
            ]);
        }
        
        return response()->json([
            'success' => true,
            'message' => ''
        ]);
    }
}
