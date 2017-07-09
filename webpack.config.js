var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './src/temporal.js',
  devtool: 'sourcemap',
  plugins: [
      new webpack.optimize.UglifyJsPlugin()
  ],
  output: { path: __dirname + '/dist', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};