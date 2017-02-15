// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bower = require('gulp-bower');

var bootstrapSass = {
    in: 'bower_components/bootstrap-sass/'
};
var css = {
    in: 'scss/main.scss',
    out: 'dist/css/',
    watch: 'dist/css/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};
// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src( css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out));
});
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'js/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});
// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);