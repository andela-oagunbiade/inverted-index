const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const run = require('gulp-run');


gulp.task('default', ['browser-sync', 'browserify', 'watch']);

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('watch', function () {
  gulp.watch('./src/*.js', ['reload']);
  gulp.watch('./src/*.css', ['reload']);
  gulp.watch('./*.html', ['reload']);
});

gulp.task('test', ['browserify'], function () {
  run('node_modules/karma/bin/karma start karma.conf.js --single-run').exec();
});

gulp.task('browserify', function () {
  return browserify('./spec/inverted-index-test.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./spec/tests'));
});