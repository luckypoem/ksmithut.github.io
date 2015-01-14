---
title: From Mongoose to Sequelize
description: Why I decided that MongoDB isn't my go to database solution anymore.
tags:
- technology
- development
---

I might be jumping ahead of myself here, but I just had a really important
realization that is affecting my goto technology stack.

Up until recently, my default back-end tech stack was the following:

* Node.js (language/platform)
* MongoDB (database)
* Express.js (server framework)
* Mongoose (database ODM)

This worked very well for me for several years. Having Javascript on the
back-end, front-end, and database (sort-of) was amazing. It just felt right,
like the Holy Grail of web architecture. I didn't have to worry about setting
up a new database/collection through the REPL or anything. I just needed to pass
in my connection information to Mongoose.

Then I starting thinking, how well does this scale? I've heard of sharding and
stuff, but I've also heard that's it's complicated, and that if you don't set it
up right, [disastrous things can
happen](http://www.infoq.com/news/2010/10/4square_mongodb_outage). I believe
that I could scale MongoDB if I took the time to understand all of the planning
and configuration that needs to happen.

Another thing that I've run into a lot is that most applications deal with
relational data. Although mongoose has some cools ways to [deal with relational
data](http://learnboost.github.io/mongoose/docs/populate.html), it still has to
make additional queries to populate the references. But then there's
[TokuMX](http://www.tokutek.com/tokumx-for-mongodb/), which is supposed to be a
drop in replacement for MongoDB, but it supports ACID transactions (doing
multiple document transactions in one query, such as joins). But it looks as if
TokuMX [isn't going to be supported by the mongoose
team](https://github.com/LearnBoost/mongoose/issues/2565), so you won't be able
to take advantage of the ACID queries.

Mongoose has been awesome to work with, for the most part. There just a couple
inconsistencies that I can't get over.

1. **Validators and middleware don't always get called.** In their
[documentation](http://learnboost.github.io/mongoose/docs/api.html#model_Model.update)
for `Model.update()` towards the bottom, it reads:

  > Although values are casted to their appropriate types when using update, the
  > following are not applied:
  >
  > * defaults
  > * setters
  > * validators
  > * middleware
  >
  > If you need those features, use the traditional approach of first retrieving
  > the document.

  That's unacceptable to me. When I define middleware, I want it to be called
  every time something happens.

1. **Promises are returned...but not always, and sometimes you need `.exec`.** I
get that trying to appease the callback crowd and the Promise crowd can be quite
a difficult thing to do, but please make up your mind.

  ```javascript
  // Use .exec() if using query chain and if you want to return a Promise
  User.findOne({username: 'username'}, function (err, user) {});
  User.findOne({username: 'username'}).exec(function (err, user) {});
  User.findOne({username: 'username'}).exec().then(function (user) {}, function (err) {});

  // When using .create() it just returns a Promise
  User.create({username: 'username'}, function (err, user) {});
  User.create({username: 'username'}).then(function (user) {}, function (err) {});

  // No Promise for .save()
  var user = new User({username: 'username'});
  user.save(function (err, user) {});
  ```

  The other thing with their promises is that they rolled their own version.
  It's compatible for the most part, it just doesn't utilize `.catch()`. You
  just need to pass in a second method in your last `.then()`. That seems to
  work with the [bluebird](https://www.npmjs.com/package/bluebird) Promise
  implementation

1. **Built in validation is minimal.** Every time I make a user model with
mongoose that requires an email, I facepalm when I remember that mongoose
doesn't do that, so I have to get another validation library. I'm all for
modularity, but it sure would be nice if they handled the modularity so I didn't
have to.

Every time I work with Mongoose, I'm happy for the most part, but those three
points cause me to vomit a little bit, every time.

## Moving on to SQL

So I decided to go back to my roots in SQL-like libraries.
[sequelize](https://github.com/sequelize/sequelize) seemed to be a popular one,
but I was afraid of code bloat because of how many different databases it
supported.

Then I started using it, and I was amazed. I still got a lot of the nice schema
declaration sugar that I liked with middleware (hooks) and instance/class
method declaration.

And the greatest part is, that everything is Promise based. And even better, it
uses my preferred Promise library, bluebird. No more Promise workarounds to get
mongoose to do what I want.

The part that I'm not a super huge fan of is having a database that has a strict
schema. Migrations will take a bit more time, but sequelize even has migration
tools which make creating database migrations much easier. I haven't done much
with it yet, but at least I know it's been planned for.

## Conclusion

MongoDB still has its place in my heart. It's super easy to get up and running,
and to keep your database schema in the code. My issue is more with the tooling
that goes around it. Mongoose is arguably the de facto ODM for MongoDB, but it
still has some quirks that make it difficult to work with. Sequelize, however,
has been a pleasure to work with. I ran into an issue this morning with one of
their release candidates, but I was able to submit an issue, submit a pull
request, and get it merged all within an hour.
