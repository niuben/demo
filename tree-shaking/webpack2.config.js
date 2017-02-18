var path = require("path");
var webpack = require("webpack");

var config = {
    entry: {
        app: ['./index']
    },
    output: {
        path: path.join(__dirname) + "/dist/",
        filename: "[name].bundle.js"
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react']
            }
        }]
    },
    resolve: {    	
        mainFields: ["jsnext:main", "main"]
    }
}

module.exports = config;
