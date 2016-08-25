import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackConfig from 'webpack.config.dev.js';
import { spawnemon, prawn } from 'server/utilities';
import { log, pelay } from 'utilities';
import nodemonConfig from 'json/nodemon'

/*
const wp =
webpackMiddleware(
  webpack(webpackConfig),
  {
    publicPath: '/js/',
    stats: {
      colors: true,
      quiet: true,
    },
  }
);
*/

/*
prawn(['lib/node_modules/server'])

.then(child => {
  log('node server started');

  child.stdout.on('data', data => {
    log(`server: ${data}`);
  });

  child.stderr.on('data', data => {
    log(`SERVER ERROR: ${data}`);
  });

  child.on('exit', status => {
    bs.exit();
    log(`Sever Exited with ${status}.`);
  });

  const bs = require('browser-sync').create();

  bs.init({
    proxy: 'localhost: 3030',
    files: ['lib/**\/*'],
  });
})

.catch(err => {
  log(err);
});
*/


spawnemon({
  ...nodemonConfig,
  script: 'lib/node_modules/server',
})
.then(nodemon => {
  log('browser-sync starting');

  const bs = require('browser-sync').create();

  process.on('SIGINT', () => {
    bs.exit();
    nodemon.emit('quit');
  });

  bs.init({
    proxy: 'localhost:3030',
    // files: ['lib/**/*'],
  });

  nodemon.on('start', () => {
    pelay(1).then(::bs.reload);
  });
})
.catch(::console.error);
