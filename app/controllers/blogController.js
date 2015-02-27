module.exports = blog;

function blog(options, callback) {
  return new blog.Blog(options, callback);
}

blog.Blog = function(options, callback) {
  var self = this;
  console.log("this jawn be running");

  module.exports.Super.call(this, options, null);

  self.beforeShow = function(req, snippet, callback) {
    console.log("Yea MVC");
    return callback(null);
  };

  self.beforeIndex = function(req, snippet, callback) {
    console.log("Yea MVC");
    return callback(null);
  };

  if (callback) {
    process.nextTick(function() {return callback(null); });
  }
}