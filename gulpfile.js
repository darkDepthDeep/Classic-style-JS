"use strict";

const gulp = require("gulp");                           // импортируем те пакеты которые нужны в сборке
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

// const dist = "./dist/";                                // этот тот путь куда мы будем все компилировать
const dist = 'C:/OpenServer/domains/test';

gulp.task("copy-html", () => {                        // служит для того чтобы мы могли отслеживать те изменения которые вносим в html файл
    return gulp.src("./src/index.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {                           // task по компиляции скриптов
    return gulp.src("./src/js/main.js")
                .pipe(webpack({                         // здесь мы пользуемся webpack
                    mode: 'development',                // здесь есть два режима: разработка и продакшн отличаются скоростью работы. В данном случае у нас режим разработки
                    output: {
                        filename: 'script.js'           // это то куда у нас все будет складываться, файл будет называться script.js
                    },
                    watch: false,                       
                    devtool: "source-map",              // это будет создаваться карта проекта, откуда у нас скрипты идут и с чего состоят
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {           // будет использоваться самый популярный пресет preset-env
                                    debug: true,                            // это если у нас возникнут какие то проблемы то нам консоль покажет где у нас была ошибка
                                    corejs: 3,                              // подключаем 3 версию. Настройки пакета corejs которые были подключены в package.json. Это библиотека которая нам позволяет подключать полифилы в наш проект. Полифилы это код написанный в старом стандарте для того чтобы заместить определенные фичи которых не существует в старых браузерах
                                    useBuiltIns: "usage"                    // когда наш проект компилируется, эта библиотека анализирует весь наш код. Смотрит на тот браузерлист который мы с вами поддерживаем и подключает только те полифилы которые нам действительно нужны в нашем проекте
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))                          // после того как у нас все выполнилось мы отправляешь наш файл в папку dist
                .on("end", browsersync.reload);                 // если произошли какие то изменения мы перезагружаем нашу страницу
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")              // мы берем из папки src любые файлы и папки
                .pipe(gulp.dest(dist + "/assets"))      // помещаем в dist assets
                .on("end", browsersync.reload);         // после всего мы перезагружаем нашу страницу
});

gulp.task("watch", () => {                  // task watch внутри него запускается отдельный сервер который
    browsersync.init({                      // работает при помощи browsersync
		server: "./dist/",                      // и он серверит файлы которые находятся в папке dist. То есть в dist у нас есть index.html который будет запускаться как отдельный сервер
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));                 // мы запускаем gulp.watch для того чтобы следил за изменениями файлов. То есть мы будем следить за index.html и если вдруг в нем что то поменялось то я буду запускать команду copy-html парралельно
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));    // нам понадобится task который называется build, который параллельно запускает три задачи copy-html", "copy-assets", "build-js

gulp.task("build-prod-js", () => {                  // этот таск выполняет почти все те же задачи что и build-js только уже в чистовом варианте
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',             // здесь уже стоит режим продакшн, это значит что компиляция скриптов будет уже намного дольще на самом деле. Здесь подключатся разные плагины для оптимизации и в этой задаче так же убраны все упоминания о каких то дэбагах
                    output: {                       // source-map нам здесь уже не нужны, точно так же как и сообщения в терминале о каких то ошибках. Понятно что если весь скрипт сломается то он нам выдаст ошибку чтот ничего не скомпилировалось
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));        // этот gulp.task "default" - это тот таск который запускается по умолчанию. Тоесть мы напишем четыре буквы в терминал gulp и она запуститься и параллельно запускаем две задачи. Во первых это build - для того чтобы все наши файлы которые возможно ещё изменились до того как ещё был запущен gulp они скомпилились и мы будем её серфить. И параллельно запускается watch для того чтобы мы могли отслеживать в будущем все изменения