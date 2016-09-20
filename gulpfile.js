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
  //复制bowerj.json文件
  // gulp.task('copyBowerJson', function() {
  //   var start = 'bower.json'
  //   gulp.src(start)
  //     .pipe(gulp.dest('dist'))
  // });
  // // 复制index.html文件，替换js css
  // gulp.task('copyIndexHtml', function() {
  //   var start = 'client/index.html'
  //   gulp.src(start)
  //    .pipe(htmlreplace({
  //       'css': 'css/main.css',
  //       'js': 'js/all.js'
  //      }))
  //     .pipe(gulp.dest('dist'))
  // });
  // //复制所有bower_components
  // gulp.task('copy', function() {
  // var start = 'client/bower_components/**'
  //   gulp.src(start)
  //     .pipe(gulp.dest('dist/bower_components/'))
  // });
  //postcss,合并,压缩 css
//   gulp.task('postcss', function () {
//     return gulp.src('client/css/plugins/*.css')
//         .pipe( sourcemaps.init() )
//         .pipe( postcss([ autoprefixer, precss ]) )
//         .pipe( sourcemaps.write('.')) 
//         .pipe(concat('main.css'))
//         .pipe(gulp.dest(paths.dist))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(minifycss())
//         .pipe(gulp.dest(paths.dist))
//         .pipe(notify({ message: 'css task ok' }));;
// });

  // 删除dist
  gulp.task('clean', function() {

    return del([paths.dist,'.tmp']);
  });
  // 压缩html
  // gulp.task('html', function() {
  //   return gulp.src(paths.html)
  //     .pipe(htmlmin({collapseWhitespace: true}))
  //     .pipe(gulp.dest(paths.dist))
  //     .pipe(notify({ message: 'html task ok' }));

   
  // });
 
  // 压缩图片

  // gulp.task('img', function() {
  //   return gulp.src(paths.images,{base:'client'})
  //     .pipe(imagemin({
  //         progressive: true,
  //         svgoPlugins: [{removeViewBox: false}],
  //         use: [pngcrush()]
  //     }))
  //     .pipe(gulp.dest(paths.dist))
  //     .pipe(notify({ message: 'img task ok' }));
  // });

 
  // 合并、压缩、重命名css
  // gulp.task('css', function() {
  //   return gulp.src(paths.css)
  //     .pipe(concat('main.css'))
  //     .pipe(gulp.dest(paths.dist+'/css'))
  //     .pipe(rename({ suffix: '.min' }))
  //     .pipe(minifycss())
  //     .pipe(gulp.dest(paths.dist+'/css'))
  //     .pipe(notify({ message: 'css task ok' }));
  // });
 
  // // 检查js
  // gulp.task('lint', function() {
  //   return gulp.src(paths.js)
  //     .pipe(jshint())
  //     .pipe(jshint.reporter('default'))
  //     .pipe(notify({ message: 'lint task ok' }));
  // });
   

  // // 合并、压缩js文件
  // gulp.task('js', function() {
  //   return gulp.src(paths.js)
  //     .pipe(concat('all.js'))
  //     .pipe(gulp.dest(paths.dist+'/js'))
  //     .pipe(rename({ suffix: '.min' }))
  //     .pipe(uglify())
  //     .pipe(gulp.dest(paths.dist+'/js'))
  //     .pipe(notify({ message: 'js task ok' }));
  // });

 
  // 默认任务
  // gulp.task('default', function(){
  //   gulp.run('serve');
  // });

  // gulp.task('build', function() {  
  //     gulp.run('postcss' ,'js', 'html','copyIndexHtml','copyBowerJson','copy');

  // });
  
  
  // gulp.task('server', function() {  
  //     browserSync.init({    
  //         server: "./client"  
  //     });  
  //        gulp.watch([
  //   'client/*.html',
  //   'client/images/**/*',
  //   '.tmp/fonts/**/*'
  // ]).on('change', reload);

  // // gulp.watch('app/styles/**/*.scss', ['styles']);
  // gulp.watch('client/js/**/*.js', ['css1']);
  // gulp.watch('client/fonts/**/*', ['fonts']);
  // gulp.watch('client/css/**/*.css',['css1'])
  // gulp.watch('bower.json', ['wiredep', 'fonts']);
  // });
 

//  gulp.task('styles', () => {
//   return gulp.src('client/styles/scss/main.scss')
//     .pipe($.plumber())
//     .pipe($.sourcemaps.init())
//     .pipe($.sass.sync({
//       outputStyle: 'expanded',
//       precision: 10,
//       includePaths: ['.']
//     }).on('error', $.sass.logError))
//     .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
//     .pipe($.sourcemaps.write())
//     .pipe(gulp.dest('.tmp/styles/scss'))
//     .pipe(reload({stream: true}));
// });

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

// gulp.task('extras', () => {
//   return gulp.src([
//     'client/*.*',
//     '!client/*.html'
//   ], {
//     dot: true
//   }).pipe(gulp.dest('dist'));
// });


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
