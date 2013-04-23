var appy = require('appy');
var async = require('async');
var uploadfs = require('uploadfs')();
var fs = require('fs');
var apos = require('apostrophe')();
var _ = require('underscore');
var app, db;
var pages;
var snippets;
var blog;
var map;

// Server-specific settings to be merged with options
// See local.example.js
var local = require('./data/local.js');

var options = {
  // Don't bother with viewEngine, we'll use apos.partial() if we want to
  // render anything directly

  auth: {
    strategy: 'local',
    options: {
      users: {
        admin: {
          username: 'admin',
          password: 'demo',
          id: 'admin'
        }
      }
    }
  },

  sessionSecret: 'whatever',

  db: {
    // host: 'localhost'
    // port: 27017,
    name: 'apostrophe-sandbox',
    collections: [
      // Handy way to get appy to create mongodb collection objects for you,
      // see the appy docs
    ]
  },

  // Supplies LESS middleware by default
  static: __dirname + '/public',

  // Where uploaded images go. This can be s3 or any other backend thanks to uploadfs.
  // Note you can't use the local backend with Heroku (Heroku does not have a persistent
  // writable filesystem)
  uploadfs: {
    backend: 'local',
    uploadsPath: __dirname + '/public/uploads',
    uploadsUrl: local.uploadsUrl,
    tempPath: __dirname + '/data/temp/uploadfs',
    // Register Apostrophe's standard image sizes. Notice you could
    // concatenate your own list of sizes if you had a need to
    imageSizes: apos.defaultImageSizes.concat([])
  },

  ready: function(appArg, dbArg)
  {
    app = appArg;
    db = dbArg;

    async.series([ createTemp, initUploadfs, initApos, setRoutes ], listen);
  }
};

appy.bootstrap(options);

function createTemp(callback) {
  if (!fs.existsSync(__dirname + '/data/temp')) {
    fs.mkdir(__dirname + '/data/temp', callback);
  } else {
    callback(null);
  }
}

function initUploadfs(callback) {
  uploadfs.init(options.uploadfs, callback);
}

function initApos(callback) {
  require('apostrophe-twitter')({ apos: apos, app: app });
  require('apostrophe-rss')({ apos: apos, app: app });

  async.series([initAposMain, initAposPages, initAposSnippets, initAposBlog, initAposMap, initAposAppAssets], callback);

  function initAposMain(callback) {
    return apos.init({
      db: db,
      app: app,
      uploadfs: uploadfs,
      permissions: aposPermissions,
      locals: local.locals,
      // Allows us to extend shared layouts
      partialPaths: [ __dirname + '/views/global' ],
      minify: local.minify
    }, callback);
  }

  function initAposPages(callback) {
    pages = require('apostrophe-pages')({ apos: apos, app: app, types: [
      { name: 'default', label: 'Default (Two Column)' },
      { name: 'onecolumn', label: 'One Column' },
      { name: 'home', label: 'Home Page' }
    ]}, callback);
  }

  function initAposSnippets(callback) {
    snippets = require('apostrophe-snippets')({ apos: apos, pages: pages, app: app }, callback);
  }

  function initAposBlog(callback) {
    blog = require('apostrophe-blog')({ apos: apos, pages: pages, app: app }, callback);
  }

  function initAposMap(callback) {
    map = require('apostrophe-map')({ apos: apos, pages: pages, app: app, dirs: [ __dirname+'/overrides/apostrophe-map' ] }, callback);
    // Start the background geocoder.
    //
    // NOTE: if you are using multiple processes and/or servers,
    // call this from only ONE to avoid exceeding Google's rate limits
    map.startGeocoder();
  }

  function initAposAppAssets(callback) {
    pushAsset('stylesheet', 'site');
    pushAsset('script', 'site');
    return callback();
    function pushAsset(type, name) {
      return apos.pushAsset(type, name, __dirname, '');
    }
  }
}

function setRoutes(callback) {
  // Other app-specific routes here.

  // LAST ROUTE: pages in the wiki. We want these at the root level.

  // pages.serve does all the work. Just supply callbacks for some things
  // we'd like to do in addition.

  app.get('*', pages.serve({
    templatePath: __dirname + '/views/pages',
    tabOptions: { depth: 2 },
    load: [
      // Load the global virtual page with things like the shared footer
      'global',
      snippets.loader,
      blog.loader,
      map.loader,
      pages.searchLoader
    ]
  }));

  return callback(null);
}

function listen(err) {
  if (err) {
    throw err;
  }
  // Command line tasks
  if (apos.startTask()) {
    // Chill and let the task run until it's done, don't try to listen or exit
    return;
  }
  appy.listen();
}

// Allow only the admin user to edit anything with Apostrophe,
// let everyone view anything

function aposPermissions(req, action, object, callback) {
  if (req.user && (req.user.username === 'admin')) {
    // OK
    return callback(null);
  } else if (action.match(/^view/)) {
    return callback(null);
  } else {
    return callback('Forbidden');
  }
}
