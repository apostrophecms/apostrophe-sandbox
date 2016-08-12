var apos = require('apostrophe')({
  shortName: 'apostrophe-sandbox-2-0-0',
  title: 'Apostrophe Sandbox 2.0.0',

  // These are the modules we want to bring into the project.
  modules: {
    // This configures the apostrophe-users module to add an admin-level
    // group by default
    'apostrophe-templates': { viewsFolderFallback: __dirname + '/views' },
    'apostrophe-users': {
      groups: [
        {
          title: 'guest',
          permissions: [ ]
        },
        {
          title: 'admin',
          permissions: [ 'admin' ]
        }
      ]
    },
    // This configures the apostrophe-assets module to push a 'site.less'
    // stylesheet by default
    'apostrophe-assets': {
      stylesheets: [
        {
          name: 'site'
        }
      ]
    }
    // Add your modules and their respective configuration here!
  }

});
