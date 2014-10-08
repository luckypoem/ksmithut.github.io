---
title: Installing Node
description: Node.js is an awesome tool for many things, especially in web development. Here we'll go over why you might install it, what it's used for, and how to install it.
template: post
collection: posts
date: 07 Oct 2014
category: development
tags: node, javascript
next: /2014/10/08/javascript-in-node/
---

[Node.js](http://nodejs.org/) is a development platform built on Google's V8
JavaScript engine. When I first started hearing about node, people would say
that is "server-side JavaScript". Admittedly, that's pretty much what I used it
for initially, but I find that to be an inaccurate definition. Essentially, node
is a platform that allows you interact with a computer's functions (such as the
file system and networking capabilities) using JavaScript.

Although it can be used as a web server (making the server-side JavaScript
description somewhat valid), it is also used to build command-line tools,
build processes, package management, and much more.

I was hesitant at first to start using node. In the past, setting up another
development environment has been a pain. A basic web server has required
complicated setups and configurations with Apache, PHP, MySQL, Ruby, Content
Management Systems, and so forth. But once I decided to just sit down and figure
it out, I was surprised how uncomplicated it was.

## Choices, choices

The choices you have available to you to install node will depend on which
operating system you're using.

The most "cross-platform" solution to installing node is downloading it directly
from their [website](http://nodejs.org/download/). It will give you options
based on your operating system and architecture. The downside with this method
is that to switch to another version of node, you must download the version. No
automatic upgrades.

On a Mac, there are other solutions. Obviously, you can download the binaries
from the website as mentioned above, but if you use a package manager, such as
[homebrew](http://brew.sh/), you have a much simpler solution. For homebrew,
you can install node with this command in your terminal:

```bash
brew install node
```

As long as you keep your brew packages updated, you'll always have node up to
date.

## Node version managers

Another option is to download a version manager for node. The reason for using
one of those would be if you wanted to test out your project or package using
different versions of node. Many production node environments don't have the
latest version of node installed, so it would be important to test out your
project in the version of node that will actually be running your project.

At the time of writing this article, I use one called
[`n`](https://github.com/visionmedia/n), but another popular one is called
[`nvm`](https://github.com/creationix/nvm). They're shell scripts that help
manage versions of node that get used. Both are available as node modules (to
be installed globally) or as brew packages (`brew install n`,
`brew install nvm`).

Using `n`, you can download the latest stable version by using:

```bash
n stable
```

Or the latest version (may be unstable):

```bash
n latest
```

you can get a listing of the currently installed version by using:

```bash
n
```

and you can then use the arrow keys to select which version of node you would
like to use

```bash
    0.10.30
    0.10.31
  ο 0.10.32
    0.11.14
```

For a full usage guide, view their
[documentation](https://github.com/visionmedia/n).

For windows, there are different packages (mentioned in `nvm`'s documentation):

* [`nvmw`](https://github.com/hakobera/nvmw)
* [`nvm-windows`](https://github.com/coreybutler/nvm-windows)

## Testing

To make sure that you have node installed, run `node -v` to check the node
version number. If it doesn't display the version number, then you've run into
problems. If none of the above options work for you, feel free to open up an
issue on github on this repo and I'll try to help you out with a solution. In
addition, I'll add the issue and the solution to this post to help others that
may run into the same issue. You can submit an issue by creating a github user
account and going to
[https://github.com/ksmithut/ksmithut.github.io/issues](https://github.com/ksmithut/ksmithut.github.io/issues).

In subsequent posts about node, we'll go over the node REPL and modules.
