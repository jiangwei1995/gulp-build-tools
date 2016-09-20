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
var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'client/images/*',
  dist:'dist',
  html:['client/**/*.html','!client/index.html'],
  css:'client/**/*.css',
  js:['client/**/*.js','!./client/bower_components/**/*.js']
};
  //复制bowerj.json文件
  gulp.task('copyBowerJson', function() {
    var start = 'bower.json'
    gulp.src(start)
      .pipe(gulp.dest('dist'))
  });
  // 复制index.html文件，替换js css
  gulp.task('copyIndexHtml', function() {
    var start = 'client/index.html'
    gulp.src(start)
     .pipe(htmlreplace({
        'css': 'css/main.css',
        'js': 'js/all.js'
       }))
      .pipe(gulp.dest('dist'))
  });
  //复制所有bower_components
  gulp.task('copy', function() {
  var start = 'client/bower_components/**'
    gulp.src(start)
      .pipe(gulp.dest('dist/bower_components/'))
  });
  //postcss,合并,压缩 css
  gulp.task('postcss', function () {
    return gulp.src(paths.css)
        .pipe( sourcemaps.init() )
        .pipe( postcss([ autoprefixer, precss ]) )
        .pipe( sourcemaps.write('.')) 
        .pipe(concat('main.css'))
        .pipe(gulp.dest(paths.dist+'/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.dist+'/css'))
        .pipe(notify({ message: 'css task ok' }));;
});

  // 删除dist
  gulp.task('clean', function() {
    return del([paths.dist]);
  });
  // 压缩html
  gulp.task('html', function() {
    return gulp.src(paths.html)
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(paths.dist))
      .pipe(notify({ message: 'html task ok' }));
   
  });
 
  // 压缩图片
  gulp.task('img', function() {
    return gulp.src(paths.images,{base:'client'})
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngcrush()]
      }))
      .pipe(gulp.dest(paths.dist))
      .pipe(notify({ message: 'img task ok' }));
  });
 
  // 合并、压缩、重命名css
  gulp.task('css', function() {
    return gulp.src(paths.css)
      .pipe(concat('main.css'))
      .pipe(gulp.dest(paths.dist+'/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifycss())
      .pipe(gulp.dest(paths.dist+'/css'))
      .pipe(notify({ message: 'css task ok' }));
  });
 
  // 检查js
  gulp.task('lint', function() {
    return gulp.src(paths.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(notify({ message: 'lint task ok' }));
  });
   
  // 合并、压缩js文件
  gulp.task('js', function() {
    return gulp.src(paths.js)
      .pipe(concat('all.js'))
      .pipe(gulp.dest(paths.dist+'/js'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest(paths.dist+'/js'))
      .pipe(notify({ message: 'js task ok' }));
  });
 
  // 默认任务
  gulp.task('default', function(){
    gulp.run('server');
  });

  gulp.task('build', function() {  
      gulp.run('postcss', 'img','js', 'html','copyIndexHtml','copyBowerJson','copy');

  });
  
  gulp.task('server', function() {  
      browserSync.init({    
          server: "./client"  
      });  
      gulp.watch(["client/**/*.html","client/**/*.css","client/**/*.js"]).on('change', browserSync.reload); 

  });
 