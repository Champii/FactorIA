var gulp        = require('gulp'),
livescript      = require('gulp-livescript'),
nodemon         = require('gulp-nodemon'),
server          = require('gulp-server-livereload'),
jsdoc           = require('gulp-jsdoc3'),
runSequence     = require('run-sequence');

var paths = {
  ls: './src/**/*.ls',
  build: './build',
  js: ['!./build/node_modules', './build/**/*.js'],
  jsdoc: './docs/gen'
};

gulp.task('doc', ['ls'], function () {
  return gulp.src(['README.md'].concat(paths.js), {read: false})
    .pipe(jsdoc());
});

gulp.task('open-doc', function () {
 gulp.src(paths.jsdoc)
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

gulp.task('ls', function() {
  return gulp.src(paths.ls)
  .pipe(livescript())
  .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function () {
  gulp.watch(paths.ls, ['doc']);
});

gulp.task('default', function () {
  runSequence('watch', 'open-doc');
});
