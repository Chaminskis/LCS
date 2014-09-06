var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var sass = require('gulp-sass');

var rename = require('gulp-rename');
var concat = require('gulp-concat');

var minifyCSS = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('public/js/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('scripts', function() {
    return gulp.src('public/js/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('public/dist/js'))
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('public/dist/js'));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('public/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public/dist/images'))
    .pipe($.size({title: 'images'}));
});


// Copy All Files At The Root Level (public)
gulp.task('copy', function () {
  return gulp.src([
    'public/*',
    '!public/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('public/dist'))
    .pipe($.size({title: 'copy'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['public/fonts/**'])
    .pipe(gulp.dest('public/dist/fonts'))
    .pipe($.size({title: 'fonts'}));
});

gulp.task('styles', function () {
  return gulp.src([
      'public/css/*.scss',
      'public/css/components/*.scss'
    ])
    
    .pipe(sass())
    .pipe(minifyCSS({keepBreaks:true}))

    .pipe(gulp.dest('public/dist/css'));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: 'public'
    }

  });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', ['scripts','images', 'fonts', 'copy'], cb);
});

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}
