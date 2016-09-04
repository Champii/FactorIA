var gulp        = require('gulp'),
livescript      = require('gulp-livescript'),
nodemon         = require('gulp-nodemon'),
server          = require('gulp-server-livereload'),
jsdoc           = require('gulp-jsdoc3'),
gulpJade        = require('gulp-jade'),
jade            = require('jade'),
sourcemaps      = require('gulp-sourcemaps'),
runSequence     = require('run-sequence'),
lib             = require('./gulp/lib'),
karmaServer     = require('karma').Server,
dogen           = require('gulp-dogen'),
path            = require('path');

var pathsTmp = {
  src: './src',
  build: './build',
  client: '/client',
  server: '/server',
  others: {
    jsdoc: {
      dir: './docs/gen',
      config: './jsdoc.json'
    }
  }
}

gulp.task('doc', ['ls-client', 'ls-server'], function () {
  return gulp.src(['README.md'].concat(lib.getLang('build', ['client', 'server'], 'js')), {read: false})
    .pipe(jsdoc());
});

gulp.task('open-doc', ['doc'], function () {
 gulp.src(lib.getOther().jsdoc.dir)
  .pipe(server({
    livereload: {
      enable: true,
      port: 35730
    },
    directoryListing: false,
    open: true,
    port: 8001
  }));
});
/* compile */

gulp.task('jade', function () {
  return gulp.src(lib.getLang('src', 'client', 'jade'))
  .pipe(sourcemaps.init())
  .pipe(gulpJade({
    jade: jade,
    pretty: true
    }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(lib.getDir('build', 'client')));
});

gulp.task('stylus', function () {
  return gulp.src(lib.getLang('src', 'client', 'styl'))
  .pipe(sourcemaps.init())
  .pipe(stylus())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/'));
});

gulp.task('ls-client', function() {
  return gulp.src(['!' + lib.getLang('src', 'client', 'Spec.ls'), lib.getLang('src', 'client', 'ls')])
    .pipe(sourcemaps.init())
    .pipe(livescript())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(lib.getDir('build', 'client')));
});

gulp.task('ls-server', function () {
  return gulp.src(['!' + lib.getLang('src', 'server', 'Spec.ls'), lib.getLang('src', 'server', 'ls')])
    .pipe(sourcemaps.init())
    .pipe(livescript())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(lib.getDir('build', 'server')));
});

gulp.task('ls-server-spec', function() {
  return gulp.src(lib.getLang('src', 'server', 'Spec.ls'))
  .pipe(livescript())
  .pipe(gulp.dest(lib.getKarmaSrc() + lib.getDir('server')));
});

gulp.task('ls-client-spec', function() {
  return gulp.src(lib.getLang('src', 'client', 'Spec.ls'))
  .pipe(livescript())
  .pipe(gulp.dest(lib.getKarmaSrc() + lib.getDir('client')));
});

gulp.task('watch', function () {
  gulp.watch(lib.getLang('src', 'client', 'ls'), ['ls-client']);
  gulp.watch(lib.getLang('src', 'server', 'ls'), ['ls-server']);
  gulp.watch(lib.getLang('build', ['server', 'client'], 'js'), ['doc']);
  gulp.watch(lib.getLang('src', 'client', 'jade'), ['jade'])
});

gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: lib.getLang('build', 'server', '/index.js')
    }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('test', function (done) {
  new karmaServer({
    configFile: path.join(__dirname, lib.getKarmaUnit()),
    singleRun: true
  }, done).start();
});

gulp.task('default', function () {
  runSequence('jade', 'ls-client', 'ls-server', 'watch', 'open-doc', 'nodemon');
});

dogen.config({
  templatesPath: 'templates',
  gulp: gulp
});
dogen.task('component', __dirname + '/src/client/app/');
