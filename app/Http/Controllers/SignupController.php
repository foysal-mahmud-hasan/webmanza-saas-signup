<?php

namespace App\Http\Controllers;
use App\Models\Store;

use Illuminate\Http\Request;

class SignupController extends Controller
{
    public function Save(Request $request){

        $query = new Store();

        $query->store_name = $request->store_name;
        $query->domain_name = $request->domain_name;
        $query->theme_id = $request->theme_id;
        $query->tin_number = $request->tin_number;
        $query->bin_number = $request->bin_number;
        $query->delivery_partner_id = $request->delivery_partner_id;
        $query->payment_partner_id = $request->payment_partner_id;
        $query->Save();

        return response()->json(['message' => "Succses"]);
    }
}
