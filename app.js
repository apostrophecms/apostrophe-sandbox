// THIS IS NOT THE WAY TO MAKE A REGULAR WEBSITE WITH
// APOSTROPHE. This is just a special way we bootstrap a
// multisite environment for our demo. That requires
// a special proxy.
//
// So please, look at the docs and follow the simple instructions
// for spinning up a site with the CLI. A normal app.js
// is not complicated at all!

var _ = require('lodash');
var async = require('async');
var argv = require('boring')();
var mongo = require('mongodb');
var cuid = require('cuid');
var fs = require('fs-extra');
var httpProxy = require('http-proxy');
var proxy;
var express = require('express');
var app = express();
var domain = process.env.DOMAIN || 'apostrophecms.org';
var main = process.env.MAIN || 'demo.apostrophecms.org';
var mainHome = 'http://' + main + '/';
var db;
var sites;
var lowPort = parseInt(process.env.LOW_PORT || '4000');
var totalPorts = parseInt(process.env.TOTAL_PORTS || '50000');
var testIds = !!process.env.TEST_IDS;
var nextTestSiteId = 1;

// Middleware to proxy to the individual sites
app.use(function(req, res, next) {
  var site = req.get('Host');
  var matches = site.match(/^demo\-([^\.]+)\./);
  if (matches) {
    var id = matches[1];
    // TODO this should probably be in Redis for performance
    return sites.findOne({ _id: id }, function(err, site) {
      if (err) {
        console.error(err);
        return res.redirect(mainHome);
      }
      if (!site) {
        // Expired or invalid URL
        return res.redirect(mainHome);
      }
      var attempts = 0;
      function attempt() {
        return proxy.web(req, res, { target: 'http://127.0.0.1:' + site.port }, function(e) {
          if (e) {
            // Site not running right now — revive it
            return runSite(site, function(err) {
              if (err) {
                console.error(err);
                return fail();
              }
              attempts++;
              // No good reason this would go past 1 attempt, 
              // but let's be patient
              if (attempts === 3) {
                return fail();
              }
              return attempt();
              function fail() {
                // Can't resume this site
                return sites.remove({ _id: site._id }, function() {
                  return res.redirect(mainHome);
                });
              }
            });
          }
          // All is well
        });
      }
      return attempt();
    });
  }
  return next();
});

// A simple hack to send the user momentarily to a URL
// that is blocked by robots.txt, in hopes of mildly discouraging
// crazed webspiders from spinning up a billion demos

app.get('/', function(req, res) {
  return res.redirect('/spinup');
});

// Simply spins up a demo and redirects you there
// (TODO a progress display would be nice here)

app.get('/spinup', function(req, res) {
  var userAgent = req.headers['user-agent'] || '';
  if (userAgent.match(/baidu|mj12bot|googlebot|surdotlybot|bingbot|yandexbot|bingpreview|firefox\/40\.1/i)) {
    return res.status(403).send('no spiders please');
  }
  return newSite(function(err, site) {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred. We may have too many demos running just now. Sorry for the hassle.');
    }
    return res.redirect('http://demo-' + site._id + '.' + domain);
  });
});

return async.series([
  initDb,
  listenOrTask
], function(err) {
  console.error(err);
  process.exit(1);
});

function initDb(callback) {
  return async.series([
    connect,
    collection
  ], callback);
  function connect(callback) {
    return mongo.MongoClient.connect('mongodb://localhost:27017/demos', {
      autoReconnect: true,
      // retry forever
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    }, function(err, _db) {
      if (err) {
        return callback(err);
      }
      db = _db;
      return callback(null);
    });
  }
  function collection(callback) {
    // We use a mongo collection to track the sites so we can run the demo multicore and the proxy
    // will still always know where to send traffic, even if the demo in question belongs to
    // another process
    sites = db.collection('sites');
    return callback(null);
  }
}

