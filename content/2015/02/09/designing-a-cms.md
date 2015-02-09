---
title: Designing a CMS
description: The process that I've gone through when looking into designing a CMS.
tags:
- technology
- development
---

A Content Management System (CMS) is a system built to help non-technical users
manage a website. More often than not, you'll need someone technical to help you
get started, but there are CMSs that are simple enough that even non-technical
users can get it set up.

That being said, you should really ask yourself, "Should I build or design a new
CMS?" Probably not. I've used and developed for a good portion of popular CMSs,
and most of them should take care of most business needs. And if they don't,
they're usually flexible enough to accomodate individual needs.

If you're thinking about designing and building a new CMS because you think your
idea is better than what's already out there, then more power to you. I've dug
into the internals of several CMSs, and its not something I'd like to build from
scratch. That being said, I don't want to discourage anyone from creating the
next best CMS.

## Problem

Scalability. This can sometimes be the determining factor of whether or not you
use a certain technology. I once worked on a project where we were converting a
website that was built up of 8000+ static HTML pages (no templates, or anything.
just straight up HTML). It was a nightmare to manage. We had to teach all of our
content editors how to use git, pull requests, and all that. To their credit,
they picked it up pretty well. We needed to convert it to something a bit more
manageable for the content editors, and something that the developers didn't
have to keep their eyes on all the time. Although choosing a CMS over static
files was a clear choice for us and the content editors, our systems admin loved
not having to manage a database. Although it is possible to scale databases, it
requires either constant monitoring, or a monitoring service to make sure
fallbacks work correctly.

I completely understand his point of view. Having static files was super easy
to scale. When we were expecting more traffic than usual, we would just spin up
another server and add it to the load balancer. Deploys were easy because we
didn't need to worry about database migrations. Mind you, it took a while
because it was trying to copy thousands of files rather than just the templates
and such.

## Solution

The solution to this problem has already been solved to a degree. Static Site
Generators puts the "database layer" or content layer into files rather than a
database. You have a file with some metadata on top, basically saying which
layout to use and such. Then you have the content of the page that gets inserted
into your templates. It does require an extra build step, and usually those
types of sites are managed by developers.

What I would like to see (and maybe there is already something like this) is a
WordPress/Drupal like interface built around a static site generator. The
backend interacts with the filesystem instead of the database when dealing with
configuration and content. It runs the build steps for you, and maybe even
interact with git.

This idea does create some limitations. For example, you could not build a web
application that stores state, at least not effectively. Databases are built for
a reason, and they can be much more efficient at reading and writing temporary
data than a file system. But for the most part, people aren't building
complicated web apps with WordPress.

## Complications

Static Site Generators are appealing because they get rid of a lot of the cruft
that CMSs have when you have to worry about plugin registration, authentication,
and configuration. That's where designing something like this might take quite
a while.

## Things to keep in mind

I fully understand that building a CMS from scratch is usually not a very cost
effective thing to do. I would like to try and build this, though, for the
learning experience and to see where it could go.

I have also never built a full CMS. I feel like I understand Drupal and
WordPress enough to where I might be able to reimplement their plugin and theme
registration stuff, though.

Currently, I've been doing a lot of stuff in Node.js. Although it might not be
the best platform to solve this sort of problem, it's one that I'm productive
in.

## Requirements

Over the next few blog posts, I'll go over some of the challenges and solutions
that I've found when designing this beast. For the rest of this post, I'll just
jot down some of my thoughts of what the requirements for this thing should be.

1. Content should be editable through a web interface. In-place editing would
be nice to have.

2. It must have a flexible plugin system as well as plugin standards.

3. It must be easy to configure and clear where you must configure things.

4. It must have optimization options, such as concatenating and minifying
stylesheets and scripts.

5. It must have a clear and easy to use theming system. Clear separation of
style/layout and functionality is a must. WordPress developers are
[trying to sort things out](http://wptavern.com/why-wordpress-theme-developers-are-moving-functionality-into-plugins)
but it has been a problem for a while where single themes have tons of
functionality built into them. The problem occurs when they want to change
themes and much of their site it dependent on the functionality that their
theme requires.

6. Easy to setup for non-technical users. No database setup.

7. It should have a clear process on how to deploy. Maybe building in some sort
of git workflow would be nice to have, and providing instructions on how to use
github hooks.

Those are just some of the top-level things I would like to see. Hopefully I can
take a more in-depth look into each of these, and perhaps start implementing
them.
