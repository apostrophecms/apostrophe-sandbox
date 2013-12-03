# Apostrophe Sandbox

Apostrophe Sandbox aims to be a complete starting point for developing content-managed websites with [Apostrophe](http://github.com/punkave/apostrophe).

## Current Stability: Beta

Apostrophe 2 is our new implementation of Apostrophe for [node.js](http://nodejs.org/). Apostrophe 2 is in production use on some of our client sites, however the APIs are not frozen yet as we continue to refactor and improve the code. Not all modules have matured yet, and some modules we've released don't yet have representative stylesheets and templates in the sandbox. Apostrophe 2 should be considered beta quality at this point. See [Apostrophe 1.5](http://apostrophenow.org) for the current stable and mature release of Apostrophe for PHP and Symfony.

## Installation

We've been using Homebrew to install the Apostrophe dev environment. Here's a how to on installing the bare minimum: [Homebrew Apostrophe Install](https://gist.github.com/kylestetz/7771127)

Run `npm install` to install the required dependencies.

If you're not using Homebrew or you already have a dev environment, just make sure you have:

* [node](http://nodejs.org/), of course. You must have at least version `0.10`
* [mongodb](http://www.mongodb.org/) **version 2.2 or better**, on your local machine (or point to another database server)
* imagemagick, to resize uploaded images (specifically the `convert` and `identify` command line tools)

Mac developers can install imagemagick via Homebrew or MacPorts. Your production server will need it too; it's probably a simple `apt-get install` or `yum` command away. Heroku includes imagemagick as standard equipment.

## Configuration

Create a `data` folder (this is ignored by git). Copy `local.example.js` to `data/local.js`.  Note that this file should be excluded from your deployments so that your production server can have different settings. (There are other approaches to that problem of course, such as environment variables as popularly used on Heroku. We plan to migrate to a strategy that is more Heroku-friendly. You can do so yourself very easily by editing `app.js`.)

## Database Bootstrap

You'll need a homepage in your database in order to get started. Just run:

    node app.js apostrophe:reset

This will drop any existing content from your database and insert a valid home page so that you have a starting point for edits.

**You should only run that command once,** since it deletes your existing content.

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

## Editing Existing Page Templates ##

Apostrophe's page templates are in the `views` subdirectory. These templates are written with [nunjucks](http://nunjucks.jlongster.com/), a template language based on the popular [jinja2](http://jinja.pocoo.org/docs/)] from the Python world, which also has a well-known port called [Twig](http://twig.sensiolabs.org/) in the PHP world. See the [jinja documentation](http://jinja.pocoo.org/docs/) for complete information about the template syntax. It's pretty simple.

## Creating New Page Templates ##

Apostrophe offers a choice of page templates to the user when adding a page via the "Pages" menu. Adding a new one is straightforward. Just copy the `default.html` template in the `views` folder. Let's assume you call your template `myPage.html`.

Next edit `app.js`. This file consists mostly of options to be passed to `apostrophe-site`, a convenient way of configuring an Apostrophe-powered website. Look for the `pages` option, and the `types` option nested within that:

    pages: {
      types: [
        { name: 'default', label: 'Default (Two Column)' },
        { name: 'onecolumn', label: 'One Column' },
        { name: 'marquee', label: 'Marquee' },
        { name: 'home', label: 'Home Page' },
        { name: 'blog', label: 'Blog' },
        { name: 'map', label: 'Map' },
        { name: 'sections', label: 'Sections' }
      ]
    },

You can add a new entry:

    pages: {
      types: [
        { name: 'default', label: 'Default (Two Column)' },
        { name: 'onecolumn', label: 'One Column' },
        { name: 'marquee', label: 'Marquee' },
        { name: 'home', label: 'Home Page' },
        { name: 'blog', label: 'Blog' },
        { name: 'map', label: 'Map' },
        { name: 'sections', label: 'Sections' },
        { name: 'myPage', label: 'My Page' }
      ]
    },

Now restart the app. Since each node app is its own webserver, you'll need to get used to that. Tools like `nodemon` and `always` are useful for automatically restarting apps. Just keep in mind that they only pay attention to changes in server-side `.js` files.

## Advanced Configuration ##

Check out the [apostrophe-site module documentation](http://github.com/punkave/apostrophe-site) for more information about other configuration options for your site, including adding additional Apostrophe modules like the blog, the events module and more.

For more advanced information about page types, including how to write page loader functions on the server side that summon custom data and create experiences like our blog and map pages, see the [apostrophe-pages module documentation](http://github.com/punkave/apostrophe-pages). If your needs are similar to our [apostrophe-blog](http://github.com/punkave/apostrophe-blog) or [apostrophe-map](http://github.com/punkave/apostrophe-map) modules, check out the [apostrophe-snippets](http://github.com/punkave/apostrophe-snippets) module to see how we've created a foundation for those modules that minimizes the amount of unique code needed in each one.

## Adding Apostrophe Content Areas to Pages ##

You'll notice that the various pages contain editable content areas. There are two basic types: regular areas and singletons. A regular area displays a rich text editor with buttons to insert some or all of Apostrophe's widgets, such as slideshows, videos, snippets and blog posts. A singleton displays just one widget of a fixed type at that particular point in the page.

Here's an example of template code to insert a named area that lives in the current page:

    {{ aposArea(page, 'content1') }}

The `page` object is made available to your page templates by Apostrophe. The name `content1 indicates that we are addressing a particular named content area within the page.

For more advanced documentation, including how to add singletons or limit the controls displayed in an area, see the [apostrophe module documentation](http://github.com/punkave/apostrophe).

## Keep An Eye Out For Updates

Apostrophe 2 is changing fast at this early stage. The `npm update` command will install new minor versions of the Apostrophe modules, but you will want to follow our repositories on github to keep up with the latest. At some point we'll release versions with different major or middle version numbers and you won't get those with `npm update` unless you edit `package.json` (and generally for good reason, if you're not prepared to make code changes).

## More Modules, More Documentation

See [apostrophe](http://github.com/punkave/apostrophe),
[apostrophe-site](http://github.com/punkave/apostrophe-site),
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

[P'unk Avenue](http://punkave.com)

