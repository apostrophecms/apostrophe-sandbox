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
    
    // The most implicit schema config ever!

    // articles module

    'opinions': {
      name: 'opinion',
      extend: 'apostrophe-pieces',
      addFields: [
        {
          name: '_author',
          type: 'joinByOne'
        }
      ]
    },

    // authors module
    'authors': {
      name: 'author',
      extend: 'apostrophe-pieces',
      addFields: [
        {
          name: '_opinions',
          type: 'joinByOneReverse'
        },
        {
          name: '_comments',
          type: 'joinByOneReverse'
        },
        {
          name: '_commentsEdited',
          type: 'joinByOneReverse',
          withType: 'comment',
          reverseOf: '_editor'
        },
        {
          name: '_collabs',
          withType: 'collaboration',
          type: 'joinByArrayReverse'
        },
        {
          name: '_edited',
          withType: 'collaboration',
          type: 'joinByArrayReverse',
          reverseOf: '_editors'
        },
      ]
    },
    
    'comments': {
      name: 'comment',
      extend: 'apostrophe-pieces',
      addFields: [
        {
          name: '_author',
          type: 'joinByOne'
        },
        {
          name: '_editor',
          type: 'joinByOne',
          withType: 'author'
        }
      ]
    },
    
    'collaborations': {
      name: 'collaboration',
      extend: 'apostrophe-pieces',
      addFields: [
        {
          name: '_contributors',
          withType: 'author',
          type: 'joinByArray'
        },
        {
          name: '_editors',
          withType: 'author',
          type: 'joinByArray'
        },
      ]
    }

  }

});
