var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');

// 转换html文件
gulp.task('html', function () {
	gulp.src('./src/index.html')
		.pipe(connect.reload())
		.pipe(gulp.dest('./dist'))
})

// 转换js文件
gulp.task('js', function () {
	gulp.src('./src/js/*.js')
		.pipe(connect.reload())
		.pipe(gulp.dest('./dist/js'))
})

//转换css文件并预编译
gulp.task('css', function() {
	gulp.src('./src/css/index.less')
		.pipe(less())
		.pipe(gulp.dest('./dist/css'))
})

gulp.task('watch', function () {
	gulp.watch('./src/index.html', ['html']);
	gulp.watch('./src/css/*.less', ['css']);
	gulp.watch('./src/js/*.js', ['js']);
})

// 打开服务器
gulp.task('server', function () {
	connect.server({
		port: 8080,
		livereload: true
	})
})

gulp.task('default', ['html', 'js', 'css', 'watch', 'server']);