<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemsController extends Controller
{
    public function index()
    {
        \JavaScript::put([
            'signedIn' => Auth::check() ? true : false,
            'user' => [
                'info'  => Auth::check() ? Auth::user() : [],
                'likes' => Auth::check() ? Auth::user()->likes : []
            ]
        ]);

        return view('public.items.index'); 
    }

    public function show($id)
    {
        $item = Item::with('user')->findOrFail($id);

        \JavaScript::put([
            'signedIn' => Auth::check() ? true : false,
            'item'  => $item,
            'user' => [
                'info'  => Auth::check() ? Auth::user() : [],
                'likes' => Auth::check() ? Auth::user()->likes : []
            ]
        ]);


        return view('public.items.show', compact('item'));
    }

}
