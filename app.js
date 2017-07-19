var apos = require('apostrophe')({
  shortName: 'apostrophe-workflow-client-sandbox',
  title: 'Apostrophe Sandbox 2.0.0',
  demo: true,
  
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
    'demo-autologin': {},

    'apostrophe-workflow': {
      prefixes: true,
      locales: [{
        name: 'default',
        private: true,
        children: [{
            name: 'na',
            private: true,
            children: [{
                name: 'ca',
                private: true,
                children: [{
                    name: 'ca-en'
                  },
                  {
                    name: 'ca-fr'
                  }
                ]
              },
              {
                name: 'us',
                private: true,
                children: [{
                    name: 'us-en'
                  },
                  {
                    name: 'us-sp'
                  }
                ]
              }
            ]
          },
          {
            name: 'uk',
            private: true,
            children: [{
              name: 'uk-en'
            }]
          }
        ]
      }],
      defaultLocale: 'default'
    }
  }

});
