'use strict';

var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

sass.compiler = require('node-sass');

// Styles ---------------------------------------------------------
var  styles = {
    src: 'src/assets/css/scss/**/*.scss',
    dest: 'src/assets/css',
    filename: 'style.min.css'
}

function cleanStyles() {
  return del([styles.dest + '/' + styles.filename]);
}

function buildStyles() {
 cleanStyles();

  return gulp.src(styles.src)
    .pipe(concat(styles.filename))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(styles.dest));
}

function watchStyles() {
  gulp.watch([styles.src], buildStyles);
}

// ---------------------------------------------------------


exports.styles = buildStyles;
exports.watch = watchStyles;
exports.clean = cleanStyles;
exports.build = buildStyles;

exports.default = watchStyles;