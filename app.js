var apos = require('apostrophe')({
  shortName: 'apostrophe-sandbox-2-0-0',
  title: 'Apostrophe Sandbox 2.0.0',

  // These are the modules we want to bring into the project.
  modules: {
    
    'apostrophe-templates': { viewsFolderFallback: __dirname + '/views' },
    
    // This configures the apostrophe-users module to add an admin-level
    // group by default
    'apostrophe-users': {},
    
    // This configures the apostrophe-assets module to push a 'site.less'
    // stylesheet by default
    'apostrophe-assets': {}
    
    // Add your modules and their respective configuration here!
  }

});
