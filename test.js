var assert = require('assert');
var request = require('request');
var ready = require('./app.js');

describe('test appjs', function() {
  it('initializes', function(done) {
    ready(function(err) {
      console.error(err);
      assert(!err);
      done();
    });
  });
  it('has a working home page', function(done) {
    request('http://localhost:3000', function(err, response, body) {
      assert((!err) && (response.statusCode === 200));
      done();
    });
  });
});

