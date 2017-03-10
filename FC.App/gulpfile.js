var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var run_sequence = require('run-sequence');
var fs = require('fs');
var debug = true;
gulp.task('browser-sync', ['sass'], function () {
    bs.init({
        server: {
            baseDir: "./",
        }
    });
});

gulp.task('default', function (callback) {
    debug = debug || false;
    if (debug == true) {
        run_sequence('sass', 'devDeps', callback);
    } else {
        run_sequence('sass', 'prodDeps', callback);
    }
});

gulp.task('sasswatch', function () {
    return gulp.src('./Resources/sassv2/**/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('App/Resources/cssv2'))
                .pipe(bs.reload({ stream: true }));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("./Resources/sassv2/**/*.scss", ['sasswatch']).on('change', bs.reload);
    gulp.watch("*.html").on('change', bs.reload);
});

//var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
//var clean = require('gulp-clean');
//var run_sequence = require('run-sequence');
//var sass = require('gulp-sass');
//var gutil = require('gulp-util');
var rename = require('gulp-rename');
//var watch = require('gulp-watch');

//var buildDir = '/App';
//var debug = false;

var dependencies = [
    'bower_components/tether/dist/js/tether.min.js',
    'bower_components/requirejs/require.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/tinymce/tinymce.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-ui-tinymce/src/tinymce.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-aria/angular-aria.min.js',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-ui/build/angular-ui.min.js',
    'bower_components/angular-collapse/angular-collapse.js',
    '/node_modules/moment/min/moment.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-material/angular-material.min.js',
];



//var appJs = [
//    'Resources/scripts/CacheManager.js',
//    'Resources/scripts/Global.js',
//    'Resources/scripts/FC.js',
//    'Resources/scripts/**/*.js'
//];


//var fontsConfig = [
//    'Resources/fonts/**'
//];
//var packageConfig = [
//    'Resources/bower.json',
//    'Resources/package.json'
//]

//var HtmlTemplates = [
//    'Resources/scripts/**/*.html'
//];

//gulp.task('mvres', function () {
//    gulp.src('Resources/images/**').pipe(gulp.dest('App/Resources/images'));
//    gulp.src('Resources/css/**').pipe(gulp.dest('App/Resources/css'));
//    gulp.src(fontsConfig).pipe(gulp.dest('App/Resources/fonts'));
//    gulp.src(packageConfig).pipe(gulp.dest('App/Resources/'));
//});
//gulp.task('mvimg', function () {
//    gulp.src('Resources/images/**').pipe(gulp.dest('App/Resources/images'));
//});
//gulp.task('watch', ['default'], function () {
//    gulp.start('default');
//    gutil.log('Watching resources');
//    debug = true;
//    gulp.watch(['resources/scripts/**/*.js', 'App/*.js', 'resources/sass/**/*.scss', 'App/*.css'], ['default']);
//});
//gulp.task('watch', ['default'], function () {
//    gulp.start('default');
//    gutil.log('Watching resources');
//    debug = true;
//    gulp.watch(['resources/scripts/**/*.js', 'App/*.js', 'resources/sass/**/*.scss','resources/sassv2/**/*.scss', 'App/*.css'], ['default']);
//});

//gulp.task('sass', function () {
//    gulp.src('Resources/sass/**/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('App/resources/css'));
//});
gulp.task('sass', function () {
    gulp.src('Resources/sassv2/**/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('App/resources/cssv2'));
});

//gulp.task('sass:watch', function () {
//    gulp.watch('Resources/sass/**/*.scss', ['sass']);
//});
gulp.task('sass:watch', function () {
    gulp.watch('Resources/sassv2/**/*.scss', ['sass']);
});

//gulp.task('js:watch', function () {
//    gulp.watch('Resources/scripts/**/*.*', ['devDeps','devJs','ProdHTML']);
//});

//gulp.task('ts:watch', function () {
//    gulp.watch('Scripts/**/*.ts', ['devDep', 'ts']);
//});
//gulp.task('default', function (callback) {
//    debug = debug || false;
//    if (debug == true) {
//        run_sequence('mvres', 'sass', 'devDeps', 'devJs', 'ProdHTML', callback);
//    } else {
//        run_sequence('mvres', 'sass', 'prodDeps', 'prodJs', 'ProdHTML', callback);
//    }
//});

gulp.task('devDeps', function () {
    var depsJS = gulp.src(dependencies)
	.pipe(concat('deps.js'))
    .pipe(gulp.dest('App'))
    .pipe(rename({ suffix: '.min' })) 
    .pipe(uglify())
    .pipe(gulp.dest('App'));
});

//gulp.task('devJs', function () {
//    var js = gulp.src(appJs)
//    .pipe(concat('app.js'))
//    .pipe(gulp.dest('App'))
//    .pipe(rename({ suffix: '.min' }))
//    .pipe(uglify())
//    .pipe(gulp.dest('App'));
//});

//gulp.task('prodDeps', function () {
//    var depsJS = gulp.src(dependencies)
//    .pipe(concat('deps.js'))
//    .pipe(gulp.dest('App'))
//    .pipe(rename({ suffix: '.min' }))
//    .pipe(uglify())
//    .pipe(gulp.dest('App'));
//});

//gulp.task('prodJs', function () {
//    var js = gulp.src(appJs)
//    .pipe(concat('app.js'))
//    .pipe(gulp.dest('App'))
//    .pipe(rename({ suffix: '.min' }))
//    .pipe(uglify())
//    .pipe(gulp.dest('App'));
//});
//gulp.task('ProdHTML', function () {
//    var js = gulp.src(HtmlTemplates)
//    .pipe(rename({
//        dirname: "templates",
//        extname: ".html"
//    }))
//    .pipe(gulp.dest('App'));
//});
//gulp.task('debug', function () {
//    debug = true;
//    gutil.log(gutil.colors.green('RUNNING IN DEBUG MODE'));
//    gulp.start('default');
//});

//gulp.task('production', function () {
//    debug = false;
//    gutil.log(gutil.colors.green('RUNNING IN PRODUCTION MODE'));
//    gulp.start('default');
//});