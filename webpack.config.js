var webpack = require('webpack');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DirFileDataPlugin = require('./lib/DirFileDataPlugin.js');
// var WatchIgnorePlugin = require('watch-ignore-webpack-plugin')
 


var srcPath = path.join(__dirname, 'src')
var entry = path.join(__dirname, 'src', 'index')
var outputPath = path.join(__dirname, 'dist')

var port = process.env.PORT || 3000
var plugins = [];
// createDataJSON('posts');
plugins = plugins.concat([
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: "commons",
    //     filename: "commons.js",
    // }),
    new DirFileDataPlugin({ 
        entry: path.join(__dirname, 'posts'),
        output: path.join(__dirname, 'src', 'posts.json'),
    }),
    // new WatchIgnorePlugin([
    //     path.resolve(__dirname, 'src', 'posts.json'),
    // ]),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'), // Load a custom template
        inject: false, // Inject all scripts into the body
        chunks: ['main', 'document'],
    })
]);


module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://0.0.0.0:'+port, // WebpackDevServer host and port
        // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        entry // Your appʼs entry point
    ],
    output: {
        path: outputPath,
        chunkFilename: '[name].chunk.js',
        // publicPath: __dirname + '/dist/', //a path used in index.html or other file to reference compiled files
        filename: "bundle.js"
    },
    // devtool: 'source-map',
    devtool: 'eval',
    devServer: { hot: true },
    module: {
        //html file hadn't a loader, so edit html file can not hot refresh
        loaders: [
            {
                test: /\.md$/,
                loader: 'babel-loader!reactdown/webpack',
            },
            {
                    test   : /\.json$/i, 
                    loader : "json",
            },
            {
                    test   : /\.css$/i, 
                    loaders : ["style", "css"]
            },
            
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
                // query: {
                //     // https://github.com/babel/babel-loader#options
                //     cacheDirectory: true,
                //     presets: ['es2015', 'react', 'stage-1']
                // }
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