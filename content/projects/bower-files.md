---
title: bower-files
description: bower-files is an npm package that works into your build process to put your bower packages in order.
projectPage: https://github.com/ksmithut/bower-files
---

[Bower](http://bower.io/) is a package manager for front-end packages, such as
[React](http://facebook.github.io/react/), [AngularJS](https://angularjs.org/),
and [Bootstrap](http://getbootstrap.com/). The problem arises when you start
piling on more and more dependencies. Bootstrap requires jQuery to be loaded
before it can be loaded. This requires you to build in custom logic to your
build process, and everytime you add a new dependency, you have to hack your
build process again.

[bower-files](https://github.com/ksmithut/bower-files) aims to automate
front-end dependency management. It will ready your bower configuration file,
and give you the list of packages in the order they need to be in based on their
dependencies. It also splits them up by extension, so you can split up styling
and script dependencies.

This project easily saves me hours on each project I use it for, plus it makes
the project easier to manage and update.
