var apos = require('apostrophe')({
  shortName: 'apostrophesandbox',
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
      locales: [
        {
          name: 'default',
          children: [
            {
              name: 'eu',
              children: [
                {
                  name: 'fr'
                },
                {
                  name: 'ch',
                  children: [
                    {
                      name: 'ch-fr'
                    },
                    {
                      name: 'ch-it'
                    },
                    {
                      name: 'ch-de'
                    },
                  ]
                }
              ]
            },
            {
              name: 'na',
              children: [
                {
                  name: 'us'
                }
              ]
            }
          ]
        }
      ],
      defaultLocale: 'default'
    }
  }

});
