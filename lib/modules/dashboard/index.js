module.exports = factory;

function factory(options, callback) {
  return new Construct(options, callback);
}

function Construct(options, callback) {
  var self = this;
  self._apos = options.apos;
  self._pages = options.pages;
  self._app = options.app;
  self._action = '/dashboard';

  self._apos.mixinModuleAssets(self, 'dashboard', __dirname, options);

  self._app.get(self._action, function(req, res) {
    return res.send(self.renderPage(req, 'index', { kraggles: 6 }));
  });

  // Serve our assets. Must be AFTER our routes because it matches any
  // other requests that start with self._action
  self.serveAssets();

  // Invoke the callback. This must happen on next tick or later!
  return process.nextTick(function() {
    return callback(null);
  });
}

// Export the constructor so others can subclass
factory.Construct = Construct;
