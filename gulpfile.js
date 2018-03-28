
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglifycss');
const babel = require('gulp-babel');

const paths = {
    css: ['./build/**/*.css'],
    sass: ['./sass/_master.scss', './sass/**/*.scss', '!./sass/all-sass.scss'],
    dist: ['./dist/hero.css'],
    compiledAssets: ['./dist/**/*'],
    scripts: ['./scripts/**/*.js'],
    concatenatedScripts: ['./build/hero.js']
};

gulp.task('concat-sass', function () {
    return gulp.src(paths.sass)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('all-sass.scss'))
        .pipe(gulp.dest('./sass'));
});

gulp.task('sass', function () {
    runSequence('concat-sass', 'compile-sass');
});

gulp.task('compile-sass', function () {
    return gulp.src('./sass/all-sass.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build'));
});

gulp.task('concat-css', function () {
    return gulp.src(paths.css)
        .pipe(concat('hero.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('uglify', () => {
    return gulp.src(paths.dist)
        .pipe(uglify({ 'uglyComments': true }))
        .pipe(concat('hero.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-to-sampleApp', () => {
    return gulp.src(paths.compiledAssets)
        .pipe(gulp.dest('./sampleApp'));
});

gulp.task('concat-scripts', () => {
    return gulp.src(paths.scripts)
        .pipe(concat('hero.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('translate-scripts', () => {
    return gulp.src(paths.concatenatedScripts)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function () {
    console.log('☺');
    gulp.watch(paths.scripts, ['concat-scripts']);
    gulp.watch(paths.concatenatedScripts, ['translate-scripts']);
    gulp.watch(paths.css, ['concat-css']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.dist, ['uglify']);
    gulp.watch(paths.compiledAssets, ['copy-to-sampleApp']);
});