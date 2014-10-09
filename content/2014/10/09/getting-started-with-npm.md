---
title: Getting Started with npm
description: When beginning Node.js development, it's important to understand package management. npm is the de facto way of managing dependencies for Node.js projects.
template: post
collection: posts
date: 09 Oct 2014
category: development
tags: node, javascript
prev: /2014/10/08/javascript-in-node/
---

If you've gone through the [previous post](/2014/10/08/javascript-in-node/), You
should have a basic understanding of how `require()` works. We'll expand on it a
little, but it will integrate very well with [`npm`](https://www.npmjs.org/).
`npm` stands for Node Package Manager. It is a node module that comes packaged
with node when you install it. It is a global module, meaning that it is
installed as a CLI. If you have node installed, it should come with it, so no
additional install steps are needed.

You can install a node package locally by using the `npm install` command.
You'll need to know the name of a package you want to install, first. Create an
empty directory somewhere, and navigate to it using the terminal. Then run this
command:

```bash
npm install request
```

What it's doing is looking at `npm`'s package registry for a package named
`request`. It will look for the latest version, then download it to your
computer. After it's done, you'll notice that it created a folder called
`node_modules/` in the directory you just created. If you look in there, there
will be another folder called `request/`. In there are a whole bunch of other
files, including a `package.json` file, and another `node_modules/` directory.
The `request` package has it's own dependencies, which npm installed for it as
well. The package didn't (or shouldn't) include the dependencies explicitly,
they should be automatically downloaded through npm.

## package.json

To keep track of dependencies you're using for a project, you should also use a
`package.json` file. You could look at an example one to build yours out, or you
can use npm to create one for you.

To create a `package.json` file using `npm`, run the following command:

```bash
npm init
```

This will run you through a series of prompts to help build out your
package.json.

You don't really need to worry about what you put in here, because you can just
edit the file later. `npm init` gives you a pretty good start to your file, but
it doesn't utilize all of the options. You can [view all of the package.json
options here](https://www.npmjs.org/doc/files/package.json.html).

Once you have a package.json, you can 'save' dependencies to your package. To do
this, use the `--save` flag when you run `npm install`. For example:

```bash
npm install request --save
```

Will download the request package into `node_modules/request/` just as before,
but now if you look in your `package.json`, you will see a new property:
"dependencies".

This is where your saved dependencies are referenced by npm. For the sake of
demonstration, delete your `node_modules/` directory. Now run:

```bash
npm install
```

Notice that we're not putting the package name or anything there. `npm install`
by default will look at the `package.json` in your current working directory and
read the "dependencies" property and install all of those packages. Your
`node_modules/` directory is fully restored! Now you can add `node_modules/` to
your `.gitignore` file (in a later post, I'll discuss situation where you might
actually want to commit your node_modules directory).

In the next post, I'll discuss how to keep track of your development
dependencies.
