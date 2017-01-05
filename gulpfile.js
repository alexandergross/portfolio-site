var gulp = require('gulp'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    less = require('gulp-less'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions"]}),
    LessPluginCleanCss = require('less-plugin-clean-css'),
    cleanCSSPlugin = new LessPluginCleanCss({advanced: true});

gulp.task('styles', function(){
  gulp.src('./src/less/**/*.less')
    .pipe(less({
      plugins: [autoprefixPlugin]
    }))
    .pipe(less({
      plugins: [cleanCSSPlugin]
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify("Compiled CSS: <%= file.relative %>!"));
});

gulp.task('watch', function(){
  gulp.watch('./src/less/**/*.less', ['styles']);
});


gulp.task('default', ['styles', 'watch']);
