# Apostrophe Wiki

Apostrophe Wiki is a simple demo app for [Apostrophe](http://github.com/punkave/apostrophe). 

## This is an early alpha quality version of Apostrophe 2, for node.js developers. Most frontend design work has not happened yet. Page trees, blogs events, etc. are not part of Apostrophe 2 yet. See [Apostrophe 1.5](http://apostrophenow.org) for the current stable and mature release of Apostrophe for PHP and Symfony.

## Installation

Run `npm install` to install the required dependencies.

In addition you must have:

node, of course
mongodb, on your local machine (or edit wiki.js to point somewhere else)
imagemagick, to resize uploaded images (specifically the `convert` command line tool)

Mac developers can install imagemagick via MacPorts. Your production server will need it too; it's probably a simple `apt-get install` or `yum` command away. Heroku includes imagemagick as standard equipment.

## Configuration

Copy `local.example.js` to `data/local.js`. Edit the `uploadsUrl` setting if you will be configuring the site to respond somewhere other than `http://localhost:3000`. Note that this file should be excluded from your deployments so that your production server can have different settings. (There are other approaches to that problem of course, such as environment variables as popularly used on Heroku. If you don't like this strategy just edit `wiki.js`.)

## Launch

    node wiki.js

A stagecoach deployment recipe is also provided.

## Usage

Visit `http://localhost:3000` to feast your eyes on Apostrophe Wiki.

The test username is `admin` and the test password is `demo`.

In addition to the home page, you can make other pages just by visiting them (edit the address bar and press enter).

A wiki is a good test program for Apostrophe because it requires the infrastructure of any other CMS but doesn't need an elaborate system for managing page trees, which is an interesting but entirely separate problem.

## Creating Your Own Apostrophe Project: The Easy Way

You can easily create your own open source or private Apostrophe project using apostrophe-wiki as a starting point. Here's how I do it:

1. Go to github.com and create a new, empty repository called `myproject`, or whatever suits you. Do not add any files to it yet.
2. Clone the `apostrophe-wiki` repository to your computer, naming the resulting folder `myproject` (just for example):
    
        git clone git@github.com:punkave/apostrophe-wiki.git myproject

3. `cd` to that folder and edit the `.git/config` file. Change the `remote "origin"` URL setting to your new repository's URL as found on github:
    
        url = git@github.com:myaccount/myproject.git

4. Edit the `package.json` file to reflect your project a little better. This is less important for node apps than it is for reusable modules, but you may as well be thorough. Make sure you keep the `dependencies` section.
 
5. Commit your changes to `package.json`:
    
        git add -A .
        git commit

6. Push your work to github:
    
        git push origin master
    
Boom! You're done. You now have your own Apostrophe project in github, based on `apostrophe-wiki` as a starting point.

(Note that you don't actually have to use github for this technique to work. You can do exactly the same thing with Beanstalk and other git hosting providers.)

## Keep An Eye Out For Updates

Apostrophe 2 is changing fast at this early stage. The `npm update` command will install new minor versions of the Apostrophe modules, but you will want to follow our repositories on github to keep up with the latest. At some point we'll release versions with different major or middle version numbers and you won't get those with `npm update` unless you edit `package.json` (and generally for good reason, if you're not prepared to make code changes).
