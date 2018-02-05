"use strict";
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var minify = require('gulp-minify');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var distFolder = 'dist';
var app = 'app';
var destination = {
    'main': distFolder,
    'style': distFolder + '/css',
    'js': distFolder + '/scripts',
    'appjs': app + '/scripts/'

};

gulp.task('hello', function() {
    console.log(destination.main);
});

gulp.task('typescript', function() {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(destination.appjs))
});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // source files
        .pipe(sass())
        .pipe(gulp.dest(destination.style)) // destination
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('pug', function() {
    return gulp.src('app/**/*.pug')
        .pipe(pug({
            pretty: boolean = true
        }))
        .pipe(gulp.dest(destination.main)) // destination
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('compress', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(minify())
        .pipe(gulp.dest(destination.js));
});

gulp.task('watch', ['browserSync', 'sass', 'pug', 'compress', 'typescript'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.pug', ['pug']);
    gulp.watch('app/scripts/**/*.js', ['compress']);
    gulp.watch('app/ts/**/*.ts', ['typescript']);
});

gulp.task('default', ['watch']);