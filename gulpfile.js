var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpWebpack = require('gulp-webpack');
var browserSync = require('browser-sync');
var path = require('path');
var changed = require('gulp-changed');
var del = require('del');
var webpackConfig = require('./webpack.config.dev.js');
var nodemon = require('gulp-nodemon');
var nodemonConfig = require('./nodemon');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var webpackMiddleware = require('webpack-middleware');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');

var paths = {
  src: 'src',
  build: 'build',
  json: 'json',
  views: 'views',
  envFile: '.env',
  vendor: 'vendor',
};

paths['app'] = path.join(paths.build, 'app.js');
paths['srcFiles'] = path.join(paths.src, '**', '*.js');
paths['jsonFiles'] = path.join(paths.json, '**', '*.json');
paths['viewFiles'] = path.join(paths.views, '**', '*.{jade,ejs}');
paths['buildFiles'] = path.join(paths.build, '**', '*');
paths['vendorFiles'] = path.join(paths.vendor, '**', '*');
paths['lib'] = path.join(paths.build, 'lib', 'node_modules');
paths['libFiles'] = path.join(paths.lib, '**', '*.js');
paths['vendorDest'] = path.join(paths.lib, 'vendor');
paths['jsonDest'] = path.join(paths.build, 'json');
paths['viewsDest'] = path.join(paths.build, 'views');
paths['clientEntry'] = path.join(paths.lib, 'client/index.js');
paths['serverEntry'] = path.join(paths.lib, 'server/index.js');
paths['devServerEntry'] = path.join(paths.lib, 'server/devServer.js');

nodemonConfig.watch = [paths.lib];
gulp.task('default', ['server', 'eslint'])

// start dev server
gulp.task('server', ['browser-sync', 'browser-sync-build-watch'], () => {
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

gulp.task('eslint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
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

gulp.task('build-watch',
  [
    'build',
    'watch',
  ]
);

gulp.task('build',
  [
    'browser-sync-build',
    'build-app',
  ]
);

gulp.task('watch',
  [
    'browser-sync-watch',
    'watch-lib',
  ]
);

gulp.task('browser-sync-build-watch',
  [
    'browser-sync-build',
    'browser-sync-watch',
  ]
);

gulp.task('browser-sync-build',
  [
    'build-lib',
    'build-views',
    'build-json',
    'build-dotenv',
    'build-vendor',
  ]
);

gulp.task('browser-sync-watch',
  [
    'watch-src',
    'watch-json',
    'watch-views',
    'watch-dotenv',
    'watch-vendor',
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

gulp.task('watch-vendor', () => {
  gulp.watch(paths.vendorFiles, ['build-vendor']);
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

gulp.task('watch-dotenv', () => {
  gulp.watch(paths.envFile, ['build-dotenv']);
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
    .pipe(changed(paths.viewsDest))
    .pipe(gulp.dest(paths.viewsDest));
});

gulp.task('build-json', () => {
  return gulp.src(paths.jsonFiles)
    .pipe(changed(paths.jsonDest))
    .pipe(gulp.dest(paths.jsonDest));
});

gulp.task('build-dotenv', () => {
  return gulp.src(paths.envFile)
    .pipe(gulp.dest(paths.build))

})

gulp.task('build-vendor', () => {
  return gulp.src(paths.vendorFiles)
    .pipe(changed(paths.vendorDest))
    .pipe(gulp.dest(paths.vendorDest));
});

// clean
gulp.task('clean', () => {
  return del(paths.build);
});
