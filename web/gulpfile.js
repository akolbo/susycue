var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');




gulp.task('imagemin', function () {
    return gulp.src('web/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('web/images'));
});


gulp.task('sass', function () {
  gulp.src('web/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('web/stylesheets '));
});


gulp.task('uglify', function() {
  gulp.src('web/lib/*.js')
    .pipe(uglify('app.js'))
    .pipe(gulp.dest('web/js'))
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('web/sass/**/*.scss', ['sass']);
    gulp.watch('web/lib/*.js', ['uglify']);
    gulp.watch(['web/style.css', './templates/*.twig', 'web/*.php', 'web/js/*.js', 'web/parts/**/*.php'], function (files){
        livereload.changed(files)
    });
});


const gulp = require('gulp');
const compass = require('gulp-compass')

gulp.task('compass', function() {
  gulp.src('./sass/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'stylesheets',
      sass: 'sass'
    }));
    });