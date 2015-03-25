var argv = require('yargs').argv,
    server = require( 'gulp-develop-server' ),
    gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    watchify = require('watchify'),
    stringify = require('stringify'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    browserify = require('gulp-browserify'),
    replace = require('gulp-replace'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    jsonminify = require('gulp-jsonminify'),
    xtend = require('xtend/mutable'),
    envify = require('envify'),
    build = argv.build;


    var livereload = require('gulp-livereload');
    gulp.task('default', ['less']);


var paths = {
    less: 'less/**/*',
}

var onError = function(err) {
    gutil.beep();
    console.error(err.message);
}



gulp.task('less', function() {
    var process = gulp.src('less/main.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            sourceMap: true
        }))
        .pipe(gulp.dest('css'))
         process.pipe(livereload());
});


gulp.task('watch', function() {
        gulp.watch(paths.less, ['less']);
    
});
