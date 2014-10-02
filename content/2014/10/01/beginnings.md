---
title: Beginnings
description: Starting a blog can be intimidating if you put too much thought into it.
template: post
collection: posts
date: 01 Oct 2014
category: personal
tags: writing
---

I can't tell you how many times I've started to write a post such as this one.
I fell into a habit of indecisiveness, and nothing was ever done about it. I had
my share of inspirational moments when I thought to myself, "I'm just going to
buckle down and get it done!" but alas, here I am, telling myself the same
thing.

It's not a lack of ability (I don't think), but rather a lack of deciding, or
perhaps a lack of settling. Working in a technology field, I wanted by blog to
be using the latest and greatest with all the bells and whistles. I wanted to
show off all the stuff that I knew how to do with databases, back-end
frameworks, and front-end frameworks. It became a nightmare of this `TODO` item
that would always have to be redone. So I finally got sick of it all, and
decided to keep it simple (relatively speaking).

Before I get too deep into my decision making process, I need to give you some
context to my decision.

## Introductions

Hi. My name is Keith. I am passionate about the web. I am a consumer of the web,
much like you, but I also **build** things for the web. I've been building
things ever since I can remember, although back then it was mostly with Legos.
When asked if I would ever consider going into leadership or leading a
development team, I often answer that I like to build things too much. That
isn't to say that a leader of a development team wouldn't build stuff, but I
like getting into the meat of the process and architecture of a project.

This is perhaps why I had such a hard time deciding on a technology to stick
with.

When I first started out in my career, I was pretty much only familiar with
vanilla PHP and jQuery. I wasn't going to roll out any custom blog platform
anytime soon with those skills. So I learned a little WordPress. I probably
knew enough to start a blog then, but I didn't want to become one of *those*
web developers. There's nothing wrong with WordPress developers, I just knew
a lot of developers like this:

![WordPress all the things](/images/posts/wordpress-all-the-things.png "WordPress All The Things!")

As an intern at a digital agency, I was tasked with learning Drupal. They gave
me a giant book that was the definitive guide to Drupal 7 development. I worked
on other little side projects while I was "learning" Drupal, but they were
preparing me for a larger project. If you've ever tried to learn Drupal before,
you've probably run into a situation like this:

![Drupal learning curve is steep](/images/posts/cms-drupal-learning-curve.jpg "Drupal Learning Curve")

I too ran into this love-hate relationship with Drupal. However, it was flexible
enough to accomodate most any need, plus a lot of the agency's web clients
specifically asked for Drupal, which is why they needed me to catch on quick.

Every project, I learned something new and great about Drupal. I was a convert.
Drupal just seemed like such a good fit for everything, why not my blog? Well,
I actually started doing it in Drupal, but then I found out that Drupal 8 was
coming out soon (which at the time of writing this, it still hadn't come out).
Any major version upgrade for most CMSs would require a very big restructuring
because modules/plugins aren't updated, or the core software now contains some
of the popular plugins with slightly different APIs. It was going to be a
nightmare trying to keep up.

I actually started the development of my blog with a pre-alpha version of
Drupal. But I got distracted by school, work, and family obligations, so there
it lived, until I finally deleted the folder that contained my work.

## Node.js

Right before I left work at that agency, I was getting pretty heavy into
[node](http://nodejs.org/). I instantly fell in love with it. This was a huge
turning point in my development career/hobby. I'll likely get more into that in
a different blog post though.

Long story short, from then until now, a lot of my free-time has been spent
developing and maintaining node modules. I know it's not the fasted platform,
but it's fast enough. I've actually never used it for any professional projects
yet, but it's used in most of my asset build processes.

I've done a ton of [grunt](http://gruntjs.com/) and a ton of
[gulp](http://gulpjs.com/), and a little of a few others. I'll rant more on
those at a later time, but it suffices to say that I'm using gulp right now for
most of my projects.

# Here and now

That's what brings me to now. I've decided to build a static site generator (or
rather a build process) to build my blog/portfolio website. I may change it in
the future, but for now, it seems like the best pick. It's all open source, and
you can view all of the source code
[here](https://github.com/ksmithut/ksmithut.github.io). You're welcome to fork
it, pull request, make your own site, whatever.

With static site generation, you have no back-end dependency, other than
an http server. Also, load times can be dramatically improved because you don't
have any back-end parsing or processing.

Another big bonus is that I can host it using github pages, which as long as
it's open source, it's free.

I've also considered using other static site generator type stuff like
[jekyll](http://jekyllrb.com/), [wintersmith](http://wintersmith.io/) or
[metalsmith](http://www.metalsmith.io/), but I decided against them. Jekyll
wasn't really my thing because ruby and I have a very complicated relationship.
I tried wintersmith and metalsmith, but metalsmith was still in it's early
stages and didn't have the asset pipeline I wanted and wintersmith had a bit of
a learning curve for me to get used to.

The process I'm using is custom, but it's using gulp. Take a look at my
repo and the gulpfile, and you'll see what I mean. I still hadn't completely
worked everything out in the build process at the time of writing this post, but
I knew that if I didn't start writing soon, this would become another abandoned
project.

The content is written in
[markdown](http://daringfireball.net/projects/markdown/syntax) with yaml
[front matter](http://assemble.io/docs/YAML-front-matter.html). I wrote a gulp
plugin to auto generate paginated 'archive', category, and tag listings. As the
project develops, I'm sure I'll add more to it.

Hopefully this is the beginning of something substantial when it comes to my
blogging.
