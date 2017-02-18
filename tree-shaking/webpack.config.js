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
        loaders: [{
            test: /\.(less)$/,
            load: "style-loader!css-loader!less-loader"
            
        },{
            test: /\.(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', "es2015"]
            }
        }]
    },
    resolve: {
    	alias: {
    		// "moment": "../node_modules/moment/src/moment.js"
    	},
        mainFields: ["jsnext:main", "main"]
    },
    plugins: [
        // new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/)
        // new webpack.ContextReplacementPlugin(/\.\/locale$/, null, false, /js$/)
    ]
}

module.exports = config;
