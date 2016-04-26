var webpack = require('webpack');
var path = require('path')
var srcPath = path.join(__dirname, 'src')
var entry = path.join(__dirname, 'src', 'index')
var outputPath = path.join(__dirname, 'dist')

var port = process.env.PORT || 3000
var plugins = [];
plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:'+port, // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        entry // Your appʼs entry point
    ],
    output: {
        path: outputPath,
        publicPath: '/dist/', //a path used in index.html or other file to reference compiled files
        filename: "bundle.js"
    },
    devtool: 'source-map',
    module: {
        //html file hadn't a loader, so edit html file can not hot refresh
        loaders: [
            // issue css?sourceMap cause font file to encode fail
            // but not ?sourceMap cannot use sourceMap in css file
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass?sourceMap"]
            },
            {
                // babel 6
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    // https://github.com/babel/babel-loader#options
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.gif$/  , loader: "url?limit=10000&mimetype=image/gif" },
            { test: /\.jpg$/  , loader: "url?limit=10000&mimetype=image/jpg" },
            { test: /\.png$/  , loader: "url?limit=10000&mimetype=image/png" },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/ , loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/  , loader: "file?mimetype=application/vnd.ms-fontobject" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/  , loader: "file?mimetype=application/x-font-ttf" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/  , loader: "file?mimetype=image/svg+xml" },

        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins:plugins
};