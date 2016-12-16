var gulp       = require('gulp'), // Подключаем Gulp
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'); // Подключаем библиотеку для удаления файлов и папок


gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: '' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'js/classie.js',
		'js/common.js',
		'js/game.js',
		'js/imagesloaded.pkgd.min.js',
		'js/main.js',
		'js/masonry.pkgd.min.js',
		'js/modernizr-custom.js',
		'js/phaser.min.js'
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', function() {
	return gulp.src('css/*.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});


/*разворачивает сервер и следит за всеми правками в файлах*/
gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('js/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
	gulp.watch('css/*.css', browserSync.reload);
});

