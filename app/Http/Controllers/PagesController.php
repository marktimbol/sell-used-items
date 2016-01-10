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
    	$user = [];	
    	$userLikes = [];

    	if( Auth::user() )
    	{
    		$user = Auth::user();

    		$userLikes = $user->likes;
    	}

    	\JavaScript::put([
    		'signedIn' => $user ? true : false,
    		'user' => [
    			'likes'	=> $userLikes
    		]
    	]);
    	return view('public.home');
    }
}
