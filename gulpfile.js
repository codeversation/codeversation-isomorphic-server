var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpWebpack = require('gulp-webpack');
var browserSync = require('browser-sync');
var path = require('path');
var changed = require('gulp-changed');
var del = require('del');
var webpackConfig = require('./webpack.config.dev.js');
var nodemon = require('gulp-nodemon');
var nodemonConfig = require('./json/nodemon');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var webpackMiddleware = require('webpack-middleware');
var gutil = require('gulp-util');

var paths = {
  src: 'src',
  build: 'build',
  json: 'json',
  views: 'views'
};

paths['app'] = path.join(paths.build, 'app.js');
paths['srcFiles'] = path.join(paths.src, '**', '*.js');
paths['jsonFiles'] = path.join(paths.json, '**', '*.json');
paths['viewFiles'] = path.join(paths.views, '**', '*.{jade,ejs}');
paths['buildFiles'] = path.join(paths.build, '**', '*');
paths['lib'] = path.join(paths.build, 'lib', 'node_modules');
paths['libFiles'] = path.join(paths.lib, '**', '*.js');
paths['jsonDest'] = path.join(paths.build, 'json');
paths['viewsDest'] = path.join(paths.build, 'views');
paths['clientEntry'] = path.join(paths.lib, 'client/index.js');
paths['serverEntry'] = path.join(paths.lib, 'server/index.js');
paths['devServerEntry'] = path.join(paths.lib, 'server/devServer.js');

nodemonConfig.watch = [paths.lib];

// start dev server
gulp.task('server', ['browser-sync', 'browser-sync-watch'], () => {
  nodemonConfig.script = paths.devServerEntry;
  nodemonConfig.stdout = false;

  nodemon(nodemonConfig)

  .on('stdout', data => {
    var str = data.toString().trim();

    str.split(/\r\n|\r|\n/g).forEach(line => {
      gutil.log(`[srv]: ${line}`);
      if(line === '* LISTENING *') browserSync.reload();
    });
  });
});

gulp.task('browser-sync', () => {

  const wp = webpackMiddleware(
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

  browserSync.init({
    proxy: {
      target: 'localhost:3030',
      middleware: wp,
    },
    open: false,
    reloadOnRestart: false,
    reloadDelay: 0,
    // files: ['lib/**/*'],
  });
});

gulp.task('build',
  [
    'build-lib',
    'build-views',
    'build-json',
    'build-app'
  ]
);

gulp.task('watch',
  [
    'build',
    'watch-src',
    'watch-json',
    'watch-views',
    'watch-lib'
  ]
);

gulp.task('browser-sync-build',
  [
    'build-lib',
    'build-views',
    'build-json',
  ]
);

gulp.task('browser-sync-watch',
  [
    'browser-sync-build',
    'watch-src',
    'watch-json',
    'watch-views',
  ]
);

// watches
gulp.task('watch-src', () => {
  gulp.watch(paths.srcFiles, ['build-lib']);
});

gulp.task('watch-json', () => {
  gulp.watch(paths.jsonFiles, ['build-json']);
});

gulp.task('watch-views', () => {
  gulp.watch(paths.viewFiles, ['build-views']);
});

// unused in favor of webpackMiddleware with browser-sync
gulp.task('watch-lib', () => {
  webpackConfig.watch = true;

  gulp.watch(paths.libFiles, {}, () => {
    return gulp.src(paths.clientEntry)
      .pipe(gulpWebpack(webpackConfig))
      .pipe(gulp.dest(paths.build));
  });
});

///////////// builds

gulp.task('build-app', ['build-lib'], () => {
  webpackConfig.watch = false;

  return gulp.src(paths.clientEntry)
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest(paths.build));

});

gulp.task('build-lib', () => {
  return gulp.src(paths.srcFiles)
    .pipe(changed(paths.lib))
    .pipe(babel())
    .pipe(gulp.dest(paths.lib));
});

gulp.task('build-views', () => {
  return gulp.src(paths.viewFiles)
    .pipe(changed(paths.lib))
    .pipe(gulp.dest(paths.viewsDest));
});

gulp.task('build-json', () => {
  return gulp.src(paths.jsonFiles)
    .pipe(changed(paths.lib))
    .pipe(gulp.dest(paths.jsonDest));
});

// clean
gulp.task('clean', () => {
  return del(paths.build);
});
