var ExtractTextPlugin = require('extract-text-webpack-plugin'); 
module.exports= {
    "entry": "./test",
    "output": {
        "path": "dis",
        "filename": "bundle.js"
    },
    "module": {
        "loaders": [
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