"use strict";
var gulp = require('gulp');

var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var gutil = require('gulp-util');
var watchify = require('watchify');

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var paths = {
    pages: ['app/*.html']
};

var distFolder = 'dist';
var app = 'app';
var destination = {
    'main': distFolder,
    'style': distFolder + '/css',
    'js': distFolder + '/scripts',
    'appjs': app + '/scripts/'

};
var watchedBrowserify = watchify(browserify({
    baseDir: './app',
    debug: true,
    entries: ['app/ts/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task('copy-html', function() { //just copying html and adding them to the dest folder
    return gulp.src(paths.pages)
        .pipe(gulp.dest(distFolder))
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./app'))
        .pipe(gulp.dest(destination.js))
}

gulp.task('default', ['copy-html'], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);


///before hand
gulp.task('typescript', function() {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(destination.js))
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
            pretty: true
        }))
        .pipe(gulp.dest(destination.main)) // destination
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('watch', ['browserSync', 'sass', 'pug', 'typescript'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.pug', ['pug']);
    gulp.watch('app/ts/**/*.ts', ['typescript']);
});

// gulp.task('default', ['watch']);