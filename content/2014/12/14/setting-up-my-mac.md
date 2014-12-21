---
title: Setting Up My Dev Computer
description: Setting up a Computer for your development environment can be a tedious process. I go into my personal, and opinionated preference for dev work.
tags: development
---

I spend way to much time fine-tuning my computer for my dev environment. I've
probably spent more time making scripts to automate my setup then actually
setting up my environment. This is not something you want to do, so hopefully
this post will help you save some time! Note that this setup is very opinionated
is more to help remind me of some of the things that I've decided to do.
Hopefully just the principle of this setup will help you with your own
environment.

### Prerequisites for my setup

- I'm using a Mac. There are PC alternatives to most of these things, though.
- I use OS X's Terminal. Some things require some knowlege of how to navigate
around using a shell terminal. There are more feature rich terminals for OS X
such as iTerm2, but I try to be a minimalist in some cases. For Windows, there
are Unixy type shells, but I'm not too familiar with them.

## Package Managers

> The one word that makes a good manager - decisiveness.
>
> Ryne Sandberg

Having a package manager is key to my dev environment. With a single command,
I can install all the third party programs I need. For my Mac, I use
[Homebrew](http://brew.sh/). It's a pretty popular one, but
[MacPorts](https://www.macports.org/) is another well-used one.

Below are the programs I install using brew:

In Terminal:
```bash
brew install git     # install updated version of git
brew install mongodb # mongodb document store database
brew install redis   # redis key/value store database
brew install trash   # alternate to `rm`, moves stuff to the Trash
brew install go      # I've been playing around with the go language
brew install n       # node.js version manager
brew install wget    # easy way to download all the things
# http://caskroom.io/
# cask is used to download gui programs, such as google chrome or sublime test
brew install caskroom/cask/brew-cask
```

It's just as easy to uninstall, and all of these can be installed in one
command:

```bash
brew install git mongodb redis trash go n wget caskroom/cask/brew-cask
```

## Settings

This is a pretty obvious one. You should have your settings tailored to your
workflow. Set up keyboard shortcuts, tweek mouse movement speed, and disable
superfluous system tasks. I've gotten to the point where it's sometimes
difficult to work on someone else's computer because I've got all these keyboard
shortcuts and preferences set up to speed up my workflow.

For my Mac, I used a modified version of a big long list of system setup scripts
called [OSX for Hackers](https://gist.github.com/brandonb927/3195465). It is
also very opinionated.

A general warning for people new to the Terminal: **Do not blindly copy and
paste shell scripts from the Internet**. Try to read through it and understand
it, no matter how short or long it is. You can really screw up your computer if
you don't know what you're doing. Most of the time, you need to change a value
specific for your computer. Also, if you get `$: command not found`, you copied
the `$` from the command you copied. That is not meant to be included.

One setting I like for my Mac is a fast keyboard repeat and a short delay for
repeat. I also like to keep my file explorers clean, aligned, and in order.

## Centralized scripts

[Dotfiles](http://dotfiles.github.io/). Dotfiles is a way to keep your settings
stored and easily accessible to any and all of your computers, and any new
computers you get to replace your current. You keep all of your settings and
scripts in a repository which you can easily update, and pull down on all of
your machines. Mine was custom, but there are [more standard dotfiles on
github](http://dotfiles.github.io/).

## Backup

> Being too busy to worry about backup is like being too busy driving a car to
> put on a seatbelt.
>
> T.E. Ronneberg

Most of this is pretty obvious, but you'd be surprised how many people I know
and work with that don't have a solid backup system in place. All of these tips
are tips that I gave to people after they lost their data, or have been learned
from personal experience.

* You should always have backup system in place for *everything* you want to
want to keep.
* Your backup should not be on the same storage medium as the data being backed
up.
* For really important things, like homework or things that keep your business
running, you should have two or more backups, all in different physical
locations.
* You should have at least daily backup, *minimum*. If you're working on an
important project, back up your project only as often as you can afford to lost.
* Only delete your backups if you absolutely have to. Valid reasons could be
that the backup drive doesn't have enough space to backup again, or that you
have to remove sensitive data.
* Your backup drive should be a good amount bigger than the total capicity of
drive you're backing up. Some software suggests having twice as big a backup
drive.
* Your email is not a backup. Neither is Dropbox. Or any other cloud service.
(Yes, I have heard of Dropbox dropping an entire folder with no chance of
recovery)

If you own a Mac, you've got great built-in software to keep your entire system
backed-up: Time Machine. It also has a version control system built in, which
has saved me tons of time, especially with big school projects.

## Conclusion

I'm sure I've missed something that I do to keep my system up to date and
easily transferable. The main goal that I have is to feel completely comfortable
completely wiping my computer at anytime, reinstalling the OS, and getting set
back up in a reasonable amount of time. So far,
[my dotfiles](https://github.com/ksmithut/.dotfiles/) have helped me do a pretty
good job of doing this.
