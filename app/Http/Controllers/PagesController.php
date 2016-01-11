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
    	$user = [];	
    	$userLikes = [];

    	if( Auth::check() )
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

    public function logUser($id = null)
    {
    	if( $id )
    	{
    		return Auth::loginUsingId($id);
    	}

    	return Auth::loginUsingId(1);
    }
}
