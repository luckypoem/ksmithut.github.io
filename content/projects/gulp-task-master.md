---
title: gulp-task-master
description: gulp-task-master provides a structure for organizing gulp tasks which is scalable and easy-to-understand.
projectPage: https://github.com/ksmithut/gulp-task-master
---

[Gulp](http://gulpjs.com/) is a build system built on the idea of file or
content streams. To use it, you put your build code and configuration in a
file called `gulpfile.js`. If you have a lot of build tasks, this file can get
very long and hard to manage. It doesn't scale well as you add more and more
tasks.

[gulp-task-master](https://github.com/ksmithut/gulp-task-master) aims to make
managing gulp tasks more manageable. Each task is put in its own file. You can
declare dependencies, and add watch configuration. This scales very well, and
is flexible to almost any build configuration.
