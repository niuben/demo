var path = require("path");
var webpack = require("webpack");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var argv = require('optimist').argv;

var config = {
    entry: {
        vender:["react"],
    },
    output: {
        path: path.join(__dirname) + "/dist/",        
        filename: "[name].bundle.js",
    },
    devtool: "source-map",
    module: {
        loaders: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']             
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}
module.exports = config;
