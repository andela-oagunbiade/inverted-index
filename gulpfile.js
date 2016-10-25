"use strict";
var gulp = require("gulp");
var browserSync = require("browser-sync");


gulp.task("default", ["browser-sync","watch"]);

gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./src"
        }
    });
});

gulp.task("reload", function () {
    browserSync.reload();
});

gulp.task("watch", function () {
    gulp.watch("./src/*.js", ["reload"]);
    gulp.watch("./src/*.html", ["reload"]);
});