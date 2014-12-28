---
title: Node.js on Raspberry Pi
description: A walkthrough of what I did to get Node.js running on Raspberry Pi
tags:
- technology
- development
- tutorials
---

So for Christmas this year, my father got me and my brother a [Raspberry
Pi](http://www.raspberrypi.org/) (Model B+) for each of us. A Raspberry Pi is a
small, inexpensive computer that you can use to play around with programming
stuff and electronics stuff. Below are some of the key features of the Model B+

* 40 pin GPIO (General Purpose Input/Output) which you can hook up to
a breadboard
* 4 USB 2.0 slots
* A micro SD slot (for your boot drive)
* Tons of development tutorials and resources!

## My setup

This is just for context. All of these components are replaceable with what you
probably already have. Windows or Linux is fine, but you just need a way to
write to a microSD card from your computer.

* MacBook Pro running OS X Yosemite (has an SD slot)
* Internet access, wireless router with an open ethernet port and a cable to go
with it
* Raspberry Pi: Model B+
* 32 GB PNY microSD (not all microSDs work, see below)

The kit that my father bought came with an 8GB microSD, which is plenty of
space for anything that I would be using it for. The only space killers that you
should be worried about are media files (images, audio, video). If you're not
worried about those, just plan for enough space to use for your database or
whatever coding projects you want to use it for.

When doing initial research, I found that there are some microSDs that don't
work as well with Raspberry PI. The following link is [the most comprehensive
list of compatible and incompatible microSDs for Raspberry
Pi](http://elinux.org/RPi_SD_cards). Honestly, I think that 32 GB is still way
to much for my purposes, but it's nice to have some space to play around with.

Although the included microSD came with
[NOOBS](http://www.raspberrypi.org/downloads/) already installed on it, I wanted
to try to install one of the Raspberry Pi flavors of Linux from scratch. I
figured that I might be doing a lot of it because this might just become my goto
hobby.

## Before you begin

Here are some of the things you should be familiar with before we begin. You
might not need to know everything on this list, but it will help if you run into
any issues.

* **Terminal**. Having a solid understanding of how to navigate in Linux land is
super-helpful. There are Windows alternative (PuTTY will likely show up in your
search).
* **Linux**. Again, you don't really have to know it, because that may be the
reason you got a Raspberry Pi in the first place. If you don't know it, you'll
get to know it really well.

## Flash SD Card with Linux

Don't put in your SD card in just yet. Be sure that you can access your microSD.
For me, that's having an SD card adapter for the microSD so I can plug it into
my Mac.

First, you should decide on a [Raspberry Pi Linux
Distro](http://www.raspberrypi.org/downloads/). I've chosen the recommended one,
Raspbian. Download and unzip the package until you are left with the `*.img`
file.

### Mac OS X

1. Open up the Terminal (`/Applications/Utilities/`). While your SD
card is still out, type in `df -h`. This will list the free space for all of
your drives, but for our purposes, just take note of the ones that are there.

2. Now insert your drive and run `df -h` again. Take note of the new one that
appeared. It should look like `/dev/disk2s1`, but the numbers can be different.
I'm not completely sure of the naming scheme, but it seems like the first number
is that the disk was the nth disk to be mounted, and the 's' number is the
partition. But again, that's only a guess.

3. Next you'll need to unmount the disk. This does not mean eject or or physically
remove the the disk. Do do this, we'll use the Terminal. If you eject it through
the Finder, you'll need to start the whole process over. To unmount it, use the
following command in your terminal: `sudo diskutil unmount /dev/disk2s1`. Be
sure to replace the disk name with the one you found from the previous step. And
don't remove the SD card yet!

4. Next you'll need the raw device name of the card. To do that, replace `disk`
with `rdisk` from that disk name you got from before, and remove the 's1' part.
So you should end up with something like `/dev/rdisk2`.

5. Afterwards, we need to copy the disk image over bit for bit. Make sure your
`whatever.img` file is somewhere you can get to it. I put in temporarily in my
home directory. Use the following command to copy the image over:

  ```
  sudo dd bs=1m if=~/2014-12-24-wheezy-raspbian.img of=/dev/rdisk2
  ```

  Make sure you replace the paths and such with your own values.

6. After that command finishes, you're ready to insert it into the Raspberry Pi.
You don't get any feedback from the command, but it should only take a few
minutes.

### Windows

I haven't personally tried it on a Windows machine, but you should be able to
find [the Windows instructions you need
here](http://elinux.org/RPi_Easy_SD_Card_Setup)

## SSH into Raspberry Pi

Make sure your Raspberry Pi is turned off and unplugged if it isn't already. Put
microSD card in the microSD slot of your Raspberry Pi. Connect the ethernet port
with the ethernet cable to your router or wherever else you might get an
ethernet connection. Now you can plug in the power.

SSH (secure shell) is enabled by default, even on boot, so you can start it up
and configure it without a monitor or keyboard connected.

You'll want to wait a minute or two after you connect the power before
connecting via ssh, just to make sure it's all the way booted. You'll need to
know the IP address your router assigned it. Go into your router settings and
look for something like DHCP Client Table. You'll see a host named raspberrypi.
Use that address for the next part.

Now you can ssh into your new computer.

```
ssh pi@192.168.1.123
```

Replace the IP address with the IP address you found previously. When asked, say
yes to add it to your known hosts. It will ask you for the password. The default
password is `raspberry`.

## Setup

When you logged into the Raspberry Pi, it probably displayed a message for you
to set up the machine using a command: `sudo raspi-config`. Go ahead and run
that. It will come up with a blue menu. The first option is to expand the file
system to the entire microSD. You will need to reboot for that to take effect.
The second option is to change the password for the pi user. You don't have to
do that, but I did. If you do change it, make sure you remember it for the next
time you ssh into the machine.

I've left all of the other configuration options the same.

You'll probably also want to update all of the other packages on the raspberry
pi. If you've done anything with Linux, you've probably used `apt-get` or
something like it. If you haven't heard of it, it's basically a package manager
for command-line utilities like `wget`, `curl`, and `git`.

To update the list of all packages and their versions, run `sudo apt-get
update`. This doesn't actually install any new or upgraded software, it
essentially just updates the lists of potential upgrades.

To actually update all of the software, run `sudo apt-get upgrade`. Make sure
you run the previous command first, so that it actually gets the most recent
version.

## Other helpful commands

You'll want to make sure to shutdown and restart your raspberry pi safely when
the time comes. Otherwise, you could corrupt your data.

To shutdown safely, run `sudo shutdown -h now`.

To reboot safetly, run `sudo shutdown -r now`.

## Install Node

You can use `apt-get` to install node, but it install a really old version of it
(at the time of writing this post). There is a way to download the latest
version of node that is compatible with the software and hardware on your
raspberry pi. It's located here:
[node-arm.herokuapp.com](http://node-arm.herokuapp.com/). Per their
instructions, you can download the latest version using the following command:

```bash
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
```

Then to install it use this command:

```bash
sudo dpkg -i node_latest_armhf.deb
```

Now you can type `node -v` to check the version of node.

## Update npm and install node-gyp

The version of `npm` (Node's package manager) that comes with node is not the
latest version. There are often features built into the latest version that
aren't available in the one packaged with Node. There are probably bug fixes as
well. You can update `npm` using the following command:

```bash
sudo npm update npm -g
```

`node-gyp` is a module used to compile native addons to node modules. It's good
to get an updated version of this. I think I remember reading somewhere that
Raspbian isn't capable of compiling native modules, but I can't recall where.

To install the latest version, run:

```bash
sudo npm install node-gyp g
```

Another thing I like to do is remove the need to `sudo npm` everytime I need to
use `npm`. What you need to do is change the directory and file permissions of
a coupld directories: `/usr/local` and `~/.npm`. You could get more specific in
`/usr/local` to get to the `node_modules/` directory, but anything I install in
`/usr/local` is something I want my user to have access to anyway.

To change the ownership, run:

```bash
sudo chown -R pi /usr/local
mkdir ~/.npm
sudo chown -R pi ~/.npm
```

## Conclusion

Now you can start running node on your raspberry pi! I'm still looking at
modules to use the GPIO. There are a few, but its hard to know which would be
best. I'll cover that in a later post when I get a chance to investigate some
of them.
