---
title: Starting with Node.js
description: How I get my dev environment set up with Node.js.
tags:
- technology
- development
- Tutorial
---

[Node.js](http://nodejs.org/) has long passed the new-kid-on-the-block stage
about now, even though it hasn't reached a 1.x release (at the time of writing).
Before you even start to think about installing node on your machine, you should
have a good reason to. Obvious reasons would be to play around with a new
platform you're not familiar with, or that's what your team at work uses. If
you're not sure what you can use it for, this is what I have used it for, and
what I currently use it for:

* Front-end library package management ([bower](http://bower.io/))
* Front-end asset build systems ([gulp](http://gulpjs.com/),
[grunt](http://gruntjs.com/))
* Web Scraper
* Web Server (Web Service, API)
* Static Website Generator (this site)
* General Scripting language

That being said, there are things it's not so good at. Heavy computational stuff
can grind a node application to a halt given the right amount of load. Holding
state in memory is also something that you should not count on, but you can
hold that state reliably in other sources.

There are many things that it's good at, but rather than overwhelm you, let's
just get the thing installed.

## Prerequisites

* Access to the Internet.
* A Shell program, but on Windows, I believe you could access it with cmd.exe.
[Correct me](https://github.com/ksmithut/ksmithut.github.io/pulls) if I'm wrong.

## Simple install

[Download the installer](http://nodejs.org/) from the Node.js website. This one
should be pretty straightforward for you. Once it's installed, you'll need to
open up your command line tool. Type in `node` and press enter. You should get
a REPL input character, so your terminal should look something like this:

```bash
$ node # This is the line you entered
>
```

If that's what you've got, then you've got Node.js installed! Now you can try
putting in some javascript:

```bash
> var test = [1, 2, 3]; # press enter here
undefined
> test # press enter here
[ 1, 2, 3 ]
```

Next post, I plan on going over putting your code into files and running them.

## Advanced install

For those using node professionally, or who want to, you may want to use some
kind of node version manager, so you can easily switch which versions of node
you are running.

I'm using a Mac, so I've installed `[nvm](https://github.com/creationix/nvm)`
via `[homebrew](http://brew.sh/)` (`brew install nvm`), but there are other
node version managers. Nvm is one I've used for a while, but a really simple one
to use is called `[n](https://github.com/tj/n)`. For windows, the nvm repository
has some windows alternatives.

From there, I can use `nvm install stable` to install the latest version of
node. I also want to set a default version of node to use, so I use `nvm
alias default stable`, but you can read their documentation on how to set
different versions up as the default versions to use.

You can also set up a `.nvmrc` file to have specific versions of node on a
project by project basis.

## io.js

[io.js](https://iojs.org/) is a fork of node.js that is maintained by some of
the original developers of node.js. Basically, they didn't agree with the way
that the development was being managed on the project, so they decided to split
off so that they could work in new features at a quicker pace. Right now, it's
comparable to v0.11.x of node. It has a lot of EcmaScript 6 features such as
generators, block scoping, among [other
things](https://github.com/lukehoban/es6features). I heard somewhere that people
are trying to get the name changed to EcmaScript 2015... We'll see how it turns
out.

If you're getting into node, you definitely cannot ignore this. The good news is
that if you're using nvm, you can install io.js alongside node `nvm install
iojs`, and just switch back and forth. If you use the installer, it will
overwrite your node installation (if you used the installer for that, too).
