var _ = require('underscore');
var blog = require('apostrophe-blog');

module.exports = myBlog;

function myBlog(options, callback) {
  return new myBlog.MyBlog(options, callback);
}

myBlog.MyBlog = function(options, callback) {
  var self = this;

  console.log('Initializing my subclass of the blog.');

  // We must set up this option so that our views/ folder and
  // any static assets in our public/ folder can be found.
  // Note this is written to be compatible if we decide to
  // further subclass our own module later. Views not found
  // in our subclass will be looked for in the parent class
  // views folder

  options.modules = (options.modules || []).concat([ { dir: __dirname, name: 'myBlog' } ]);

  // Many other options can be changed here, good practice
  // is to provide defaults rather than clobbering anything
  // set by a further subclass of this class

  blog.Blog.call(this, options, null);

  // Here is where we can override or add methods to self

  return callback(null);
};
