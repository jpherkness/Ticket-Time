const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const browserSync = require('browser-sync');
const tscConfig = require('./tsconfig.json');
var sourcemaps = require("gulp-sourcemaps");

// Watch for changes
gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', ['compile']);
  gulp.watch(['src/**/*.html', 'src/**/*.css'], ['copy']);
})

// Clean the contents of the distribution directory
gulp.task('clean', () => {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', () => {
  return gulp
    .src('src/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

// Copy the html and css files to the dist directory
gulp.task('copy', () => {
  return gulp
    .src(['src/**/*.html', 'src/**/*.css'])
    .pipe(gulp.dest('dist'));
});

// Browser Sync
gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: {
            target: "localhost:8080",
            ws: true
        },
        notify: true,
        browser: "google chrome"
    });
    gulp.watch("./src/**/*", ['reload']);
});

gulp.task('reload', () => {
    browserSync.reload();
});

gulp.task('default', ['clean', 'compile', 'copy', 'watch', 'browser-sync']);
gulp.task('production', ['clean', 'compile', 'copy']);