var _ = require('lodash');
var apos = require('apostrophe')({
  shortName: 'sandbox',
  hostName: 'sandbox',
  modules: {
    'apostrophe-assets': {
      minify: true
    }
  },
  afterInit: function(callback) {
    return setImmediate(callback);
  }
});
