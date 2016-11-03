var webpack = require('webpack');
var DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
		'webpack-hot-middleware/client',
    'babel-polyfill',
    './build/src/node_modules/client',
  ],
  output: {
    path: __dirname + '/build',
    filename: 'app.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
		publicPath: '/',
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
      },
			{
				test: /build\/src\/node_modules\/.*\.js$/,
				loader: 'babel-loader',
				query: {
					babelrc: false,
				  presets: [
				    "react",
				    "es2015",
				    "stage-0",
						'react-hmre',
				  ],
				}
			},
    ]
  },
  resolve: {
    extensions: ['', '.js'],
  },
}
