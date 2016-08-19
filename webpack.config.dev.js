// var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    './build/lib/node_modules/client',
  ],
  output: {
    path: __dirname + '/build',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js'],
  },
}
