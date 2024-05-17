const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));

function compileSass() {
  return gulp.src('src/default/frontend/scss/*.scss') // Путь к вашим Sass файлам
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/default/frontend/csss')); // Куда сохранять скомпилированные CSS файлы
}

function watchSass() {
  gulp.watch('src/default/frontend/scss/*.scss', compileSass); // Следим за изменениями в файлах Sass
}

exports.compileSass = compileSass;
exports.watchSass = watchSass;