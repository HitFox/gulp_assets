var _            = require('lodash');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gutil        = require('gulp-util');
var livereload   = require('gulp-livereload');
var rev          = require('gulp-rev');
var revReplace   = require('gulp-rev-replace');
var stream       = require('webpack-stream');
var rename       = require('gulp-rename');
//var debug      = require('gulp-debug');
var sequence     = require('run-sequence');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');
var csswring     = require('csswring');
var sourcemaps   = require('gulp-sourcemaps');

var path             = require('path');
var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig    = require('./webpack.common.config');
var webpackConfigHot = require('./webpack.hot.config');

var postProcessorsDev   = [autoprefixer({browsers: ['last 3 version']})];
var postProcessors   = [autoprefixer({browsers: ['last 3 version']}), mqpacker, csswring];

var BASE             = 'frontend/';
var ASSET_FILES      = 'frontend/assets/**/*';
var STYLESHEET_FILES = 'frontend/stylesheets/**/*.scss';
var OUTPUT_FOLDER    = 'public/assets/';

function replace() {
  var manifest = gulp.src(OUTPUT_FOLDER + 'rev-manifest.json');
  return revReplace({manifest: manifest});
}

gulp.task('assets:development', function(){
  return gulp.src(ASSET_FILES, {base: BASE})
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(livereload());
});

gulp.task('assets:production', function(){
  return gulp.src(ASSET_FILES, {base: BASE})
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev.manifest(OUTPUT_FOLDER + 'rev-manifest.json', {
      merge: true,
      base: OUTPUT_FOLDER
    }))
    .pipe(gulp.dest(OUTPUT_FOLDER));
});

gulp.task('css:development', function () {
  return gulp.src(STYLESHEET_FILES, {base: BASE})
    .pipe(sourcemaps.init())
    .pipe(sass({sourceMapContents: true})
       .on('error', sass.logError))
    .pipe(postcss(postProcessorsDev))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(livereload());
});

gulp.task('css:production', function () {
  return gulp.src(STYLESHEET_FILES, {base: BASE})
    .pipe(sass()
       .on('error', sass.logError))
    .pipe(postcss(postProcessors))
    .pipe(replace())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev.manifest(OUTPUT_FOLDER + 'rev-manifest.json', {
      merge: true,
      base: OUTPUT_FOLDER
    }))
    .pipe(gulp.dest(OUTPUT_FOLDER));
});

gulp.task('javascript:production', function(){
  return gulp.src('frontend/javascripts/main.js', {base: 'frontend'})
    .pipe(stream(webpackConfig, webpack))
    .pipe(rename({dirname: 'javascripts'}))
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev.manifest(OUTPUT_FOLDER + 'rev-manifest.json', {
      merge: true,
      base: OUTPUT_FOLDER
    }))
    .pipe(gulp.dest(OUTPUT_FOLDER));
});

gulp.task('webpack:server', function(cb){
  var compiler = webpack(webpackConfigHot);
  var server   = new WebpackDevServer(compiler, webpackConfigHot.devServer);
  server.listen(8080, 'localhost', function(){
    console.info('==> 🚧  Webpack development server listening on localhost:8080');
  });
  server.listeningApp.on('close', function(){
    console.log('closing', arguments);
    cb();
  });
});

gulp.task('default', ['css:development', 'assets:development'], function(cb){
  gulp.run('webpack:server');
  livereload.listen();
  gulp.watch(STYLESHEET_FILES, ['css:development']);
});

gulp.task('precompile', function(cb){
  sequence(
    'assets:production',
    'css:production',
    'javascript:production',
    cb
  );
});



