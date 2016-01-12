<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => 'Mark Timbol',
        'email' => 'mark.timbol@hotmail.com',
        'password' => bcrypt('marktimbol'),
        'remember_token' => str_random(10),
    ];
});


$factory->define(App\Item::class, function (Faker\Generator $faker) {
    return [
    	'user_id'	=> 1,
        'price' => $faker->randomNumber(2),
        'description' => $faker->paragraph,
        'path' => 'http://placehold.it/640x480'
    ];
});
