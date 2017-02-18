var path = require("path");
var webpack = require("webpack");

var config = {
    entry: {
        app: ['./index']
    },
    output: {
        path: path.join(__dirname) + "/dist/",
        filename: "[name].bundle.js"
    }
}

module.exports = config;
