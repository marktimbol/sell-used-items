<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
        <meta name="token" content="{{ csrf_token() }}" />
        <meta name="company_url" content="{{ env('COMPANY_URL') }}" />
        <name name="pusher_key" content="{{ config('broadcasting.connections.pusher.key') }}" />
        <title>Laravel App</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="{{ elixir('css/public.css') }}" />
    </head>

    <body id="app">
        <nav class="red lighten-2" role="navigation">
            <div class="nav-wrapper container">
                <a id="logo-container" href="{{ route('home') }}" class="brand-logo">Logo</a>
                
                <ul class="right hide-on-med-and-down">
                    <li><a href="{{ route('items') }}">Items</a></li>
                </ul>

                <ul id="nav-mobile" class="side-nav">
                    <li><a href="#">Navbar Link</a></li>
                </ul>

                <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
            </div>
        </nav>