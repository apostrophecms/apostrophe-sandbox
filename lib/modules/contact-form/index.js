var async = require('async');

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'contact-form',
  label: 'Contact Form',
  alias: 'contactForm',
  addFields: [
    {
      name: 'name',
      type: 'string',
      label: 'First & Last Name',
      required: true
    },
    {
      name: 'company',
      type: 'string',
      label: 'Company Name',
      required: true
    },
    {
      name: 'email',
      type: 'string',
      label: 'Email Address',
      required: true
    },
    {
      name: 'phone',
      type: 'string',
      label: 'Phone Number & Extension',
      required: true
    },
    {
      name: 'attachment',
      type: 'file',
      label: 'Attachment (optional)',
      required: false
    },
    {
      name: 'message',
      type: 'string',
      label: 'Message',
      textarea: true,
    }
  ],
  permissionsFields: false,

  afterConstruct: function(self) {
    self.setSubmitSchema();
  },

  construct: function(self, options) {

    self.setSubmitSchema = function() {
      self.submitSchema = self.apos.schemas.subset(self.schema,
        [ 'name', 'company', 'email', 'phone', 'attachment', 'message' ]
      );
    };

    self.submit = function(req, callback) {
      var piece = {};
      return async.series([
        convert,
        insert
      ], callback);
      function convert(callback) {
        return self.apos.schemas.convert(req, self.schema, 'form', req.body, piece, callback);
      }
      function insert(callback) {
        return self.insert(req, piece, { permissions: false }, callback);
      }
    };

  }
};