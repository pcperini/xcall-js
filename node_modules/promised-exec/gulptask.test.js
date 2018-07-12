'use strict';

var gulp, jasmine, config;

gulp = require('gulp');
jasmine = require('gulp-jasmine');
config = require('./config.json');

module.exports = function () {

    return gulp.src(config.tests).pipe(jasmine());

};