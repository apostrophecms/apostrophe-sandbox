var async = require('async');

module.exports = {

  construct: function(self, options) {

    self.apos.tasks.add(self.__meta.name, 'insert', function(apos, argv, callback) {

      var home;
      var n = 0;
      var req = self.apos.tasks.getReq();

      return async.series([
        getHome,
        insert
      ], callback);
      
      function getHome(callback) {
        return self.apos.pages.find(req, { level: 0 }).toObject(function(err, _home) {
          if (err) {
            return callback(err);
          }
          home = _home;
          return callback(null);
        });
      }
            
      function insert(callback) {
        var i = 0;
        return insertNextBatch(callback);
        function insertNextBatch(callback) {
          if (i === 100) {
            return callback(null);
          }
          i++;
          return insertBatch(function(err) {
            if (err) {
              return callback(err);
            }
            return insertNextBatch(callback);
          });
        }
      }
      
      function insertBatch(callback) {
        var now = new Date();
        var j = 0;
        var docs = [];
        for (j = 0; (j < 1000); j++) {
          docs.push(generate());
        }
        return self.apos.docs.db.insert(docs, callback);
        function generate() {
          n++;
          return {
            '_id': 'testpage-' + n,
            title: 'This is page #' + n,
            type: 'default',
            slug: '/this-is-page-number-' + n,
            rank: n,
            path: '/this-is-page-number-' + n,
            level: 1,
            createdAt: now,
            updatedAt: now,
            titleSortified: 'this is page #' + n,
            docPermissions: []
          };
        }
      }
      
    });
    
  }  
};
