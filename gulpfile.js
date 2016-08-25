var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('gulp-webpack');
var browserSync = require('browser-sync');
var path = require('path');
var changed = require('gulp-changed');
var del = require('del');

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

gulp.task('default', () => {
  gulp.src('')
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

gulp.task('watch-src', () => {
  gulp.watch(paths.srcFiles, ['build-lib']);
});

gulp.task('watch-json', () => {
  gulp.watch(paths.jsonFiles, ['build-json']);
});

gulp.task('watch-views', () => {
  gulp.watch(paths.viewFiles, ['build-views']);
});

gulp.task('build', ['build-lib', 'build-views', 'build-json']);

gulp.task('watch', ['build', 'watch-src', 'watch-json', 'watch-views']);

gulp.task('clean', () => {
  return del('build/');
});
