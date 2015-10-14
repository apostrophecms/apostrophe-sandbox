// Find stray console.log calls
// console.log = function(s) {
//   console.trace(s);
// }

var _ = require('lodash');

var apos = require('apostrophe')({
  shortName: 'sandbox',
  hostName: 'sandbox',

  modules: {
    'link-widgets': {},
    'apostrophe-express': {
      middleware: []
    },
    'grommets': {
      alias: 'grommets',
      extend: 'apostrophe-pieces',
      name: 'grommet',
      label: 'Grommet',
      pluralLabel: 'Grommets',
      addFields: [
        {
          type: 'string',
          name: 'inventor',
          label: 'Inventor'
        },
        {
          type: 'area',
          name: 'body',
          label: 'Description',
          options: {
            widgets: {
              'link': {},
              'apostrophe-rich-text': {
                toolbar: [ 'Bold', 'Italic', 'Link', 'Anchor', 'Unlink' ]
              }
            }
          }
        },
        {
          type: 'array',
          name: 'addresses',
          label: 'Addresses',
          schema: [
            {
              name: 'address',
              type: 'string',
              label: 'Address'
            }
          ]
        }
      ]
    },
    events: {
      extend: 'apostrophe-pieces',
      name: 'event',
      label: 'Event',
      alias: 'events',
      addFields: [
        {
          type: 'attachment',
          name: 'attachment',
          label: 'Attachment'
        },
        {
          type: 'tags',
          name: 'tags',
          label: 'Tags'
        }
      ]
    },
    'events-widgets': {
      extend: 'apostrophe-pieces-widgets',
    },
    'events-pages': {
      extend: 'apostrophe-pieces-pages',
      groupFields: [
        {
          name: 'basics',
          label: 'Basics',
          fields: [
            'title', 'type', 'published'
          ]
        },
        {
          name: 'fancy',
          label: 'Fancy',
          fields: [
            'slug', 'orphan', 'withTags'
          ]
        }
      ]
    },
    'apostrophe-pages': {
      park: [
        {
          title: 'Events',
          type: 'events',
          slug: '/events',
          published: true
        },
        {
          title: 'Styleguide',
          type: 'styleguide',
          slug: '/styleguide',
          published: true
        }
      ],
      types: [
        {
          name: 'default',
          label: 'Default'
        },
        {
          name: 'home',
          label: 'Home'
        },
        {
          name: 'events',
          label: 'Events'
        }
      ]
    },
    'apostrophe-users': {
      groups: [
        {
          title: 'Guest',
          permissions: [ ]
        },
        {
          title: 'Editor',
          permissions: [ 'edit' ]
        },
        {
          title: 'Admin',
          permissions: [ 'admin' ]
        }
      ]
    },
    'view-test': {}
  },
  afterInit: function(callback) {
    console.log('initialized');
    return setImmediate(callback);
  }
});
