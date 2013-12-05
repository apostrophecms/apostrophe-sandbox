var site = require('apostrophe-site')({

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'apostrophe-sandbox',
  hostName: 'apostrophe-sandbox',
  title: 'Apostrophe Sandbox',
  sessionSecret: 'apostrophe sandbox demo party',
  adminPassword: 'demo',

  // For use with apostrophe-editor-2, ignored with the old editor

  lockups: {
    left: {
      label: 'Left',
      icon: 'left',
      // Only allows one type of widget
      widgets: [ 'slideshow' ],
      // Override the options for slideshows when they are inside the lockup to get the size right
      slideshow: {
        size: 'one-third'
      }
    },
    right: {
      label: 'Right',
      icon: 'right',
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
      { name: 'marquee', label: 'Marquee' },
      { name: 'home', label: 'Home Page' },
      { name: 'snippets', label: 'Snippets' },
      { name: 'blog', label: 'Blog' },
      { name: 'events', label: 'Events' },
      { name: 'map', label: 'Map' },
      { name: 'sections', label: 'Sections' },
      { name: 'stories', label: 'Stories' },
      { name: 'groups', label: 'Directory' }
    ]
  },

  // These are the modules we want to bring into the project.
  modules: {
    // Experimental styles required by the new editor, must go FIRST
    'apostrophe-ui-2': { },
    'apostrophe-snippets': { },
    'apostrophe-blog':     { },
    'apostrophe-events':     { },
    'apostrophe-map':      { },
    'apostrophe-sections': { },
    'apostrophe-people': { },
    'apostrophe-groups': { },
    'apostrophe-editor-2': { },
    'stories': {
      extend: 'apostrophe-snippets',
      name: 'stories',
      label: 'Stories',
      instance: 'story',
      instanceLabel: 'Story',
      addFields: [
        {
          name: 'year',
          type: 'integer',
          label: 'Year',
          def: '2013'
        },
        {
          name: '_authors',
          type: 'joinByArray',
          idsField: 'authorIds',
          withType: 'person',
          label: 'Authors',
          placeholder: 'Type author name here'
        }
      ]
    },
    'apostrophe-moderator': {
      types: {
        'event': {
          removeFields: [ 'thumbnail' ],
          addFields: [
            {
              name: 'body',
              label: 'Body',
              type: 'area',
              options: {
                textOnly: true
              }
            }
          ]
        }
      }
    }
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
