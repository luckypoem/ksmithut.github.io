---
title: MongodDB on Raspberry Pi
description: A walkthrough of how I got a recent version of MongoDB running on Raspberry Pi
tags:
- technology
- development
- tutorials
---

In my [last post](/2014/12/27/node-js-on-raspberry-pi/), I went over how I got a
recent version of NodeJS running on my Raspberry Pi (model b+ running Raspbian).
Since I got Node up and running, I wanted to get a database up and running as
well.

The first tutorials that I ran into involved building mongodb from source. I
tried it, but as they warned it took a lot of time. I started the first build
process before my wife and I went to go see the last Hobbit movie. When we came
back, it was still building, and stayed that way for another couple of hours.
There were all sorts of `swp method deprecated` warnings and such that I did not
care for seeing. It still worked, but it was a big pain.

Wanting a cleaner and faster install, I came across a [blog
post](https://emersonveenstra.net/mongodb-raspberry-pi/) that had a much simpler
solution, well, sort of. The blog post has you do a lot of stuff like moving
everything from your `/bin/`, `/lib/`, and `/includes/` directories into your
`/usr/{bin|lib|includes}` directory. Although I would be pretty comfortable
doing that, I wanted to avoid that step if possible. I actually came across this
article while I was in the 'build from source' search, but that step turned me
off.

In that article, he mentions that someone wrote a simple install script that
does everything for you. When I looked at the install script, it didn't appear
to do any of the `/bin/` copying. The repo is located here:
[github.com/svvitale/mongo4pi](https://github.com/svvitale/mongo4pi).
Here is what I ended up doing on my Raspberry Pi:

```bash
# from my user directory, clone the repo
git clone https://github.com/svvitale/mongo4pi.git
# move to the directory
cd mongo4pi
# run the install script
./install.sh
```

And thats it! Now mongodb is running, and will automatically start when your
Raspberry Pi boots.

One thing that is mentioned in the blog post is that you never want to unplug
your Raspberry Pi while mongodb is running because you will corrupt your
database and will have all sorts of problems. Everytime you're about to shutdown
your Raspberry Pi, just run `sudo service mongod stop`. Then you can run
`sudo shutdown -h now`.
