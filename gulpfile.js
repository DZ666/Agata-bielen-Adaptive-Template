// Connect GULP
const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

const cssFiles = [
    './src/css/fonts.css',
    './src/css/main.css',
    './src/css/media.css'
]

const jsFiles = [
    './src/js/lip.js',
    './src/js/main.js'
]

// For CSS
function style() {
    // Search pattern
    return gulp.src(cssFiles)

    // Concat
    .pipe(concat('main.css'))

    // Autoprefixer
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))

    // CleanCSS
    .pipe(cleanCSS({
        level: 2
    }))

    // Output folder
    .pipe(gulp.dest('./build/css'))

    .pipe(browserSync.stream())
}

// For JS
function script() {
    // Search pattern
    return gulp.src(jsFiles)

    // Concat
    .pipe(concat('script.js'))

    // Uglify
    .pipe(uglify({
            toplevel: true
    }))

    // Output Folder
    .pipe(gulp.dest('./build/js'))

    .pipe(browserSync.stream())
}

function clean() {
    return del(['build/*'])
}

// Browser watch
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // Life reload
    gulp.watch('./src/css/**/*.css', style)
    gulp.watch('./src/js/**/*.js', script)
    gulp.watch("./*.html").on('change', browserSync.reload)
}

// For output css files and other
gulp.task('style',style);
gulp.task('script',script);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(style, script)))
gulp.task('dev', gulp.series('build','watch'))