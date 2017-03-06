var path = require("path");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var StringHtmlReplaceWebpackPlugin = require("string-html-replace-webpack-plugin");
// var argv = require('optimist').argv;

var config = {
    entry: {
        // vender:["react", "react-dom", "react-router"],
        app: ['./index']
    },
    output: {
        path: path.join(__dirname) + "/dist/",
        filename: "[name].bundle.js",
    },
   
    plugins: [
        new HtmlWebpackPlugin({
            filename: ".app.html",
            template: "./index.html",
            showErrors: false, 
            hash: true 
        }),
        new StringHtmlReplaceWebpackPlugin({
            enable: true,
            patterns: [
                {
                    // eg.
                    // <link href="build.css">  =>
                    // <link href="//cdn.baidu.com/static/build.css"> 
                    match: /href=\"([^\"]*)\"/g,
                    replacement: function (match, $1) {
                        return 'href="' + CDN_PREFIX + $1 + '"';
                    }
                },
                {
                    // eg.
                    // <script src="build.js">  =>
                    // <script src="//cdn.baidu.com/static/build.js"> 
                    match: /src=\"([^\"]*)\"/g,
                    replacement: 'href="' + CDN_PREFIX + '$1"'
                }    
            ]
        })
    ]
}

// if (argv.inline) {        
//     console.log("dev");        
//     config.output.publicPath = "http://localhost:8080/";
// }

// if (argv.p) {        
//     config.plugins.push(
//         new webpack.optimize.UglifyJsPlugin({
//             compress:{
//                 warnings: false
//             }
//         })
//     );
//     delete config.devtool;
// }

module.exports = config;
