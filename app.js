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

    // For example: we're using the "apostrophe-events" module
    // and we'll want submissions of events. "apostrophe-events"
    // extends apostrophe-pieces
    'apostrophe-events': {
      // Let's add an attachment field so the user can upload an image
      addFields: [
        {
          name: 'image',
          type: 'attachment',
          group: 'images',
          required: true
        }
      ]
    },
    // ** The name you give this module is significant. **
    // It should begin with the name of the pieces module you want
    // to add the submissions feature to, and end with -submit-widgets
    'apostrophe-events-submit-widgets': {
      // Your module extends this one, and adds capabilities
      // to your pieces module
      extend: 'apostrophe-pieces-submit-widgets',
      // Always spell out the schema field names the user is allowed to edit.
      // You almost certainly don't want them to have control
      // of the "published" field, for instance
      fields: [ 'title', 'body', 'image', 'startDate', 'endDate' ]
    },
    // Optional: if you want to let the public attach files.
    // See the `addFields` call above
    'apostrophe-permissions': {
      construct: function(self, options) {
        self.addPublic('edit-attachment');
      }
    }
  }

});
