var path = require('path');
var webpack = require('webpack');

var config = {
    entry: path.resolve(__dirname, './src/video.js'),
    output: {
        path: path.resolve(__dirname, './lib'),
        library: 'pbu-h5-video',
        libraryTarget: 'umd',
        filename: 'Video.js'
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            // 消除警告
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css?modules&localIdentName=[local]-[hash:base64:5]"
            }
        ]
    },
    externals: {
        'react'       : 'umd react',
        'react-dom'   : 'umd react-dom'
    }
};

module.exports = config;
