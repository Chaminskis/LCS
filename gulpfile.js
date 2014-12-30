var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var sass = require('gulp-sass');

var inject = require("gulp-inject");

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var minifyCSS = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');

var debug = require('gulp-debug');

var shell = require('gulp-shell');
var mocha = require('gulp-mocha');

var karma = require('karma').server;

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


/** Test Tasks **/

gulp.task('test-admin',function(done){
  
    karma.start({
        configFile: __dirname + '/test/admin-karma.conf.js',
        singleRun:true,
    },done);
  
});

gulp.task('test-service',function(done){
  
    return gulp.src(['test/service/serviceSpec.js'],{read:false})
          .pipe(mocha({reporter:'nyan'}));
});


/** end test tasks **/

gulp.task('reload',shell.task(['pm2 reload LCS']));

gulp.task('dev-admin-index',function(){
    var target = gulp.src('views/admin/index.html');

    var sources = gulp.src([
        'public/js/admin/modules.js',
        'public/js/admin/provider/*.js',
        'public/js/admin/service/*.js',
        'public/js/admin/controller/*.js',
        'public/js/admin/admin.js',
    ],{
        read:false
    });

    return target
        .pipe(inject(sources,{
            ignorePath: 'public/',
            addRootSlash: true,
        }))
        .pipe(gulp.dest('views/admin'));
});

/** dev auth login **/
gulp.task('dev-login-index',function(){
    var target = gulp.src('views/admin/login.html');
    
    var sources = gulp.src([
        'public/js/auth/modules.js',
        'public/js/auth/services/*.js',
        'public/js/auth/controllers/*.js',
        'public/js/auth/auth.js',
    ],{
        read:false
    });

    return target
        .pipe(inject(sources,{
            ignorePath: 'public/',
            addRootSlash: true,
        }))
        .pipe(gulp.dest('views/admin'));
});


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
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('public/dist/js'));
});

gulp.task('prod-admin-index',function(){
    var target = gulp.src('views/admin/index.html');

    var sources = gulp.src([
        'public/dist/js/admin_script.min.js',
    ],{
        read:false
    });

    return target
        .pipe(inject(sources,{
            ignorePath: 'public/',
            addRootSlash: true,
        }))
        .pipe(gulp.dest('views/admin'));
});


gulp.task('admin_script', function() {
    return gulp.src([
        
        'public/js/admin/modules.js',
        'public/js/admin/service/*.js',
        'public/js/admin/service/*.js',
        'public/js/admin/controller/*.js',
        'public/js/admin/admin.js',
    ])
    .pipe(concat('admin_script.js'))
    .pipe(gulp.dest('public/dist/js'))
    .pipe(uglify())
    .pipe(rename('admin_script.min.js'))
    .pipe(gulp.dest('public/dist/js'));
});

gulp.task('admin_script_jshint', function () {
  return gulp.src(['public/js/admin/*.js',
                   'public/js/admin/controller/*.js',
                   'public/js/admin/service/*.js'])

    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
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
    .pipe(concat('style.css'))
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
  runSequence('styles', ['admin_script_jshint','admin_script','scripts','images', 'fonts', 'copy'], cb);
});

// Build admin index file
gulp.task('dev',['admin_script_jshint','dev-admin-index','dev-login-index']);

// Build admin index file
gulp.task('prod',['admin_script_jshint','admin_script','prod-admin-index']);

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}
