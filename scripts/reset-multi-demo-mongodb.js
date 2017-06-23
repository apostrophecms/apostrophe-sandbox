// this is a mongodb shell script.
// run it like this:
//
// mongo reset-multi-demo-mongodb.js

var conn = new Mongo();

var i;
for (i = 0; (i < 10); i++) {
  init(i);
}

function init(i) {
  var db = conn.getDB('demo' + i);
  db.dropDatabase();
  db.copyDatabase('apostrophesandbox', 'demo' + i);
}
