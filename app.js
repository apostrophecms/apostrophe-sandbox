var apos = require('apostrophe')({
  shortName: 'sandbox',
  hostName: 'sandbox',

  modules: {
    home: {},
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
