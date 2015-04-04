var async = require('async');

module.exports = {
  construct: function(self, options) {
    self.apos.app.get('/', function(req, res) {
      var home;
      return async.series({
        find: function(callback) {
          return self.apos.docs.find(req, { slug: '/' }).toObject(function(err, _home) {
            if (err) {
              return callback(err);
            }
            home = _home;
            return callback(null);
          });
        },
        insert: function(callback) {
          if (home) {
            return setImmediate(callback);
          }
          return self.apos.docs.insert(req, {
            slug: '/',
            published: true,
            footer: {
              type: 'area',
              items: [
                {
                  type: 'apostrophe-rich-text',
                  content: '<h4>This is a triumph.</h4>'
                }
              ]
            }
          }, function(err, _home) {
            if (err) {
              return callback(err);
            }
            home = _home;
            return callback(null);
          });
        }
      }, function(err) {
        if (err) {
          res.statusCode = 500;
          return res.send('error');
        }
        return res.send(self.renderPage(req, 'home', { page: home }));
      });
    });

    self.route('get', 'modal-test', function(req, res) {
      return res.send(self.render(req, 'test-modal'));
    });

    self.pushAsset('script', 'modal-test');
    self.pushAsset('script', 'home');

    self.apos.push.browserCall('always', 'apos.create("home", ?)', {
      action: self.action
    });
  }
}

