const {task, src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const csscomb = require('gulp-csscomb');
const notify = require('gulp-notify');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');
const uglify = require('gulp-uglify');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const del = require('del');
// const eslint = require('gulp-eslint');

const PATH = {
  scssFile: 'assets/scss/style.scss',
  scssFiles: 'assets/scss/**/*.scss',
  scssFolder: 'assets/scss',
  cssFolder: 'assets/css',
  htmlFiles: '*.html',
  jsFiles: [
    './assets/js/**/*.js',
    '!./assets/js/**/all.js',
    '!./assets/js/**/*.min.js'
  ],
  jsBundleName: 'all.js',
  jsFolder: 'assets/js',
  buildFolder: 'dest'
}

const plugins = [
  autoprefixer({overrideBrowserslist: ['> 0.5%, last 5 versions']}),
  mqpacker({sort: sortCSSmq})
]

function scss() {
  return  src(PATH.scssFile)
    .pipe(sass({outputStyle: 'expanded'})).on('error', sass.logError)
    .pipe(postcss([autoprefixer({overrideBrowserslist: ['> 0.5%, last 5 versions']})]))
    .pipe(dest(PATH.cssFolder))
    .pipe(browserSync.stream())
}

function scssMin() {

  const pluginsExtended = plugins.concat([cssnano({preset: 'default'})]);

  return  src(PATH.scssFile)
    .pipe(sass({outputStyle: 'expanded'})).on('error', sass.logError)
    .pipe(postcss(pluginsExtended))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(PATH.cssFolder))
    .pipe(browserSync.stream())
} 

function scssDev() {
  return  src(PATH.scssFile, {sourcemaps: true})
  .pipe(sass({outputStyle: 'expanded'})).on('error', sass.logError)
  .pipe(dest(PATH.cssFolder, {sourcemaps: true}))
  .pipe(browserSync.stream())
}
 
function comb() {
  return src(PATH.scssFiles)
    .pipe(csscomb().on('error', notify.onError(err => 'File:' + err.message)))
    .pipe(dest(PATH.scssFolder))
}

function concatJS() {
  return src(PATH.jsFiles)
  .pipe(concat(PATH.jsBundleName))
  .pipe(dest(PATH.jsFolder))
}

function uglifyJS() {
  return src(PATH.jsFiles)
  .pipe(uglify({
    toplevel: true,
    output: {quote_style:3}
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest(PATH.jsFolder))
}

function uglifyES6() {
  return src(PATH.jsFiles)
  .pipe(terser({
    toplevel: true,
    output: {quote_style:3}
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest(PATH.jsFolder))
}

function buildJS () {
  return src(PATH.jsFolder + '/**/*.min.js')
  .pipe(dest(PATH.buildFolder + '/js'))
}

function buildHTML () {
  return src(PATH.htmlFiles)
  .pipe(dest(PATH.buildFolder + '/templates'))
}

function buildCSS () {
  return src(PATH.cssFolder + '/**/*.min.css')
  .pipe(dest(PATH.buildFolder + '/css'))
}

async function clearFolder () {
  await del(PATH.buildFolder, {force:true})
  return true
}

function init(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

async function sync() {
  browserSync.reload();
}

function watchFiles() {
  init();
  watch(PATH.scssFiles, scss);
  watch(PATH.htmlFiles, sync);
  watch(PATH.jsFiles, sync);
}

// function lintJS() {
//   return src(PATH.jsFiles)
//   .pipe(eslint())
//   .pipe(eslint.format())
//   .pipe(eslint.failAfterError());
// };

task('scss', scss);
task('min', series(scss, scssMin));
task('dev', scssDev);
task('comb', comb);
task('watch', watchFiles);
task('concat', concatJS);
task('minjs', uglifyJS);
task('mines6', uglifyES6);
task('build', series(clearFolder, parallel(buildJS, buildHTML, buildCSS)))
// task('lint', lintJS);