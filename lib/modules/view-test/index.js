module.exports = {
  construct: function(self, options) {
    self.pushAsset('script', 'user', { when: 'user' });
    self.apos.push.browserCall('user', 'apos.create("view-test", { action: ? })', self.action);
    self.route('post', 'view', function(req, res) {
      return res.send(self.render(req, 'view'));
    });
    self.route('post', 'modal', function(req, res) {
      return res.send(self.render(req, 'modal'));
    });
  }
};
