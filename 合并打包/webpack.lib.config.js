var path = require("path");
var webpack = require("webpack");
var config = {
    entry: {
        lib:[
            // "jquery", 
            "react", 
            "react-dom", 
            // "bootstrap"
            // "react-router", 
            // "moment", 
            // "echarts", 
            // "zrender", 
            // "perfect-scrollbar", 
             "antd", 
            // "antd/node_modules/rc-calendar", "antd/node_modules/rc-calendar/node_modules/rc-trigger/","antd/node_modules/rc-calendar/node_modules/rc-trigger/node_modules/rc-align","antd/node_modules/rc-calendar/node_modules/rc-trigger/node_modules/rc-align/node_modules/dom-align",
            // "antd/node_modules/rc-time-picker","antd/node_modules/rc-time-picker/node_modules/rc-trigger","antd/node_modules/rc-time-picker/node_modules/rc-trigger/node_modules/rc-align","antd/node_modules/rc-time-picker/node_modules/rc-trigger/node_modules/rc-align/node_modules/dom-align",
            // "react-toastr",
            // "promise"
        ],
        // uiAntd: ["antd"],
    },
    output: {
        path: path.join(__dirname) + "/dist/",        
        filename: "[name].bundle.js",
        library: "[name]"
    },
    plugins: [    
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist", "[name].manifest.json"),
            name: "[name]",
            context: "./",            
        })
    ]
}
module.exports = config;
