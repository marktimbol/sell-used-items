<?php

use App\Events\UserRegistered;

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
    	event( new UserRegistered('test comment') );
		// $app_id = '140720';
		// $app_key = '86f659a98a596ff7d50e';
		// $app_secret = '2a3029af03bf9383acfc';

		// $pusher = new Pusher(
		//   $app_key,
		//   $app_secret,
		//   $app_id,
		//   array('encrypted' => true)
		// );

		// $data['message'] = 'hello world';

		// return $pusher->trigger('test_channel', 'my_event', $data);


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