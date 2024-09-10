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
}
