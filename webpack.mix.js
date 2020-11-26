const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sourceMaps();

mix.scripts([
    'resources/js/adminLte-3.1.0.js',
    'resources/js/fontAwesome-5.15.1.js',
    'resources/js/sweetAlert2-10.10.1.js',
    'resources/js/chartJs-2.9.4.js',
    'resources/js/select2-4.1.0.js',
    'resources/js/select2Es-4.0.0.js',
], 'public/js/all.js');

mix.styles([
    'resources/css/adminLte-3.1.0.css',
    'resources/css/select2-4.1.0.css',
    'resources/css/app.css',
], 'public/css/all.css');

mix.browserSync('sind1.test');