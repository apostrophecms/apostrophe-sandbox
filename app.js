var appy = require('appy');
var async = require('async');
var uploadfs = require('uploadfs')();
var fs = require('fs');
var apos = require('apostrophe')();
var app, db;
var pages;
var blog;

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
    console.log('ready');
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

  async.series([initAposMain, initAposPages, initAposBlog], callback);

  function initAposMain(callback) {
    return apos.init({
      db: db,
      app: app,
      uploadfs: uploadfs,
      permissions: aposPermissions,
      // Allows us to extend shared layouts
      partialPaths: [ __dirname + '/views/global' ]
    }, callback);
  }

  function initAposPages(callback) {
    pages = require('apostrophe-pages')({ apos: apos, app: app, types: [
      { name: 'default', label: 'Default (Two Column)' },
      { name: 'home', label: 'Home Page' },
      { name: 'onecolumn', label: 'One Column' },
    ]}, callback);
  }

  function initAposBlog(callback) {
    // Tells the pages module all about the blog group
    blog = require('apostrophe-blog')({ apos: apos, pages: pages, app: app }, callback);
    // Now we can add a type that uses the blog group
    pages.addType({
      name: 'blog',
      label: 'Blog',
      group: 'blog'
    });
  }
}

function setRoutes(callback) {
  // Other app-specific routes here.

  app.get('/api/blog-listing', function(req, res) {
    blog.getPosts(req, req.query, function(err, posts) {
      res.send(apos.partial('blogListing.html', { posts: posts, pageUrl: req.query.pageUrl }, __dirname + '/views/refresh'));
    });
  });

  // LAST ROUTE: pages in the wiki. We want these at the root level.

  // pages.serve does all the work. Just supply callbacks for some things
  // we'd like to do in addition.

  app.get('*', pages.serve({
    templatePath: __dirname + '/views/pages',
    load: [
      // Load the global virtual page with things like the shared footer
      'global',

      // Load descendants of the home page (tabs). TODO: refactor this into the
      // pages module, but it's cool to show how it's done. Make sure we use
      // req.bestPage as there may be only a partial match which the blog
      // load function later decides is valid

      function(req, callback) {
        if (!req.bestPage) {
          return callback(null);
        }
        pages.getDescendants(req.bestPage.ancestors[0] ? req.bestPage.ancestors[0] : req.bestPage, { depth: 1 }, function(err, pages) {
          req.extras.tabs = pages;
          return callback(err);
        });
      },

      blog.loader
    ]
  }));

  return callback(null);
}

function listen(err) {
  if (err) {
    throw err;
  }
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
