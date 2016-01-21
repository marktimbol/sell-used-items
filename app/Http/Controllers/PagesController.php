<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Item;
use Illuminate\Http\Request;
use Auth;

class PagesController extends Controller
{
    public function home()
    {
        \JavaScript::put([
            'signedIn' => Auth::check() ? true : false,
            'user' => [
                'info'  => Auth::check() ? Auth::user() : [],
                'likes' => Auth::check() ? Auth::user()->likes : []
            ]
        ]);

    	return view('public.home');
    }
}
