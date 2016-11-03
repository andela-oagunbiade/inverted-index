'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const run = require('gulp-run');


gulp.task('default', ['browser-sync', 'browserify', 'watch']);

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('reload',  () => {
  browserSync.reload();
});

gulp.task('watch',  () => {
  gulp.watch('./src/*.js', ['reload']);
  gulp.watch('./src/*.css', ['reload']);
  gulp.watch('./*.html', ['reload']);
});

gulp.task('test', ['browserify'],  () => {
  run('node_modules/karma/bin/karma start karma.conf.js --single-run').exec();
});

gulp.task('browserify',  () => {
  return browserify('./spec/inverted-index-test.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./spec/tests'));
});