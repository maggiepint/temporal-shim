var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');

var config = {
 entry: './test/test.js',
 output: {
   filename: 'temp/testBundle.js'
},
 target: 'node',
 externals: [nodeExternals()],
 node: {
   fs: 'empty'
 },
   module: {
 rules: [
        {
          test: /\.js$/,
          enforce: 'pre',

          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          },
        },
      ],
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

 plugins: [
   new WebpackShellPlugin({
     onBuildExit: "mocha temp/testBundle.js"
   })
 ]
};

module.exports = config;