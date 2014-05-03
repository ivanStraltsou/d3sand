'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
  gulp
    .src('./scripts/**/*.js')
    .pipe(watch(function(files) {

        return gulp.src('./scripts/index.js')
            .pipe(browserify({
              debug: true
            }))
            .pipe(gulp.dest('./public/javascripts/'));
    }));
});
