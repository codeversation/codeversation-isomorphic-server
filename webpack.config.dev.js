// var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './build/lib/client',
  ],
  output: {
    path: __dirname + '/build',
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js'],
  },
}
