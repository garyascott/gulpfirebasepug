"use strict";
var gulp = require('gulp');

var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var browserify = require('browserify'); //Browserify bundles all our modules into one JavaScript file
var source = require('vinyl-source-stream'); //vinyl-source-stream lets us adapt the file output of Browserify back into a format that gulp understands called vinyl
var tsify = require('tsify'); //tsify is a Browserify plugin that, like gulp-typescript, gives access to the TypeScript compiler

var uglify = require('gulp-uglify'); // this is for compressing js
// vinyl-buffer and gulp-sourcemaps to keep sourcemaps working
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
//webstandards
var webstandards = require('gulp-webstandards');

var paths = {
    pages: ['app/*.html']
};

var distFolder = 'dist';
var app = 'app';
var destination = {
    'main': distFolder,
    'style': distFolder + '/css',
    'js': distFolder + '/scripts'

};

gulp.task('webstandards', function() {
    return gulp.src(distFolder + '/**/*')
        .pipe(webstandards());
});

gulp.task('copy-html', function() { //just copying html and adding them to the dest folder
    return gulp.src(paths.pages)
        .pipe(gulp.dest(distFolder))
});



//gulp.task('default', ['copy-html'], bundle);


///before hand

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('bundle', function() {
    return browserify({
            baseDir: './app',
            debug: true,
            entries: ['app/ts/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destination.js))
        .pipe(browserSync.reload({
            stream: true
        }));
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


gulp.task('watch', ['browserSync', 'sass', 'pug', 'bundle'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.pug', ['pug']);
    gulp.watch('app/ts/*.ts', ['bundle']);
});

gulp.task('default', ['watch']);