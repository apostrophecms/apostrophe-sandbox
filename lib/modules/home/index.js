module.exports = {
  construct: function(self, options) {
    self.apos.app.get('/', function(req, res) {
      return res.send(self.renderPage(req, 'home'));
    });
    self.route('get', 'modal-test', function(req, res) {
      return res.send(self.render(req, 'test-modal'));
    });
    self.pushAsset('script', 'modal-test');
    self.pushAsset('script', 'home');
    self.apos.push.browserCall('always', 'apos.create("home", ?)', {
      action: self.action
    });
  }
}

