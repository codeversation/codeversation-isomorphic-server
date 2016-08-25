var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    './lib/node_modules/client',
  ],
  output: {
    path: __dirname + '/build',
    filename: 'app.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js'],
  },
}
