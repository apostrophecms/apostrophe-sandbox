var _ = require('lodash');
var h2p = require('html2plaintext');
var moment = require('moment');

module.exports = {
  extend: 'apostrophe-module',
  alias: 'sandbox',
  
  construct: function(self, options) {
    self.addHelpers({
      areaToPlainText: function(page, area) {
          if (!page[area] || ! page[area].items) {
            return ''
          }
          var s = '';
          for (var i = 0; i < page[area].items.length; i++) {
            if (page[area].items[i].type === 'apostrophe-rich-text') {
              s = h2p(page[area].items[i].content);
              s = s.replace(/(\r\n|\n|\r)/gm,"");
              break;
            }
          }
          return s;
        }
      })
    }
  };
  
