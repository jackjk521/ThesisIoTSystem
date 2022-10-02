<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function signUp(Request $req) {
        $user = new User;
        $user->username = $req->input('username');
        $user->password = $req->input('password');

        $uniqueUser = User::where('username', $user->username)->first();

        if($uniqueUser === null) {
            $user->save();
            $data = [
                'status' => 200,
                'data' => 'User registered successfully'
            ];
        } else {
            $data = [
                'status' => 400,
                'data' => 'Username is taken' 
            ];
        }

        return response()->json($data);
    }

    public function signIn(Request $req) {
        $user = new User;
        $user->username = $req->input('username');
        $user->password = $req->input('password');

        $findUser = User::where('username', $user->username)->first();
        if($findUser === null) {
            $data = [
                'status' => 400,
                'message' => 'Username does not exist'
            ];
        } else {
            if($findUser->password !== $user->password) {
                $data = [
                    'status' => 400,
                    'message' => 'Password is incorrect'
                ];
            } else {
                $data = [
                    'status' => 200,
                    'message' => 'Login successful',
                    'data' => $findUser->_id
                ];
            }
        }

        return response()->json($data);
    }
}
