import gulp from 'gulp';
import babel from 'gulp-babel';
import gulpWebpack from 'gulp-webpack';
import browserSync from 'browser-sync';
import path from 'path';
import changed from 'gulp-changed';
import del from 'del';
import webpackConfig from './webpack.config.dev.js';
import nodemon from 'gulp-nodemon';
import nodemonConfig from './nodemon';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import { spawn } from 'child_process';

browserSync = browserSync.create();

const projPath = (...postfix) => path.join(__dirname, ...postfix);
const buildPath = (...postfix) => projectPath('build', ...postfix);
const libPath = (...postfix) => buildPath('lib', 'node_modules', ...postfix);
const files = prefix => path.join(prefix, '**', '*');

const paths =
{
	src: {
		src: projPath('src'),
		dest: {
			babel: libPath(),
			hmr: buildPath('src', 'node_modules'),
		},
	},
	views: {
		src: projPath('views'),
		dest: buildPath('views'),
	},
	json: {
		src: projPath('json'),
		dest: buildPath('json'),
	},
	env: {
		src: projPath('.env'),
		dest: buildPath('.env'),
	},
	vendor: {
		src: projPath('vendor'),
		dest: libPath('vendor'),
	},
	server: {
		dir: libPath('server'),
		index: libPath('server', 'index.js'),
		dev: libPath('server', 'devServer.js'),
	},
	client: {
		dir: libPath('client'),
		index: libPath('client', 'index.js'),
	},
	app: buildPath('app.js'),
}

// var paths = {
//   src: 'src',
//   build: 'build',
//   json: 'json',
//   views: 'views',
//   envFile: '.env',
//   vendor: 'vendor',
// };
//
// paths['app'] = path.join(paths.build, 'app.js');
// paths['srcFiles'] = path.join(paths.src, '**', '*.js');
// paths['jsonFiles'] = path.join(paths.json, '**', '*.json');
// paths['viewFiles'] = path.join(paths.views, '**', '*.{jade,ejs}');
// paths['buildFiles'] = path.join(paths.build, '**', '*');
// paths['vendorFiles'] = path.join(paths.vendor, '**', '*');
// paths['lib'] = path.join(paths.build, 'lib', 'node_modules');
// paths['libFiles'] = path.join(paths.lib, '**', '*.js');
// paths['vendorDest'] = path.join(paths.lib, 'vendor');
// paths['jsonDest'] = path.join(paths.build, 'json');
// paths['viewsDest'] = path.join(paths.build, 'views');
// paths['server'] = path.join(paths.lib, 'server');
// paths['clientEntry'] = path.join(paths.lib, 'client', 'index.js');
// paths['serverEntry'] = path.join(paths.server, 'index.js');
// paths['devServerEntry'] = path.join(paths.server, 'devServer.js');
// paths['srcHotLoadDest'] = path.join(paths.build, 'src', 'node_modules');

nodemonConfig.watch = [paths.server.dir];
gulp.task('default', ['server'])

// start dev server
gulp.task('server', ['browser-sync'], () => {
  nodemonConfig.script = paths.devServerEntry;
  nodemonConfig.stdout = false;


  nodemon(nodemonConfig)
	  .on('stdout', data => {
	    var str = data.toString().trim();

	    str.split(/\r\n|\r|\n/g).forEach(line => {
	      gutil.log(`[srv]: ${line}`);
	      if(line === '* LISTENING *') browserSync.reload();
	    });
	  })
	  .on('stderr', data => {
	    var str = data.toString().trim();

	    str.split(/\r\n|\r|\n/g).forEach(line => {
	      gutil.log(`[srv stderr]: ${line}`);
	      if(line === '* LISTENING *') browserSync.reload();
	    });
	  });
});

gulp.task('eslint', () => {
  return gulp.src([paths.srcFiles])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('browser-sync', ['browser-sync-build-watch'], () => {
	const compiler = webpack(webpackConfig);

  const WPMW = webpackMiddleware(
    compiler,
    {
      publicPath: '/',
      stats: false,
      progress: true,
    }
  );

	const HMRMW = webpackHotMiddleware(compiler);

  browserSync.init({
    proxy: {
      target: 'localhost:3030',
      middleware: [HMRMW, WPMW],
    },
    open: false,
    reloadOnRestart: false,
    reloadDelay: 0,
		ws: true,
    // files: ['lib/**/*'],
  });
});

// used to reload broser when lib and therefore app.js change.
// Not currently used because the server needs to be restarted after
// EVERY change in order to stay up to date.
//
// This may become useful again after HMR.
gulp.task('browser-sync-watch-lib', () => {
  gulp.watch(paths.libFiles, ['browser-sync-reload']);
});

gulp.task('browser-sync-reload', () => {
  browserSync.reload();
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
		'build-hmr',
  ]
);

gulp.task('browser-sync-watch',
  [
    'watch-src',
    'watch-json',
    'watch-views',
    'watch-dotenv',
    'watch-vendor',
		'watch-hmr',
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

gulp.task('watch-hmr', () => {
	gulp.watch(paths.srcFiles, ['build-hmr']);
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
    .pipe(plumber((err) => {

      gutil.log('[babel] ' + gutil.colors.red('Babel failed to compile.'));
      gutil.log(`[babel] ${gutil.colors.red(err.message)}`);

      err.codeFrame.split(/\r\n|\r|\n/g).forEach(line => {
        gutil.log(`[babel]: ${line}`);
      });

    }))
    .pipe(changed(paths.lib))
    // .pipe(eslint())
    // .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(gulp.dest(paths.lib));
});

gulp.task('build-hmr', () => {
	return gulp.src(paths.srcFiles)
		.pipe(changed(paths.srcHotLoadDest))
		.pipe(gulp.dest(paths.srcHotLoadDest));
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

const buildVendor = () => {
  return gulp.src(paths.vendorFiles)
    .pipe(changed(paths.vendorDest))
    .pipe(gulp.dest(paths.vendorDest));
};

// clean
gulp.task('clean', () => {
  return del(paths.build);
});
