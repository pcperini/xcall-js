'use strict';

var gulp, tasks;

gulp = require('gulp');

tasks = {
    test: require('./gulptask.test.js')
};

gulp.task('test', tasks.test);