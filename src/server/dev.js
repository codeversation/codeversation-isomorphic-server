import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackConfig from 'webpack.config.dev.js';
import { spawnemon } from 'server/utilities';

const wp =
webpackMiddleware(
  webpack(webpackConfig),
  {
    publicPath: '/js/',
    stats: {
      colors: true,
    },
  }
);

runNode('./index.js')
.then(() => {
  const bs = require('browser-sync').create();

  bs.init({
    proxy: {
      target: 'localhost:3000',
      middleware: [wp],
    },
  });
})
.catch(::console.error);
