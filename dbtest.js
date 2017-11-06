var mongo = require('mongodb');
var async = require('async');
var db, db2;

return async.series([
  connect,
  close2,
  insert1
], function(err) {
  if (err) {
    console.error(err);
    console.error('Sorry.');
  } else {
    console.log('Excellent!');
  }
});

function connect(callback) {
  return mongo.MongoClient.connect('mongodb://localhost:27017/multitest1', {
    autoReconnect: true,
    // retry forever
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }, function(err, _db) {
    if (err) {
      return callback(err);
    }
    db = _db;
    db2 = db.db('multitest2');
    return callback(null);
  });
}

function close2(callback) {
  return db2.close(callback);
}

function insert1(callback) {
  return db.collection('docs').insert({ title: 'test' }, callback);
}
