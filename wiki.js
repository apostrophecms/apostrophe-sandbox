var appy = require('appy');
var async = require('async');
var uploadfs = require('uploadfs')();
var fs = require('fs');
var apos = require('apostrophe')();
var app, db;
var pages;

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
    name: 'aposwiki',
    collections: [ 
      // Handy way to get appy to create mongodb collection objects for you,
      // see the appy docs
    ],
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
  pages = require('apostrophe-pages')({ apos: apos, app: app });
  return apos.init({
    db: db,
    app: app,
    uploadfs: uploadfs,
    permissions: aposPermissions,
    // Allows us to extend shared layouts
    partialPaths: [ __dirname + '/views/global' ]
  }, callback);
}

function setRoutes(callback) {
  // Other app-specific routes here.

  // LAST ROUTE: pages in the wiki. We want these at the root level.

  // pages.serve does all the work. Just supply callbacks for some things
  // we'd like to do in addition.

  app.get('*', pages.serve({
    templatePath: __dirname + '/views/pages',
    // Also load a shared page with things like a global footer in it
    load: [ 'global' ],
    // If a nonexistent page is requested, invent one, as Wikis do.
    // This overrides the normal "404 not found" response
    notfound: function(req, callback) {
      req.page = { areas: {} };
      return callback(null);      
    }
  }));

  return callback(null);
}

function listen(err) {
  if (err) {
    throw err;
  }
  console.log("Calling appy.listen");
  appy.listen();
}

// Allow only the admin user to edit anything with Apostrophe,
// let everyone view pages

function aposPermissions(req, action, fileOrSlug, callback) {
  if (req.user && (req.user.username === 'admin')) {
    // OK
    return callback(null);
  } else if (action === 'view-page') {
    return callback(null);
  } else {
    return callback('Forbidden');
  }
}
