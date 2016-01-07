var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

    mix.sass('app.scss', 'resources/assets/css/app.css')

    	.styles([
    		
    		'../../../bower_components/Materialize/dist/css/materialize.css',
    		
    		'app.css'
    		
    		], 'public/css/public.css')


    	.scripts([

    		'../../../bower_components/jquery/dist/jquery.js',

    		'../../../bower_components/Materialize/dist/js/materialize.js'

    		], 'public/js/public.js')

    	.browserify('main.js')

    	.version([
    		
    		'public/css/public.css',
    		
    		'public/js/public.js'
    		
    		]);

});
