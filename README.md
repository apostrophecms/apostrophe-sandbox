# Jot Wiki

Jot Wiki is a simple demo app for [Jot](http://github.com/boutell/jot). 

## Installation

Run `npm install` to install the required dependencies.

## Configuration

Copy `local.example.js` to `data/local.js`. Edit the `uploadsUrl` setting if you will be configuring the site to respond somewhere other than `http://localhost:3000`. Note that this file should be excluded from your deployments so that your production server can have different settings. (There are other approaches to that problem of course, such as environment variables as popularly used on Heroku. If you don't like this strategy just edit `wiki.js`.)

## Launch

    node wiki.js

A stagecoach deployment recipe is also provided.

## Usage

Visit `http://localhost:3000` to feast your eyes on Jot Wiki.

The test username is `admin` and the test password is `demo`.

In addition to the home page, you can make other pages just by visiting them (edit the address bar and press enter).

A wiki is a good test program for Jot because it requires the infrastructure of any other CMS but doesn't need an elaborate system for managing page trees, which is an interesting but entirely separate problem.
