<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function store(Request $request) {
        Usuarios::create([
            'nome'  => $request->name,
            'email' => $request->email,
            'senha' => Hash::make($request->password)
        ]);
    }

    public function verifyEmailRegistered(Request $request) {
        $email    = $request->input('email');

        $usuario = Usuarios::where('email', $email)->first();

        if($usuario) {
            return response()->json([
                'success' => false,
                'message' => "O e-mail {$email} já está registrado no sistema."
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => ''
        ]);
    }
}
