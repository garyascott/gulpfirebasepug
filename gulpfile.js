var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');

var distFolder = 'dist';
var destination = [{
    'main': distFolder,
    'style': distFolder + '/css'
}]

gulp.task('hello', function() {
    console.log(destination[0]['main']);
});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
})

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // source files
        .pipe(sass())
        .pipe(gulp.dest(destination[0]['style'])) // destination
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('pug', function() {
    return gulp.src('app/**/*.pug')
        .pipe(pug({
            pretty: boolean = true
        }))
        .pipe(gulp.dest(destination[0]['main'])) // destination
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.pug', ['pug']);
})