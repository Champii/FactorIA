var gulp        = require('gulp'),
livescript      = require('gulp-livescript'),
nodemon         = require('gulp-nodemon');

var paths = {
  ls: './src/**/*.ls',
  build: './build'
};

gulp.task('ls', function() {
  return gulp.src(paths.ls)
  .pipe(livescript())
  .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function () {
  gulp.watch(paths.ls, ['ls']);
});

gulp.task('default', ['watch']);
