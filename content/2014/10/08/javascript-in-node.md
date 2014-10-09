---
title: JavaScript in Node
description: Using JavaScript in Node is much different than in the Browser. Here we'll discuss the differences and similarities.
template: post
collection: posts
date: 08 Oct 2014
category: development
tags: node, javascript
prev: /2014/10/07/installing-node/
next: /2014/10/09/getting-started-with-npm/
---

If you're a long time user of jQuery, and don't know much vanilla JavaScript,
you'll likely be asking yourself, "Why would I want to run JavaScript in a
non-browser environment?" For those of you that fit in that boat and ask that
question, you'll likely want to learn a bit more about JavaScript before
continuing.

Before continuing, you should have node installed on your machine. If you
haven't installed it yet, you can follow the instructions in my
[previous post]('/2014/10/07/installing-node/') to install node.

## Node's REPL

Before we create any JavaScript files to play around with, let's play around
a little bit in Node's REPL (Read-Eval-Print Loop), which is just a place where
we can toy around with JavaScript in a command-line interface.

Start by just entering `node` into the terminal or command-line and pressing
`[enter]`. You're going to see something like this in the output:

```bash
$ node
>
```

The `>` is waiting for input. Now type `5` and press `[enter]`:

```bash
> 5
5
>
```

The stuff that appears before the line you entered is the return value of the
expression, as well as anything that gets logged out with stdout (console.log).

Now type `var test = 5;`. It will print out `undefined` because the expression
you typed has no return value. Now type `test`. Now you should get `5` printed
out.

```bash
> var test = 5;
undefined
> test
5
>
```

You can also put in functions:

```bash
> function add(a, b) { return a + b; }
undefined
> add(4, 7)
11
>
```

Fun right? I sometimes find it faster to open this up instead of my system's
calculator.

## JavaScript in Node

JavaScript in Node is in a different environment, and has a different way of
loading dependencies and files. There's no HTML, CSS, or `document.onReady`
event. Node starts by loading up a single javascript file.

Start by creating a file called `index.js`. You can do this in your preferred
code editor, or use the `touch` command to create an empty file:

```bash
touch index.js
```

Next, open up your file, and you can now unleash JavaScript!

```javascript
// index.js
var truthy = true;

if (truthy) {
  console.log('truth!');
} else {
  console.log('falsehood!');
}
```

After you've saved your `index.js` file, run `node index` or `node index.js` to
run the file.

```bash
$ node index
truth!
```

### CommonJS

There are many types of package types when it comes to JavaScript. I'll likely
go over all of them in greater detail in a later post, but I'll mention them
here for completion:

* AMD (Asynchronous Module Definition) - A way of loading modules asynchronously
and only when required by another module. Very useful for only loading modules
on web pages that need them.

* ES6 (Ecmascript 6 Modules) - Ecmascript 6 will have it's own way of injecting
dependencies, which will be really nice in the browser once it's been fully
adopted.
[Syntax for es6 module definitions](http://www.2ality.com/2014/09/es6-modules-final.html)

* Globals - This is what is typically used in the browser. jQuery exposes a
`jQuery` and a `$` variable which can then be used. The caveat is that the
jQuery library must be loaded before you can actually use it.

* CommonJS - This is what is used by Node. That isn't to say you couldn't use
the others, but it's probably just simpler to use what is packaged with node.
It exposes a global function called `require` which allows you to bring in an
exported module into another one. It also keeps a cache of the file so that it
only gets called once, no matter how many times a module is 'required'.

The best way to understand CommonJS is to put it into action.

Working from our `index.js` file, let's create another file called `truthy.js`
and put it in the same directory as `index.js`.

```javascript
// truthy.js
module.exports = true;
```

Now in your `index.js`, change it to look like this:

```javascript
// index.js
var truthy = require('./truthy');

if (truthy) {
  console.log('truth!');
} else {
  console.log('falsehood!');
}
```

Notice the `module.exports`? That (along with a few others) is a variable that
is exposed when the file gets loaded. The execution happens like this:

When you run `node index`, it's going to parse the file and start execution. It
reads `var truthy = require('./truthy');`. When it sees the function call to
`require()`, require will read the file `./truthy.js` which is relative to the
`index.js` file. It will then parse and execute that file. It exposes the
`module` object, and anything you attach to `module.exports` is what gets
returned as the module. You can also use the exposed `exports`, which is just a
shortcut to the same object. So `./truth.js` exports as a boolean, `true`, which
gets thrown into the `truthy` variable in our `index.js`. Then it goes through
the `if` statement and `console.log`s out whatever we want.

Notice that I didn't use the file extension when I used `require('./truthy')`.
You certainly can, but you don't have to. Node will automatically parse `.js`
files as well as `.json` files that don't have an extension.

That should be enough to get you started. Next we'll go over NPM and how to
bring in 3rd party module.
