# Apostrophe Sandbox

Apostrophe Sandbox aims to be a complete starting point for developing content-managed websites with [Apostrophe](http://github.com/punkave/apostrophe).

## Current Stability: Beta

Apostrophe 2 is our new implementation of Apostrophe for [node.js](http://nodejs.org/). Apostrophe 2 is in production use on some of our client sites, however the APIs are not frozen yet as we continue to refactor and improve the code. Not all modules have matured yet, and some modules we've released don't yet have representative stylesheets and templates in the sandbox. Apostrophe 2 should be considered beta quality at this point. See [Apostrophe 1.5](http://apostrophenow.org) for the current stable and mature release of Apostrophe for PHP and Symfony.

## Installation

Run `npm install` to install the required dependencies.

In addition you must have:

* [node](http://nodejs.org/), of course. You must have at least version `0.10`
* [mongodb](http://www.mongodb.org/), on your local machine (or point to another database server)
* imagemagick, to resize uploaded images (specifically the `convert` command line tool)

Mac developers can install imagemagick via MacPorts. Your production server will need it too; it's probably a simple `apt-get install` or `yum` command away. Heroku includes imagemagick as standard equipment. MacPorts is also a great option for installing node and mongodb.

## Configuration

Create a `data` folder (this is ignored by git). Copy `local.example.js` to `data/local.js`.  Note that this file should be excluded from your deployments so that your production server can have different settings. (There are other approaches to that problem of course, such as environment variables as popularly used on Heroku. We plan to migrate to a strategy that is more Heroku-friendly. You can do so yourself very easily by editing `app.js`.)

## Database Bootstrap

You'll need a homepage in your database in order to get started. Just run:

    sh reset-db.sh

This will create (or recreate) the apostrophe-sandbox database in your local mongodb database and insert a valid home page so that you have a starting point for edits. Take a peek at this one-line script if you're curious about what a valid home page looks like in MongoDB.

## If You Are Working Offline

If you are developing offline, edit `data/local.js` and switch `offline: false` to `offline: true`. This will make sure the sandbox doesn't try to load Google Fonts or the Google Maps API. Of course those features will not work until you remove this option.

## Launch

    node app.js

A [stagecoach](https://github.com/punkave/stagecoach) deployment recipe is also provided.

## Usage

Visit `http://localhost:3000` to feast your eyes on the sandbox site.

*To log in, visit: `http://localhost:3000/login`* or use the provided login button. *You can get rid of the login button and Apostrophe admin bar* for logged-out users by setting `loginButton: false` in `data/locals.js`.

The test username is `admin` and the test password is `demo`.

You can create and remove pages in addition to editing their content and managing blog articles, people and snippets.

## Creating Your Own Apostrophe Project: The Easy Way

You can easily create your own open source or private Apostrophe project using apostrophe-sandbox as a starting point. Here's how we do it:

1. Go to github.com and create a new, empty repository called `myproject`, or whatever suits you. Do not add any files to it yet. If you want a private, non-open-source project, make sure you select that option.
2. Clone the `apostrophe-sandbox` repository to your computer, naming the resulting folder `myproject` (just for example):
    
        git clone git@github.com:punkave/apostrophe-sandbox.git myproject

3. `cd` to that folder and edit the `.git/config` file. Change the `remote "origin"` URL setting to your new repository's URL as found on github:
    
        url = git@github.com:myaccount/myproject.git

4. Edit the `package.json` file to reflect your project a little better. This is less important for node apps than it is for reusable modules, but you may as well be thorough. Make sure you keep the `dependencies` section.
 
5. Commit your changes to `package.json`:
    
        git add -A .
        git commit

6. Push your work to github:
    
        git push origin master
    
Boom! You're done. You now have your own Apostrophe project in github, based on `apostrophe-sandbox` as a starting point.

(Note that you don't actually have to use github for this technique to work. You can do exactly the same thing with Beanstalk and other git hosting providers.)

## Hiding the Login Prompt ##

The sandbox displays the "apostrophe bar" and the login button at all times. You can undo that by changing `loginButton: true` to `loginButton: false` in local.js. Then you can make your own links to `/login` or just tell appropriate users about that URL as needed.

## Keep An Eye Out For Updates

Apostrophe 2 is changing fast at this early stage. The `npm update` command will install new minor versions of the Apostrophe modules, but you will want to follow our repositories on github to keep up with the latest. At some point we'll release versions with different major or middle version numbers and you won't get those with `npm update` unless you edit `package.json` (and generally for good reason, if you're not prepared to make code changes).

## More Modules, More Documentation

See [apostrophe](http://github.com/punkave/apostrophe),
[apostrophe-pages](http://github.com/punkave/apostrophe-pages),
[apostrophe-snippets](http://github.com/punkave/apostrophe-snippets),
[apostrophe-blog](http://github.com/punkave/apostrophe-blog),
[apostrophe-events](http://github.com/punkave/apostrophe-events),
[apostrophe-people](http://github.com/punkave/apostrophe-people),
[apostrophe-rss](http://github.com/punkave/apostrophe-rss) and
[apostrophe-twitter](http://github.com/punkave/apostrophe-twitter).

Also browse the [`apostrophe` tag on npm](https://npmjs.org/browse/keyword/apostrophe).

## Community

You should join the [apostrophenow Google Group](https://groups.google.com/forum/?fromgroups#!forum/apostrophenow) for discussion of both Apostrophe 1.5 and Apostrophe 2.

## Thanks for using Apostrophe!

(http://punkave.com)[P'unk Avenue]

