import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackConfig from 'webpack.config.dev.js';
import { spawnemon, prawn } from 'server/utilities';
import { log, pelay } from 'utilities';
import nodemonConfig from 'json/nodemon'


const wp =
webpackMiddleware(
  webpack(webpackConfig),
  {
    publicPath: '/js/',
    stats: false,
    progress: true,
    watchOptions: {
      aggregateTimeout: 300,
    },
  }
);

spawnemon({
  ...nodemonConfig,
  script: 'lib/node_modules/server/devServer',
})
.then(nodemon => {
  log('browser-sync starting');

  const bs = require('browser-sync').create();

  process.on('SIGINT', () => {
    bs.exit();
    nodemon.emit('quit');
    process.exit();
  });

  bs.init({
    proxy: {
      target: 'localhost:3030',
      middleware: wp,
    },
    open: false,
    reloadOnRestart: true,
    reloadDelay: 1000,
    // files: ['lib/**/*'],
  });

  nodemon.on('start', () => {
    // pelay(1).then(::bs.reload);
    bs.reload();
  });
})
.catch(::console.error);
