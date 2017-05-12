var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel');
    concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');

    gulp.task('minify', function() {
        var options = {
            mangle: false
        };
        return gulp.src([ 'assets/js/**/*.js', '!assets/js/**/*.min.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify(options))
        .pipe(concat('build.js'))
        .pipe(gulp.dest('assets/js'));
    });