var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nunjucks = require('gulp-nunjucks');
var imagemin = require('gulp-imagemin');
    svgSprite = require('gulp-svg-sprite');


//TODO:
//Implement the optimze functions from Zell's tutorial
//https://css-tricks.com/gulp-for-beginners/

gulp.task('nunjucks', function () {
    gulp.src('templates/**.html')
        .pipe(nunjucks.compile({name: 'Test'}))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
            }))
});


//Function to optimize images (not really utilized)
gulp.task('images', function() {
    return gulp.src('source/images/**/*.+(png|jpg|gif)')
                                       .pipe(imagemin())
                                       .pipe(gulp.dest('public/images'))

});


// Config
//
//

config = {
  shape: {
    dimension: {         // Set maximum dimensions
      maxWidth: 32,
      maxHeight: 32
    },
    spacing: {         // Add padding
     //   padding     : 10
    },
    //dest            : 'out/intermediate-svg'    // Keep the intermediate files
  },
  mode: {
    symbol: true      // Activate the «symbol» mode
  }
};

gulp.task('svg', function() {
  gulp.src('source/images/**/*.svg')
                              .pipe(svgSprite(config))
                                .on('error', function(error) {
                                  console.log(error);
                                })
                              .pipe(gulp.dest('templates'));
});

gulp.task('js', function() {
    return gulp.src('source/js/**/*.js')
               .pipe(gulp.dest('public/js'))
});

gulp.task('fonts', function() {
    return gulp.src('source/fonts/**/*.ttf') .pipe(gulp.dest('public/fonts'))
});
gulp.task('sass', function(){
    return gulp.src('source/style.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['node_modules/susy/sass', 'node_modules/breakpoint-sass/stylesheets']
        }).on('error', sass.logError))
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.reload({
            stream: true
            }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        browser: 'chrome',
        server: {
            baseDir: 'public'
        }
    })
});

//watch the scss folder and rukn sass whenever
//a file changes
//We put browser sync in an array as the second argument
//that means that we want to run the browser sync task first
//and then watch for file changers
gulp.task('watch', ['fonts', 'svg', 'nunjucks', 'sass', 'images', 'js', 'browserSync'], function() {
    gulp.watch('source/**/*.scss', ['sass']);
    gulp.watch('templates/**/*.html', ['nunjucks']);
    gulp.watch('source/js/**/*.js', ['js', browserSync.reload]);
    gulp.watch('source/images/**/*.+(png|jpg|gif)', ['images', browserSync.reload]);
    gulp.watch('source/images/**/*.svg)', ['svg', browserSync.reload]);
});
