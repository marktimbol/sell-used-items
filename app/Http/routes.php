<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => 'web'], function () {

    Route::auth();

    Route::resource('items', 'ItemsController');
 
    Route::resource('likes', 'LikesController');
 
    Route::get('/', 'PagesController@home');

});

Route::group(['middleware' => ['web', 'auth']], function() {

	Route::get('/profile', 'ProfileController@index');

});

Route::group(['middleware' => ['api']], function () {
    
	Route::get('api/items', 'ItemsController@index');

});