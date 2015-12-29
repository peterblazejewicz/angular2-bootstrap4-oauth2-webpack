// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
var webpack = require('webpack');
// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

/*
 * Config
 */
module.exports = {
    // for faster builds use 'eval'
    devtool: 'source-map',
    debug: true, // remove in production

    entry: {
//        'vendor': './src/vendor.ts',
        'vendor': './src/vendor.ts',
        'app': './src/app/app.ts' // our angular app
    },

    // Config for our build files
    output: {
        path: root('__build__'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        pathinfo: true
    },

    resolve: {
        // ensure loader extensions match
        alias: { // failed attempt to import into vendor.ts
            jquery: path.join(__dirname, 'src/lib/jquery/jquery.min.js'),
            'js.cookie': path.join(__dirname, 'src/lib/js.cookie/js.cookie.js'),
            bootstrap: path.join(__dirname, 'src/lib/bootstrap/bootstrap.js')
        },
        extensions: ['', '.ts', '.js', '.json', '.css', '.html']
    },

    module: {
//        preLoaders: [ { test: /\.ts$/, loader: 'tslint-loader' } ],
        loaders: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                query: {
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ]
                },
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },

            // Support for *.json files.
            {test: /\.json$/, loader: 'json-loader'},

            // Support for CSS as raw text
            {test: /\.css$/, loader: 'raw-loader'},

            // support for .html as raw text
            {test: /\.html$/, loader: 'raw-loader'}
        ],
        noParse: [/angular2-polyfills/]
    },

    plugins: [
        new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        new CommonsChunkPlugin({name: 'common', filename: 'common.js', minChunks: 2, chunks: ['app', 'vendor']})
        // include uglify in production
    ],

    // Other module loader config
    tslint: {
        emitErrors: true,
        failOnHint: false
    },
    // our Webpack Development Server config
    devServer: {
        contentBase: 'src',
        publicPath: '/__build__',
        colors: true,
        progress: true,
        port: 3000,
        displayCached: true,
        displayErrorDetails: true,
        inline: true
    }
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}