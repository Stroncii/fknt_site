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
        .pipe(gulp.dest('build/js'));
    });

    gulp.task('minifylibs', function() {
        var options = {
            mangle: false
        };
        return gulp.src('assets/js/**/*.min.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('build/js'));
    });

    gulp.task('test', function() {
        var options = {
            mangle: false
        };
        return gulp.src([ 'assets/js/**/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify(options))
        .pipe(concat('build.js'))
        .pipe(gulp.dest('build/js'));
    });