var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: "./index",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
      })
    ]
};