function listenOrTask(callback) {

  if (argv._.length) {
    // An Apostrophe task. Create just one site to run it without race conditions, let it exit on its own.
    // This doesn't let us run tasks that are truly individual to the sites, but we don't need them
    // for the current demo
    return newSite(function(err, site) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      // The task will exit on its own
    });
  }

  proxy = httpProxy.createProxyServer({});

  return app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000, function(err) {
    if (err) {
      return callback(err);
    }
    console.log('Listening...');
    // Never invoke callback if listening
  });
}

function nextSiteId() {
  if (testIds) {
    var result = 'a' + nextTestSiteId;
    nextTestSiteId++;
    return result;
  }
  return cuid();
}

function newSite(callback) {
  var start = Date.now();
  var site = {
    _id: nextSiteId(),
    createdAt: new Date(),
  };
  return async.series([
    copyDatabase,
    hardlinkFiles,
    _.partial(runSite, site),
    insertSite
  ], function(err) {
    if (err) {
      return callback(err);
    }
    return callback(null, site);
  });
  
  function copyDatabase(callback) {
    // http://stackoverflow.com/questions/36403749/how-can-i-execute-db-copydatabase-through-nodejss-mongodb-native-driver
    var command = {
      copydb: 1, fromhost: 'localhost', fromdb: 'new-demo-master', todb: 'demo-' + site._id
    };
    var admin = db.admin();
    return admin.command(command, callback);
  }
  
  function hardlinkFiles(callback) {
    var files;
    fs.mkdirpSync(__dirname + '/public/uploads/' + site._id + '/attachments');
    fs.mkdirpSync(__dirname + '/data/temp/' + site._id + '/uploadfs');
    var base = __dirname + '/public/uploads/attachments';
    return async.series([
      readdir,
      link
    ], callback);
    function readdir(callback) {
      return fs.readdir(base, function(err, _files) {
        files = _files;
        return callback(err);
      });
    }
    function link(callback) {
      return async.eachLimit(files, 5, function(file, callback) {
        return fs.link(base + '/' + file, __dirname + '/public/uploads/' + site._id + '/attachments/' + file, callback);
      }, callback);
    }
  }
  
  function insertSite(callback) {
    return sites.insert(site, callback);
  }
}

function runSite(site, callback) {
  
  return attempt(callback);

  function attempt(callback) {

    // The available free-port-finder modules all have race conditions and
    // no provision for avoiding popular ports like 3000. -Tom

    var port = site.port || Math.floor(lowPort + Math.random() * totalPorts);
    site.port = port;
    var apos = require('apostrophe')({
      afterListen: function(err) {
        if (err) {
          // It's chill, try again until we get a free port.
          // Don't waste a mongodb connection.
          return apos.destroy && apos.destroy(function() {
            return attempt(callback);
          });
        }
        apos._id = site._id;
        return callback(null);
      },

      shortName: 'demo-' + site._id,
      title: 'Apostrophe Sandbox 2.x',
      demo: true,
      
      bundles: ['apostrophe-blog'],
      
      // These are the modules we want to bring into the project.
      modules: {
        'apostrophe-db': {
          db: db
        },
        'apostrophe-templates': { viewsFolderFallback: __dirname + '/views' },
        'apostrophe-express': {
          session: {
            secret: 'ksajhfkdsfha43fahif3a8asdfkyfsd7f'
          },
          forcePort: port
        },
        
        'apostrophe-attachments': {
          uploadfs: {
            uploadsPath: __dirname + '/public/uploads/' + site._id,
            uploadsUrl: '/uploads/' + site._id,
            tempPath: __dirname + '/data/temp/' + site._id + '/uploadfs'
          }
        },
        
        'apostrophe-assets': {
          minify: true
        },

        'apostrophe-blog': {},
        'apostrophe-blog-pages': {},
        'apostrophe-blog-widgets': {},
        'apostrophe-users': {},

        // Apostrophe Sandbox (as-) specific modules
        'as-helpers': {},
        'as-two-column-block-widgets': {},

        // REMOVE ME IMMEDIATELY if you are not running a public demo
        // that should let EVERYBODY be INSTANTLY loggged in AS ADMIN!
        'demo-autologin': {},
        
        'end-of-life': {
          sites: sites,
          db: db
        }
      }
    });
  }
}