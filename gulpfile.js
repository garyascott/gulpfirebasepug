var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

var distFolder = 'dist';
var destination = [{
    'main': distFolder,
    'style': distFolder + '/css'
}]

gulp.task('hello', function() {
    console.log(destination[0]['main']);
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // source files
        .pipe(sass())
        .pipe(gulp.dest(destination[0]['style'])) // destination
});

gulp.task('pug', function() {
    return gulp.src('app/**/*.pug')
        .pipe(pug({
            pretty: boolean = true
        }))
        .pipe(gulp.dest(destination[0]['main']));
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.pug', [pug]);
})