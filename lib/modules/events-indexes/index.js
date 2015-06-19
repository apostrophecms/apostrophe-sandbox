module.exports = {
  construct: function(self, options) {
    var events = self.apos.modules['events'];
    self.dispatch('/', function(req, callback) {
      events.find(... query parameters).toArray(function(err, _events) {
        req.data.events = _events;
        req.template = self.renderer('index');
      });
    });
    self.dispatch('/:slug', function(req, callback) {
      events.find({ slug: req.params.slug }).toObject(function(err, _event) {
        req.data.event = _event;
        req.template = self.renderer('show');
      });
    });
  }
};


module.exports = {
  dispatch: false,
  construct: function(self, options) {
    var events = self.apos.modules['events'];
    self.dispatch('/', events.indexDispatcher);
    self.dispatch('/:slug', events.singleDispatcher);
  }
};

