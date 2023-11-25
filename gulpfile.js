const gulp = require('gulp'); 
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create(); 
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// const cssnano  = require('cssnano');
const sass = require('gulp-sass')(require('sass'));
const useref = require('gulp-useref');

function serve() {
    browserSync.init({
      server: {
        baseDir: './dist'
      }
    });
  } 

  function precss() {
    const plugins = [
      // cssnano()
    ]
    return gulp.src('src/**/*.sass')
          .pipe(sass())
          .pipe(concat('bundle.css'))
          .pipe(postcss(plugins))
          .pipe(gulp.dest('dist/'))
          .pipe(browserSync.reload({stream: true}));
  }

function html() {
    return gulp.src('src/**/*.html')
          .pipe(plumber())
          .pipe(useref())
                  .pipe(gulp.dest('dist/'))
                  .pipe(browserSync.reload({stream: true}));
  }
  
// function css() {
//   const plugins = [
//     // cssnano()
//   ]
// return gulp.src('src/**/*.css')
//         .pipe(plumber())
//         .pipe(concat('bundle.css'))
//         .pipe(postcss(plugins))
//         .pipe(gulp.dest('dist/'))
//         .pipe(browserSync.reload({stream: true}));
// }

function images() {
return gulp.src('src/images/**/*.{jpg,png,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
}

function svg() {
return gulp.src('src/svg/**/*.{svg}')
            .pipe(gulp.dest('dist/svg'))
            .pipe(browserSync.reload({stream: true}));
}

function fonts() {
return gulp.src('src/fonts/**/*.{woff,woff2}')
            .pipe(gulp.dest('dist/fonts'))
            .pipe(browserSync.reload({stream: true}));
}

function clean() {
return del('dist');
}

exports.clean = clean;



function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/**/*.sass'], precss);
  gulp.watch(['src/**/*.js'], html);
  // gulp.watch(['src/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,gif,ico,webp,avif}'], images);
  gulp.watch(['src/svg/**/*.{svg}'], svg);
  gulp.watch(['src/fonts/**/*.{woff,woff2}'], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, precss, images, svg, fonts));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.precss = precss;
// exports.css = css;
exports.images = images;
exports.svg = svg;
exports.fonts = fonts;

exports.watchapp = watchapp;
exports.build = build;

exports.default = watchapp;