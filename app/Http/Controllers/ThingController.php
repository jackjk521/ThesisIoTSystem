<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Thing;

class ThingController extends Controller
{
    public function addThing(Request $req) {
        $thing = new Thing;
        $thing->name = $req->input('name');
        $thing->led = $req->input('led');
        $thing->sound = $req->input('sound');
        $thing->temp = $req->input('temp');
        $thing->motion = $req->input('motion');
        $thing->heart = $req->input('heart');
        $thing->user_id = $req->input('user_id');
        $check = Thing::where('name', $req->input('name'))->first();
        $data = [];

        if($check) {
            $data = [
                'status' => 401,
                'message' => 'thing name already exists!',
                'data' => []
            ];
        } else {
            $thing->save();
            $data = [
                'status' => 200,
                'message' => 'thing added successfully',
                'data' => [
                    '_id' => $thing->_id,
                    'name' => $thing->name,
                    'led' => $thing->led,
                    'sound' => $thing->sound,
                    'temp' => $thing->temp,
                    'motion' => $thing->motion,
                    'heart' => $thing->heart,
                    'user_id' => $thing->user_id
                ]
            ];
        }
        return response()->json($data);
    }

    public function getThings(Request $req) {
        $things = Thing::where('user_id', $req->input('user_id'))->get();
        return $things;
    }

    public function findThing(Request $req) {
        $thing = Thing::where('name', $req->input('name'))->first();
        if($thing) {
            $data = [
                'status' => 200,
                'message' => 'thing has been found',
                'data' => [
                    'thing_id' => $thing->id,
                    'name' => $thing->name,
                    'led' => $thing->led,
                    'sound' => $thing->sound,
                    'temp' => $thing->temp,
                    'motion' => $thing->motion,
                    'heart' => $thing->heart,
                    'user_id' => $thing->user_id
                ]
            ];
        } else {
            $data = [
                'status' => 400,
                'message' => 'thing does not exist',
                'data' => []
            ];
        }

        return response()->json($data);
    }

    public function updateThing(Request $req) {
        $update = Thing::where('name', $req->input('name'))->update([$req->input('sensor') => $req->input('value')]);
        $data = [];
        if($update) {
            $data = [
                'status' => 200,
                'message' => 'Thing has been updated successfully'
            ];
        } else {
            $data = [
                'status' => 403,
                'message' => 'Unable to update thing'
            ];
        }

        return response()->json($data);
    }

    public function deleteThing(Request $req) {
        $device =  Thing::where('thing_id', $req->input('thing_id'))->delete();

        if($device) {
            $data = [
                'status' => 200,
                'message' => 'Device deleted successfully'
            ];
        } else {
            $data = [
                'status' => 400,
                'message' => 'Device does not exist'
            ];
        }

        return response()->json($data);
    }
}
