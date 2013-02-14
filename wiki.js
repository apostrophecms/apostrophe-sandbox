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
  // Don't bother with viewEngine, we'll use apos.partial()

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
      { name: 'areas', index: { fields: { slug: 1 }, unique: true } }, 
      { name: 'pages', index: { fields: { slug: 1 }, unique: true } }, 
      'files'
    ],
  },  

  static: __dirname + '/public',

  uploadfs: {
    backend: 'local', 
    uploadsPath: __dirname + '/public/uploads',
    uploadsUrl: local.uploadsUrl,
    tempPath: __dirname + '/data/temp/uploadfs',
    // apos needs these sizes to exist with these names
    imageSizes: [
      {
        name: 'full',
        width: 1140,
        height: 1140
      },
      {
        name: 'two-thirds',
        width: 760,
        height: 760
      },
      {
        name: 'one-half',
        width: 570,
        height: 700
      },
      {
        name: 'one-third',
        width: 380,
        height: 700
      }
    ],
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
    files: appy.files,
    areas: appy.areas,
    pages: appy.pages,
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
    load: function(req, callback) {
      apos.getPage('global', function(err, result) {
        req.extraPages.global = result;
        return callback(err);
      });
    },
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

function fail(req, res) {
  res.statusCode = 500;
  res.send('500 error, URL was ' + req.url);
}

// Allow only the admin user to edit anything with Apos

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
