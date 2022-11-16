<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ThingController;
use App\Http\Controllers\Login_RegistrationController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signUp', [UserController::class, 'signUp']);
Route::post('/signIn', [UserController::class, 'signIn']);

Route::post('/addThing', [ThingController::class, 'addThing']);
Route::get('/getThings', [ThingController::class, 'getThings']);
Route::get('/findThing', [ThingController::class, 'findThing']);
Route::patch('/updateThing', [ThingController::class, 'updateThing']);
Route::post('/deleteThing', [ThingController::class, 'deleteThing']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
