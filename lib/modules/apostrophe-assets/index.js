module.exports = {
  construct: function(self, options) {
    self.pushAsset('stylesheet', 'site', { when: 'always' });
  }
};
