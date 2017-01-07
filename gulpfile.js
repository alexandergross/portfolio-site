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
      'heading_img.jpg': [{
        crop: false,
        quality: 70,
        width: 1920,
        height: 550,
        crop: true
      }],
      '*': [{
        quality: 70,
        width: 450,
        height: 350,
        crop: true,
        suffix: '-450-1x'
      },{
        quality: 70,
        width: 900,
        height: 700,
        crop: true,
        suffix: '-450-2x'
      },{
        quality: 70,
        width: 768,
        height: 450,
        crop: true,
        suffix: '-768-1x'
      },{
        quality: 70,
        width: 1536,
        height: 900,
        crop: true,
        suffix: '-768-2x'
      },{
        quality: 70,
        width: 992,
        height: 450,
        crop: true,
        suffix: '-992-1x'
      },{
        quality: 70,
        width: 1984,
        height: 900,
        crop: true,
        upscale: true,
        suffix: '-992-2x'
      },{
        quality: 70,
        width: 1200,
        height: 450,
        crop: true,
        suffix: '-1200-1x'
      },{
        quality: 70,
        width: 2400,
        height: 900,
        crop: true,
        upscale: true,
        suffix: '-1200-2x'
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
