module.exports = {
  construct: function(self, options) {
    self.connectToMongo = function(callback) {
      // Reuse a single connection http://mongodb.github.io/node-mongodb-native/2.2/api/Db.html#db
      console.log('reusing database connection');
      self.apos.db = self.options.db.db(options.name || self.apos.shortName);
      return setImmediate(callback);
    };

    self.apostropheDestroy = function(callback) {
      // Do NOT close the db handle, that closes the master connection
      // all the instances are using
    };

    // If we need keepalive at all we'll do it at
    // the master connection level in app.js to avoid
    // thousands of competing keepalive queries
    self.keepalive = function() {
    };
  }
};
