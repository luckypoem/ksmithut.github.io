---
title: Introduction to Terminal
description: A resource to help you remove your fear (and perhaps instill new fears) of the OS X Terminal.
tags:
- technology
- tutorials
---

## To whom it may concern...

This post is for those who want to (or have to) learn how to use the Terminal
but are afraid to, or don't know where to begin. When I first started in
development at school, I thought that using a command-line interface was too
"old-school" to be productive. Then when I learned that people actually used it,
I was terrified to learn it. Once I learned how to use it effectively, it's hard
to go back to not using it. It's the one program I have running all the time
while I work. Don't be too afraid. Granted, you can [mess up your entire system
in less than ten keystrokes](https://www.youtube.com/watch?v=D4fzInlyYQo), but
usually, you have to know how to do that.

Also, this is more of a beginning primer to using the terminal on Mac OS X. I
imagine that most Linux users are already pretty familiar with the Terminal, but
beginning Linux users who don't have terminal experience may find this useful.
I can't speak for Windows just yet. Some of the commands may work, others not.
Try using a unix-flavored shell program.

One thing to note: You should never blindly copy and paste a script from the
Internet and run it. Take `rm -rf /` for example. There are some things that may
prevent this from running, but if you are able to run it, say goodbye to
*everything* on your computer. You will watch slowly as every single file gets
removed from the file system. Warnings will pop up, fonts will disappear, your
computer may hang for a while, then everything will crash. Fun to watch,
horrifying to experience (if not done purposefully). So that being said, I will
offer up some unix commands for you to enter in. They should all be safe and
I'll try to be as thorough as possible in explaining what they do, but I am in
no way responsible for any damage it may do to your computer or your data.

## The Final Frontier

Think of terminal as a single GUI which has virtually limitless functionality at
your fingertips. I would almost go as far to say that everything that is done
to your system through the operating system's graphical interface can be done
through the terminal. I say almost because absolutes tend to attract a lot of
rage debaters, and probably designers.

When you first start out, you will probably spend a lot of time searching for
command usage online, looking up how to use different arguments, slowly typing
out the command and checking every character before you run it. For me, that was
pretty typical of my first week or so learning unix commands. Everything was
slow, and I'm sure it was painful for some of my mentor developers to watch me
slowly type out a `cd` command. Brave through it, weary traveler! Better (and
more productive) days lie ahead.

## Jump Right In

Open up the Terminal app. On Mac OS X, it's in
/Applications/Utilities/. Enter in the following command:

```bash
pwd
```

This is "Print Working Directory". It will print out to your terminal screen the
path that your cursor currently resides. It should be in /Users/*your username*.
If you're ever lost, use this to find where you are.

```bash
ls
```

This gives you a list of all of the visible files and folders in your working
directory. To get it in a list format (1 entry per line), use `ls -l`. This will
give you other information about each entry as well, such as permissions, size,
and the owner. To get all of the files (including hidden ones), use `ls -a`.
Notice the `.` and `..` entries. The single dot is a pointer to the current
directory, and `..` is a pointer to the parent directory. More on that later. To
use both the `-l` and `-a` arguments at the same time, you can just use `ls -la`
to get a detailed listing of all files and folders in the current directory.

```bash
cd
```

This command is used to change the working directory. Type in `cd ~`. This will
move you to your home directory, or your user directory at
/Users/*your username*. Easy way to find your way back home. Now type in `cd `
(that's a space after the `cd`) and press `TAB` twice. It will give you a list
of directories you can choose from. If you start typing in `Docu` after the
`cd ` and press `TAB` once, it will autocomplete it for you to `cd Documents`.
`TAB` is used quite often in Command-Line Interfaces (heretofore called CLIs) to
autocomplete commands, mostly in the system ones. Many shells offer their own
autocomplete services, and others you need to download. Typing in `cd ..` will
move you up a directory, and typing in `cd .` will move you to where you already
are.

```bash
open
```

This is used to open a file or folder in its default program. Opening a
directory will open it in the Finder or file explorer, but opening a document
(or even a url) will open it in it's default program. Type in
`open https://www.google.com`. It will open up Google's homepage in your default
browser. Type in `open .` to open up your current folder in your file explorer.

## And Many More

Those are the basic commands to get you navigating around your computer system.
There are many other resources available on the Internet for you use as
references and learning guides to learn more about using the Terminal. Here's
one that I found particularly useful when I was starting out:

[40 Terminal Tips and Tricks You Never Thought You Needed](http://computers.tutsplus.com/tutorials/40-terminal-tips-and-tricks-you-never-thought-you-needed--mac-51192)
