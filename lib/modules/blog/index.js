var _ = require('underscore');
var blog = require('apostrophe-blog');

module.exports = myBlog;

function myBlog(options, callback) {
  return new myBlog.MyBlog(options, callback);
}

myBlog.MyBlog = function(options, callback) {
  var self = this;

  options.modules = (options.modules || []).concat([ { dir: __dirname, name: 'myBlog' } ]);

  // We're not doing much other than establishing a context for template overrides,
  // so just let the base constructor invoke the callback for us
  return blog.Blog.call(this, options, callback);
};