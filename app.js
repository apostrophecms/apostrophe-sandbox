var apos = require('apostrophe')({
  shortName: 'workflowsandbox',
  title: 'Apostrophe Sandbox 2.0.0',
  demo: true,
  
  bundles: ['apostrophe-blog'],

  // These are the modules we want to bring into the project.
  modules: {
  
    'apostrophe-templates': { viewsFolderFallback: __dirname + '/views' },
    'apostrophe-express': {
      session: {
        secret: 'ksajhfkdsfha43fahif3a8asdfkyfsd7f',
        cookie: {
          // domain: 'workflow.com'
        }
      }
    },

    // This is necessary because apostrophe-workflow isn't a theme yet,
    // fix that ASAP
    'apostrophe-docs': {
      trashInSchema: true
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
      alias: 'workflow',
      // prefixes: true,
      locales: [
        {
          name: 'default',
          private: true,
          children: [
            {
              name: 'eu',
              private: true,
              children: [
                {
                  name: 'fr',
                  label: 'France'
                },
                {
                  name: 'ch',
                  private: true,
                  children: [
                    {
                      name: 'ch-fr',
                      label: 'Swiss French'
                    },
                    {
                      name: 'ch-it',
                      label: 'Swiss Italian'
                    },
                    {
                      name: 'ch-de',
                      label: 'Swiss German'
                    },
                  ]
                }
              ]
            },
            {
              name: 'na',
              private: true,
              children: [
                {
                  name: 'us',
                  label: 'United States'
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
