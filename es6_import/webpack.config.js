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
    resolve: {
        alias: {
            "moment": "../node_modules/moment/src/moment.js"
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/)
        // new webpack.ContextReplacementPlugin(/\.\/locale$/, null, false, /js$/)
    ]
}

module.exports = config;
