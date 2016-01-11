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

    Route::get('/', 'PagesController@home');

    Route::get('/logUser/{id}', 'PagesController@logUser');
 
});

Route::group(['middleware' => ['web', 'auth']], function() {

	Route::get('/profile', 'ProfileController@index');

});

Route::group(['middleware' => 'web'], function () {

	Route::get('api/items', 'api\ItemsController@index');

	Route::get('api/item/{id}/totalLikesCount', 'api\ItemsController@totalLikesCount');

	Route::post('api/likes', 'api\LikesController@store');

	Route::delete('api/likes/{id}', 'api\LikesController@destroy');
});