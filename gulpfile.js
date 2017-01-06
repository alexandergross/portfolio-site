var gulp = require('gulp'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    less = require('gulp-less'),
    images = require('gulp-responsive-images'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions"]}),
    LessPluginCleanCss = require('less-plugin-clean-css'),
    cleanCSSPlugin = new LessPluginCleanCss({advanced: true});

// Compile the less files and compress it
gulp.task('styles', function(){
  gulp.src('src/less/**/*.less')
    .pipe(less({
      plugins: [autoprefixPlugin]
    }))
    .pipe(less({
      plugins: [cleanCSSPlugin]
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify("Compiled CSS: <%= file.relative %>!"));
});

// Resize and compress the images
gulp.task('responsive-img', function(){
  gulp.src('src/img/**/*.{JPG,jpg,jpeg,gif,png}')
    .pipe(images({
      '*': [{
        crop: false,
        quality: 70,
        width: 200,
        suffix: '-200-1x',
      },{
        crop: false,
        quality: 70,
        width: 400,
        suffix: '-400-2x'
      }]
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify("Compressed image"));
});

// Watches the less files and images
gulp.task('watch', function(){
  gulp.watch('src/less/**/*.less', ['styles']);
  gulp.watch('src/img/**/*.{JPG,jpg,jpeg,gif,png}', {cwd:'./'}, ['responsive-img']);
});


gulp.task('default', ['styles', 'responsive-img', 'watch']);
