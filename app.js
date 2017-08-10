var apos = require('apostrophe')({
  shortName: 'apostrophesandbox',
  title: 'Apostrophe Sandbox 2.0.0',
  demo: true,
  baseUrl: 'http://localhost:3000',
  
  bundles: ['apostrophe-blog'],

  // These are the modules we want to bring into the project.
  modules: {
    
    'apostrophe-templates': { viewsFolderFallback: __dirname + '/views' },
    'apostrophe-express': {
      session: {
        secret: 'ksajhfkdsfha43fahif3a8asdfkyfsd7f'
      }
    },
    
    // Standard Apostrophe Modules
    'apostrophe-assets': {},
    'apostrophe-blog': {},
    'apostrophe-blog-pages': {},
    'apostrophe-blog-widgets': {},
    'apostrophe-users': {},

    // Apostrophe Sandbox (as-) specific modules
    'as-helpers': {},
    'as-two-column-block-widgets': {},

    // REMOVE ME IMMEDIATELY if you are not running a public demo
    // that should let EVERYBODY be INSTANTLY loggged in AS ADMIN!
    // 'demo-autologin': {},
    
    'apostrophe-passport': {
      // strategies are in data/local.js to keep keys out of git
      create: {
        group: {
          title: 'gitlab',
          permissions: [
            'admin'
          ]
        }
      }
    },
    'apostrophe-login': {
      // localLogin: false
    }

  }

});
