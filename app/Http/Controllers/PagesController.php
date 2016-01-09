<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class PagesController extends Controller
{
    public function home()
    {
    	Auth::loginUsingId(1);

    	\JavaScript::put([
    		'signedIn' => Auth::user() ? true : false
    		]);
    	return view('public.home');
    }
}
