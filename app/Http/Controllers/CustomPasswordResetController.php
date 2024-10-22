<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class CustomPasswordResetController extends Controller {
    public function resetPassword(Request $request) {
        phpinfo();
        die;
        $validator = Validator::make($request->all(), [
            'email' => 'required|email'
        ]);

        
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return redirect()->back()->with('status', __($status));
        }

        return redirect()->back()->withErrors(['email' => __($status)]);
    }
}
