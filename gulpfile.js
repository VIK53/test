var curDir=process.env.INIT_CWD;//Получаем имя текущего каталога
console.log("Текущая директория: ",curDir);
var cssSrc = 'src/css/'; //Место расположения исходных scss, css файлов
var cssSrcWatch = cssSrc+'[^-]*.(css|scss)'; //Наблюдать за файлами css и scss, пропускаем файлы начинающиеся с символа '-'
//Наблюдать за файлами в в /src/css/  и в /src/css/main, пропускаем файлы начинающиеся с символа '-
var cssMainWatch = [cssSrc+'main/[^-]*.(css|scss)',cssSrc+'[^-]*.(css|scss)']; 
//Наблюдать за файлами в в /src/css/  и в /src/css/ucab, пропускаем файлы начинающиеся с символа '-
var cssUcabWatch = [cssSrc+'ucab/[^-]*.(css|scss)',cssSrc+'[^-]*.(css|scss)']; //Наблюдать за файлами css и scss, пропускаем файлы начинающиеся с символа '-'

var jsSrc = "src/js/";//Место расположения исходных JS файлов
var jsSrcWatch = jsSrc+"**";//Наблюдать за файлами во всех подкаталогах jsSrc
const dest="./www";//Выходная веб папка

var gulp = require("gulp");
var babel = require("rollup-plugin-babel");
const terser = require('gulp-terser');
var rollup = require("rollup-stream");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var sourcemaps = require("gulp-sourcemaps");

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass'); //Подключаем Sass пакет
var cssnano = require('gulp-cssnano'); // Подключаем пакет для минификации CSS

var cache = false;
gulp.task("mkJsBundle", function () {
  return rollup({
    input: jsSrc+"main.js",
    sourcemap: true,
	format: 'es',
    plugins: [babel()],
    cache: cache
  })
  .on("bundle", bundle => { cache = bundle; })
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  //.pipe(gulp.dest(dest)) //Записываем не сжатый файл
  .pipe(terser())
  //.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(dest));
});

/*css для сайта, отдельный файл*/
gulp.task('mkCssMain', function(callback){ // Создаем таск cssMain
    console.log("--- mkCssMain is run ---");
    //return gulp.src(["./src/css/*.[s]*css","./src/css/*.scss"]) // Берем источник
		return gulp.src([cssSrc+"/main.scss"]) // Берем источник, css и scss
		.pipe(sourcemaps.init())
    .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		//.pipe(gulp.dest(dest)) // Выгружаем результаты без сжатия
		.pipe(cssnano()) // Сжимаем
		//.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest)); // Выгружаем результаты
		callback();
});

/*css для личного кабинета, отдельный файл*/
gulp.task('mkCssUcab', function(callback){ // Создаем таск cssMain
    console.log("--- mkCssUcab is run ---");
    //return gulp.src(["./src/css/*.[s]*css","./src/css/*.scss"]) // Берем источник
		return gulp.src([cssSrc+"/ucab/ucab.scss"]) // Берем источник, css и scss
		.pipe(sourcemaps.init())
    .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		//.pipe(gulp.dest(dest)) // Выгружаем результаты без сжатия
		.pipe(cssnano()) // Сжимаем
		//.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest)); // Выгружаем результаты
		callback();
});

//Запустим сформированные задачи
//(gulp.parallel("mkJsBundle", "mkCssMain", "mkCssUcab")());
(gulp.parallel("mkJsBundle", "mkCssMain")());

//Включим наблюдение за файлами и запуск задач при их изменении
gulp.task('default', function(){ //дефолтный таск, чтобы не писать в консоли постоянно gulp watch, а писать просто gulp.
	gulp.watch(jsSrcWatch, gulp.series('mkJsBundle')); // Наблюдение за js файлами и автозапуск задачи "mkJsBundle"
	gulp.watch(cssMainWatch, gulp.series('mkCssMain')); // Наблюдение за scss файлами в /cssMainWatch/ и автозапуск задачи "mkCssMain"
	//gulp.watch(cssUcabWatch, gulp.series('mkCssUcab')); // Наблюдение за scss файлами в /cssUcabWatch/ и автозапуск задачи "mkCssUcab"
    //console.log("--- watch mkCssBundle & mkJsBundle ---");
});
