var apos = require('apostrophe')({
  shortName: 'workflowsandbox',
  title: 'Apostrophe Sandbox 2.0.0',
  demo: true,
  baseUrl: 'http://localhost:' + (process.env.PORT || 3000),
  
  // These are the modules we want to bring into the project.
  modules: {

    'apostrophe-site-map': {
      // array of doc types you do NOT want
      // to include, even though they are
      // accessible on the site. You can also
      // do this at the command line
      excludeTypes: [],
      perLocale: true
    },
  
    'apostrophe-templates': { viewsFolderFallback: __dirname + '/views' },
    'apostrophe-express': {
      session: {
        secret: 'ksajhfkdsfha43fahif3a8asdfkyfsd7f',
        cookie: {
          // domain: 'workflow.com'
        }
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
    
    'apostrophe-workflow': {
      alias: 'workflow',
      locales: [
        {
          name: 'default',
          label: 'Default',
          children: [
            {
              name: 'en',
              label: 'en'
            },
            {
              name: 'fr',
              label: 'fr'
            }
          ]
        },
      ],
      defaultLocale: 'default',
    },

    'apostrophe-review-and-deploy': {
      deployTo: [
        {
          name: '3001',
          baseUrl: 'http://localhost:3001',
          prefix: '',
          apikey: 'XYZ'
        },
        {
          name: '3002',
          baseUrl: 'http://localhost:3002',
          prefix: '',
          apikey: 'XYZ'
        }
      ],
      receiveFrom: {
        apikey: 'XYZ'
      }
    }
  }

});
