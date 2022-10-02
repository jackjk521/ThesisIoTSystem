const mix = require('laravel-mix');
require('laravel-mix-polyfill');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
mix.webpackConfig({
    plugins: [
        new NodePolyfillPlugin(),
    ],

    resolve: {
        fallback: {
            fs: require.resolve('browserify-fs'),
            tls: require.resolve("tls-browserify"),
            net: require.resolve("net-browserify"),
        }
    },
});

mix.options({
        legacyNodePolyfills: true
});

 mix.js('resources/js/app.js', 'public/js')
 .react()
    .sass('resources/sass/app.scss', 'public/css');
    
mix.disableNotifications()
//  mix.webpackConfig({ resolve: { fallback: { fs: require("node-libs-browser").fs, path: require("node-libs-browser").path, }, }, })
