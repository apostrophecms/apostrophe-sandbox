module.exports = {
  construct: function(self, options) {
    self.apos.app.get('/', function(req, res) {
      return res.send(self.renderPage(req, 'home'));
    });
  }
}

