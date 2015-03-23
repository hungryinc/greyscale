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

xtend(process.env, require('./etc/env'));

if ( ! build) {
    var livereload = require('gulp-livereload');
    gulp.task('default', ['less', 'scripts', 'html', 'assets', 'watch']);
} else {
    gulp.task('default', ['less', 'scripts', 'html', 'assets' ]);
}

var paths = {
    scripts: 'app/src/scripts/**/*',
    less: 'app/src/less/**/*',
    html: 'app/src/html/**/**/*',
    modules: 'app/src/scripts/**/**/templates/*.html',
    assets: 'app/src/assets/**/**/**/*',
}

var onError = function(err) {
    gutil.beep();
    console.error(err.message);
}

//run server
gulp.task( 'server', function() {
    server.listen({
        path: './server.js',
        env: {
            PORT: 8090,
            NODE_ENV: 'dev'
        }
    });
    gulp.watch( [ './server.js' ], server.restart );
});

gulp.task('assets', function() {
    gulp.src(paths.assets)
        .pipe(gulp.dest('app/dist/assets'));    
})

gulp.task('less', function() {
    var process = gulp.src('app/src/less/main.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')],
            sourceMap: true
        }))
        .pipe(gulp.dest('app/dist/styles'))

        if ( ! build) {
            process.pipe(livereload());
        } else {
            process.pipe(minifyCSS())
                .pipe(gulp.dest('app/dist/styles'));
        }
});

gulp.task('html', function() {
    var process = gulp.src([paths.html, paths.modules])
        .pipe(minifyHTML({
            comments: false,
            spare: true,
            empty: true,
            quotes: true
        }))
        .pipe(gulp.dest('app/dist/html'))
        
        if ( ! build) {
            process.pipe(livereload());
        }
});

gulp.task('scripts', function() {
    // Single entry point to browserify
    if (build) {
        gulp.src('./app/src/scripts/modules/Greyscale/index.js')
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(browserify({
                debug: false,
                transform: [stringify(['.html']), 'envify']
            }))
            .pipe(uglify({
                mangle: false,
                compress: {
                    dead_code: true
                }
            }))
            .pipe(rename('app.js'))
            .pipe(gulp.dest('app/dist/scripts'))
        } else {
            var bundler, rebundle;

            bundler = watchify('./app/src/scripts/modules/Greyscale/index.js', {
                basedir: __dirname
            })
            .transform(stringify(['.html']))
            .transform('envify')

            rebundle = function() {
                var stream = bundler.bundle({
                    debug: true
                });

                stream.on('error', function(err) {
                    gutil.log(gutil.colors.red(err));
                })
                stream = stream.pipe(source('app.js'))

                gutil.log('Bundled', gutil.colors.cyan("scripts"));

                return stream.pipe(gulp.dest('app/dist/scripts'))
                    .pipe(livereload());
            };

            bundler.on('update', rebundle);
            return rebundle();
        }
 });

gulp.task('watch', function() {
    if ( ! build) {
        gulp.watch(paths.less, ['less']);
        gulp.watch(paths.assets, ['assets']);
        gulp.watch(paths.html, ['html']);
        gulp.watch(paths.modules, ['html']);
    }
});
