var webpack = require('webpack');
var DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './build/lib/node_modules/client',
  ],
  output: {
    path: __dirname + '/build',
    filename: 'app.js',
  },
  plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env'
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  },
}
