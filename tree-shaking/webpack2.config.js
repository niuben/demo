var path = require("path");
var webpack = require("webpack");
module.exports = {
    entry: {
        main: ['./main']
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
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 500000,
        maxAssetSize: 500000
    }
}