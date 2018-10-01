var ExtractTextPlugin = require('extract-text-webpack-plugin'); 
var path = require('path'); 
module.exports= {
    "entry": "./app.js",
    "output": {
        "path": "app",
        "filename": "bundle.js"
    },
    "module": {
        "loaders": [
            {
                "test": /.less$/,
                "loader": "style-loader!css-loader!less-loader"
            },
            {
                "test": /.(js)$/,
                "exclude": /node_modules/,
                "loader": "babel-loader",
                "query": {
                    "presets": [
                        "react"
                    ]
                }
            },
            {
                "test": /.(js)$/,
                "exclude": /node_modules/,
                "loader": "babel-loader",
                "query": {
                    "presets": [
                        "es2015"
                    ]
                }
            }
        ]
    },
    "plugins": [
        new ExtractTextPlugin("app.css")
    ]
}