// Find stray console.log calls
// console.log = function(s) {
//   console.trace(s);
// }

var apos = require('apostrophe')({
  shortName: 'sandbox',
  hostName: 'sandbox',

  modules: {
    home: {},
    'link-widgets': {},
    'apostrophe-express': {
      middleware: [
        function(req, res, next) {
          req.user = {
            _id: 'admin',
            permissions: {
              admin: true
            }
          };

          return next();
        }
      ]
    }
  }
  // afterInit: function(callback) {
  //   return setImmediate(callback);
  // }
});
