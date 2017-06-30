var fs = require('fs-extra');

module.exports = {
  construct: function(self, options) {
    self.latest = Date.now();
    self.start = Date.now();
    self.expressMiddleware = function(req, res, next) {
      self.latest = Date.now();
      return next();
    };
    setInterval(function() {
      // Idle for an hour? Time to go away
      if (Date.now() - self.latest > 1000 * 60 * 60) {
        return destroy();
      }
      // Up for a day? Time to go away
      if (Date.now() - self.start > 1000 * 60 * 60 * 24) {
        return destroy();
      }
      function destroy() {
        return async.series([
          dropDatabase,
          removeUploads,
          removeTemp,
          destroyApos
        ], callback);
        function dropDatabase(callback) {
          // Remove the actual database
          return self.apos.db.dropDatabase(callback);
        }
        function removeUploads(callback) {
          return fs.remove(__dirname + '/../../public/uploads/' + self.apos._id, callback);
        }
        function removeTemp(callback) {
          return fs.remove(__dirname + '/../../data/temp/' + self.apos._id, callback);
        }
        function destroyApos(callback) {
          // Free the connection, etc.
          return self.apos.destroy && self.apos.destroy(callback);
        }
      }
    }, 1000);
  }
};
