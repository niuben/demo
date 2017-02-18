var path = require("path");
var webpack = require("webpack");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var argv = require('optimist').argv;

var config = {
    entry: {
        // vender:["react", "react-dom", "react-router"],
        app: ['./index']
    },
    output: {
        path: path.join(__dirname) + "/dist/",
        // path: "./dist/",
        // publicPath: "http://localhost:8080/", 
        filename: "[name].bundle.js",
    },
    // externals: {
    //     jquery: 'jQuery',
    //     jQuery: 'jQuery',
    //     react: 'React',
    //     'react-dom': 'ReactDOM'        
    // },
    devtool: "source-map",
    module: {
        loaders: [
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']             
            }
        }, 
        // {
        //     test: /\.scss/,
        //     loader: 'style-loader!css-loader!sass-loader'
        // }, {
        //     test: /\.(css)$/,
        //     loader: 'style-loader!css-loader'
        // },
        
  //       { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader", {publicPath: "./"})},
  //       { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader", {publicPath: "./"})}, 
  //       {
  //           test: /\.jsx$/,
  //           loader: 'react-templates-loader'
  //       }, {
  //           test: /\.(png|jpg)$/,
  //           loader: 'url-loader?limit=8192'
  //       },{
  //           test: /\.(gif)$/,
  //           loader: 'url-loader?limit=10000'
		// }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./node_modules/compass-mixins/lib")]
    },
    plugins: [
        
        // new webpack.ProvidePlugin({
        //     Store: __dirname + "/src/models/store.js",
        //     React: "react",
        //     ReactDOM: "react-dom",
        //     $: "jquery",
        // }),
        // new ExtractTextPlugin("[name].css"),

        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{
        //         warnings: false
        //     }
        // })

        // new webpack.DllReferencePlugin({
        //     context: "./",
        //     // scope: "xyz",
        //     manifest: require("./dist/lib.manifest.json"),
        // }),

        // new webpack.DllReferencePlugin({
        //     context: ".",
        //     manifest: require("./dist/ui.manifest.json"),          
        // })

        // new webpack.optimize.UglifyJsPlugin({
        //     compress:{
        //         warnings: false
        //     }
        // })
    ],
    resolve:{
        root: __dirname,
        extensions: ['', '.js', '.json', '.scss', '.css'],
        alias: {
            // "react":  __dirname + "/node_modules/react/react.js",
            // "react-dom": __dirname + "/node_modules/react-dom/dist/react-dom.min.js",
            // "react-router": __dirname + "/node_modules/react-router/umd/ReactRouter.min.js",
            // "jQuery": __dirname + "/node_modules/jquery/dist/jquery.min.js"
            
            // echarts: "echarts/dist/echarts.min.js",
            // antd: "antd/dist/antd.min.js",
            // moment: "moment/min/moment.min.js"
        }
    }

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
