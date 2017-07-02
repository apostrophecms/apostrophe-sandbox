var fs = require('fs-extra');
var async = require('async');
var mongo = require('mongodb');

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
        return self.destroyOne(self.apos._id, function(err) {
          // Free the connection, etc.
          return self.apos.destroy && self.apos.destroy(function() {});
        });
      }
      // Up for a day? Time to go away
      if (Date.now() - self.start > 1000 * 60 * 60 * 24) {
        return self.destroyOne(self.apos._id, function(err) {
          // Free the connection, etc.
          return self.apos.destroy && self.apos.destroy(function() {});
        });
      }
    }, 1000);
    self.destroyOne = function(_id, callback) {
      var db;
      return async.series([
        dropDatabase,
        removeUploads,
        removeTemp,
        removeFromSites
      ], callback);
      function dropDatabase(callback) {
        return async.series([
          connect,
          drop,
          close
        ], callback);
        function connect(callback) {
          return mongo.MongoClient.connect('mongodb://localhost:27017/demo-' + _id, function(err, _db) {
            if (err) {
              return callback(err);
            }
            db = _db;
            return callback(null);
          });
        }
        function drop(callback) {
          return db.dropDatabase(callback);
        }
        function close(callback) {
          db.close();
          return callback(null);
        }
      }
      function removeUploads(callback) {
        // console.log(__dirname + '/../../../public/uploads/' + _id);
        // return callback(null);
        return fs.remove(__dirname + '/../../../public/uploads/' + _id, callback);
      }
      function removeTemp(callback) {
        // console.log(__dirname + '/../../../data/temp/' + _id);
        // return callback(null);
        return fs.remove(__dirname + '/../../../data/temp/' + _id, callback);
      }
      function removeFromSites(callback) {
        var sites = self.options.sites;
        return sites.remove({ _id: _id }, callback);
      }
    };
    self.apos.tasks.add('multi', 'remove-old', function(apos, argv, callback) {
      var sites = self.options.sites;
      var before = new Date();
      before.setDate(before.getDate() - 1);
      return sites.find({ createdAt: { $lte: before } }).toArray(function(err, sites) {
        console.log(sites);
        process.exit(0);
        if (err) {
          return callback(err);
        }
        return async.eachSeries(sites, function(site, callback) {
          self.destroyOne(site._id, callback);
        }, callback);
      });
    });
  }
};
