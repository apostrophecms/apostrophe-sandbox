/* jshint node:true */
var watchify = require('watchify');
var fs = require('fs');

var site = require('apostrophe-site')({

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'apostrophe-sandbox',
  hostName: 'apostrophe-sandbox',
  title: 'Apostrophe Sandbox',
  sessionSecret: 'apostrophe sandbox demo party',
  adminPassword: 'demo',

  // Force a2 to prefix all of its URLs. It still
  // listens on its own port, but you can configure
  // your reverse proxy to send it traffic only
  // for URLs with this prefix. With this option
  // "/" becomes a 404, which is supposed to happen!

  // prefix: '/test',

  // If true, new tags can only be added by admins accessing
  // the tag editor modal via the admin bar. Sometimes useful
  // if your folksonomy has gotten completely out of hand
  lockTags: false,

  // Give users a chance to log in if they attempt to visit a page
  // which requires login
  secondChanceLogin: true,

  locals:  require('./lib/locals.js'),

  // you can define lockups for areas here
  // lockups: {},

  // Here we define what page templates we have and what they will be called in the Page Types menu.

  // For html templates, the 'name' property refers to the filename in ./views/pages, e.g. 'default'
  // refers to '/views/pages/default.html'.

  // The name property can also refer to a module, in the case of 'blog', 'map', 'events', etc.

  pages: {
    types: [
      { name: 'default', label: 'Default' },
      { name: 'home', label: 'Home Page' },
      { name: 'blog', label: 'Blog' },
      { name: 'events', label: 'Events' },
      { name: 'groups', label: 'Editors' }
    ]
  },

  // These are the modules we want to bring into the project.
  modules: {
    // Styles required by the new editor, must go FIRST
    'apostrophe-editor-2': {},
    'apostrophe-ui-2': {},
    'apostrophe-blog-2': {
      perPage: 5,
      pieces: {
        addFields: [
          {
            name: '_editor',
            type: 'joinByOne',
            withType: 'person',
            idField: 'editorId',
            label: 'Featured Editor'
          }
        ]
      }
    },
    'apostrophe-events': {
      addFields: [
        {
          name: '_location',
          type: 'joinByOne',
          withType: 'mapLocation',
          idField: 'locationId',
          label: 'Location'
        }
      ]
    },
    'apostrophe-people': {
      addFields: [
        {
          name: '_blogPosts',
          type: 'joinByOneReverse',
          withType: 'blogPost',
          idField: 'editorId',
          label: 'Features',
          withJoins: [ '_editor' ]
        }
      ]
    },
    'apostrophe-groups': {},
    'apostrophe-map':      {},

    'apostrophe-blocks': {
      types: [
      ]
    }
  },

  // These are assets we want to push to the browser.
  // The scripts array contains the names of JS files in /public/js,
  // while stylesheets contains the names of LESS files in /public/css
  assets: {
    stylesheets: ['site']
  },

  // ==================================================================
  //                       ASSETS (BROWSERIFY)
  // ==================================================================

  beforeEndAssets: function(callback) {
    // browserify time
    // make a new watchify (browserify) instance and set the base directory so
    // that require() statements resolve to local files (instead of node modules)
    var w = watchify({ 'opts.basedir': './public/js/modules/' });
    // add our master _site file
    w.add('./public/js/modules/_site.js');
    // create the bundled file

    function bundleAssets(cb) {
      w.bundle({}, function(err, output) {
        if(err) {
          console.error('There was an issue running browserify!');
          console.error(err);
          return callback(err);
        }

        // write our new file to the public/js folder
        fs.writeFile('./public/js/site-compiled.js', output, function (err) {
          if(err) {
            console.error('There was an error saving the freshly-bundled front end code.');
            console.error(err);
            return callback(err);
          }
          return cb(null);
        });
      });
    }

    w.on('update', function(ids) {
      process.stdout.write('detected a change in frontend assets. bundling...   ');
      bundleAssets(function() {
        console.log('finished bundling.'.red.bold);
      });
    });

    bundleAssets(callback);
  },

  afterInit: function(callback) {
    // We're going to do a special console log now that the
    // server has started. Are we in development or production?
    var locals = require('./data/local');
    if(locals.development || !locals.minify) {
      console.log('Apostrophe Sandbox is running in development.');
    } else {
      console.log('Apostrophe Sandbox is running in production.');
    }

    callback(null);
  }

});
