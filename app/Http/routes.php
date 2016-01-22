<?php

use App\Events\UserPostedAComment;

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

    Route::get('/fire', function() {
    	event( new UserPostedAComment('test comment') );

  	    return 'Done';
    });

    Route::get('/', ['as' => 'home', 'uses' => 'PagesController@home']);
    Route::get('/items', ['as' => 'items', 'uses' => 'ItemsController@index']); 
    Route::get('/items/{item}', ['as' => 'items.show', 'uses' => 'ItemsController@show']); 
});

Route::group(['middleware' => ['web', 'auth']], function() {
	Route::get('/profile', 'ProfileController@index');
});

Route::group(['middleware' => 'api'], function() {
	Route::get('api/items', 'Api\ItemsController@all');
	Route::get('api/item/{item}/totalLikesCount', 'Api\ItemsController@totalLikesCount');
	Route::post('api/item/{item}/like/{userId}', 'Api\ItemsController@like');
	Route::delete('api/item/{item}/unlike/{userId}', 'Api\ItemsController@unlike'); 
	Route::get('api/item/{item}/comments', 'Api\ItemsController@comments'); 
	Route::post('api/item/{item}/comment', 'Api\ItemsController@storeComment'); 
});