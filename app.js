// You will almost certainly use these two in your callbacks
var _ = require('lodash');
var async = require('async');
var local = require('./data/local.js');
var site = require('apostrophe-site')({

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'apostrophe-sandbox',
  hostName: 'apostrophe-sandbox',
  title: 'Apostrophe Sandbox',
  sessionSecret: 'apostrophe sandbox demo party',
  adminPassword: 'demo',

  locals: {
    loginButton: true
  },

  lockups: {
    left: {
      label: 'Left',
      tooltip: 'Float Small',
      icon: 'icon-arrow-left',
      // Only allows one type of widget
      widgets: [ 'slideshow' ],
      // Override the options for slideshows when they are inside the lockup to get the size right
      slideshow: {
        size: 'one-third'
      },
      video: {
        size: 'one-half'
      }
    },
    right: {
      label: 'Right',
      tooltip: 'Float Right',
      icon: 'icon-arrow-right',
      widgets: [ 'slideshow', 'video' ],
      slideshow: {
        size: 'one-half'
      },
      video: {
        size: 'one-half'
      }
    }
  },

  // Here we define what page templates we have and what they will be called in the Page Types menu.

  // For html templates, the 'name' property refers to the filename in ./views/pages, e.g. 'default'
  // refers to '/views/pages/default.html'.

  // The name property can also refer to a module, in the case of 'blog', 'map', 'events', etc.

  pages: {
    types: [
      { name: 'default', label: 'Default (Two Column)' },
      { name: 'onecolumn', label: 'One Column' },
      { name: 'blocks', label: 'Blocks' },
      { name: 'marquee', label: 'Marquee' },
      { name: 'home', label: 'Home Page' },
      { name: 'blog', label: 'Blog' },
      { name: 'events', label: 'events' },
      { name: 'map', label: 'Map' },
      { name: 'groups', label: 'Directory' },
      { name: 'company', label: 'Company' }
    ]
  },

  // These are the modules we want to bring into the project.
  modules: {
    // Styles required by the new editor, must go FIRST
    'apostrophe-ui-2': {},
    'apostrophe-blog-2': {},
    'apostrophe-people': {
      email: {
        from: 'Tommy Boutell <tom@example.com>'
      }
    },
    'apostrophe-groups': {
      indexSchema: {
        addFields: [
          {
            type: 'select',
            label: 'Flavor',
            name: 'flavor',
            choices: [
              {
                label: 'One',
                value: 'one'
              },
              {
                label: 'Two',
                value: 'two'
              }
            ]
          }
        ]
      }
    },
    'apostrophe-map':      {},
    // The new editor
    'apostrophe-editor-2': {},
    'apostrophe-blocks': {
      types: [
        {
          name: 'one',
          label: 'One Column'
        },
        {
          name: 'two',
          label: 'Two Column'
        }
      ]
    },
    'apostrophe-events': {
      widget: true,
      groupFields: [
        {
          name: 'content',
          fields: [ 'body' ]
        },
        {
          name: 'details',
          fields: [ 'tags' ]
        }
      ]
    },
    'apostrophe-rss': {},
    'apostrophe-twitter': local.twitter,
  },

  // These are assets we want to push to the browser.
  // The scripts array contains the names of JS files in /public/js,
  // while stylesheets contains the names of LESS files in /public/css
  assets: {
    scripts: ['site'],
    stylesheets: ['site']
  },

  // beforeEndAssets: function(callback) {
  //   // Apostrophe already loads these for logged-out users, but we
  //   // want them all the time in this project.
  //   site.apos.pushAsset('script', { name: 'vendor/blueimp-iframe-transport', when: 'always' });
  //   site.apos.pushAsset('script', { name: 'vendor/blueimp-fileupload', when: 'always' });
  //   return callback(null);
  // }
});
