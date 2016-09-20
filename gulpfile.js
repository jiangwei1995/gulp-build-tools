// 引入 gulp
var gulp = require('gulp');
 
// 引入组件
var htmlmin = require('gulp-htmlmin'); //html压缩
var imagemin = require('gulp-imagemin');//图片压缩
var pngcrush = require('imagemin-pngcrush');
var minifycss = require('gulp-minify-css');//css压缩
var jshint = require('gulp-jshint');//js检测
var uglify = require('gulp-uglify');//js压缩
var concat = require('gulp-concat');//文件合并
var rename = require('gulp-rename');//文件更名
var notify = require('gulp-notify');
var browserSync = require('browser-sync');//js css html自动刷新
var htmlreplace = require('gulp-html-replace');// 替换引用文件
var postcss    = require('gulp-postcss');// postcss
var sourcemaps = require('gulp-sourcemaps');// postcss
var autoprefixer = require('autoprefixer');// postcss
var precss = require('precss');// postcss
var del = require('del');//删除文件
var gulpCopy = require('gulp-file-copy');

var wiredep = require('wiredep').stream;
var gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'client/images/*',
  dist:'dist',
  html:['client/**/*.html','!client/index.html'],
  css:'client/css/plugins/*.css',
  js:['client/**/*.js','!./client/bower_components/**/*.js']
};
  gulp.task('clean', function() {

    return del([paths.dist,'.tmp']);
  });
 

gulp.task('scripts', () => {
  gulp.src(['client/js/**/*.js','!client/js/plugins/*.js'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/js'))
    .pipe(reload({stream: true}));
});


function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('client/js/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('client/js'));
});

gulp.task('html',['postcss'], () => {
  return gulp.src('client/**/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'client', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    //.pipe($.if(['*.html'], $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('client/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});


gulp.task('img', function() {
    return gulp.src('client/img/*.jpg',{base:'client'})
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngcrush()]
      }))
      .pipe(gulp.dest(paths.dist))
      .pipe(notify({ message: 'img task ok' }));
});

gulp.task('images', function() {
  gulp.src('client/images/**/*',{base:'client'})
      .pipe(gulp.dest(paths.dist))
      .pipe(notify({ message: 'img task ok' }));
});

gulp.task('serve', [ 'scripts', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'client'],
      routes: {
        '/bower_components': 'client/bower_components',
        '/client/js':'client/js',
        '/client/css':'client/css',
        '/client/images':'client/images'

      }
    }
  });

  gulp.watch([
    'client/*.html',
    'client/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(['client/js/**/*.js','!client/js/plugins/*.js'], ['js']);
  gulp.watch(['client/css/**/*.css','!client/css/plugins/*.css'],['css']);
  gulp.watch('client/js/plugins/*.js',['pluginsjs']);
  gulp.watch('client/css/plugins/**/*.css',['pluginscss']);
  gulp.watch('client/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('js',() => {
  gulp.src('client/index.html')
      .pipe($.inject(gulp.src(['client/js/**/*.js','!client/js/plugins/**/*.js'], {read: false})))
      .pipe(gulp.dest('client'));
});
gulp.task('css',() => {
  gulp.src('client/index.html')
      .pipe($.inject(gulp.src(['client/css/**/*.css','!client/css/plugins/**/*.css'], {read: false})))
      .pipe(gulp.dest('client'));
});
gulp.task('postcss', function () {
  gulp.src(['client/css/**/*.css','!client/css/plugins/*.css'])
      .pipe( sourcemaps.init() )
      .pipe( postcss([ autoprefixer, precss ]) )
      .pipe(gulp.dest('client/css'))
      .pipe(notify({ message: 'css task ok' }));;
});
gulp.task('pluginsjs',() => {
  gulp.src('client/index.html')
      .pipe($.inject(gulp.src('client/js/plugins/**/*.js', {read: false}), {name: 'pluginsjs'}))
      .pipe(gulp.dest('client'));
 
})
gulp.task('pluginscss',() => {
  gulp.src('client/index.html')
      .pipe($.inject(gulp.src('client/css/plugins/**/*.css', {read: false}), {name: 'pluginscss'}))
      .pipe(gulp.dest('client'));
 
})
// inject bower components
gulp.task('wiredep', () => {
  // gulp.src('client/styles/scss/main.scss')
  //     .pipe(wiredep())
  //     .pipe(gulp.dest('client/styles/scss'));

  // gulp.src('client/styles/less/main.less')
  //     .pipe(wiredep())
  //     .pipe(gulp.dest('client/styles/less'));


  gulp.src('client/index.html')
      .pipe(wiredep())
      .pipe(gulp.dest('client'));
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});


 
gulp.task('build', ['lint','html','images'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
