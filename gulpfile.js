const gulp = require('gulp');
const babel = require('gulp-babel');
 const sass = require('gulp-sass');
gulp.task('babel', () => {
     gulp.src('public/babel/*')
        .pipe(babel({
            presets: ['react','stage-0']
        }))
        .pipe(gulp.dest('public/cjs/'));
});

gulp.task('sass', function () {
  return gulp.src('public/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css/'));
});

gulp.task("watch",["babel","sass"],function() {
    gulp.watch("public/babel/*",[babel]);
    gulp.watch("public/scss/*.scss",[sass]);
})