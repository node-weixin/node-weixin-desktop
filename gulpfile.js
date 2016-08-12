var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var coveralls = require('gulp-coveralls');
var babel = require('gulp-babel');
var del = require('del');
var isparta = require('isparta');
var electron = require('electron-prebuilt');
var childProcess = require('child_process');
var sass = require('gulp-sass');

var createdProcess;
var watchStatus;

// Initialize the babel transpiler so ES2015 files gets compiled
// when they're loaded
require('babel-core/register');

gulp.task('static', function () {
  return gulp.src('lib/**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint({
      globals: [
        'angular',
        '$'
      ],
      envs: [
        'browser',
        'nodejs'
      ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({
    package: path.resolve('package.json')
  }, cb);
});


gulp.task('sass', function () {
  return gulp.src(['lib/sass/**/*.scss'])
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('lib/frontend/styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch('lib/sass/**/*.scss', ['run:nowatch', 'sass']);
});

gulp.task('js:watch', function () {
  gulp.watch('lib/**/*.js', ['run:nowatch']);
});

gulp.task('html:watch', function () {
  gulp.watch('lib/**/*.html', ['run:nowatch']);
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('error', function (err) {
      mochaErr = err;
      throw err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('watch', function () {
  gulp.watch(['lib/**/*.js', 'test/**'], ['test']);
});

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('babel', ['clean'], function () {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('run:nowatch', function () {
  watchStatus = true;
  if (createdProcess) {
    createdProcess.kill();
  }
  createdProcess = childProcess.spawn(electron, ['./lib/index'], {
    stdio: 'inherit'
  });
});

gulp.task('run', ['sass:watch', 'js:watch', 'html:watch'], function () {
  watchStatus = true;
  if (createdProcess) {
    createdProcess.kill();
  }
  createdProcess = childProcess.spawn(electron, ['./lib/index'], {
    stdio: 'inherit'
  });
});

gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('default', ['static', 'test', 'coveralls']);
